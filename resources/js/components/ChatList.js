import React, { Component } from "react";

export default function ChatList(props) {
    const active = !props.activeChat ? "" : "active"
    return (
        <ul className="list-group list-group-flush">
            {props.chats.map(chat => (
                <li
                    className={
                        "list-group-item user-list-item " +
                            active
                    }
                    key={chat.id}
                >
                    <a
                        href="#"
                        onClick={e => {
                            e.preventDefault();
                            props.onSelectChat(chat.id);
                        }}
                        className="nav-link"
                    >
                        <p className="card-text">{chat.partner.name}</p>
                    </a>
                </li>
            ))}
        </ul>
    );
}