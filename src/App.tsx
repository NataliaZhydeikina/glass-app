import { Canvas, useFrame, useThree } from '@react-three/fiber';
import React, { Suspense, useEffect, useMemo, useRef } from 'react';
import './App.css'
import fragmentShader from './utils/glass/fragmentShader.frag';
import vertexShader from './utils/glass/vertexShader.glsl';
import { CameraControls, PerspectiveCamera, Scroll, ScrollControls } from '@react-three/drei';
import Rabbit from './components/Rabbit';
import GlassScene from './components/GlassScene';

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
      { /*camera={{ fov: 70, near: 0.01, far: 100 }}*/}
      <Canvas flat linear camera={{
        zoom: 1,
        top: 1,
        bottom: -1,
        left: -1,
        right: 1,
        near: -100,
        far: 100
      }} orthographic>
        <ScrollControls damping={10} pages={1}>
          <Scroll>
            <CameraControls />
            <ambientLight intensity={0.7} />
            <directionalLight intensity={0.5} color="0xffffff" position={[-4, 3, -2.25]} />
            {/* <mesh>
              <planeGeometry args={[5, 5]} />
              <shaderMaterial {...data} />
            </mesh> */}
            {/* <Suspense fallback={null}>
              <Rabbit />
            </Suspense> */}
            <GlassScene />
          </Scroll>
        </ScrollControls>
      </Canvas>
    </div>
  )
}

export default App
