import { useEffect, useLayoutEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { OrthographicCamera, useAspect, useScroll } from "@react-three/drei";
import gsap from "gsap";

function GlassScene() {
  // const [width, height, depth] = useAspect(innerWidth, innerHeight);
  // useFrame(() => {
  //   console.log((innerWidth / innerHeight));
  //   console.log((width / height));
  // });
  const scroll = useScroll();
  // useFrame(() => {
  //   const a = data.range(0, 1 / 3);
  //   console.log(data.scroll.current);
  // });
  const { width: w, height: h } = useThree((state) => state.viewport)
  // useFrame(() => {
  //   console.log(h / 2 - h * data.scroll.current);
  // });
  const ref = useRef();
  const tl = useRef();

  useFrame(() => {
    //console.log(scroll);
    //tl.current.seek(scroll.offset * tl.current.duration());
    ref.current.position.y = scroll.scroll.current * (h / 2 - h);
  });

  // useLayoutEffect(() => {
  //   tl.current = gsap.timeline();
  //   tl.current.to(ref.current.position, {
  //     duration: 1,
  //     y: h / 2 - h
  //   });
  // }, []);

  return (
    <scene ref={ref}>
      <mesh>
        <planeGeometry args={[100, 100]} />
        <meshBasicMaterial color="grey" />
      </mesh>
    </scene>
  );
}

export default GlassScene;