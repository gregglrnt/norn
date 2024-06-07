import {
	AxesHelper,
	Color,
	DirectionalLight,
	Group,
	IcosahedronGeometry,
	Mesh,
	MeshBasicMaterial,
	MeshPhongMaterial,
	MeshStandardMaterial,
	PerspectiveCamera,
	Scene,
	SphereGeometry,
	Texture,
	TextureLoader,
	Vector2,
	WebGLRenderer
} from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import type { Fact } from '@/types/fact'
import { Clouds, Earth, PLANET_RADIUS, PinSphere, Sun } from './planets'
import { currentEvent } from '@/stores/events'
import { EffectComposer, RenderPass, UnrealBloomPass } from 'three/examples/jsm/Addons.js'
import sunMap from "./assets/sun.jpg"
const scene = new Scene()

let renderer: WebGLRenderer
let controls: OrbitControls
let camera: PerspectiveCamera

// let bloomComposer: EffectComposer;

const light = new DirectionalLight(0xfff2cc, 1)
const group = new Group()

let pinSphere: Mesh

export const renderUniverse = (canvas: HTMLCanvasElement) => {
	const fov = 60;
	const aspect = window.innerWidth / window.innerHeight;
	const near = 0.1;
	const far = 1000;
	// camera = new PerspectiveCamera(fov, aspect, near, far);
	camera = new PerspectiveCamera(60, aspect)
	camera.position.z = 8;
	camera.position.x = 0;
	scene.add(camera);

	controls = new OrbitControls(camera, canvas)

	//default renderer
	renderer = new WebGLRenderer({
		canvas: canvas,
		antialias: true,
	});
	// renderer.autoClear = false;
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
	// bloomPass.threshold = 0;
	// bloomPass.strength = 2; //intensity of glow
	// bloomPass.radius = 0;
	const bloomComposer = new EffectComposer(renderer);
	bloomComposer.setSize(window.innerWidth, window.innerHeight);
	bloomComposer.renderToScreen = true;
	bloomComposer.addPass(renderScene);
	bloomComposer.addPass(bloomPass);


	//sun object
	const geometry = new IcosahedronGeometry(100, 15);
	const material = new MeshPhongMaterial({ map: new TextureLoader().load(sunMap), emissiveIntensity: 10, emissive: "#ffd91c" });
	const sun = new Mesh(geometry, material);
	sun.name = "sun"
	const [earth] = new Earth().get()
	const [clouds] = new Clouds().get()
	sun.layers.set(1);
	group.add(sun, earth, clouds)
	sun.position.set(40, 20, -2000);
	sun.onBeforeRender = (() => {sun.userData.visible = true})

	// const [earth] = new Earth().get();
	scene.add(group);
	scene.add(new AxesHelper(100))
	const animate = () => {
		requestAnimationFrame(animate);
		earth.rotation.y += 0.001
		clouds.rotation.y += 0.005
		sun.userData.visible = false
		camera.layers.set(1);
		bloomComposer.render();
		controls.update()
		if(sun.userData.visible) {console.log("sun visible!")} else {console.log("sun not visible!")}
	}
	animate();
	console.log("rendered");
}

export const destroyUniverse = () => {
	scene.remove(...scene.children)
}

export const resizeCanvas = () => {
	const dom = renderer.domElement
	const width = dom.clientWidth
	const height = dom.clientHeight

	if (dom.width !== width || dom.height !== height) {
		renderer.setSize(width, height, false)
		// bloomComposer.setSize(width, height)
		renderer.setPixelRatio(window.devicePixelRatio)
		camera.aspect = width / height
		camera.updateProjectionMatrix()
		renderer.render(scene, camera);
	}

	if (width < 350) {
		camera.position.setZ(10)
	} else { camera.position.setZ(100) }
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

	return [x, y, z]
}

type Pin = Mesh<SphereGeometry, MeshBasicMaterial>;

const createOrReturnPin = (event: Fact): Pin => {
	const existingPin = pinSphere.getObjectByName(`pin_event_${event.id}`)
	if (existingPin) return existingPin as Pin;
	const pin: Pin = new Mesh(
		new SphereGeometry(0.5, 10, 10),
		new MeshBasicMaterial({ color: "#D84797" }) //TODO: immplement coloration
	)
	pin.geometry.computeBoundingSphere();
	// pin.material.color = "red";
	pin.name = `pin_event_${event.id}`
	const [x, y, z] = getCoordinatesFromLatLon(event.coordinates[0], event.coordinates[1])
	pin.position.set(x, y, z)
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
	const dist = camera.position.length()
	camera.position.copy(focusedObject.position).normalize().multiplyScalar(dist)
	currentEvent.set(eventId);
}

