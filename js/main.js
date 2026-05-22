import TWEEN from '@tweenjs/tween.js';
import { SceneManager } from './modules/SceneManager.js';
import { SolarSystem } from './modules/SolarSystem.js';
import { UIManager } from './modules/UIManager.js';
import { Interaction } from './modules/Interaction.js';
import { celestialData } from './data/celestialData.js';

class App {
    constructor() {
        this.ui = new UIManager();
        this.sm = new SceneManager('webgl-canvas');
        this.ss = new SolarSystem(this.sm.scene, celestialData);
        this.interaction = new Interaction(this.sm, this.ss, this.ui);

        this.hookCallbacks();
        this.animate();
    }

    hookCallbacks() {
        // เมื่อเลือกเข้าระบบสุริยะจากหน้าแรก
        this.ui.onSystemSelectCallback = (systemId) => {
            if (systemId === 'solar') {
                this.ui.switchScreen('viewer');
            }
        };

        // เมื่อกดรีเซ็ตกล้อง หรือกดปิดหน้าต่างข้อมูล
        this.ui.onResetCameraCallback = () => {
            this.interaction.resetCamera();
        };
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        // 1. อัปเดตแอนิเมชันคำนวณตำแหน่งกล้องลื่นไหล
        TWEEN.update();

        // 2. อัปเดตตำแหน่งและการโคจรของดวงดาว
        this.ss.animate();

        // 3. อัปเดตกล้องตามเป้าหมาย (หากมีการเลือกล็อกดาว)
        this.interaction.update();

        // 4. อัปเดตการควบคุมนิ้วสัมผัสและการหน่วง (Damping)
        this.sm.update();

        // 5. เรนเดอร์ภาพออกหน้าจอ
        this.sm.render();
    }
}

// เริ่มต้นเปิดระบบทันทีที่โหลดหน้าเสร็จสิ้น
window.addEventListener('DOMContentLoaded', () => {
    new App();
});