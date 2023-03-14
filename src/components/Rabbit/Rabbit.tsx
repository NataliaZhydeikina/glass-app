import modelTexture from "../../assets/model.jpg";
import { useGLTF, useTexture } from "@react-three/drei";
import rabbitModel from "../../assets/rabbit.glb";
import { GLTFResult } from "../../typings/GLTFResult";
import { useEffect, useMemo } from "react";
import { BufferAttribute, TextureLoader } from "three";
import fragmentShader from '../../utils/rabbit/fragmentShader.frag';
import vertexShader from '../../utils/rabbit/vertexShader.glsl';

function Rabbit() {
  const model = useGLTF(rabbitModel) as GLTFResult;
  const props = useTexture({
    map: modelTexture,
  });
  // useEffect(() => {
  //   let uv = Array.from((model.nodes.rabbit1.geometry.attributes.uv as BufferAttribute).array);
  //   console.log(uv);
  //   console.log(model.nodes.rabbit1.geometry.getAttribute('uv'))
  //   for (let i = 0; i < uv.length; i += 4) {
  //     uv[i] = 0;
  //     uv[i + 1] = 0;
  //     uv[i + 2] = 1;
  //     uv[i + 3] = 0;
  //   }
  //   //model.nodes.rabbit1.geometry.attributes.uv.setAttribute("uv", uv);
  //   model.nodes.rabbit1.geometry.attributes.uv.needsUpdate = true;
  // }, []);

  const data = useMemo(() => ({
    fragmentShader,
    vertexShader,
    uniforms: {
      uTexture: { value: new TextureLoader().load(modelTexture) }
    }
  }), []);
  useEffect(() => {
    //console.log(model);
    let uv = Array.from((model.nodes.Object_5.geometry.attributes.uv as BufferAttribute).array);
    console.log(uv);
    console.log(model.nodes.Object_5.geometry.getAttribute('uv'))
    const uvAttribute = model.nodes.Object_5.geometry.getAttribute('uv') as BufferAttribute;
    for (let i = 0; i < uvAttribute.count; i += 2) {
      uvAttribute.setXY(i, 0, 0);
      uvAttribute.setXY(i, 0, 1);
    }
    uvAttribute.needsUpdate = true
    console.log(model.nodes.Object_5)
  }, []);

  return (
    <group>
      <mesh position={[0, -2, 0]} geometry={model.nodes.Object_5.geometry} >
        <shaderMaterial {...data} />
        {/* <meshStandardMaterial {...props} /> */}
      </mesh>
      {/* material={model.materials[""]}  */}
    </group>
  );
}

export default Rabbit;