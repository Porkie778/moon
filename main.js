import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
const scene = new THREE.Scene();
// Image Imports
// import moonTextureMap from './public/moon.png';
// import moonNormalMap from './public/NormalMap.png';
import moonTextureMap from './moon.png';
import moonNormalMap from './NormalMap.png';

// Set up variables for canvas size
var s = {
	width: window.innerWidth,
	height: window.innerHeight,
};
// New perspective camera
const camera = new THREE.PerspectiveCamera(75, s.width / s.height, 0.1, 1000);
camera.position.setZ(30);
scene.add(camera);

// assign a WebGl renderer to the canvas
const renderer = new THREE.WebGL1Renderer({
	canvas: document.querySelector('#app'),
});
// Set up the geometry, mapping, and lighting for the central object (moon)
const geometry = new THREE.SphereGeometry(10, 64, 32);
const moonTexture = new THREE.TextureLoader().load(moonTextureMap);
const moonMap = new THREE.TextureLoader().load(moonNormalMap);
const material = new THREE.MeshStandardMaterial({ map: moonTexture, normalMap: moonMap });
const moon = new THREE.Mesh(geometry, material);
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(20, 10, 15);
scene.add(pointLight);
scene.add(moon);

renderer.setSize(s.width, s.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.render(scene, camera);

const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
	const geometry = new THREE.SphereGeometry(0.1);
	const material = new THREE.MeshStandardMaterial({ color: 0xffffff,emissive:0xffffff });
	const star = new THREE.Mesh(geometry, material);

	const [x, y, z] = Array(3)
		.fill()
		.map(() => THREE.MathUtils.randFloatSpread(200)+100);
	star.position.set(x, y, z);
	scene.add(star);
}
Array(200).fill().forEach(addStar);

function animate() {
	requestAnimationFrame(animate);
	renderer.render(scene, camera);
	moon.rotation.y -= 0.001;
	controls.update();
}
animate();

window.addEventListener('resize', onWindowResize, false);

function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize(window.innerWidth, window.innerHeight);
}
