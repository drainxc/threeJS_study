/* eslint-disable no-useless-constructor */
import React from "react";
import { SetupCamera } from "./lib/function/Camera";
import { SetupLight } from "./lib/function/Light";
import GlovalStyle from "./styles/styles";
import * as THREE from "three";
import { SetupControls } from "./lib/function/Controls";

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const width = window.innerWidth - 1;
    const height = window.innerHeight - 1; // 창크기

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    this.element.appendChild(renderer.domElement);
    this.renderer = renderer; // 렌더링

    const scene = new THREE.Scene(); // Scene
    scene.background = new THREE.Color("black"); // Scene 색상
    this.scene = scene; // field로 정의

    const camera = SetupCamera(this.element); // 카메라 추가
    this.camera = camera;

    const light = SetupLight(); // 광원 추가
    this.light = light;

    SetupControls(this.camera, this.element); // 카메라 이동

    this.scene.add(light);

    this.setupModel();

    window.onresize = this.resize.bind(this); // bind인 이유는 이벤트 객체가 아닌 App클래스의 객체가 되기 위해서
    this.resize();

    this.animate(); // 애니메이션
  }

  setupModel() {
    const geometry = new THREE.BoxGeometry(1, 1, 1);

    const material = new THREE.MeshPhongMaterial({ color: 0x44a88 });

    const cube = new THREE.Mesh(geometry, material);
    this.scene.add(cube);
  }

  resize() {
    const width = this.element.clientWidth;
    const height = this.element.clientHeight; // this._divContainer의 가로 세로 길이 구하기

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix(); // camera 속성 값 설정

    this.renderer.setSize(width, height); // renderer의 크기 설정
  }

  animate = (time) => {
    this.renderer.render(this.scene, this.camera);
    this.update(time);
    requestAnimationFrame(this.animate);
  };

  update(time) {
    time *= 0.001;
  }

  render() {
    return (
      <>
        <GlovalStyle />
        <div
          ref={(el) => (this.element = el)}
          style={{
            position: "absolute",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
          }}
        ></div>
      </>
    );
  }
}

export default App;
