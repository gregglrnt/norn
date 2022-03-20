import React, { createRef, RefObject } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Stats from "three/examples/jsm/libs/stats.module";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass";
import { fragmentShader, vertexShader } from "../shaders/shaders";
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
    private stats: Stats
    private controls: OrbitControls;
    
    // planète
    private earth: Earth
    private sky: THREE.Mesh


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
        this.scene.add(new THREE.AmbientLight(0x4BB4EE, 0.2))

        this.earth = new Earth(radius)
        this.sky = new THREE.Mesh(
            new THREE.SphereGeometry(radius + 0.015, 50, 50),
            new THREE.MeshPhongMaterial({
                map: new THREE.TextureLoader().load(cloud),
                transparent: true,
            })
        )
        this.stats = Stats()
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    }

    componentDidMount = () => {
        this.earth.name = "Earth"
        this.sky.name = "Sky"

        
        // contrôles
        this.controls.enableZoom = false
        this.controls.update()
        this.globeDiv.current?.appendChild(this.stats.dom)

        const axesHelper = new THREE.AxesHelper( 5 );
        this.scene.add(axesHelper)

        let cameraHelper = new THREE.ArrowHelper(
            this.globe.position, 
            this.camera.position
        )
        this.scene.add(cameraHelper)

        // on ajoute tout au globe
        this.globe.add(this.earth)
        this.globe.add(this.sky)
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
                    if(pinSelected.name !== 'Sky' && pinSelected.name !== 'Earth') {
                        const eventID = pinSelected.name.replace('pin_', '')
                        const eventChronicles = document.getElementsByClassName('chronicles')[0];
                        for(let otherEvents of eventChronicles.children) {
                            otherEvents.classList.remove('selected')
                        }
                        const eventChronicle = document.getElementById(eventID)
                        eventChronicle?.classList.add('selected');
    
                    }
                } 
        }); 



        // post-processing
        const renderScene = new RenderPass( this.scene, this.camera );
        
        const bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 1.5, 0.4, 0.85)
        
        const bloomComposer = new EffectComposer( this.renderer );
        bloomComposer.renderToScreen = false;
        bloomComposer.addPass( renderScene );
        bloomComposer.addPass( bloomPass );

        const finalPass = new ShaderPass(
            new THREE.ShaderMaterial( {
                uniforms: {
                    baseTexture: { value : null },
                    bloomTexture: {value : bloomComposer.renderTarget2.texture},
                },
                vertexShader: vertexShader,
                fragmentShader: fragmentShader,
                defines: {},
            }), 'baseTexture'
        )
        finalPass.needsSwap = true;

        const finalComposer = new EffectComposer( this.renderer );
        finalComposer.addPass( renderScene );
        finalComposer.addPass( finalPass );

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
        this.light.position.x = 500* Math.sin(Date.now() / 10000)
        this.light.position.z = 500* Math.cos(Date.now() / 10000)
        this.sky.rotation.y += 0.001
        this.renderer.render(this.scene, this.camera)
        this.stats.update()
        requestAnimationFrame(this.animate)
    }



    componentDidUpdate(prevProps : GlobeProps) {
        // set pins on globe
        if(this.props.pins !== prevProps.pins) {
            if(this.props.pins) for(let pin of this.props.pins) {
                this.globe.add(pin.object)
            }
        }

        // change focus
        // TODO: faire en sorte que ça marche :)
        if(this.props.focus !== prevProps.focus) {
            const pinToFocus = this.globe.getObjectByName(`pin_${this.props.focus}`)
            /*if(pinToFocus) {
            const goTo = new THREE.Vector3();
            goTo.x = pinToFocus.position.x - this.globe.position.x
            goTo.y = pinToFocus.position.y - this.globe.position.y
            goTo.z = pinToFocus.position.z - this.globe.position.z
            let cameraVector = new THREE.Vector3()
            this.camera.getWorldDirection(cameraVector)
            const angle = goTo.angleTo(cameraVector)
            this.globe.rotateX(angle)*/
                if(pinToFocus) {
                    let axis = new THREE.Vector3()
                    axis.crossVectors(this.camera.position, pinToFocus.position)
                    axis.normalize()
                    let angle = this.camera.position.angleTo(pinToFocus.position)
                    this.globe.rotateOnAxis(axis, angle)

                    
                    /*const quaternion = new THREE.Quaternion()
                    quaternion.setFromUnitVectors(startVector.normalize(), endVector.normalize())*/
                       
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