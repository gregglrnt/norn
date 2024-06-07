import {
	Color,
	Mesh,
	MeshBasicMaterial,
	MeshLambertMaterial,
	MeshPhongMaterial,
	MeshStandardMaterial,
	SphereGeometry,
	TextureLoader,
	type MeshBasicMaterialParameters,
	type MeshLambertMaterialParameters,
	type MeshPhongMaterialParameters
} from 'three'
import earthImg from './assets/black_earth.jpg'
import cloudImg from './assets/clouds.png'
import specularPath from "./assets/specular.jpg"

export const PLANET_RADIUS = 20

abstract class Planet {
	protected mesh: Mesh
	private animate: () => void

	public constructor(
		name: string,
		radius: number,
		speed: number,
		texturePath?: string,
		transparent?: boolean
	) {
		const sphere = new SphereGeometry(radius, 30, 30)
		const props : MeshBasicMaterialParameters = { transparent: transparent || false }
		if (texturePath) {
			props.map = new TextureLoader().load(texturePath);
			if(name === "clouds") {
				props.opacity = 0.1
				// props.color = new Color("0")
			}
			// props.specular = new Color("black");
			// props.shininess = 100
		}
		const material = new MeshBasicMaterial({ ...props })
		this.mesh = new Mesh(sphere, material)
		this.mesh.name = name
		this.animate = () => {
			this.mesh.rotation.y += speed
		}
		this.mesh.layers.set(1)
	}

	public get(): [Mesh, () => void] {
		return [this.mesh, this.animate]
	}
}

export class Earth extends Planet {
	public constructor() {
		super('earth', PLANET_RADIUS, 0, earthImg)
	}
}

export class Clouds extends Planet {
	public constructor() {
		super('clouds', PLANET_RADIUS + 0.5, 0.005, cloudImg, true);
	}
}

export class PinSphere extends Planet {
	public constructor() {
		super('pins', PLANET_RADIUS + 0.1, 0, undefined, true)
	}
}

export class Sun extends Planet {
	public constructor() {
		super('sun', PLANET_RADIUS, 0)
		this.mesh.position.set(100, 10, -500)
		const material = new MeshStandardMaterial();
		material.emissive = new Color("yellow");
		this.mesh.material = material; 
	}
}