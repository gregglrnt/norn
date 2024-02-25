import {
	AxesHelper,
	Color,
	DirectionalLight,
	Group,
	Mesh,
	MeshBasicMaterial,
	Object3D,
	PerspectiveCamera,
	Scene,
	SphereGeometry,
	Vector2,
	WebGLRenderer
} from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import type { Fact } from '@/types/fact'
import { Clouds, Earth, PLANET_RADIUS, PinSphere } from './planets'
const scene = new Scene()

let world: WebGLRenderer
let controls: OrbitControls
let camera: PerspectiveCamera

const pointer = new Vector2()

const light = new DirectionalLight(0xfff2cc, 1)
const group = new Group()

const animateFunctions: (() => void)[] = []

let pinSphere: Mesh

export const renderUniverse = () => {
	world = new WebGLRenderer({ alpha: true })
	const size = window.innerWidth / 2 / window.innerHeight
	camera = new PerspectiveCamera(60, size)
	controls = new OrbitControls(camera, world.domElement)
	controls.enableZoom = false
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
	const axesHelper = new AxesHelper(100)
	scene.add(axesHelper)
	return world
}

export const destroyUniverse = () => {
	scene.remove(...scene.children)
}

const resizeCanvas = () => {
	const dom = world.domElement
	const width = dom.clientWidth
	const height = dom.clientHeight

	if (dom.width !== width || dom.height !== height) {
		world.setSize(width, height, false)
		camera.aspect = width / height
		camera.updateProjectionMatrix()
	}
}

export const animate = () => {
	world.render(scene, camera)
	controls.update()
	resizeCanvas()
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

const createOrReturnPin = (event: Fact) : Object3D => {
	const existingPin = pinSphere.getObjectByName(`pin_event_${event.id}`)
	if(existingPin) return existingPin;
		const pin = new Mesh(
			new SphereGeometry(0.5, 10, 10),
			new MeshBasicMaterial({ color: new Color("#D84797") }) //TODO: immplement coloration
		)
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
	const focusedObject = pinSphere.getObjectByName(`pin_event_${eventId}`)
	if (!focusedObject) return false
	console.log("focus on", focusedObject, camera.position)
	//camera.position.copy(new Vector3(focusedObject.position.x, focusedObject.position.y, camera.position.z))
}

export const pointerListener = (event : PointerEvent) => {
	pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
}
