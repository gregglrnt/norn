import React from "react";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js'
import Earth from "./Earth";
import Pin from "./Pin";
const cloud = require('../textures/clouds.png');

type GlobeInterface = {
    pins: Pin[] | undefined,
    handlePins: Function,
}

export const radius : number = 3;

/**
 * 
 * @param param0 
 *  - pins: a list of pins, with coordinates (lat, long)
 * - handlePins : a method to set the pins
 * @returns 
 */
export default function Globe({pins} : GlobeInterface) {
    const globe = useRef<THREE.Object3D>(new THREE.Object3D())
    const globeDiv = useRef<HTMLDivElement>(document.createElement("div"));

        useEffect(() => {
        // initialisation de la scène
        const scene = new THREE.Scene();
        scene.background = null;
        // initialisation caméra
        const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 100);
        camera.position.z = 9;
        camera.position.y = 2; 

        //initialisation rendu
        const renderer = new THREE.WebGLRenderer({
            alpha: true, // transparence
            antialias: true // aliasing
        })

        // initialisation lumière
        const light= new THREE.DirectionalLight(0xffffff, 1);
        light.position.set(5, 3, 5);
        scene.add(new THREE.AmbientLight(0x404040, 1));
        scene.add(light);

        renderer.setClearColor(0x000000, 0);


        // object THREEjs qui contiendra le reste : 
        const earth = new Earth(radius);

        // ajouter le ciel
        const sky = new THREE.Mesh(
            new THREE.SphereGeometry(radius + 0.02, 50, 50),
            new THREE.MeshPhongMaterial({
                map: new THREE.TextureLoader().load(cloud),
                transparent: true
            }));
        

        // tout ajouter au globe
        globe.current.add(earth);
        globe.current.add(sky);
        scene.add(globe.current);

        // ajouter le globe dans le DOM
        globeDiv.current.replaceChildren(renderer.domElement);
        
        // controleur et zoom
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableZoom = false;
        controls.update();

        // post-processing
        
        /*const composer = new EffectComposer(renderer);
                
        //ajouter la scène au composer pour qu'il se charge du postprocessing
        composer.addPass(new RenderPass(scene, camera)); 
                
        // ajout du glow
        const bloomPass = new UnrealBloomPass(
            new THREE.Vector2(window.innerWidth, window.innerHeight), 
            1.5, 
            0.4, 
            0.85
        );
        composer.addPass(bloomPass);
        composer.setPixelRatio( window.devicePixelRatio );
        */


        function resizeCanvas() {
            const canvas = renderer.domElement;
            const width = canvas.clientWidth;
            const height = canvas.clientHeight;

            if(canvas.width !== width || canvas.height !== height) {
                //renderer.setSize(width, height, false);
                renderer.setSize(width, height, false);
                camera.aspect = width / height;
                camera.updateProjectionMatrix();
            }
        }

        function animate() {
            resizeCanvas();

            globe.current.rotation.y += 0.002;
            sky.rotation.y += 0.003;
            //renderer.render(scene, camera);
            renderer.render(scene, camera); 
            requestAnimationFrame(animate);
        }
        requestAnimationFrame(animate);

        }, []);

        useEffect(() => {
            if(pins) for(let pin of pins){
                globe.current.add(pin.object);
            }
        }, [pins])

        return(
            <div key="Scene" ref={globeDiv}>
            </div>
        )


}