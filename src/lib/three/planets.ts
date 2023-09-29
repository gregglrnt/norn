import { Mesh, MeshBasicMaterial, SphereGeometry, TextureLoader } from 'three'
import earthImg from './assets/earth.jpg'
import cloudImg from './assets/clouds.png'

const radius = 30

function Planet(
	name: string,
	radius: number,
	speed: number,
	texturePath?: string,
	transparent?: boolean
): [Mesh, () => void] {
	const sphere = new SphereGeometry(radius, 30, 30)
	const props: any = { transparent: transparent || false }
	if (texturePath) {
		props.map = new TextureLoader().load(texturePath)
	}
	const material = new MeshBasicMaterial({ ...props })
	const mesh = new Mesh(sphere, material)
	mesh.name = name
	const animate = () => {
		mesh.rotation.y += speed
	}
	return [mesh, animate]
}

export const Earth = () => Planet('earth', radius, 0.001, earthImg)

export const Clouds = () => Planet('clouds', radius + 0.5, 0.005, cloudImg, true)

export const PinSphere = () => Planet('pins', radius, 0.001, undefined, true)
