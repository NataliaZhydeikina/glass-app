import { Canvas } from '@react-three/fiber';
import React, { Suspense, useEffect, useMemo } from 'react';
import './App.css'
import fragmentShader from './utils/fragmentShader.frag';
import vertexShader from './utils/vertexShader.glsl';
import { useGLTF, CameraControls } from '@react-three/drei';
import rabbitModel from "./assets/rabbit.glb";

function App() {
  const data = useMemo(() => ({
    fragmentShader,
    vertexShader
  }), []);
  const model = useGLTF(rabbitModel);
  useEffect(() => {
    console.log(model);
  }, []);

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
          <group>
            <mesh position={[0, -2, 0]} geometry={model.nodes.rabbit1.geometry}>
              <shaderMaterial {...data} />
            </mesh>
            {/* material={model.materials[""]}  */}
          </group>
        </Suspense>
      </Canvas>
    </div>
  )
}

export default App
