import { RenderTexture } from "@react-three/drei";
import ScrollScene from "../ScrollScene/ScrollScene";

type Props = {
  children: JSX.Element
}

function GlassScene({ children }: Props) {
  return (
    <ScrollScene>
      <mesh>
        <planeGeometry args={[300, 300]} />
        <meshBasicMaterial color="grey">
          <RenderTexture attach="map">
            {children}
          </RenderTexture>
        </meshBasicMaterial>
      </mesh>
    </ScrollScene>
  );
}

export default GlassScene;