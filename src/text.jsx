import React, { useState, useEffect } from "react";
import "./App.css";
import io from "socket.io-client";

export default function Text({socket}) {

  const [messagereceived, setMessagereceived] = useState(null);
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [onlineUsers, setCount] = useState(0);
  const [messages, setMessages] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleEnterClick = () => {
    console.log('Entered username:', username);
    setDisabled(true);
    
  };

  const getUsers = async () => {
    try {
      const res = await fetch("http://localhost:3000/users");
      const data = await res.json();
      setCount(data.users);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getUsers();

    const intervalId = setInterval(() => {
      getUsers();
    }, 100);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    socket.on("recieve message", (msg) => {
      setMessagereceived(msg);
    });
  }, [socket]);

  useEffect(() => {
    if (messagereceived !== null) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { message: messagereceived.message, username: messagereceived.username },
      ]);
      setMessagereceived(null);
    }
  }, [messagereceived]);

  

  const handleSubmit = () => {
    socket.emit("send message", { message: message, username: username });
    setMessages([...messages, { message: message, username: username }]);
    setMessage("");
  };


  return (
    <>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Omingle | Chat</title>
        <link rel="stylesheet" href="css/style.css" />
        <style>
          {`
            .sent-message {
              color: lightcoral;
              padding: 5px;
              border-radius: 8px;
              margin: 5px;
              max-width: 70%;
              align-self: flex-end;
            }

            .received-message {
              color: lightblue;
              padding: 5px;
              border-radius: 8px;
              margin: 5px;
              max-width: 70%;
              align-self: flex-start;
            }
          `}
        </style>
      </head>

      <body>
        <header>
          <div className="logo">Omingle</div>
          
          <nav>
            <h4>
              <span id="connected">{onlineUsers}</span> online right now
            </h4>
          </nav>
        </header>
        <input
        type="text"
        id="name"
        placeholder="Enter your name"
        style={{ padding: '5px' }}
        value={username}
        onChange={handleUsernameChange}
        disabled = {disabled}
      />
      <button
        id="start-chat"
        style={{ marginLeft: '20px', padding: '5px' }}
        onClick={handleEnterClick}
      >
        Enter
      </button>
        <div className="chat-container">
          <div className="right-section">
            <div className="message-area" id="message-area">
              
                {messages.map((msg, index) => (
              <p
                key={index}
                className={msg.username === username ? "sent-message" : "received-message"}
              >
                <span style={{ color: msg.username === username ? "lightblue" : "lightcoral" }}>
                  {msg.username}
                </span>
                : <span style={{ color: "white" }}>{msg.message}</span>
              </p>
            ))
                    }    
               
            </div>
            <h4
              className="error"
              id="error"
              style={{ color: "#FF9494", paddingLeft: "10px" }}
            ></h4>
            <div className="input-area">
              <input
                type="text"
                className="chat-input"
                placeholder="type your message here"
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value)
                  setSent
                }}
              />
              <button className="send-button" onClick={handleSubmit}>
                Send
              </button>
            </div>
          </div>
        </div>

        <footer>
          <p>
            &copy; 2023 Omingle |{" "}
            <a href="https://discord.gg/" className="href">
              <img src="assets/discord.svg" alt="Discord" />
              Discord
            </a>
          </p>
        </footer>
      </body>
    </>
  );
}
