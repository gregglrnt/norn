import {
	Color,
	Fog,
	FogExp2,
	Group,
	Mesh,
	MeshBasicMaterial,
	MeshPhongMaterial,
	Object3D,
	PerspectiveCamera,
	Scene,
	SphereGeometry,
	Vector2,
	Vector3,
	WebGLRenderer
} from 'three'
import type { Fact } from '@/types/fact'
import { Clouds, Earth, PinSphere, PLANET_RADIUS, Sun } from './planets'
import { currentEvent } from '@/stores/events'
import { EffectComposer, OrbitControls, RenderPass, UnrealBloomPass } from 'three/examples/jsm/Addons.js'
const scene = new Scene()

let renderer: WebGLRenderer
let camera: PerspectiveCamera
let bloomComposer: EffectComposer
let pinSphere: Mesh
let controls: OrbitControls;

export const renderUniverse = () => {
	const aspect = window.innerWidth / window.innerHeight;
	camera = new PerspectiveCamera(60, aspect)
	camera.position.z = 8;
	camera.position.x = 0;
	scene.add(camera);

	renderer = new WebGLRenderer({
		antialias: true,
	});


	controls = new OrbitControls(camera, renderer.domElement)
	controls.addEventListener('end', () => console.log('change', camera.position)) //TODO: do something
	controls.enableZoom = true

	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.setPixelRatio(window.devicePixelRatio ? window.devicePixelRatio : 1);
	renderer.setClearColor(0x000);

	//bloom renderer
	const renderScene = new RenderPass(scene, camera);
	const bloomPass = new UnrealBloomPass(
		new Vector2(window.innerWidth, window.innerHeight),
		0.5, //strength (glow)
		0.4, //radius
		1 //threshold
	);
	bloomComposer = new EffectComposer(renderer);
	bloomComposer.setSize(window.innerWidth, window.innerHeight);
	bloomComposer.renderToScreen = true;
	bloomComposer.addPass(renderScene);
	bloomComposer.addPass(bloomPass);

	const center = new Object3D();
	const group = new Group()
	const clouds = new Clouds()
	const sun = new Sun()
	const earth = new Group();
	const day = new Earth("light")
	const night = new Earth("dark")
	pinSphere = new PinSphere();
	center.add(sun);
	earth.add(day, night, pinSphere, clouds);
	group.position.set(40, 0, 0)
	group.add(center, earth)
	scene.add(group);
	controls.enableZoom = false;
	controls.target = center.position;
	controls.enableDamping = true;
	controls.dampingFactor = 0.1;
	controls.update()

	const animate = () => {
		requestAnimationFrame(animate);
		earth.rotation.y += 0.001
		clouds.rotation.y += 0.001
		center.rotation.y += 0.0005
		sun.userData.visible = false
		camera.layers.set(1);
		bloomComposer.render();
		controls.target = group.position;
		controls.update()
		if (sun.userData.visible) {
			day.visible = false
			night.visible = true
		} else {
			day.visible = true
			night.visible = false
		}
	}
	animate();
	return renderer.domElement;
}

export const destroyUniverse = () => {
	scene.remove(...scene.children)
}

export const resize = () => {
	const canvas = renderer.domElement;
	const width = window.innerWidth
	const height = window.innerHeight


	if (canvas.width !== width || canvas.height !== height) {
		renderer.setSize(width, height)
		bloomComposer.setSize(width, height)
		camera.aspect = width / height
		camera.updateProjectionMatrix()
		bloomComposer.render();
	}
}

// export const animate = () => {
// 	// requestAnimationFrame(animate)
// 	// camera.layers.set(1)
// 	// bloomComposer.render()
// 	// controls.update()
// 	// for (const animation of animateFunctions) {
// 	// 	animation()
// 	// }
// }

export const getCoordinatesFromLatLon = (lat: number, lon: number) => {
	const radius = PLANET_RADIUS + 1
	const latRad = lat * (Math.PI / 180)
	const lonRad = -lon * (Math.PI / 180)

	const x = radius * Math.cos(latRad) * Math.cos(lonRad)
	const y = radius * Math.sin(latRad)
	const z = radius * Math.cos(latRad) * Math.sin(lonRad)

	return {x: x, y: y, z: z};
}

type Pin = Mesh<SphereGeometry, MeshPhongMaterial>;

const createOrReturnPin = (event: Fact): Pin => {
	const existingPin = pinSphere.getObjectByName(`pin_event_${event.id}`)
	if (existingPin) return existingPin as Pin;
	const pin: Pin = new Mesh(
		new SphereGeometry(0.1, 10, 10),
		new MeshPhongMaterial({ color: "#D84797", emissive: "#D84797", emissiveIntensity: 11}) //TODO: immplement coloration
	)
	pin.layers.set(1)
	pin.geometry.computeBoundingSphere();
	// pin.material.color = "red";
	pin.name = `pin_event_${event.id}`
	const {x, y, z} = getCoordinatesFromLatLon(event.coordinates[0], event.coordinates[1])
	pin.position.set(x, y, z).normalize();
	pinSphere.add(pin);
	return pin;
}

export const addEventsToPinSphere = (events: Fact[]) => {
	if (!pinSphere) return
	pinSphere.children.forEach((p) => p.visible = false)
	for (const event of events) {
		const pin = createOrReturnPin(event)
		pin.visible = true
	}
}

export const focusOnPinSphere = (eventId: number) => {
	if (!pinSphere) return
	for (const p of pinSphere.children) (p as Pin).material.color = new Color("#D84797");
	const focusedObject = pinSphere.getObjectByName(`pin_event_${eventId}`) as Pin
	if (!focusedObject) return
	focusedObject.material.color = new Color("#53FCAB");
	camera.position.set(focusedObject.position.x, focusedObject.position.y, focusedObject.position.y);
	controls.update();
	currentEvent.set(eventId);
}

