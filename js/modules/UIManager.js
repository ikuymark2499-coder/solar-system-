export class UIManager {
    constructor() {
        this.menuScreen = document.getElementById('menu-screen');
        this.viewerScreen = document.getElementById('viewer-screen');
        this.infoPanel = document.getElementById('info-panel');
        
        this.isPanelOpen = false;
        this.onSystemSelectCallback = null;
        this.onResetCameraCallback = null;

        this.bindEvents();
    }

    bindEvents() {
        // ปุ่มหน้าแรก
        document.querySelectorAll('.btn-system').forEach(btn => {
            btn.addEventListener('click', () => {
                const system = btn.getAttribute('data-system');
                if(this.onSystemSelectCallback) this.onSystemSelectCallback(system);
            });
        });

        // ปุ่มถอยกลับไปหน้าหลัก
        document.getElementById('btn-back').addEventListener('click', () => {
            this.switchScreen('menu');
            if(this.onResetCameraCallback) this.onResetCameraCallback();
        });

        // ปุ่มรีเซ็ตกล้อง
        document.getElementById('btn-reset-cam').addEventListener('click', () => {
            if(this.onResetCameraCallback) this.onResetCameraCallback();
        });

        // ปุ่มปิดแผงข้อมูล
        document.getElementById('btn-close-panel').addEventListener('click', () => {
            if(this.onResetCameraCallback) this.onResetCameraCallback();
        });
    }

    switchScreen(screenName) {
        if (screenName === 'viewer') {
            this.menuScreen.classList.add('hidden');
            this.viewerScreen.classList.remove('hidden');
        } else {
            this.viewerScreen.classList.add('hidden');
            this.menuScreen.classList.remove('hidden');
            this.hidePanel();
        }
    }

    showPanel(data) {
        this.isPanelOpen = true;
        document.getElementById('planet-name').innerText = data.name;
        document.getElementById('planet-desc').innerText = data.description;
        document.getElementById('stat-distance').innerText = data.distance;
        document.getElementById('stat-orbit').innerText = data.orbitPeriod;
        this.infoPanel.classList.remove('hidden');
    }

    hidePanel() {
        this.isPanelOpen = false;
        this.infoPanel.classList.add('hidden');
    }
}