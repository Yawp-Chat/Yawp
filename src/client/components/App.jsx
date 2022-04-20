import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Login from '../containers/Login';
import ChatContainer from '../containers/ChatContainer';

import '../containers/style/chat.css'


function App() {
  const [ username, setUsername ] = useState('');
  /** use state to keep track of whether or not we are connected to server */
  return (
    <div className="main">
      <header />
      <div className="messageContainer">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login setUsername={setUsername} />} />
            <Route path="/home" element={<ChatContainer username={username} />} />
          </Routes>
        </BrowserRouter>
      </div>
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
