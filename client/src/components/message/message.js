import React from "react";
import './message.css';
import {format} from 'timeago.js';

function Message({text, time, own}) {
    return (
        <React.Fragment>
            <div className={own ? "message own" : "message"}>
                
                <div className="messageTop">
                    <p className="messageText">{text}</p>
                </div>
                
                <div className="messageBottom">
                    <p>{format(time)}</p>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Message;