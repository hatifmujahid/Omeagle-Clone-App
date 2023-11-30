import "./App.css";
import React, { useState, useEffect, useRef } from "react";
import AgoraUIKit from 'agora-react-uikit';


const AgoraUI = () =>{
    const [videoCall, setVideoCall] = useState(false);
    const [participants, setParticipants] = useState(0);

    const rtcProps = {
        appId: "b851d26d446449d0b8e19bdc24494eba",
        channel: "test",
        token: null,
    }

    const callbacks = {
        EndCall: () => {
            setVideoCall(false);
        },
        error: (err) => {
            console.log(err);
        },
    }

    const rtmProps = {}
    const styleProps = {}

    return (
        <div>
            {videoCall ? (
                <div style={{ display: 'flex', width: '100vw', height: '100vh' }}>
                    <AgoraUIKit rtcProps={rtcProps} callbacks={callbacks} rtmProps={rtmProps} styleProps={styleProps} />
                </div>
            ) : (
                <h3 style={{color:"white"}} onClick={() => setVideoCall(true)}>Click to start video call</h3>
            )}
        </div>
    )

}

export default function Video({ socket }) {
    

    
    
    // const handleClick = () => {
    //   const res = fetch("http://localhost:3000/randomUser");
    //   const data = res.json();
    //   if (data.user === me) {
    //     handleClick();
    //     return;
    //   }
    // }

    const [count, setCount] = useState(0);
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
        // Fetch data initially
        getUsers();

        // Set up an interval to fetch data every 100 ms
        const intervalId = setInterval(() => {
            getUsers();
        }, 100);

        // Cleanup the interval when the component is unmounted
        return () => clearInterval(intervalId);
    }, []);
    return (
        <>
            <head>
                <meta charSet="UTF-8" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                />
                <title>Omingle | Video</title>

                <link rel="stylesheet" href="css/style.css" />
            </head>

            <body>
                <header>
                    <div className="logo">Omingle</div>
                    <nav>
                        <h4>
                            <span id="connected">{count}</span> online right now
                        </h4>
                    </nav>
                </header>

                <div className="chat-container">
                    <div className="left-section" id="video_container">
                        <AgoraUI />
                        
                    </div>

                    {/* <div className="right-section">
            <div className="message-area" id="message-area">
              <p>
                <span style={{ color: "lightblue" }}>you</span>: hello
              </p>
              <p>
                <span style={{ color: "lightcoral" }}>stranger</span>: hi
              </p>
            </div>
            <h4
              className="error"
              id="error"
              style={{ color: "#FF9494", paddingLeft: "10px" }}
            ></h4>
            <div className="input-area">
              <button className="next-button" style={{ marginRight: "5px" }} onClick={handleClick}>
                Next (ESC)
              </button>
              <input
                type="text"
                className="chat-input"
                placeholder="type your message here"
              />
              <button className="send-button">Send</button>
            </div>
          </div> */}
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
