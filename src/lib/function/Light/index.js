import * as THREE from "three";

export function SetupLight() {
  const color = "#ffffff"; // 광원의 색상
  const intensity = 2; // 광원의 세기
  const light = new THREE.DirectionalLight(color, intensity); // light 객체 생성
  light.position.set(0, 2, 4); // 광원의 위치
  return light;
}
