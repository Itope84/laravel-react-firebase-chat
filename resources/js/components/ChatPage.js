import React, { Component } from "react";
import ReactDOM from "react-dom";
import fire from "../fire";

import ChatList from "./ChatList";
import MessageWindow from "./MessageWindow";

export default class ChatPage extends Component {
    constructor() {
        super();
        this.state = {
            chats: [],
            token: "",
            chats: [],
            userId: [],
            messages: [],
            activeChat: null,
            message: "",
            sending: false,
            showChatWindow: false,
            chatListBackup: [],
            query: ""
        };

        this.fetchMessages = this.fetchMessages.bind(this);
        this.selectChat = this.selectChat.bind(this);
        this.inputHandler = this.inputHandler.bind(this);
        this.updateMessage = this.updateMessage.bind(this);
        this.sendMessage = this.sendMessage.bind(this)
    }

    componentDidMount() {
        let url = "/chats/all";
        axios.get(url).then(response => {
            let chats = [];

            // fetch chats from API
            Object.keys(response.data.data).forEach(key => {
                chats.push(response.data.data[key]);
            });

            this.setState({
                chats: chats,
                userId: response.data.userId
            });
            this.selectChat(chats[0].id);
        });
    }

    fetchMessages(chatId) {
        let vm = this;
        const itemsRef = fire
            .database()
            .ref()
            .child("messages")
            .orderByChild("chat_id")
            .equalTo(chatId);

        itemsRef.on("value", snapshot => {
            let data = snapshot.val();
            let messages = [];
            if (data) {
                Object.keys(data).forEach(key => {
                    // simply replacing all \n with a br tag...
                    data[key].message
                        ? (data[key].message = data[key].message.replace(
                              /(\n)/g,
                              `<br />`
                          ))
                        : "";
                    messages.push({ ...data[key] });
                });
            }
            // we all know this is a funny guy, so we're saying, hey 'this' isn't in this scope, but on the class scope...
            vm.setState({ messages: messages });
        });
    }

    selectChat(chatId) {
        this.setState({
            showChatWindow: true,
            activeChat: this.state.chats.reduce((prev, chat) => {
                return chat.id === chatId ? chat : prev;
            }, null)
        });
        this.fetchMessages(chatId);
    }

    inputHandler(e) {
        if (e.keyCode === 13 && !e.shiftKey) {
            e.preventDefault();
            this.sendMessage();
        }
    }

    updateMessage(e) {
        this.setState({
            message: e.target.value
        });
    }

    sendMessage() {
        // e.preventDefault();
        this.setState({
            sending: true
        });
        const message = new FormData();

        message.append("message", this.state.message);
        // To-Do: Push message to firebase

        axios
            .post(`/chats/${this.state.activeChat.id}/sendMessage`, message, {
                headers: { "Content-Type": "multipart/form-data" }
            })
            .then(response => {
                this.setState({
                    message: "",
                    sending: false
                });
            })
            .catch(error => {
                this.setState({
                    sending: false
                });
            });
    }

    render() {
        return (
            <div className="card-body chat-page px-0 py-0">
                <div className="d-flex chat-container">
                    <div className="col-md-4 border-right px-0">
                        <ChatList
                            chats={this.state.chats}
                            onSelectChat={this.selectChat}
                            activeChat={this.state.activeChat}
                        />
                    </div>

                    <div
                        className={
                            "col-md-8 d-md-block h-100 position-relative mb-0 px-0 " + (!this.state.showChatWindow ? "d-none" : "")
                        }
                    >
                        <div className="chat-window w-100 h-100">
                            <div className="chat-title d-flex align-items-center border-bottom py-2 px-2">
                                {this.state.activeChat ? (
                                    <h5 className="mb-0 d-flex w-100 align-items-center">
                                        {this.state.activeChat.partner.name}
                                        <span
                                            className="h3 ml-auto d-md-none mb-0 btn bg-transparent"
                                            onClick={() =>
                                                this.setState({
                                                    showChatWindow: !this.state
                                                        .showChatWindow
                                                })
                                            }
                                        >
                                            <i className="fas fa-times" />
                                        </span>
                                    </h5>
                                ) : null}
                            </div>
                            {this.state.activeChat ? (
                                <MessageWindow
                                    messages={this.state.messages}
                                    userId={this.state.userId}
                                />
                            ) : null}
                            <div className="chat-footer border-top px-2 py-2">
                                <div className="input-group mb-1">
                                    <textarea
                                        rows="1"
                                        value={this.state.message}
                                        onChange={this.updateMessage}
                                        className="form-control"
                                        placeholder="New Message"
                                        aria-label="New Message"
                                        onKeyDown={this.inputHandler}
                                    />
                                    <div className="input-group-append">
                                        <button
                                            className="btn btn-primary"
                                            type="button"
                                            disabled={this.state.sending}
                                            onClick={this.sendMessage}
                                        >
                                            {this.state.sending ? (
                                                <i className="fas fa-spinner fa-spin" />
                                            ) : (
                                                ""
                                            )}
                                            Send
                                        </button>
                                    </div>
                                </div>

                                {/* <!-- <span class>Maximum upload size: 5MB.</span> --> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

if (document.querySelector("#chatApp")) {
    ReactDOM.render(<ChatPage />, document.querySelector("#chatApp"));
}
