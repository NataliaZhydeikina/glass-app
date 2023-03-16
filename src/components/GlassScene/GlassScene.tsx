import ScrollScene from "../ScrollScene/ScrollScene";

function GlassScene() {
  return (
    <ScrollScene>
      <mesh>
        <planeGeometry args={[100, 100]} />
        <meshBasicMaterial color="grey" />
      </mesh>
    </ScrollScene>
  );
}

export default GlassScene;