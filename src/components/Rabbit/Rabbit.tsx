import modelTexture from "../../assets/model2.jpg";
import { useGLTF, useTexture } from "@react-three/drei";
import rabbitModel from "../../assets/rabbit.glb";

function Rabbit() {
  const model = useGLTF(rabbitModel);
  const props = useTexture({
    map: modelTexture,
  });

  return (
    <group>
      <mesh position={[0, -2, 0]} geometry={model.nodes.rabbit1.geometry} >
        <meshStandardMaterial {...props} />
      </mesh>
      {/* material={model.materials[""]}  */}
    </group>
  );
}

export default Rabbit;