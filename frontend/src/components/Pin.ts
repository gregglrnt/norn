import * as THREE from 'three'
import { convertToCoordinates } from '../lib/utils';
import { Country } from '../types/Country.type';
import { HistoricalEvent } from '../types/HistoricalEvent.type';
import {radius} from './Globe'

export default class Pin {
    public object = new THREE.Mesh();
    private color = new THREE.Color();

    public get() : THREE.Mesh {
        return this.object;
    }

    public constructor(event: HistoricalEvent) {
        this.setColor(event.country);
        const pin = new THREE.Mesh(
            new THREE.SphereGeometry(0.1, 20, 20),
            new THREE.MeshBasicMaterial({color : this.color}),
        )
        const coordinates = event.coordinates.split(",");
        let xyz = convertToCoordinates(parseInt(coordinates[0]), parseInt(coordinates[1]), radius);
        pin.position.set(xyz.x, xyz.y, xyz.z);
        pin.name = "pin_event_" + event.id;
        this.object = pin;
    }

    public setColor(country : Country | null) : void{
        // TODO : récupérer la couleur à partir de l'Empire
        if(country != null) {
            this.color = new THREE.Color("#"+(country.id*500000).toString(16))
        }
    }

    public setName(name: string) : void{
        this.object.name = name;
    }

    // réinitialisation de l'object Pin
    public destroy(): void {
        this.object.geometry.dispose();
        this.object.removeFromParent();
    }
    

}