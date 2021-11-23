/* eslint-disable no-useless-constructor */
import React from "react";
import { SetupCamera } from "./lib/function/Camera";
import { SetupLight } from "./lib/function/Light";
import { SetupModel } from "./lib/function/Model";

const THREE = require("three");

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
    this.scene = scene;

    const camera = SetupCamera(this.element);
    this.camera = camera;

    const light = SetupLight();
    this.light = light;

    const model = SetupModel();
    this.model = model;

    this.scene.add(light);
    this.scene.add(model.solarSystem);

    this.animate();
  }

  animate = (time) => {
    this.renderer.render(this.scene, this.camera);
    this.update(time);
    requestAnimationFrame(this.animate);
  };

  update(time) {
    time *= 0.001;
    this.model.solarSystem.rotation.y = (time / 5) * 1.3;
    this.model.earthOrbit.rotation.y = time * 2.6;
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

export default App;
