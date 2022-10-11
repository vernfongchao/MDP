import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { io } from 'socket.io-client';

import './Chat.css'

let socket;



const Chat = ({ reciever }) => {
    const [messages, setMessages] = useState([])
    const [chatInput, setChatInput] = useState("");

    const user = useSelector(state => state.session.user)

    useEffect(() => {
        // dispatch to get room from user and receiver/ exepcted room
    })

    useEffect(() => {
        (async() => {
            socket = io();

            // if(reciever) {
            //     //  const room = dispatch to get room from user and receiver/ exepcted room
            //     // socket.emit("join", { user: `${user.firstName} ${user.lastName}`, room: '1' })
            //     // const messages = await dispatch get Messages from room Id
            //     // setMessages(messages)

            // }
            socket.on("chat", (chat) => {
                setMessages([...messages, chat])
                }
            )
        })()

        // socket = io();
        // socket.on("chat", (chat) => {
        //     setMessages([...messages, chat])
        //     }
        // )
        return (() => {
            socket.disconnect()
        })
    }, [reciever])
    
    
    // if (reciever) {
    // }

    const updateChatInput = (e) => {
        setChatInput(e.target.value)
    };

    const sendChat = async(e) => {
        e.preventDefault()
        //const message = dispatch sending a message
        // if(message.id){
            // }
            socket.emit("chat", { user: `${user.firstName} ${user.lastName}`, msg: chatInput });
        // clear the input field after the message is sent
        // setChatInput("")
    }


    return (

        <div className="chat-page-container">
            <div>
                <h1 className="chat-header">
                    Message Log
                </h1>
            </div>
            <div>
                {messages.map((message, ind) => (
                    <div key={ind}>{`${message.user}: ${message.msg}`}</div>
                ))}
            </div>

            <form onSubmit={sendChat}>
                <input
                    value={chatInput}
                    onChange={updateChatInput}
                />
                <button type="submit">Send</button>
            </form>
        </div>
    )
}


export default Chat

