import React, { useEffect, useState } from "react";
import axios from 'axios';
import './main.css'
import { useLocation, useNavigate } from "react-router-dom";

import Mentor from '../mentor/Mentor';
import Messenger from "../../messenger/messenger";

function Main() {

    const { state } = useLocation();
    const user = state.data
    const mentor = state.data.Userdetails[0]
    const navigate = useNavigate();

    const [convo, setConvo] = useState([]);
    const [cases, setCases] = useState([]);

    useEffect(() => {
        console.log(user.Role);
        if (user.Role === "student") {
            axios.get("/auth/conversation/" + user.Username)
                .then(response => {
                    console.log("Response", response.data);
                    if (response.data.length !== 0) {
                        setConvo(response.data);
                    } else {
                        setConvo([])
                    }
                })
        }
    }, [])

    useEffect(() => {
        if(user) {
            axios.get("/data/cases/"+user.Username)
                .then(response => {
                    setCases([response.data]);
                })
        }
    },[user])

    const handleConversation = () => {
        if (mentor) {
            axios.post('/auth/conversation/' + user.Username + '/' + mentor.id)
                .then(response => {
                    if (response.data.success) {
                        alert("Conversation created succesfully!");
                        window.location.reload();
                    } else {
                        alert("Conversation created succesfully!")
                    }
                })
        }
    }

    const handleCases = () => {
        navigate(`/${user.Username}/cases`, {state: {cases}});
    }

    const email = "mailto:"+mentor.email

    return (

        <React.Fragment>
            <div className="contact">
                <div className="flex-box">
                    <div className="flex-item">
                        <span><i class="fas fa-phone"></i> Call us : {mentor.mobile}  <i class="fas fa-envelope"></i> E-mail : {mentor.email}</span>
                    </div>
                </div>
            </div>
            <div className="main">
                <div className="dashboard">
                    {
                        user.Role === "mentor" ? <Mentor /> :
                            <React.Fragment>
                                <div class="jumbotron">
                                    <h1 class="display-4">Hello, {user.Name}</h1>
                                    <p class="lead">Your respected mentor is <strong>{mentor.name}</strong> </p>
                                    <hr class="my-4" />
                                    <p>This conversation can be read by the both mentor and student.</p>
                                    <a class="btn btn-primary btn-lg" href={email} className="popemail" role="button">Contact</a>
                                </div>
                                <div className="activity flex-box">
                                    <div className="cases flex-item" onClick={handleCases}>
                                        <span className="flex-text">Cases</span>
                                        <div className="numberBadge">{cases[0]?.length}</div>
                                    </div>
                                    {
                                        convo.length > 0 ? null : <div className="messages flex-item">
                                            <span className="flex-text" onClick={handleConversation}>Start a conversation</span>
                                        </div>
                                    }
                                </div>
                            </React.Fragment>
                    }
                </div>
                
                <div className="chatBox">
                    <p className="conversationwith">Conversation with {mentor.name}</p>
                    {convo.length > 0 ? <Messenger user={user} conversation={convo} />
                        : <span className="noConversation">Start a conversation to open chat.</span>}

                </div>
            </div>
        </React.Fragment>
    );
}

export default Main;