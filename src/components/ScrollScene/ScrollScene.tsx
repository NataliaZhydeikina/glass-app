import { RefObject, useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useScroll, ScrollControlsState, useKeyboardControls } from "@react-three/drei";
import { MathUtils, Scene } from "three";
import Controls from "../../utils/controls";

type Scroll = ScrollControlsState & {
  scroll: {
    current: number,
    offset: number
  }
}
type Props = {
  children: JSX.Element,
};

function ScrollScene({ children }: Props) {
  const scroll = useScroll() as Scroll;
  const { height: h } = useThree((state) => state.viewport)
  const ref = useRef<Scene>();
  const [sub, get] = useKeyboardControls<Controls>()

  useEffect(() => {
    scroll.scroll.current = 0.5;
  });

  useFrame((state, delta) => {
    if (!ref.current) return;
    let { up, down } = get();
    if (up) {
      let y = (scroll.scroll.current - 0.01) * h;
      scroll.el.scrollTo(0, y);

    }
    if (down) {
      let y = (scroll.scroll.current + 0.01) * h;
      scroll.el.scrollTo(0, y);

    }
    let x = ref.current.position.y;
    let y = scroll.scroll.current * (-h + 400) + (h / 2) - 200;
    ref.current.position.y = MathUtils.damp(x, y, 8, delta);
  });

  return (
    <scene ref={ref as RefObject<Scene>}>
      {children}
    </scene>
  );
}

export default ScrollScene;