import React from 'react';
import { io } from 'socket.io-client';

const CLIENT_PORT = 8080;

/** Establish websocket connection */
const socket = io(`http://localhost:${CLIENT_PORT}`);

/** Listen for events */
socket.on('connection', () => {
  console.log('connected');
});

socket.on('disconnect', () => {
  console.log('disconnected');
});

function App() {
  /** use state to keep track of whether or not we are connected to server */
  const handleSubmit = () => {
    console.log('send message');
  };

  const handleEnter = (e) => {
    if (e.key === 'Enter') handleSubmit();
  };

  return (
    <div className="messageContainer">
      <div id="message-area" />
      <input
        className="chatInput"
        placeholder="write message here..."
        onKeyPress={(e) => handleEnter(e)}
      />
      <button type="submit" className="btn-send" onClick={handleSubmit}>
        Send
      </button>
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
