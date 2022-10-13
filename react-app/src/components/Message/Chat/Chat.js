import React, { useState, useEffect, useRef, createRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { io } from 'socket.io-client';

import { getMessages } from "../../../store/messages";
import { postMessage } from "../../../store/messages";
import { loadMessage } from "../../../store/messages";
import { postRoom } from "../../../store/room";


import './Chat.css'

let socket;

const Chat = ({ filteredStaffs, currStaff, index, setIndex, isLoaded, setIsLoaded, setSearch }) => {
    const dispatch = useDispatch()

    const messages = Object.values(useSelector(state => state.messages))
    const [content, setContent] = useState("");


    const [messageIdx, setMessageIdx] = useState(-1)
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
        document.addEventListener("mousedown",handleMenu)
        return () => {
            document.removeEventListener("mousedown", handleMenu)
        }
    },[messageIdx])

    const handleMenu = (e) => {
        console.log(messageIdx)
        if (!menuRef.current[messageIdx]?.current?.contains(e.target)) {
            setMessageIdx(-1)
        }
    }

    const handleEdit = (e) => {
        console.log("Here")
    }


    const handleChange = (e, i) => {
        setMessageIdx(i)
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
                    {messages.map((message, i) => {
                        const staff = staffs[message.staffId]

                        return (
                            <div className={staff.firstName === user?.firstName ? "chat-user-content-container" : "chat-staff-content-container"}
                                key={i}
                            >
                                {message?.staffId === user?.id ?
                                    <div>
                                        <div className="chat-edit-remove-menu-container" ref={menuRef.current[i]} onClick={e => handleChange(e, i)}>
                                            <span className="chat-edit-remove-menu-button" > ...</span>
                                            {messageIdx === i &&
                                                <div className="chat-edit-remove-menu">
                                                    <div onClick={handleEdit}>
                                                        edit
                                                    </div>
                                                    <div>
                                                        remove
                                                    </div>
                                                </div>
                                            }
                                        </div>
                                        <p className="chat-user-content">
                                            {message.content}
                                        </p>
                                    </div>
                                    :
                                    (
                                        <div className="chat-user-name-content-container">
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
                    <div className="message-form-submit-button-container">
                        <button className="message-form-submit-button" type="submit">Send</button>
                    </div>
                </form>
            }
        </div >
    )
}


export default Chat

