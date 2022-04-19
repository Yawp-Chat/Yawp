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
  /** TODO: Add auth in options to pass along token */
  /** Establish websocket connection */
  const socket = useRef(
    io(`http://localhost:${SERVER_PORT}`, { timeout: 2000 })
  ).current;

  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  /** Refrence in order to grab input from message input box */
  const messageRef = useRef();

  // Define event listeners for connect and disconnect
  useEffect(() => {
    /** Listen for events */
    socket.on('connect', () => {
      // TODO: toggle presence indicator
      console.log('connected');
    });

    socket.on('disconnect', () => {
      // TODO: toggle presence indicator
      console.log('disconnected');
    });

    socket.on('msg:get', (data) => {
      const { msg } = data;
      console.log('everyone gets a msg:', msg);
      setMessages((prev) =>
        prev.concat(<Message key={`message${prev.length}`} text={msg} />)
      );
    });
  }, []);

  const handleSubmit = () => {
    /** Grab message from input box */
    // TODO: handle case where nothing was added to input box
    console.log('onClick', messageRef.current.value);
    socket.emit('msg:post', { msg: messageRef.current.value });
  };

  /** For users signing in */
  useEffect(() => {
    setUsers((prev) => prev.concat(<User key={`user${socket.id}`} />));
  }, []);

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
          onKeyPress={(e) => {
            if (e.key === 'Enter') handleSubmit();
          }}
        />
        <button type="submit" className="btn-send" onClick={handleSubmit}>
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatContainer;
