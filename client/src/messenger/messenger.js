import React, { useEffect, useRef, useState } from "react";
import Message from "../components/message/message";
import axios from "axios";
import './messenger.css';
import {io} from 'socket.io-client';

function Messenger({ user, conversation }) {

    const [messages, setMessages] = useState([]);
    const [cid, setCid] = useState(null);
    const [newMessage, setnewMessage] = useState();
    const [arrivalMessage, setarrivalMessage] = useState(null);
    const scrollRef = useRef();
    const socket = useRef();

    useEffect(() => {
//         socket.current = io("ws://localhost:8900");
        socket.current = io("wss://mentormentee-client.onrender.com");

        socket.current.on("getMessage", data=> {
            setarrivalMessage({
                sender: data.senderId,
                text: data.text,
                createdAt: Date.now()
            })
        })
        console.log("arrivalMessage", arrivalMessage);
    }, [])

    useEffect(() => {
        arrivalMessage && cid?.members.includes(arrivalMessage.sender) && setMessages(prev => [...prev, arrivalMessage]);
    }, [arrivalMessage, cid])

    useEffect(() => {
        setCid(conversation[0])
    }, [conversation])

    useEffect(() => {
        const getMessages = async () => {
            if (cid) {
                try {
                    const res = await axios.get("https://mentormentee-server.onrender.com/auth/messages/" + cid._id);
                    setMessages(res.data);
                } catch (err) {
                    console.log(err);
                }

            }
        }
        getMessages();

    }, [cid])

    useEffect(() => {
        socket.current.emit("addUser", user.Username);
    },[user])

    useEffect(() => {
        setTimeout(() => scrollRef.current.scrollIntoView({ behavior: 'smooth' }), 1000);
    }, [messages])

    const handleSend = async (e) => {
        e.preventDefault();
        const message = {
            sender: user.Username,
            text: newMessage,
            conversationId: cid._id
        }

        const receiverId = cid?.members.find(member => member !== user.Username)
        socket.current.emit("sendMessage",{
            senderId: user.Username,
            receiverId,
            text: newMessage
        })

        try {
            const res = await axios.post("https://mentormentee-server.onrender.com/auth/messages/", message);
            setMessages([...messages, res.data]);
            setnewMessage("")
        } catch (err) {
            console.log(err);
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setnewMessage(prev => {
            return ({
                ...prev, [name]: value
            })
        })
    }

    return (
        <React.Fragment>
            <div className="messenger">
                {
                    conversation.length > 0 ? <div className="chatBoxWrapper">
                        <div className="chatBoxTop">
                            {
                                messages && messages.map((message, index) =>
                                    <div ref={scrollRef} id="messagesBox">
                                        <Message key={index} text={message.text} time={message.createdAt}
                                            own={message.sender === user.Username ? true : false}
                                        />
                                    </div>
                                )
                            }
                        </div>

                        <div className="chatBoxBottom">
                            <textarea className="chatMessageInput"
                                placeholder="Type a Message"
                                onChange={(e) => { setnewMessage(e.target.value) }}
                                value={newMessage}

                            />
                            <button className="chatSubmitButton" onClick={handleSend}>Send</button>
                        </div>
                    </div> : <span className="noConversation">Start a conversation to open chat.</span>
                }
            </div>
        </React.Fragment>
    );
}

export default Messenger;
