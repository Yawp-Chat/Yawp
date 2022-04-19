import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link, BrowserRouter, Routes } from 'react-router-dom';
import { io } from 'socket.io-client';
import Login from '../containers/Login';
import ChatContainer from '../containers/ChatContainer';

// const CLIENT_PORT = 8080;
const SERVER_PORT = 3000;

/** Add auth in options to pass along token */
/** Establish websocket connection */
const socket = io(`http://localhost:${SERVER_PORT}`, { timeout: 2000 });

/** Listen for events */
socket.on('connection', () => {
  console.log('connected');
});

socket.on('disconnect', () => {
  console.log('disconnected');
});

function App() {
  /** use state to keep track of whether or not we are connected to server */

  return (
    <div className="messageContainer">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<ChatContainer />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

/**
 * Front End
 *
 * ***Chat
 **  edge:
 *  - empty chat box on sumbit
 *  - hook that shows if connected. Hook will create the connection on load
 *
 */
