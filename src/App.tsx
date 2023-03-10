import { Canvas } from '@react-three/fiber'
import React, { useEffect, useMemo } from 'react'
import './App.css'
import fragmentShader from './utils/fragmentShader.frag';
import vertexShader from './utils/vertexShader.glsl';
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import rabbitTexture from "./assets/gltf_embedded_0.png";
import rabbitModel from "./assets/rabbit.glb";

function App() {
  const data = useMemo(() => ({
    fragmentShader,
    vertexShader
  }), []);
  useEffect(() => {
    console.log(rabbitModel);
  }, []);
  return (
    <div className="App">
      <Canvas flat linear>
        <ambientLight intensity={0.7} />
        <directionalLight color="0xffffff" position={[-4, 3, -2.25]} />
        <mesh>
          <planeGeometry args={[5, 5]} />
          <shaderMaterial {...data} />
        </mesh>
      </Canvas>
    </div>
  )
}

export default App
