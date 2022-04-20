import React from 'react';
// single message

export default ({isSender, msg, username}) => {
  console.log('in Message', username)
  return (
    <li className={`message-li ${isSender}`}>
      {/* <img className="img-user-message" /> */}
      {username ? <h3 className="message-username">{username}</h3> : null}
      <h5 className="message">{msg}</h5>
    </li>
  );
};
