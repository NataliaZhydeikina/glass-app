import { Canvas } from '@react-three/fiber';
import React, { Suspense, useEffect, useMemo } from 'react';
import './App.css'
import fragmentShader from './utils/fragmentShader.frag';
import vertexShader from './utils/vertexShader.glsl';
import { CameraControls } from '@react-three/drei';
import Rabbit from './components/Rabbit';

function App() {
  const data = useMemo(() => ({
    fragmentShader,
    vertexShader,
    uniforms: {
      // uTexture: { value: new TextureLoader().load(modelTexture) }
    }
  }), []);

  return (
    <div className="App">
      <Canvas flat linear>
        <CameraControls />
        <ambientLight intensity={0.7} />
        <directionalLight intensity={0.5} color="0xffffff" position={[-4, 3, -2.25]} />
        {/* <mesh>
          <planeGeometry args={[5, 5]} />
          <shaderMaterial {...data} />
        </mesh> */}
        <Suspense fallback={null}>
          <Rabbit />
        </Suspense>
      </Canvas>
    </div>
  )
}

export default App
