import React from 'react';
// single message

export default ({isSender, msg, username}) => {

  const ball = <div className={`ball${isSender}`}>Hello</div>

  return (
      
    <li className={`message-li ${isSender}`}>
      {/* <img className="img-user-message" /> */}
      { username ? <h3 className={`message-username username${isSender}`}>{username}</h3> : null }
      { username ? ball : null}
      <h5 className={`message message${username ? 'Yes' : 'No'}${isSender}`}>{msg}</h5>
    </li>
  );
};
