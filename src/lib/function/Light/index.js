import * as THREE from "three";

export function SetupLight() {
  const light1Color = 0xb1e1ff; // light blue
  const light1GroundColor = 0xb97a20; // brownish orange
  const intensity = 1;
  const light1 = new THREE.HemisphereLight(light1Color, light1GroundColor, intensity);

  const light2Color = 0xffffff;
  const light2 = new THREE.DirectionalLight(light2Color, intensity);
  light2.position.set(5, 10, 2);

  const light = {
    light1: light1,
    light2: light2
  }
  
  return light;
}
