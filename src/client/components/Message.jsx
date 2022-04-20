import React from 'react';
// single message

export default ({isSender, msg, username}) => {

  return (
    <li className={`message-li ${isSender}`}>
      <img className="img-user-message" />
      <h3 className="message-username">{username}</h3>
      <h5 className="message">{msg}</h5>
    </li>
  );
};
