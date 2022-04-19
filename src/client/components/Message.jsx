import React from 'react';
// single message
export default function(props) {
  return (
    <li className="message-li">
      <img className="img-user-message" />
      <h3 className="message-username">username</h3>
      <h5 className="message">message</h5>
    </li>
  );
};
