import { useFBO } from "@react-three/drei";
import { createPortal, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { Camera, Color, Scene, TextureLoader } from "three";
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
        <mesh>
          {createPortal(children, scene)}
          <planeGeometry args={[400, 400]} />
          <shaderMaterial {...data} />
        </mesh>
      </group>
    </ScrollScene>
  );
}

export default GlassScene;