/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-constructor */
import React from "react";
import { SetupCamera } from "./lib/function/Camera";
import { SetupLight } from "./lib/function/Light";
import { SetupModel } from "./lib/function/Model";
import GlovalStyle from "./styles/styles";
import * as THREE from "three";
import {
  Canvas,
  useLoader,
  useFrame,
  extend,
  useThree,
} from "react-three-fiber";
import { SetupControls } from "./lib/function/Controls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const width = window.innerWidth - 1;
    const height = window.innerHeight - 1;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    this.element.appendChild(renderer.domElement);
    this.renderer = renderer;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color("black");
    this.scene = scene;

    const camera = SetupCamera(this.element);
    this.camera = camera;

    const light = SetupLight();
    this.light = light;

    const model = SetupModel();
    this.model = model;

    SetupControls(this.camera, this.element);

    this.scene.add(light.light1);
    this.scene.add(light.light2);
    this.scene.add(light.light2.target);

    this.GlftLoader();

    window.onresize = this.resize.bind(this); // bind인 이유는 이벤트 객체가 아닌 App클래스의 객체가 되기 위해서
    this.resize();

    this.animate();
  }

  GlftLoader() {
    const gltfLoader = new GLTFLoader();
    const url = "scene.gltf";
    gltfLoader.load(url, (gltf) => {
      const root = gltf.scene;
      console.log(gltf);
      this.scene.add(root);
      console.log(this.dumpObject(root).join("\n"));
      const planet = root.getObjectByName("Sol1");
      this.planet = planet;
    });
  }

  dumpObject(obj, lines = [], isLast = true, prefix = "") {
    const localPrefix = isLast ? "└─" : "├─";
    lines.push(
      `${prefix}${prefix ? localPrefix : ""}${obj.name || "*no-name*"} [${
        obj.type
      }]`
    );
    const newPrefix = prefix + (isLast ? "  " : "│ ");
    const lastNdx = obj.children.length - 1;
    obj.children.forEach((child, ndx) => {
      const isLast = ndx === lastNdx;
      this.dumpObject(child, lines, isLast, newPrefix);
    });
    return lines;
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
    if (this.planet) {
      for (const model of this.planet.children) {
        model.rotation.x = time;
      }
    }
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
