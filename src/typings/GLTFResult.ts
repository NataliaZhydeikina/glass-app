import { Mesh, MeshStandardMaterial } from "three";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";

export type GLTFResult = GLTF & {
  nodes: {
    rabbit1: Mesh
  },
  materials: {
    "": MeshStandardMaterial
  }
}