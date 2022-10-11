import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { io } from 'socket.io-client';

import { getMessages } from "../../../store/messages";
import { postMessage } from "../../../store/messages";
import { loadMessage } from "../../../store/messages";


import './Chat.css'

let socket;



const Chat = ({ currStaff, isLoaded, setIsLoaded }) => {
    const dispatch = useDispatch()
    const [messages, setMessages] = useState([])
    const [content, setContent] = useState("");

    const user = useSelector(state => state.session.user)
    const staffs = useSelector(state => state.staffs)

    const rooms = Object.values(useSelector(state => state.rooms))

    const room = rooms.filter(room => {
        if ((room.staffId1 === user?.id || room.staffId2 === user?.id) &&
            (room.staffId1 === currStaff?.id || room.staffId2 === currStaff?.id)) {
            return room
        }
    })[0]

    console.log(currStaff)

    useEffect(() => {
        (async () => {
            socket = io();
            if (currStaff) {
                const incomingMessages = await dispatch(getMessages(room.id))
                const messagesArray = Object.values(incomingMessages)
                setMessages(messagesArray)
                socket.emit("join", { user: `${user?.firstName} ${user?.lastName}`, room: `${room.id}` })
                setIsLoaded(true)
            }
            else {
                setMessages([])
            }
        })()

        socket.on("chat", (chat) => {
            dispatch(loadMessage(chat))
            setMessages([...messages, chat])
        }
        )
        return (() => {
            socket.disconnect()
        })
    }, [currStaff])


    const handleContent = (e) => {
        setContent(e.target.value)
    };

    const sendChat = async (e) => {
        e.preventDefault()
        const message = await dispatch(postMessage({
            'staff_id': user.id,
            'room_id': room.id,
            content,
        }))

        if (message.id) {
            setMessages([...messages, message])
            socket.emit("chat", message);
        }
    }


    return (

        <div className="chat-page-container">
            <div>
                <h1 className="chat-header">
                    Message Log
                </h1>
            </div>
            {isLoaded &&
                <div className="chat-messages-container">
                    {messages.map((message, ind) => {
                        const staff = staffs[message.staffId]

                        return (
                            <div className={staff.firstName === user?.firstName ? "chat-user-content-container" : "chat-staff-content-container"}
                                key={ind}
                            >
                                {staff.id === user?.id ?
                                    <p className="chat-user-content">
                                        {message.content}
                                    </p>
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
                            </div>
                        )

                    }
                    )}
                </div>
            }
            {isLoaded &&
                < form onSubmit={sendChat}>
                    <input
                        value={content}
                        onChange={handleContent}
                    />
                    <button type="submit">Send</button>
                </form>
            }
        </div >
    )
}


export default Chat

