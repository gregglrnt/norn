import {
	Color,
	DirectionalLight,
	Group,
	Mesh,
	MeshBasicMaterial,
	PerspectiveCamera,
	Scene,
	SphereGeometry,
	WebGLRenderer
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import type { Chronicle } from '../../types/chronicle';
import { Clouds, Earth, PinSphere } from './planets';
const scene = new Scene();

let world: WebGLRenderer;
let controls: OrbitControls;
let camera: PerspectiveCamera;

const light = new DirectionalLight(0xfff2cc, 1);
const group = new Group();

const animateFunctions: Function[] = [];

let pinSphere: Mesh;

export const createUniverse = () => {
	world = new WebGLRenderer({ alpha: true });
	const size = window.innerWidth / 2 / window.innerHeight;
	camera = new PerspectiveCamera(40, size);
	controls = new OrbitControls(camera, world.domElement);
	controls.enableZoom = false;
	camera.position.z = 100;
	camera.position.y = 2;
	camera.aspect = window.innerWidth / window.innerHeight;
	light.position.copy(camera.position);
	const [earth, animateEarth] = Earth();
	const [clouds, animateClouds] = Clouds();
	const [pins, pinsAnimation] = PinSphere();
	animateFunctions.push(animateEarth, animateClouds, pinsAnimation);
	group.add(earth, clouds, pins);
	// pinSphere = pins;
	// group.add(earth, clouds, pins);
	// animateFunctions.push(earthAnimation, cloudAnimation, pinsAnimation);
	scene.add(group);
	return world;
};

export const destroyUniverse = () => {
	scene.remove(...scene.children);
};

const resizeCanvas = () => {
	const dom = world.domElement;
	const width = dom.clientWidth;
	const height = dom.clientHeight;

	if (dom.width !== width || dom.height !== height) {
		world.setSize(width, height, false);
		camera.aspect = width / height;
		camera.updateProjectionMatrix();
	}
};

export const animate = () => {
	world.render(scene, camera);
	controls.update();
	resizeCanvas();
	for (let animation of animateFunctions) {
		animation();
	}
	requestAnimationFrame(animate);
};

export const getCoordinatesFromLatLon = (lat: number, lon: number) => {
	const radius = 3;
	var latRad = lat * (Math.PI / 180);
	var lonRad = -lon * (Math.PI / 180);

	let x = radius * Math.cos(latRad) * Math.cos(lonRad);
	let y = radius * Math.sin(latRad);
	let z = radius * Math.cos(latRad) * Math.sin(lonRad);

	return [x, y, z];
};

export const addEvents = async (events: Chronicle[]) => {
	if (!pinSphere) return;
	const pins = [];
	for (let event of events) {
		const pin = new Mesh(
			new SphereGeometry(0.1, 2, 2),
			new MeshBasicMaterial({ color: new Color() })
		);
		pin.name = `pin_${event.id}`;
		const [x, y, z] = getCoordinatesFromLatLon(event.coordinates[0], event.coordinates[1]);
		pin.position.set(x, y, z);
		pins.push(pin);
	}
	pinSphere.add(...pins);
	console.log('pins have been added', scene.children);
	return pins;
};
