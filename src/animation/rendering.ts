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
} from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import type { Fact } from '@/types/fact'
import { Clouds, Earth, PLANET_RADIUS, PinSphere } from './planets'
import { currentEvent } from '@/stores/events'
const scene = new Scene()

let world: WebGLRenderer
let controls: OrbitControls
let camera: PerspectiveCamera

const light = new DirectionalLight(0xfff2cc, 1)
const group = new Group()

const animateFunctions: (() => void)[] = []

let pinSphere: Mesh

export const renderUniverse = () => {
	world = new WebGLRenderer({ alpha: true, antialias: true })
	const size = window.innerWidth / 2 / window.innerHeight
	camera = new PerspectiveCamera(60, size)
	controls = new OrbitControls(camera, world.domElement)
	controls.enableZoom = false
	controls.autoRotate = true
	controls.autoRotateSpeed = 0.2
	camera.position.z = 150
	camera.position.y = 2
	camera.aspect = window.innerWidth / window.innerHeight
	light.position.copy(camera.position)
	const [earth, animateEarth] = new Earth().get()
	const [clouds, animateClouds] = new Clouds().get()
	const [pins, pinsAnimation] = new PinSphere().get()
	animateFunctions.push(animateEarth, animateClouds, pinsAnimation)
	group.add(earth, clouds, pins)
	pinSphere = pins
	scene.add(group)
	return world
}

export const destroyUniverse = () => {
	scene.remove(...scene.children)
}

export const resizeCanvas = () => {
	const dom = world.domElement
	const width = dom.clientWidth
	const height = dom.clientHeight

	if (dom.width !== width || dom.height !== height) {
		world.setSize(width, height, false)
		world.setPixelRatio(window.devicePixelRatio)
		camera.aspect = width /  height
		camera.updateProjectionMatrix()
		world.render(scene, camera);
	}

	if(width < 350) {
		camera.position.setZ(10)
	} else { camera.position.setZ(100)}
}

export const animate = () => {
	world.render(scene, camera)
	controls.update()
	for (const animation of animateFunctions) {
		animation()
	}
	requestAnimationFrame(animate)
}

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

const createOrReturnPin = (event: Fact) : Pin => {
	const existingPin = pinSphere.getObjectByName(`pin_event_${event.id}`)
	if(existingPin) return existingPin as Pin;
		const pin : Pin = new Mesh(
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

export const focusOnPinSphere = (eventId : number) => {
	if(!pinSphere) return
	for(const p of pinSphere.children) (p as Pin).material.color = new Color("#D84797");
	const focusedObject = pinSphere.getObjectByName(`pin_event_${eventId}`) as Pin
	if (!focusedObject) return
	focusedObject.material.color = new Color("#53FCAB");
	const dist = camera.position.length()
	camera.position.copy(focusedObject.position).normalize().multiplyScalar(dist)
    currentEvent.set(eventId);
}

