import './style.css';
import * as THREE from 'three';
const scene = new THREE.Scene();
import moonTextureMap from './public/moon.png';
import moonNormalMap from './public/NormalMap.png';

var s = {
	width: window.innerWidth,
	height: window.innerHeight,
};

const camera = new THREE.PerspectiveCamera(75, s.width / s.height, 0.1, 1000);
camera.position.setZ(30);
scene.add(camera);

const renderer = new THREE.WebGL1Renderer({
	canvas: document.querySelector('#app'),
});

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

function animate() {
	requestAnimationFrame(animate);
	renderer.render(scene, camera);
	moon.rotation.y -= 0.001;
}
animate();

window.addEventListener('resize', onWindowResize, false);

function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize(window.innerWidth, window.innerHeight);
}
