import { Text } from "@react-three/drei";
import fontUrl from "../../assets/fantasquesansmono-bold.otf";
import fontRegularUrl from "../../assets/fantasquesansmono-regular.otf";

const Data = () => {

  return <group>
    <Text
      fontSize={40}
      font={fontUrl}
      color="#fff"
      position={[180, 140, 0]}
      outlineOffsetX={'5%'}
      outlineOffsetY={'5%'}
      outlineBlur={'5%'}
      outlineOpacity={0.3}
      outlineColor="#000000">
      Кролик
    </Text>
    <Text position={[180, -20, 0]}
      fontSize={20}
      font={fontRegularUrl}
      color="#fff"
      maxWidth={200}
      outlineOffsetX={'5%'}
      outlineOffsetY={'5%'}
      outlineBlur={'5%'}
      outlineOpacity={0.3}
      outlineColor="#000000"
      textAlign="center">
      Кролик – невеликий пухнастий звірок роду ссавців сімейства Зайцевих. Цих тваринок не тільки розводять заради м’яса та хутра, а й тримають у домашніх умовах в якості домашніх улюбленців.
    </Text>
  </group >
}

export default Data;