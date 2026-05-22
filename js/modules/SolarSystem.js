import * as THREE from 'three';

export class SolarSystem {
    constructor(scene, data) {
        this.scene = scene;
        this.data = data;
        this.planetsArray = [];
        this.pivotGroups = [];

        this.createStarsBackground();
        this.createSystem();
    }

    createStarsBackground() {
        // สร้างกลุ่มดาวพื้นหลังแบบประหยัด Performance (ใช้ Points เเทน Mesh)
        const count = 1500;
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(count * 3);

        for(let i = 0; i < count * 3; i += 3) {
            positions[i] = (Math.random() - 0.5) * 300;
            positions[i+1] = (Math.random() - 0.5) * 300;
            positions[i+2] = (Math.random() - 0.5) * 300;
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        const material = new THREE.PointsMaterial({
            color: 0xffffff,
            size: 0.4,
            sizeAttenuation: true
        });

        const stars = new THREE.Points(geometry, material);
        this.scene.add(stars);
    }

    createSystem() {
        // 1. ดวงอาทิตย์ (ใช้ MeshStandardMaterial ผสม Emissive ให้เปล่งแสง PBR)
        const sunGeo = new THREE.SphereGeometry(this.data.sun.radius, 32, 32);
        const sunMat = new THREE.MeshStandardMaterial({
            color: this.data.sun.color,
            emissive: this.data.sun.emissive,
            emissiveIntensity: 1.5,
            roughness: 0.2
        });
        this.sunMesh = new THREE.Mesh(sunGeo, sunMat);
        this.sunMesh.userData = { id: 'sun', details: this.data.sun };
        this.scene.add(this.sunMesh);

        // แสงสว่างที่กระจายออกจากดวงอาทิตย์มาโดนดาวเคราะห์วงนอก
        const sunLight = new THREE.PointLight(0xffffff, 3.0, 300);
        this.scene.add(sunLight);

        // 2. สร้างดาวเคราะห์แต่ละดวง
        this.data.planets.forEach(pData => {
            // สร้างกลุ่มแกนหมุน (Pivot) ไว้ที่จุด (0,0,0)
            const pivot = new THREE.Group();
            this.scene.add(pivot);
            this.pivotGroups.push({ obj: pivot, speed: pData.speed });

            // สร้างเส้นวงโคจร (Orbit Line) บางๆ
            this.createOrbitLine(pData.distance);

            // สร้างตัวดาวเคราะห์
            const planetGeo = new THREE.SphereGeometry(pData.radius, 24, 24); // ลด Segment ลงนิดเพื่อ Mobile
            const planetMat = new THREE.MeshStandardMaterial({
                color: pData.color,
                roughness: pData.roughness,
                metalness: 0.1
            });
            const planetMesh = new THREE.Mesh(planetGeo, planetMat);
            
            // ขยับเฉพาะตัวดาวออกตามแนวแกน X
            planetMesh.position.x = pData.distance;
            
            // ผูกข้อมูลดิบไว้ใน userData เพื่อแกะออกตอน Raycast
            planetMesh.userData = { id: pData.id, details: pData };

            pivot.add(planetMesh);
            this.planetsArray.push(planetMesh);
        });
    }

    createOrbitLine(radius) {
        const material = new THREE.LineBasicMaterial({ 
            color: 0xffffff, 
            transparent: true, 
            opacity: 0.3 
        });
        
        const points = [];
        const segments = 64;
        for (let i = 0; i <= segments; i++) {
            const theta = (i / segments) * Math.PI * 2;
            points.push(new THREE.Vector3(Math.cos(theta) * radius, 0, Math.sin(theta) * radius));
        }
        
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        const orbit = new THREE.Line(geometry, material);
        this.scene.add(orbit);
    }

    animate() {
        // หมุนรอบตัวเองของดวงอาทิตย์
        this.sunMesh.rotation.y += 0.002;

        // อัปเดตการเคลื่อนที่ (โคจรรอบดวงอาทิตย์ และหมุนรอบตัวเอง)
        this.pivotGroups.forEach(p => {
            p.obj.rotation.y += p.speed; // โคจรรอบดวงอาทิตย์
        });

        this.planetsArray.forEach(planet => {
            planet.rotation.y += planet.userData.details.rotSpeed; // หมุนรอบตัวเอง
        });
    }
}