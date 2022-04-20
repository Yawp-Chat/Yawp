/**
 * CHAT
 * ACTIVE USERS
 * MESSAGE INPUT AND SUBMIT
 */
import React, { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import User from '../components/user';
import Message from '../components/Message';
import './style/chat.css';

// const CLIENT_PORT = 8080;
const SERVER_PORT = 3000;

// TODO: find a better way to do declare the socket?
// NOTE: useRef and useState inside of the ChatContainer function still
// creates a new socket for each message
let socket;

function ChatContainer({ currentUser }) {
  const chatRef = useRef();

  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  /** Refrence in order to grab input from message input box */
  const messageRef = useRef();

  // Define event listeners for connect and disconnect
  useEffect(() => {
    // TODO: Add auth in options to pass along token
    /** Establish websocket connection */
    /** Explicitly state transports */
    socket = io(
      `ws://localhost:${SERVER_PORT}`,
      { transports: ['websocket', 'polling'] },
      { timeout: 2000 }
    );

    /** Listen for events */
    socket.on('connect', () => {
      // TODO: toggle presence indicator
      console.log('connected');
    });

    socket.on('disconnect', () => {
      // TODO: toggle presence indicator
      console.log('disconnected');
    });

    socket.on('msg:get', ({ msg, username }) => {
      // assign classname based on whether or not you sent the message
      console.log(username, currentUser, username === currentUser);

      const isSender = username === currentUser ? 'currentUser' : 'otherUser';

      setMessages((prev) =>
        prev.concat(
          <Message
            isSender={isSender}
            key={`message${prev.length}`}
            msg={msg}
            username={username}
          />
        )
      );
      // scroll top is distance from the top of the scrollbar
      // scroll height is the hieght of the whole div
      // TODO: don't scroll down if the user scrolled up
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    });
  }, []);

  const handleSubmit = () => {
    /** Grab message from input box */
    // TODO: handle case where nothing was added to input box
    const msg = messageRef.current.value;

    console.log('what am i', currentUser);

    if (msg.replace(/\s/g, '').length)
      socket.emit('msg:post', { msg, currentUser });

    messageRef.current.value = '';
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
      <div ref={chatRef} className="chat">
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
