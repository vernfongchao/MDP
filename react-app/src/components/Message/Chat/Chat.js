import React, { useState, useEffect, useRef, createRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { io } from 'socket.io-client';

import { getMessages } from "../../../store/messages";
import { postMessage } from "../../../store/messages";
import { loadMessage } from "../../../store/messages";
import { postRoom } from "../../../store/room";
import { editMessage } from "../../../store/messages";
import { removeMessages } from "../../../store/messages";
import { deleteMessage } from "../../../store/messages";
import { removeMessage } from "../../../store/messages";

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

    //  SOCKET IO
    useEffect(() => {
        socket = io();

        (async () => {
            if (room) {
                await setIsLoaded(false)
                let messages = await dispatch(getMessages(room?.id))
                await socket.emit("join", { user: `${user?.firstName} ${user?.lastName}`, room: room?.id })
                await setIsLoaded(true)
                await setContent("")
            }
            else if (!room && currStaff) {
                await setIsLoaded(false)
                await dispatch(removeMessages())
                await setIsLoaded(true)
                await setContent("")
            }
        })()


        socket.on("chat", (chat) => {
            dispatch(loadMessage(chat))
        })

        socket.on("delete", (chat) => {
            dispatch(removeMessage(chat))
        })

        return (() => {
            socket.disconnect()
        })
    }, [room, currStaff])

    // SCROLL TO BOTTOM FOR CHAT WHEN LOADED AND WHEN NEW MESSAGE IS ADDED
    useEffect(() => {
        (async () => {
            if (isLoaded) {
                menuRef.current = await messages.map((messages) => createRef())
                scrollRef.current?.scrollTo(0, scrollRef.current?.scrollHeight)
                scrollRef.current?.scrollIntoView({ behavior: "smooth" });
            }
        })()
    }, [isLoaded, messages.length])

    // creates event listeners to close edit/remove menu on click outside 

    useEffect(() => {
        document.addEventListener("mousedown", handleMenu)
        return () => {
            document.removeEventListener("mousedown", handleMenu)
        }
    }, [messageIdx])

    // deals when isEdit is off after switching between staff users when isEdit is on

    useEffect(() => {
        if (!isEdit) {
            setContent("")
            setEditI(null)
        }
    }, [isEdit])


    //  deals with resizing the chat bar
    useEffect(() => {
        (async () => {
            if (content && isLoaded) {
                const ele = await document.querySelector(".message-input")
                if (ele?.scrollHeight >= 189) {
                    ele.style.height = `189px`;
                    return
                }
                else if (ele?.scrollHeight < 189) {
                    ele.style.height = 'inherit'
                    ele.style.height = `${ele?.scrollHeight}px`;
                }
            }
            else if (!content && isLoaded) {
                const ele = await document.querySelector(".message-input")
                if (ele) {
                    ele.style.height = 'inherit'
                }
            }
        })()
    }, [content, isLoaded])

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
        // e.target.style.height = 'inherit';
        // if (e.target.scrollHeight >= 175) return e.target.style.height = `175px`;
        // e.target.style.height = `${e.target.scrollHeight}px`;
    };

    const deleteChat = async (e, id) => {
        console.log(id)
        const message = await dispatch(deleteMessage(id))
        if (message.id) {
            await socket.emit("delete", message);
            await setMessageIdx(-1)
            await setIsEdit(false)
        }
    }

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
                setEditI(null)
                setIsEdit(false)
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
                <div ref={scrollRef} className="chat-messages-container">
                    {messages?.map((message, i) => {
                        const staff = staffs[message.staffId]
                        const timestamp = new Date(message.createdAt).toLocaleString('en-US', { 'timeZone': 'GMT' })
                        return (
                            <div className={staff.firstName === user?.firstName ? "chat-user-content-container" : "chat-staff-content-container"}
                                key={i}
                            >
                                {message?.staffId === user?.id ?
                                    <div className="chat-user-edit-content-container">
                                        <div className="chat-user-timestamp-menu-container">
                                            <span className="chat-user-timestamp">
                                                Sent on {timestamp}
                                            </span>
                                            <div className="chat-edit-remove-menu-container" ref={menuRef.current[i]} onClick={e => handleChange(e, i)}>
                                                <span className="chat-edit-remove-menu-button" > ...</span>
                                                {messageIdx === i &&
                                                    <div className="chat-edit-remove-menu">
                                                        <div className="chat-edit-button-container" >
                                                            <p className="chat-edit-remove-buttons" onClick={e => handleEdit(e, i, message.id)}>
                                                                edit
                                                            </p>
                                                            <p className="chat-edit-remove-buttons" onClick={e => deleteChat(e, message.id)}>
                                                                remove
                                                            </p>
                                                        </div>
                                                    </div>
                                                }
                                            </div>
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
                                            <span className="chat-staff-name">
                                                {staff.firstName} {staff.lastName} <span className="chat-staff-timestamp">sent on {timestamp}</span>
                                            </span>
                                            <div>
                                                <p className="chat-staff-content">
                                                    {message.content}
                                                </p>
                                            </div>
                                            {message.isEdited &&
                                                <span className="chat-user-edited-text">
                                                    edited
                                                </span>}
                                        </div>
                                    )
                                }
                                <span ref={scrollRef}></span>
                            </div>
                        )
                    })
                    }

                </div>
            }
            {(isLoaded && !messages.length) &&

                <div className="chat-staff-new-message-container">
                    <p>This is the very beginning of your direct message history with {currStaff?.firstName}. Only the two of you are in this conversation. </p>
                </div>}
            {
                (isLoaded && currStaff) &&
                < form className="message-form" onSubmit={sendChat}>
                    <textarea className="message-input"
                        value={content}
                        onChange={handleContent}

                    />
                    {isEdit ?
                        <div className="message-form-submit-button-container">
                            <button className="message-form-cancel-button" type="button" onClick={handleCancel}>Cancel</button>
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

