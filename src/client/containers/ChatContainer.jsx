/**
 * CHAT
 * ACTIVE USERS
 * MESSAGE INPUT AND SUBMIT
 */
import React, { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import User from '../components/user';
import Message from '../components/Message';
// import './style/chat.css';

// const CLIENT_PORT = 8080;
const SERVER_PORT = 3000;

function ChatContainer() {
  /** Add auth in options to pass along token */
  /** Establish websocket connection */
  const [socket, setSocket] = useState(
    io(`http://localhost:${SERVER_PORT}`, { timeout: 2000 })
  );
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  /** Refrence in order to grab input from message input box */
  const messageRef = useRef();

  // Setup socket connection
  useEffect(() => {
    /** Listen for events */
    socket.on('connection', () => {
      console.log('connected');
    });

    socket.on('disconnect', () => {
      console.log('disconnected');
    });
  }, []);

  const handleSubmit = () => {
    /** Grab message from input box */
    // TODO: handle case where nothing was added to input box
    console.log('send message', messageRef.current.value);
  };

  const handleEnter = (e) => {
    if (e.key === 'Enter') handleSubmit();
  };

  /** For users signing in */
  useEffect(() => {
    setUsers((prev) => prev.concat(<User key={`user${socket.id}`} />));
  }, []);

  /** For messages being sent */
  useEffect(() => {
    setMessages((prev) =>
      prev.concat(<Message key={`message${prev.length}`} />)
    );
  }, []);

  console.log(users, messages);

  return (
    <div className="chatContainer">
      <div className="userBox">
        <ul>{users}</ul>
      </div>
      <div className="chat">
        <ul>{messages}</ul>
      </div>
      <div className="message">
        <input
          ref={messageRef}
          className="chatInput"
          placeholder="write message here..."
          onKeyPress={(e) => handleEnter(e)}
        />
        <button type="submit" className="btn-send" onClick={handleSubmit}>
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatContainer;
