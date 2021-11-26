import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export function GlftLoader(scene) {
  const gltfLoader = new GLTFLoader();
  const url = "scene.gltf";
  gltfLoader.load(url, (gltf) => {
    const root = gltf.scene;
    console.log(gltf);
    scene.add(root);
    console.log(dumpObject(root).join('\n'));
  });
}


function dumpObject(obj, lines = [], isLast = true, prefix = '') {
  const localPrefix = isLast ? '└─' : '├─';
  lines.push(`${prefix}${prefix ? localPrefix : ''}${obj.name || '*no-name*'} [${obj.type}]`);
  const newPrefix = prefix + (isLast ? '  ' : '│ ');
  const lastNdx = obj.children.length - 1;
  obj.children.forEach((child, ndx) => {
    const isLast = ndx === lastNdx;
    dumpObject(child, lines, isLast, newPrefix);
  });
  return lines;
}