import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Link } from "react-router-dom";


function App() {
  const [count, setCount] = useState(0);
  const [username, setUsername] = useState("");

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

  const handleSubmit = () => {
    const enteredName = document.getElementById('name').value;
    setUsername(enteredName);
    if (enteredName) {
      localStorage.setItem("username", enteredName);
      document.getElementById('name').style.display = 'none';
      document.getElementById('start-chat').style.display = 'none';
    } else {
     
    }
  }
  

  return (
    <>
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Omingle | Connect with strangers around the world.</title>
        <link rel="stylesheet" href="css/style.css" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
        />
      </head>
      <header>
        <div className="logo">Omingle</div>
        <nav>
          <h4>{count} online right now.</h4>
        </nav>
      </header>
      <body>
      <div className="container">
        <main>
          <div className="welcome-message">
            <h1>🎉 Welcome to Omingle! 🎉 {username}</h1>
            <h3 style={{ fontStyle: "normal" }}>
              Connect with strangers around the world.
            </h3>
          </div>
          
            <div className="chat-options" >
            <Link to="/text">
              <button id="text-chat">💬 Text Chat</button>
            </Link>
            <Link to="/video">
              <button id="video-chat">📷 Video Chat</button>
            </Link>
          </div>

          <h4 id="error" style={{ color: "#FF9494" }}></h4>
        </main>
      </div>
      </body>

      <footer>
        <p>
          &copy; 2023 Omingle |{" "}
          <a href="https://discord.gg/" className="href">
            <img src="assets/discord.svg" alt="Discord" />
            Discord
          </a>
        </p>
      </footer>
    </>
  );
}

export default App;
