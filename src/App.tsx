import { Canvas } from '@react-three/fiber';
import { Suspense, useMemo } from 'react';
import './App.css';
import { Html, KeyboardControls, KeyboardControlsEntry, OrbitControls, Scroll, ScrollControls } from '@react-three/drei';
import Rabbit from './components/Rabbit';
import GlassScene from './components/GlassScene';
import Controls from './utils/controls';


function App() {
  const map = useMemo<KeyboardControlsEntry<Controls>[]>(() => [
    { name: Controls.up, keys: ['ArrowUp', 'KeyW'] },
    { name: Controls.down, keys: ['ArrowDown', 'KeyS'] },
    { name: Controls.left, keys: ['ArrowLeft', 'KeyA'] },
    { name: Controls.right, keys: ['ArrowRight', 'KeyD'] },
  ], []);

  return (
    <div className="App">
      <Canvas resize={{ scroll: false }} camera={{
        zoom: 1,
        top: 1,
        bottom: -1,
        left: -1,
        right: 1,
        near: -400,
        far: 400
      }} orthographic>
        <ScrollControls damping={10} pages={1}>
          <Scroll>
            <KeyboardControls map={map}>
              <OrbitControls />
              <ambientLight intensity={0.7} />
              <directionalLight intensity={0.5} color="0xffffff" position={[-4, 3, -2.25]} />
              <GlassScene>
                <Suspense fallback={null}>
                  <Rabbit />
                </Suspense>
              </GlassScene>
              <group>
                <Html occlude="raycast" position={[0, 0, 0]}>
                  <h1 className="App-heading">Кролик</h1>
                  <p className="App-paragraph">Кролик – невеликий пухнастий звірок роду ссавців сімейства Зайцевих. Цих тваринок не тільки розводять заради м’яса та хутра, а й тримають у домашніх умовах в якості домашніх улюбленців.</p>
                </Html>
              </group>
            </KeyboardControls>
          </Scroll>
        </ScrollControls>

      </Canvas>
    </div>
  )
}

export default App;
