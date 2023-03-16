import { useFBO } from "@react-three/drei";
import { createPortal, useFrame } from "@react-three/fiber";
import { RefObject, useMemo, useRef } from "react";
import { Camera, Color, Mesh, Scene, TextureLoader } from "three";
import ScrollScene from "../ScrollScene/ScrollScene";
import fragmentShader from '../../utils/glass/fragmentShader.frag';
import vertexShader from '../../utils/glass/vertexShader.glsl';
import distortionTexture from "../../assets/distortion@1x.jpg";

type Props = {
  children: JSX.Element
}

function GlassScene({ children }: Props) {
  const cam = useRef<Camera>(null!);
  const scene = useMemo(() => {
    const scene = new Scene();
    scene.background = new Color("white");
    return scene
  }, []);
  const target = useFBO();
  const sceneRef = useRef<Mesh>();

  useFrame((state) => {
    const { mouse: { x, y }, gl, camera } = state;
    scene.position.x = x * 150;
    scene.position.y = y * 150;
    cam.current = camera;

    gl.setRenderTarget(target);
    gl.render(scene, cam.current);
    gl.setRenderTarget(null);

    if (!sceneRef.current) return;
    sceneRef.current.position.x = -x * 100;
    sceneRef.current.position.y = -y * 100;
  });
  const data = useMemo(() => ({
    fragmentShader,
    vertexShader,
    uniforms: {
      uTexture: { value: target.texture },
      uGrain: { value: new TextureLoader().load(distortionTexture) }
    }
  }), []);
  return (
    <ScrollScene>
      <group>
        <mesh ref={sceneRef as RefObject<Mesh>}>
          {createPortal(children, scene)}
          <planeGeometry args={[400, 400]} />
          <shaderMaterial {...data} />
        </mesh>
        <mesh position={[0, 0, -200]}>
          <planeGeometry args={[innerWidth, innerHeight * 2]} />
          <meshBasicMaterial color={"black"} />
        </mesh>
      </group>
    </ScrollScene>
  );
}

export default GlassScene;