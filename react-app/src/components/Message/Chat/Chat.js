import React, { useState, useEffect, useRef, createRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { io } from 'socket.io-client';

import { getMessages } from "../../../store/messages";
import { postMessage } from "../../../store/messages";
import { loadMessage } from "../../../store/messages";
import { postRoom } from "../../../store/room";
import { editMessage } from "../../../store/messages";


import './Chat.css'

let socket;

const Chat = ({ currStaff, isLoaded, setIsLoaded, setSearch, isEdit, setIsEdit }) => {
    const dispatch = useDispatch()

    const messages = Object.values(useSelector(state => state.messages))
    const [content, setContent] = useState("");
    const [messageIdx, setMessageIdx] = useState(-1)
    const [editI, setEditI] = useState(null)
    const menuRef = useRef([])

    const scrollRef = useRef()

    const user = useSelector(state => state.session.user)
    const staffs = useSelector(state => state.staffs)

    const rooms = Object.values(useSelector(state => state.rooms))

    const room = rooms.filter(room => {
        if ((room.staffId1 === user?.id || room.staffId2 === user?.id) &&
            (room.staffId1 === currStaff?.id || room.staffId2 === currStaff?.id)) {
            return room
        }
    })[0]

    useEffect(() => {
        socket = io();
        (async () => {
            if (room) {
                let messages = await dispatch(getMessages(room?.id))
                socket.emit("join", { user: `${user?.firstName} ${user?.lastName}`, room: room?.id })
                setIsLoaded(true)
                menuRef.current = await messages.map((messages) => createRef())
            }
            else if (!room) {
                // setIsLoaded(false)
            }

        })()


        socket.on("chat", (chat) => {
            dispatch(loadMessage(chat))
        })

        return (() => {
            socket.disconnect()
        })
    }, [room])

    useEffect(() => {
        if (isLoaded) {
            scrollRef.current?.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages, isLoaded])

    useEffect(() => {
        document.addEventListener("mousedown", handleMenu)
        return () => {
            document.removeEventListener("mousedown", handleMenu)
        }

    }, [messageIdx])

    const handleMenu = (e) => {
        if (!menuRef.current[messageIdx]?.current?.contains(e.target)) {
            setMessageIdx(-1)
        }
    }

    const handleChange = (e, i) => {
        setMessageIdx(i)
    }

    const handleEdit = async (e, i, messageId) => {
        await setIsEdit(true)
        await setEditI(messageId)
        await setContent(messages[i].content)
        await setMessageIdx(-1)
    }

    const handleCancel = (e) => {
        setIsEdit(false)
        setEditI(null)
        setContent("")
    }

    const handleContent = (e) => {
        setContent(e.target.value)
        e.target.style.height = 'inherit';
        if (e.target.scrollHeight >= 175) return e.target.style.height = `175px`;
        e.target.style.height = `${e.target.scrollHeight}px`;
    };

    const sendChat = async (e) => {
        e.preventDefault()
        if (!room && currStaff) {
            const room = await dispatch(postRoom({
                "staff_id_1": user?.id,
                "staff_id_2": currStaff?.id
            }))
            if (room) {
                await socket.emit("join", { user: `${user?.firstName} ${user?.lastName}`, room: room?.id })
                const message = await dispatch(postMessage({
                    'staff_id': user.id,
                    'room_id': room.id,
                    content,
                }))
                if (message.id) {
                    socket.emit("chat", message);
                    setContent("")
                    setSearch("")
                }
            }
        }
        else if (isEdit && currStaff) {
            const message = await dispatch(editMessage({
                'id': editI,
                'staff_id': user.id,
                'room_id': room.id,
                content,
            }))
            if (message.id) {
                socket.emit("chat", message);
                setContent("")
            }
        }
        else {
            const message = await dispatch(postMessage({
                'staff_id': user.id,
                'room_id': room.id,
                content,
            }))
            if (message.id) {
                socket.emit("chat", message);
                setContent("")
            }
        }
    }

    return (

        <div className="chat-page-container">
            <div>
                <h1 className="chat-header">
                    Message Log
                </h1>
            </div>
            {(isLoaded && room) &&
                <div className="chat-messages-container">
                    {messages?.map((message, i) => {
                        const staff = staffs[message.staffId]
                        return (
                            <div className={staff.firstName === user?.firstName ? "chat-user-content-container" : "chat-staff-content-container"}
                                key={i}
                            >
                                {message?.staffId === user?.id ?
                                    <div className="chat-user-edit-content-container">
                                        <div className="chat-edit-remove-menu-container" ref={menuRef.current[i]} onClick={e => handleChange(e, i)}>
                                            <span className="chat-edit-remove-menu-button" > ...</span>
                                            {messageIdx === i &&
                                                <div className="chat-edit-remove-menu">
                                                    <div className="chat-edit-button-container" onClick={e => handleEdit(e, i, message.id)}>
                                                        edit
                                                    </div>
                                                    <div className="chat-edit-button-container">
                                                        remove
                                                    </div>
                                                </div>
                                            }
                                        </div>
                                        <div className="chat-user-content-edit-container">
                                            <p className={editI === message.id ? "chat-user-content chat-user-edit-content" : "chat-user-content"}>
                                                {message.content}
                                            </p>
                                            {message.isEdited &&
                                                <span className="chat-user-edited-text">
                                                    edited
                                                </span>}
                                        </div>
                                    </div>
                                    :
                                    (
                                        <div className="chat-staff-name-content-container">
                                            <span>
                                                {staff.firstName} {staff.lastName}
                                            </span>
                                            <p className="chat-staff-content">
                                                {message.content}
                                            </p>
                                        </div>
                                    )
                                }
                                <span ref={scrollRef}></span>
                            </div>
                        )

                    }
                    )}
                </div>
            }
            {(isLoaded && currStaff) &&
                < form className="message-form" onSubmit={sendChat}>
                    <textarea className="message-input"
                        value={content}
                        onChange={handleContent}

                    />
                    {isEdit ?
                        <div className="message-form-submit-button-container">
                            <button className="message-form-cancel-button"  type="button" onClick={handleCancel}>Cancel</button>
                            <button className="message-form-submit-button" type="submit">Send</button>
                        </div>
                        :
                        <div className="message-form-submit-button-container">
                            <button className="message-form-submit-button" type="submit">Send</button>
                        </div>

                    }
                </form>
            }
        </div >
    )
}


export default Chat

