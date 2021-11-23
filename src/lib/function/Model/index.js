import * as THREE from "three";

export function SetupModel() {
  const solarSystem = new THREE.Object3D();
  const sunGeometry = new THREE.SphereGeometry(1, 12, 12);
  const sunMaterial = new THREE.MeshPhongMaterial({
    color: 0xffff80,
    emissive: 0xffff00,
    fletShading: true,
  });
  const sun = new THREE.Mesh(sunGeometry, sunMaterial);
  sun.scale.set(3, 3, 3);
  solarSystem.add(sun);

  const earthOrbit = new THREE.Object3D();
  earthOrbit.position.x = 10;
  solarSystem.add(earthOrbit);

  const earthGeometry = new THREE.SphereGeometry(0.5, 12, 12);
  const earthMaterial = new THREE.MeshPhongMaterial({
    color: 0x005fff,
    emissive: 0x005fff,
    fletShading: true,
  });
  const earth = new THREE.Mesh(earthGeometry, earthMaterial);
  earth.scale.set(3, 3, 3);
  earthOrbit.add(earth);

  const moonOrbit = new THREE.Object3D();
  moonOrbit.position.x = 2.5;
  earthOrbit.add(moonOrbit);

  const moonGeometry = new THREE.SphereGeometry(0.2, 12, 12);
  const moonMaterial = new THREE.MeshPhongMaterial({
    color: 0x888888,
    emissive: 0x222222,
    flatShading: true,
  });
  const moon = new THREE.Mesh(moonGeometry, moonMaterial);
  moon.scale.set(3.3, 3.3, 3.3);
  moonOrbit.add(moon);

  const model = {
    solarSystem: solarSystem,
    earthOrbit: earthOrbit,
  }

  return model;
}
