import React, { Component } from "react";

export default function MessageWindow(props) {
    return (
        <div className="chat-messages px-4 py-3" id="messageWindow">
            {props.messages.map(message => (
                <div
                    key={message.id}
                    className={
                        "message " + (message.sender_id === props.userId
                            ? "send"
                            : "receive")
                    }
                >
                    {message.sender_id === props.userId ? (
                        <React.Fragment>
                            <div>
                                <div className="px-4 py-2 message-box mx-2">
                                    {message.body}
                                </div>
                                <span className="tiny text-right mx-2 d-block">
                                    25 Aug 2018 08:45 PM
                                </span>
                            </div>

                            <div className="chat-image mr-2 rounded-circle">
                                <img
                                    src="https://images.vexels.com/media/users/3/147102/isolated/preview/082213cb0f9eabb7e6715f59ef7d322a-instagram-profile-icon-by-vexels.png"
                                    className="img-fluid"
                                />
                            </div>
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            <div className="chat-image mr-2 rounded-circle">
                                <img
                                    src="https://www.freeiconspng.com/uploads/png-file-png-file-png-file-png-file-png-file-27.png"
                                    className="img-fluid"
                                />
                            </div>

                            <div>
                                <div className="px-4 py-2 message-box mx-2">
                                    {message.body}
                                </div>
                                <span className="tiny text-left mx-2 d-block">
                                    25 Aug 2018 08:45 PM
                                </span>
                            </div>
                        </React.Fragment>
                    )}
                </div>
            ))}
        </div>
    );
}