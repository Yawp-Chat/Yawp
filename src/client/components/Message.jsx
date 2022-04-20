import React, { useState, useEffect, useCallback, Suspense } from "react"
import { Canvas } from "@react-three/fiber"
import { useGLTF, useTexture, Shadow, meshBounds } from "@react-three/drei"

// single message

export default ({isSender, msg, username}) => {


  return (
      
    <li className={`message-li ${isSender}`}>
      {/* <img className="img-user-message" /> */}
      { username ? <h3 className={`message-username username${isSender}`}>{username}</h3> : null }
      { username ? <CanvasContainer isSender={isSender}/> : null}
      <h5 className={`message message${username ? 'Yes' : 'No'}${isSender}`}>{msg}</h5>
    </li>
  );
};

const CanvasContainer = (props) =>{
  return(
    <Canvas className={`ball${props.isSender}`}>
      <Suspense fallback={null}>
        <Ball />
      </Suspense>
    </Canvas>

  )
}


const Ball = () =>{
  const texture = useTexture("/ball8.jpg")
  return(
    
    <mesh>
    <sphereGeometry args={[0.1, 64, 64]} />
      <meshStandardMaterial color="#a6fd29" materialclearcoatRoughness={.6} sheen={1} clearcoat={1} roughness={0.1} map={texture} />
    </mesh>

  )
}