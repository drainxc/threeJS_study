import * as THREE from "three";

export function SetupCamera(element) {
  const width = element.clientWidth;
  const height = element.clientHeight;
  const camera = new THREE.PerspectiveCamera(75, width / height, 1, 4000); // camera 객체 생성
  camera.position.set(100, 100, 500) 
  return camera;
}
