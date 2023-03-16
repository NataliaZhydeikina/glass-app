import { useFBO } from "@react-three/drei";
import { createPortal, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { Camera, Color, Scene } from "three";
import ScrollScene from "../ScrollScene/ScrollScene";

type Props = {
  children: JSX.Element
}

function GlassScene({ children }: Props) {
  const cam = useRef<Camera>(null!)
  const scene = useMemo(() => {
    const scene = new Scene()
    scene.background = new Color("yellow");
    return scene
  }, []);
  const target = useFBO();

  useFrame((state) => {
    cam.current = state.camera;
    state.gl.setRenderTarget(target)
    state.gl.render(scene, cam.current)
    state.gl.setRenderTarget(null)
  });
  return (
    <ScrollScene>
      <mesh>
        {createPortal(children, scene)}
        <planeGeometry args={[300, 300]} />
        <meshBasicMaterial color="white" map={target.texture} />
      </mesh>
    </ScrollScene>
  );
}

export default GlassScene;