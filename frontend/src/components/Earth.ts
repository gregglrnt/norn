import * as THREE from 'three'
const textureImg = require("../textures/earth.jpg") 


export default class Earth extends THREE.Mesh {

    public constructor(r : number = 3) {
        super();
        const texture = new THREE.TextureLoader().load(textureImg);
        const radius = r;
        const sphere = new THREE.SphereGeometry(radius, 30, 30)
        const material = new THREE.MeshLambertMaterial({
            map: texture, 
            emissive: new THREE.Color(0x1788EB), 
            emissiveIntensity: 0.1
        })
        return new THREE.Mesh(sphere, material);
    }

}

