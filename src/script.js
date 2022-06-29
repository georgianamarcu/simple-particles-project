import "./style.css";
import * as THREE from "three";
import * as dat from "lil-gui";

/**
 * Base
 */
// Debug
const gui = new dat.GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

//Camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 0, 2);
//Render
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//Texture loader

const loader = new THREE.TextureLoader();

/**
 * Objects
 */

//Geometry

const particleGeometry = new THREE.BufferGeometry();
const particles = 6000;

const positionArray = new Float32Array(particles * 3);

for (let i = 0; i < particles * 3; i++) {
  positionArray[i] = (Math.random() - 0.5) * 5;
}

particleGeometry.setAttribute(
  "position",
  new THREE.BufferAttribute(positionArray, 3)
);

// Materials

const particlesMaterial = new THREE.PointsMaterial({
  size: 0.003,
  transparent: true,
});

// Mesh

const particlesMesh = new THREE.Points(particleGeometry, particlesMaterial);
scene.add(particlesMesh);

// Lights

const pointLight = new THREE.PointLight(0xffffff, 0.1);
pointLight.position.x = 2;
pointLight.position.y = 3;
pointLight.position.z = 4;
scene.add(pointLight);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */

//Mouse

const animateParticles = (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
};

document.addEventListener("mousemove", animateParticles);
let mouseX = 0;
let mouseY = 0;

/**
 * Animate
 */

const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update objects

  particlesMesh.rotation.y = -0.1 * elapsedTime;
  if (mouseX > 0) {
    particlesMesh.rotation.x = mouseY * (elapsedTime * 0.0001);
  }
  // Update Orbital Controls
  // controls.update()

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
