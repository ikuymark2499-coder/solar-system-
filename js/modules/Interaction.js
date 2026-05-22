import * as THREE from 'three';
import TWEEN from '@tweenjs/tween.js';

export class Interaction {
    constructor(sceneManager, solarSystem, uiManager) {
        this.sm = sceneManager;
        this.ss = solarSystem;
        this.ui = uiManager;

        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();
        this.selectedTarget = null;

        this.initEvents();
    }

    initEvents() {
        // ใช้ pointerdown เพื่อรองรับทั่งเมาส์และนิ้วสัมผัสบนมือถืออย่างรวดเร็ว
        this.sm.canvas.addEventListener('pointerdown', (e) => this.onPointerDown(e));
    }

    onPointerDown(event) {
        // แปลงพิกัดหน้าจอเป็น Normalized Device Coordinates (-1 ถึง +1)
        this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        this.raycaster.setFromCamera(this.mouse, this.sm.camera);
        
        // ตรวจจับจุดตัดจากอาเรย์ดาวเคราะห์และดวงอาทิตย์
        const targets = [...this.ss.planetsArray, this.ss.sunMesh];
        const intersects = this.raycaster.intersectObjects(targets);

        if (intersects.length > 0) {
            const hitObject = intersects[0].object;
            this.selectPlanet(hitObject);
        }
    }

    selectPlanet(mesh) {
        this.selectedTarget = mesh;
        const data = mesh.userData.details;

        // เปิดแผงข้อมูลส่งค่าไปอัปเดตบน DOM
        this.ui.showPanel(data);

        // ดึงตำแหน่ง World Position ล่าสุดของดาวดวงนั้น (เนื่องจากดาววิ่งอยู่ตลอดเวลา)
        const targetPos = new THREE.Vector3();
        mesh.getWorldPosition(targetPos);

        // กำหนดตำแหน่งกล้องใหม่ให้ซูมเข้าใกล้ (เยื้องไปด้านข้างเล็กน้อยเพื่อความสวยงามและไม่โดน Panel บัง)
        const offset = data.radius * 3.5;
        const targetCamPos = new THREE.Vector3(
            targetPos.x + offset,
            targetPos.y + offset * 0.5,
            targetPos.z + offset
        );

        this.animateCamera(targetCamPos, targetPos);
    }

    resetCamera() {
        this.selectedTarget = null;
        this.ui.hidePanel();
        this.animateCamera(this.sm.defaultPosition, new THREE.Vector3(0, 0, 0));
    }

    animateCamera(toPosition, toTarget) {
        // หยุดแอนิเมชันเดิมเพื่อไม่ให้ตีกัน
        TWEEN.removeAll();

        // เคลื่อนตำแหน่งกล้อง (Camera Position)
        new TWEEN.Tween(this.sm.camera.position)
            .to(toPosition, 1200)
            .easing(TWEEN.Easing.Cubic.Out)
            .start();

        // เคลื่อนจุดโฟกัสของกล้อง (OrbitControls Target)
        new TWEEN.Tween(this.sm.controls.target)
            .to(toTarget, 1200)
            .easing(TWEEN.Easing.Cubic.Out)
            .start();
    }

    update() {
        // ถ้าผู้ใช้เลือกดาวอยู่ ให้กล้องวิ่งตามดาวดวงนั้นไปเรื่อยๆ เสมือนกล้องล็อกเป้า
        if (this.selectedTarget && this.ui.isPanelOpen) {
            const currentPos = new THREE.Vector3();
            this.selectedTarget.getWorldPosition(currentPos);
            this.sm.controls.target.copy(currentPos);
        }
    }
}