/**
 * CHAT
 * ACTIVE USERS
 * MESSAGE INPUT AND SUBMIT
 */
import React, { useState, useEffect } from 'react';
import User from '../components/user';
import Message from '../components/Message';

// import './style/chat.css';

function ChatContainer() {
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);

  const handleSubmit = () => {
    console.log('send message');
  };

  const handleEnter = (e) => {
    if (e.key === 'Enter') handleSubmit();
  };

  // For users signing in
  useEffect(() => {
    setUsers((prev) => prev.concat(<User />));
  }, []);

  // For messages being sent
  useEffect(() => {
    setMessages((prev) => prev.concat(<Message />));
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
