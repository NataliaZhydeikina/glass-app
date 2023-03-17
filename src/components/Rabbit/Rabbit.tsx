import modelTexture from "../../assets/model.jpg";
import { useAspect, useGLTF } from "@react-three/drei";
import rabbitModel from "../../assets/rabbit.glb";
import { GLTFResult } from "../../typings/GLTFResult";
import { useEffect, useMemo } from "react";
import { BufferAttribute, TextureLoader } from "three";
import fragmentShader from '../../utils/rabbit/fragmentShader.frag';
import vertexShader from '../../utils/rabbit/vertexShader.glsl';

function Rabbit() {
  const model = useGLTF(rabbitModel) as GLTFResult;
  const data = useMemo(() => ({
    fragmentShader,
    vertexShader,
    uniforms: {
      uTexture: { value: new TextureLoader().load(modelTexture) }
    }
  }), []);
  const scale = useAspect(innerWidth, innerHeight);

  useEffect(() => {
    const uvAttribute = model.nodes.Object_5.geometry.getAttribute('uv') as BufferAttribute;
    for (let i = 0; i < uvAttribute.count; i += 2) {
      uvAttribute.setXY(i, 0, 0);
      uvAttribute.setXY(i + 1, 0, 1);
    }
    uvAttribute.needsUpdate = true;
  }, []);

  return (
    <group>
      <mesh
        position={[120, -200, -150]}
        scale={[150 * (scale[0] / scale[1]), 150, 150]}
        geometry={model.nodes.Object_5.geometry}>
        <shaderMaterial {...data} />
      </mesh>
    </group>
  );
}

export default Rabbit;