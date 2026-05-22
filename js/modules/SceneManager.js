import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

export class SceneManager {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        
        // 1. Create Scene
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x020205);
        
        // เพิ่มหมอกจางๆ เพื่อสร้างมิติเชิงลึก
        

        // 2. Create Camera
        this.camera = new THREE.PerspectiveCamera(
            45, 
            window.innerWidth / window.innerHeight, 
            0.1, 
            1000
        );
        this.defaultPosition = new THREE.Vector3(0, 25, 45);
        this.camera.position.copy(this.defaultPosition);

        // 3. Create Renderer (Mobile Optimized)
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: window.devicePixelRatio < 2, // เปิดเฉพาะจอมือถือที่มีพิกเซลไม่หนาแน่น เพื่อประหยัด GPU
            powerPreference: "high-performance"
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // จำกัดไว้ที่ 2 เพื่อป้องกันการกระตุก
        this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
        this.renderer.toneMappingExposure = 1.2;

        // 4. Orbit Controls (รองรับ Drag & Pinch Zoom เป็นมิตรต่อมือถือ)
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.05;
        this.controls.maxDistance = 300;
        this.controls.minDistance = 3;

        // 5. Lighting (PBR Compliant)
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.15);
        this.scene.add(ambientLight);

        this.initResize();
    }

    initResize() {
        window.addEventListener('resize', () => {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        });
    }

    update() {
        this.controls.update();
    }

    render() {
        this.renderer.render(this.scene, this.camera);
    }
}