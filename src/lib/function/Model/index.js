import * as THREE from "three";

export function SetupModel() {
  const geometry = new THREE.BoxGeometry(1, 1, 1); // 각각 가로,세로,깊이의 인자 값을 받아 정육면체 geometry 객체 생성
  const material = new THREE.MeshPhongMaterial({ color: 0xed7aaa }); // 분홍색 계열의 재질을 사용하기 위해 material 객체 생성

  const cube = new THREE.Mesh(geometry, material); // geometry 객체와 material 객체를 통해서 mesh를 생성하고 mesh는 cube라는 이름으로 정의

  return cube;
}
