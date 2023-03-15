import { RefObject, useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useScroll, ScrollControlsState, ScrollControls, useKeyboardControls } from "@react-three/drei";
import { MathUtils, Scene } from "three";
import Controls from "../../utils/controls";

type Scroll = ScrollControlsState & { scroll: { current: number } }

function GlassScene() {
  const scroll = useScroll() as Scroll;
  const { height: h } = useThree((state) => state.viewport)
  const ref = useRef<Scene>();

  useEffect(() => {
    scroll.scroll.current = 0.5;
  });

  useFrame((state, delta) => {
    //console.log(scroll);
    if (!ref.current) return;
    let x = ref.current.position.y;
    let y = scroll.scroll.current * (-h + 100) + (h / 2) - 50;
    ref.current.position.y = MathUtils.damp(x, y, 8, delta);
  });

  const [sub, get] = useKeyboardControls<Controls>()
  useEffect(() => sub(st => {
    if (st.up) {
      console.log("key up")
      scroll.scroll.current = Math.max(0, scroll.scroll.current - 0.1);
    }
    if (st.down) {
      console.log("key down");
      scroll.scroll.current = Math.min(1, scroll.scroll.current + 0.1);
    }
  }), [])
  return (
    <scene ref={ref as RefObject<Scene>}>
      <mesh>
        <planeGeometry args={[100, 100]} />
        <meshBasicMaterial color="grey" />
      </mesh>
    </scene>
  );
}

export default GlassScene;