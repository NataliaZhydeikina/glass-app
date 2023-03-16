import { Canvas } from '@react-three/fiber';
import { Suspense, useMemo } from 'react';
import './App.css'
import { KeyboardControls, KeyboardControlsEntry, OrbitControls, Scroll, ScrollControls } from '@react-three/drei';
import Rabbit from './components/Rabbit';
import GlassScene from './components/GlassScene';
import Controls from './utils/controls';


function App() {
  const map = useMemo<KeyboardControlsEntry<Controls>[]>(() => [
    { name: Controls.up, keys: ['ArrowUp', 'KeyW'] },
    { name: Controls.down, keys: ['ArrowDown', 'KeyS'] },
    { name: Controls.left, keys: ['ArrowLeft', 'KeyA'] },
    { name: Controls.right, keys: ['ArrowRight', 'KeyD'] },
  ], [])

  return (
    <div className="App">
      <Canvas resize={{ scroll: false }} camera={{
        zoom: 1,
        top: 1,
        bottom: -1,
        left: -1,
        right: 1,
        near: -300,
        far: 300
      }} orthographic>
        <ScrollControls damping={10} pages={1}>
          <Scroll>
            <OrbitControls></OrbitControls>
            <KeyboardControls map={map}>
              <ambientLight intensity={0.7} />
              <directionalLight intensity={0.5} color="0xffffff" position={[-4, 3, -2.25]} />
              {/* <mesh>
              <planeGeometry args={[5, 5]} />
              <shaderMaterial {...data} />
            </mesh> */}

              <GlassScene>
                <Suspense fallback={null}>
                  <Rabbit />
                </Suspense>
              </GlassScene>
            </KeyboardControls>
          </Scroll>
        </ScrollControls>
      </Canvas>
    </div>
  )
}

export default App
