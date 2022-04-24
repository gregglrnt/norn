import React, { createRef, RefObject } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Earth from "./Earth";
import Pin from "./Pin";
const cloud = require('../textures/clouds.png');

type GlobeProps = {
    pins: Pin[] | undefined,
    handlePins: Function,
    focus: string | undefined,
    setFocus: Function,
}

export const radius: number = 3;

export default class Globe extends React.Component<GlobeProps> {
    private globe: THREE.Object3D
    private globeDiv : RefObject<HTMLDivElement>
    private scene : THREE.Scene
    private camera : THREE.PerspectiveCamera;
    private renderer : THREE.WebGLRenderer;
    private light: THREE.DirectionalLight;
    private controls: OrbitControls;
    
    // planète
    private earth: Earth
    private sky: THREE.Mesh
    private pinSphere : THREE.Object3D


    constructor(props : GlobeProps) {
        super(props)
        this.globe = new THREE.Object3D()
        this.globeDiv = createRef()
        // initialisation scène
        this.scene = new THREE.Scene()
        this.scene.background = null;
        // mise en place de la caméra
        this.camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight)
        this.camera.position.z = 10
        this.camera.position.y = 2

        // on prépare le renderer
        this.renderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: true,
        })
        this.renderer.setClearColor(0x000000, 0)

        // initialisation de la lumière
        this.light = new THREE.DirectionalLight(0xFFF2CC, 1)
        this.light.position.copy(this.camera.position)
        
        // ajout de la lumière à la scène
        this.scene.add(this.light)
        this.scene.add(new THREE.AmbientLight(0x4BB4EE, 0.5))

        this.earth = new Earth(radius)
        this.pinSphere = new THREE.Mesh(
            new THREE.SphereGeometry(radius, 50, 50),
            new THREE.MeshBasicMaterial({
                visible: false,
            })
        )
        this.sky = new THREE.Mesh(
            new THREE.SphereGeometry(radius + 0.015, 50, 50),
            new THREE.MeshPhongMaterial({
                map: new THREE.TextureLoader().load(cloud),
                transparent: true,
            })
        )
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    }

    componentDidMount = () => {
        this.earth.name = "Earth"
        this.sky.name = "Sky"
        
        // contrôles
        this.controls.enableZoom = false
        this.controls.update()

        // on ajoute tout au globe
        this.globe.add(this.earth)
        this.globe.add(this.sky)
        this.globe.add(this.pinSphere)
        this.scene.add(this.globe)
        
        this.globeDiv.current?.replaceChildren(this.renderer.domElement)
        

        const raycaster = new THREE.Raycaster()
        const mouse = new THREE.Vector2();

        // add pointervents

        window.addEventListener('pointerdown', (event) => {
            const box = this.renderer.domElement.getBoundingClientRect();
            mouse.x = ((event.clientX - box.left) / (box.right - box.left)) * 2 - 1;
            mouse.y = -((event.clientY - box.top) / (box.bottom - box.top)) * 2 + 1;
            raycaster.setFromCamera(mouse, this.camera);
            const intersects = raycaster.intersectObjects(this.globe.children, false);
                if(intersects.length > 0) {
                    const pinSelected = intersects[0].object;

                    if(pinSelected.name.includes('pin')) {
                        this.props.setFocus(pinSelected.name.replace('pin_', ''))
   
                    }
                } 
        }); 

        requestAnimationFrame(this.animate)
    
    }

    resizeCanvas = () => {
            const canvas = this.renderer.domElement;
            const width = canvas.clientWidth;
            const height = canvas.clientHeight;
        
            if(canvas.width !== width || canvas.height !== height) {
                    //renderer.setSize(width, height, false);
                this.renderer.setSize(width, height, false);
                this.camera.aspect = width / height;
                this.camera.updateProjectionMatrix();
            }
    }

    animate = () => {
        this.resizeCanvas()
        this.light.position.x = 500* Math.sin(Date.now() / 5000)
        this.light.position.z = 500* Math.cos(Date.now() / 5000)
        this.sky.rotation.y += 0.001
        this.renderer.render(this.scene, this.camera)
        requestAnimationFrame(this.animate)
    }

    handlePins = () => {
        if(this.props.pins) for(let pin of this.props.pins) {
            //this.globe.add(pin.object)
            // si le pin existe, alors on le rend visible.
            const existingPin = this.globe.getObjectByName(pin.getName())
            if(existingPin) {
                existingPin.visible = true;
            } else {
                //this.globe.add(pin.object)
                this.pinSphere.add(pin.get())
                pin.setVisible(true);
            }
            // s'il n'existe pas, on l'ajoute et on le rend visible.
        }
    }

    componentDidUpdate(prevProps : GlobeProps) {
        // set pins on globe
        if(prevProps.pins && this.props.pins !== prevProps.pins) {
            for(let oldPin of this.pinSphere.children) {
                oldPin.visible = false;
            }
            this.handlePins();
        }

        // change focus
        if(this.props.focus !== prevProps.focus) {
            const pinToFocus = this.pinSphere.getObjectByName(`pin_${this.props.focus}`)
                if(pinToFocus) {
                    // on change le focus sur le globe
                    let coeff = 10 / radius;
                    this.camera.position.x = pinToFocus.position.x * coeff;
                    this.camera.position.y = pinToFocus.position.y * coeff;
                    this.camera.position.z = pinToFocus.position.z * coeff;
                    this.camera.lookAt(this.globe.position)  
                    // l'évènement sélectionné passe en haut
                    const eventID = this.props.focus
                    const eventChronicles = document.getElementsByClassName('chronicles')[0];

                    for(let otherEvents of eventChronicles.children) {
                        otherEvents.classList.remove('selected')
                    }

                    if(eventID) {
                        let eventChronicle = document.getElementById(eventID)
                        eventChronicle?.classList.add('selected');
                    }                
                }
            this.animate()
            this.controls.update()
        }
    }

    componentWillUnmount() {
        console.log("Destroy everything");
        for (let child of this.globe.children) {
            child.removeFromParent();
        }
        this.globe.remove()
        let canvases = this.globeDiv.current?.querySelectorAll('canvas');
        if(canvases) for(let canvas of canvases) {
            canvas.remove()
        }
    }

    render() {
        return(
            <div ref={this.globeDiv}>
            </div>
        )
    }
}