import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export function GlftLoader(scene) {
  const gltfLoader = new GLTFLoader();
  const url = "scene.gltf";
  gltfLoader.load(url, (gltf) => {
    const root = gltf.scene;
    console.log(gltf);
    scene.add(root);
  });
}
