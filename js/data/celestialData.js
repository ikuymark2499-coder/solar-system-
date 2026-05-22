export const celestialData = {
    sun: {
        name: "ดวงอาทิตย์ (The Sun)",
        radius: 4.0,           // ขนาดจำลองเพื่อให้เหมาะกับจอมือถือ
        color: 0xffaa00,
        emissive: 0xffdd44,
        description: "ดาวฤกษ์ที่เป็นศูนย์กลางของระบบสุริยะ มีมวลคิดเป็น 99.8% ของระบบทั้งหมด ผลิตพลังงานจากปฏิกิริยานิวเคลียร์ฟิวชัน",
        distance: "0 KM",
        orbitPeriod: "ศูนย์กลาง"
    },
    planets: [
        {
            id: "mercury",
            name: "ดาวพุธ (Mercury)",
            radius: 0.6,
            distance: 7.0,     // ระยะห่างจากดวงอาทิตย์จำลอง
            speed: 0.03,       // ความเร็วโคจรรอบดวงอาทิตย์
            rotSpeed: 0.01,    // ความเร็วหมุนรอบตัวเอง
            color: 0x888888,
            roughness: 0.8,
            description: "ดาวเคราะห์ที่อยู่ใกล้ดวงอาทิตย์ที่สุดและมีขนาดเล็กที่สุด ไม่มีชั้นบรรยากาศหนาแน่นทำให้กลางวันร้อนจัดและกลางคืนหนาวจัด",
            distance: "57.9 ล้าน KM",
            orbitPeriod: "88 วัน"
        },
        {
            id: "venus",
            name: "ดาวศุกร์ (Venus)",
            radius: 1.2,
            distance: 11.0,
            speed: 0.02,
            rotSpeed: 0.002,
            color: 0xe3bb76,
            roughness: 0.5,
            description: "ดาวเคราะห์ที่ร้อนที่สุดในระบบสุริยะเนื่องจากสภาวะเรือนกระจกแบบกู่ไม่กลับ มีชั้นบรรยากาศหนาแน่นไปด้วยก๊าซคาร์บอนไดออกไซด์",
            distance: "108.2 ล้าน KM",
            orbitPeriod: "225 วัน"
        },
        {
            id: "earth",
            name: "โลก (Earth)",
            radius: 1.3,
            distance: 16.0,
            speed: 0.015,
            rotSpeed: 0.02,
            color: 0x2233ff,
            roughness: 0.4,
            description: "บ้านของเรา ดาวเคราะห์ดวงเดียวในขณะนี้ที่ยืนยันว่ามีสิ่งมีชีวิต มีน้ำในสถานะของเหลวปกคลุมพื้นที่กว่า 70% ของพื้นผิว",
            distance: "149.6 ล้าน KM",
            orbitPeriod: "365 วัน"
        },
        {
            id: "mars",
            name: "ดาวอังคาร (Mars)",
            radius: 0.9,
            distance: 21.0,
            speed: 0.01,
            rotSpeed: 0.018,
            color: 0xc1440e,
            roughness: 0.6,
            description: "ดาวเคราะห์สีแดงที่เต็มไปด้วยออกไซด์ของเหล็ก (สนิม) มีภูเขาไฟที่ใหญ่ที่สุดในระบบสุริยะ (Olympus Mons) และเป็นเป้าหมายหลักในการสำรวจ",
            distance: "227.9 ล้าน KM",
            orbitPeriod: "687 วัน"
        }
    ]
};