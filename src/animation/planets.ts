import {
	IcosahedronGeometry,
	Mesh,
	MeshBasicMaterial,
	MeshPhongMaterial,
	SphereGeometry,
	TextureLoader,
	type MeshBasicMaterialParameters,
} from 'three'
import earthImg from './assets/earth.jpg'
import nightEarthImg from './assets/black_earth.jpg'
import cloudImg from './assets/clouds.png'

export const PLANET_RADIUS = 10

abstract class Planet extends Mesh {
	public constructor(
		name: string,
		radius: number,
		speed: number,
		texturePath?: string,
		transparent?: boolean,
		opacity: number = 1
	) {
		const sphere = new SphereGeometry(radius, 30, 30)
		const props: MeshBasicMaterialParameters = { transparent: transparent || false }
		if (texturePath) {
			props.map = new TextureLoader().load(texturePath);
			props.opacity = opacity;
		}
		const material = new MeshBasicMaterial({ ...props })
		super(sphere, material);
		this.name = name;
		this.layers.set(1)
		this.userData.animate = () => {
			this.rotation.y += speed;
		}
	}
}

export class Earth extends Planet {
	public constructor(mode: "dark" | "light") {
		let img;
		if (mode === "light") {
			img = earthImg;
		} else {
			img = nightEarthImg;
		}
		super('earth', PLANET_RADIUS, 0, img)
	}
}

export class Clouds extends Planet {
	public constructor() {
		super('clouds', PLANET_RADIUS + 0.5, 0.001, cloudImg, true, 0.5);
	}
}

export class PinSphere extends Planet {
	public constructor() {
		super('pins', PLANET_RADIUS + 0.01, 0, undefined, true)
	}
}

export class Sun extends Mesh {
	public constructor() {
		const geometry = new IcosahedronGeometry(100, 15);
		const material = new MeshPhongMaterial({ color: "white", emissiveIntensity: 10, emissive: "#ffd91c" });
		super(geometry, material);
		this.name = "sun"
		this.position.set(0, 0, -2000);

		this.layers.set(1);
		this.onBeforeRender = (() => { this.userData.visible = true })
	}
}