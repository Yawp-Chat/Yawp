import React from 'react';

export default (props) => {

  const handleEnter = (e) => {
    if (e.key === 'Enter') handleSubmit();
  };

  return <>
      <input
      className="chatInput"
      placeholder="write message here..."
      onKeyPress={(e) => handleEnter(e)}
    />
    <button type="submit" className="btn-send" onClick={props.handleSubmit}>
      Send
    </button>
  </>
}