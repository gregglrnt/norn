import {
	Mesh,
	MeshBasicMaterial,
	SphereGeometry,
	TextureLoader,
	type MeshBasicMaterialParameters
} from 'three'
import earthImg from './assets/earth.jpg'
import cloudImg from './assets/clouds.png'

export const PLANET_RADIUS = 30

abstract class Planet {
	private mesh: Mesh
	private animate: () => void

	public constructor(
		name: string,
		radius: number,
		speed: number,
		texturePath?: string,
		transparent?: boolean
	) {
		const sphere = new SphereGeometry(radius, 30, 30)
		const props: MeshBasicMaterialParameters = { transparent: transparent || false }
		if (texturePath) {
			props.map = new TextureLoader().load(texturePath)
		}
		const material = new MeshBasicMaterial({ ...props })
		this.mesh = new Mesh(sphere, material)
		this.mesh.name = name
		this.animate = () => {
			this.mesh.rotation.y += speed
		}
	}

	public get(): [Mesh, () => void] {
		return [this.mesh, this.animate]
	}
}

export class Earth extends Planet {
	public constructor() {
		super('earth', PLANET_RADIUS, 0.001, earthImg)
	}
}

export class Clouds extends Planet {
	public constructor() {
		super('clouds', PLANET_RADIUS + 0.5, 0.005, cloudImg, true)
	}
}

export class PinSphere extends Planet {
	public constructor() {
		super('pins', PLANET_RADIUS + 0.1, 0.001, undefined, true)
	}
}
