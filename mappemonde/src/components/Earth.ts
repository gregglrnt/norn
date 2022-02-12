import * as THREE from 'three'
const bumpImg = require('../textures/bumpearth.jpg')
const textureImg = require("../textures/earth3.jpg") // remplacer par une nouvelle carte de la Terre, faite main


export default class Earth extends THREE.Mesh {

    public constructor(r : number = 3) {
        super();
        const texture = new THREE.TextureLoader().load(textureImg);
        const radius = r;
        const sphere = new THREE.SphereGeometry(radius, 30, 30)
        const material = new THREE.MeshPhongMaterial({
            map: texture,
            bumpMap: new THREE.TextureLoader().load(bumpImg),
            bumpScale: 0.05,
        })
        return new THREE.Mesh(sphere, material);
    }

}

