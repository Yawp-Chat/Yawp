/**
 * CHAT
 * ACTIVE USERS
 * MESSAGE INPUT AND SUBMIT
 */

import { io } from 'socket.io-client';
import Message from '../components/Message';
import './style/chat.css';
import React, { useState, useEffect, useCallback, Suspense, useRef } from "react"
import { Canvas } from "@react-three/fiber"
import { useGLTF, useTexture, Shadow, meshBounds, OrbitControls } from "@react-three/drei"

// const CLIENT_PORT = 8080;
const SERVER_PORT = 3000;

// TODO: find a better way to do declare the socket?
// NOTE: useRef and useState inside of the ChatContainer function still
// creates a new socket for each message
let socket;
let lastUser = '';

function ChatContainer({ currentUser }) {
  const chatRef = useRef();

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
      const isSender = username === currentUser ? 'currentUser' : 'otherUser'

      if (lastUser === username) username = null
      else lastUser = username;

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
      // scroll top is distance from the top of the scrollbar
      // scroll height is the height of the whole div
      // TODO: don't scroll down if the user scrolled up
      const {scrollTop, scrollHeight} = chatRef.current

      if (scrollTop >= scrollHeight - 800) chatRef.current.scrollTop = chatRef.current.scrollHeight;
    });
  }, []);

  const handleSubmit = () => {
    /** Grab message from input box */
    // TODO: handle case where nothing was added to input box
    const msg = messageRef.current.value;
    if (msg.replace(/\s/g, '').length) socket.emit('msg:post', { msg , currentUser });
    messageRef.current.value = '';
  };

  return (
    <div className="chatContainer">
      <div className="chatHeader">
        <CanvasContainer />
      </div>
      <div ref={chatRef} className="chat">
        <ul>{messages}</ul>
      </div>
      <div className="messageContainer">
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



const CanvasContainer = (props) =>{
  return(
    <div className="ballContainer">
      <Canvas className={`ball${props.isSender}`} orthographic shadows dpr={[1, 2]} camera={{ zoom: 20, position: [10, 10, 30], fov: 35 }}>
        <Suspense fallback={null}>
          <Ball />
          <ambientLight intensity={0.5} />
          <directionalLight position={[-20, 20, 20]} intensity={.2} />
     
      {/* <a.pointLight position={[0, 0, 5]} distance={5} intensity={5} color={color} /> */}
        <spotLight color={'#fff'} position={[10, 20, 20]} angle={0.1} intensity={2} shadow-mapSize-width={2048} shadow-mapSize-height={2048} shadow-bias={-0.00001} castShadow />
        </Suspense>
        <OrbitControls autoRotate autoRotateSpeed={7} />
      </Canvas>
    </div>

  )
}


const Ball = () =>{
  const ballRef = useRef(null)
  console.log('ball Ref',ballRef)
  const texture = useTexture("/ball3.jpg")
  return(

    <mesh postion={[130,300,300]} ref={ballRef}>
    <sphereGeometry args={[1, 64, 64]} />
      <meshStandardMaterial color="#a6fd29" materialclearcoatRoughness={.6} sheen={1} clearcoat={1} roughness={0.1} map={texture} />
    </mesh>

  )
}
export default ChatContainer;
