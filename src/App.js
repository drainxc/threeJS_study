/* eslint-disable no-useless-constructor */
import React from "react";
import * as THREE from "three";
import { SetupCamera } from "./lib/function/Camera";
import { SetupLight } from "./lib/function/Light";
import { SetupModel } from "./lib/function/Model";

class Viewer extends React.Component {
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
    this.scene = scene;

    const camera = SetupCamera(this.element);
    this.camera = camera;

    const light = SetupLight();
    this.light = light;

    const model = SetupModel();
    this.model = model;

    this.scene.add(light);
    this.scene.add(model);

    this.animate();
  }

  animate = (time) => {
    this.renderer.render(this.scene, this.camera);
    this.update(time);
    requestAnimationFrame(this.animate);
  };

  update(time) {
    time *= 0.001;
    this.model.rotation.x = time;
    this.model.rotation.y = time;
  }

  render() {
    return (
      <div
        ref={(el) => (this.element = el)}
        style={{ width: "100%", height: "100%" }}
      ></div>
    );
  }
}

export default Viewer;
