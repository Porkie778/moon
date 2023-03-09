import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
const scene = new THREE.Scene();
// Image Imports
// import moonTextureMap from './public/moon.png';
// import moonNormalMap from './public/NormalMap.png';
import moonTextureMap from './moon.png';
import moonNormalMap from './NormalMap.png';
import worldTexture from './stars.jpg';

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
	antialias: true,
});
// Set up the geometry, mapping, and lighting for the central object (moon)
const geometry = new THREE.SphereGeometry(10);
const moonTexture = new THREE.TextureLoader().load(moonTextureMap);
const moonMap = new THREE.TextureLoader().load(moonNormalMap);
const material = new THREE.MeshStandardMaterial({ map: moonTexture, normalMap: moonMap });
const moon = new THREE.Mesh(geometry, material);

const hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.1);
hemiLight.color.setHSL(0.6, 1, 0.6);
hemiLight.groundColor.setHSL(0.095, 1, 0.75);
hemiLight.position.set(0, 0, 0);

const pointLight = new THREE.PointLight(0xffffff, 0.2);
pointLight.position.set(-100, 10, 50);

const directLight = new THREE.DirectionalLight(0xffffff, 0.5);
directLight.position.set(-100, 10, 50);
scene.add(directLight, hemiLight, pointLight);
scene.add(moon);

const worldStars = new THREE.TextureLoader().load(worldTexture);
const worldGeometry = new THREE.SphereGeometry(1000, 60, 60);
const worldMaterial = new THREE.MeshBasicMaterial({
	color: 0x474747,
	map: worldStars,
	side: THREE.BackSide,
});
const world = new THREE.Mesh(worldGeometry, worldMaterial);
scene.add(world);
renderer.setSize(s.width, s.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.render(scene, camera);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableZoom = false;
controls.enablePan = false;
function addStar() {
	const geometry = new THREE.SphereGeometry(0.1);
	const material = new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: true, emissiveIntensity: 0.7 });
	const star = new THREE.Mesh(geometry, material);

	let [x, y, z] = Array(3)
		.fill()
		.map(() => THREE.MathUtils.randFloatSpread(200));
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
