import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Video from './video.jsx'
import Text from './text.jsx'
import io from 'socket.io-client';
const socket = io.connect("http://localhost:3000");

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App socket={socket}/>} />
        <Route path="/video" element={<Video socket={socket}/>} />
        <Route path="/text" element={<Text socket={socket}/>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
