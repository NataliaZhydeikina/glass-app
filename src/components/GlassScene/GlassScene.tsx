import { RefObject, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useScroll, ScrollControlsState, ScrollControls } from "@react-three/drei";
import { MathUtils, Scene } from "three";

type Scroll = ScrollControlsState & { scroll: { current: number } }

function GlassScene() {
  const scroll = useScroll() as Scroll;
  const { height: h } = useThree((state) => state.viewport)
  const ref = useRef<Scene>();

  useFrame((state, delta) => {
    if (!ref.current) return;
    console.log(scroll.offset);
    let x = ref.current.position.y;
    let y = scroll.scroll.current * (-h + 100) + (h / 2) - 50;
    ref.current.position.y = MathUtils.damp(x, y, 8, delta);
  });

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