import React, { useEffect, useRef } from 'react';

const FloatingBackground = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;
        
        let width, height;
        let isPaused = false;
        let particles = [];

        const figmaSquares = [
            { w: 9, h: 10, x: 1137, y: 823, border: 2, opacity: 0.44 },
            { w: 4, h: 4, x: 864, y: 729, border: 2, opacity: 0.44 },
            { w: 30, h: 33, x: 816, y: 931, border: 2, opacity: 0.44 },
            { w: 38, h: 33, x: 935, y: 663, border: 5, opacity: 0.22 },
            { w: 31, h: 28, x: 1267, y: 600, border: 2, opacity: 0.44 },
            { w: 51, h: 56, x: 1216, y: 903, border: 2, opacity: 0.44 },
            { w: 20, h: 20, x: 1119, y: 893, border: 3, opacity: 0.44 },
            { w: 20, h: 20, x: 1027, y: 719, border: 3, opacity: 0.44 },
            { w: 20, h: 20, x: 940, y: 937, border: 3, opacity: 0.44 },
            { w: 20, h: 20, x: 1047, y: 828, border: 3, opacity: 0.44 },
            { w: 20, h: 20, x: 661, y: 939, border: 3, opacity: 0.44 },
            { w: 20, h: 20, x: 833, y: 643, border: 3, opacity: 0.44 },
            { w: 18, h: 20, x: 1309, y: 751, border: 6, opacity: 0.44 },
            { w: 9, h: 10, x: 530, y: 263, border: 2, opacity: 0.44 },
            { w: 4, h: 4, x: 228, y: 294, border: 2, opacity: 0.44 },
            { w: 30, h: 33, x: 200, y: 543, border: 2, opacity: 0.44 },
            { w: 38, h: 33, x: 245, y: 376, border: 5, opacity: 0.22 },
            { w: 51, h: 56, x: 30, y: 276, border: 2, opacity: 0.44 },
            { w: 51, h: 56, x: 665, y: 696, border: 2, opacity: 0.44 },
            { w: 20, h: 20, x: 681, y: 458, border: 3, opacity: 0.44 },
            { w: 20, h: 20, x: 473, y: 389, border: 3, opacity: 0.44 },
            { w: 20, h: 20, x: 304, y: 502, border: 3, opacity: 0.44 },
            { w: 20, h: 20, x: 1022, y: 492, border: 3, opacity: 0.44 },
            { w: 20, h: 20, x: 96, y: 448, border: 3, opacity: 0.44 },
            { w: 20, h: 20, x: 304, y: 138, border: 3, opacity: 0.44 },
            { w: 18, h: 20, x: 78, y: 85, border: 6, opacity: 0.44 },
            { w: 9, h: 10, x: 394, y: 800, border: 2, opacity: 0.44 },
            { w: 9, h: 10, x: 1207, y: 183, border: 2, opacity: 0.44 },
            { w: 30, h: 33, x: 813, y: 273, border: 2, opacity: 0.44 },
            { w: 38, h: 33, x: 132, y: 652, border: 5, opacity: 0.22 },
            { w: 38, h: 33, x: 744, y: 52, border: 5, opacity: 0.22 },
            { w: 51, h: 56, x: 106, y: 761, border: 2, opacity: 0.44 },
            { w: 51, h: 56, x: 981, y: 298, border: 2, opacity: 0.44 },
            { w: 51, h: 56, x: 513, y: 576, border: 2, opacity: 0.44 },
            { w: 51, h: 56, x: 1312, y: 393, border: 2, opacity: 0.44 }
        ];

        function resize() {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        }

        class Particle {
            constructor(data, isFigma = false) {
                if (isFigma) {
                    let relativeX = (data.x / 1440) * width;
                    this.x = relativeX;
                    this.y = data.y;

                    let scale = width < 768 ? 0.6 : 1;
                    this.w = data.w * scale;
                    this.h = data.h * scale;
                    this.border = data.border;
                    
                    this.opacity = data.opacity * 0.3; 
                    this.speedX = (Math.random() - 0.5) * 0.8;
                    this.speedY = (Math.random() - 0.5) * 0.8;
                } else {
                    this.x = Math.random() * width;
                    this.y = Math.random() * (document.body.scrollHeight || 4000) + 1000;
                    this.w = (Math.random() * 40 + 10) * (width < 768 ? 0.6 : 1);
                    this.h = this.w * (Math.random() * 0.2 + 0.9);
                    this.border = Math.floor(Math.random() * 4) + 2;
                    
                    this.opacity = Math.random() * 0.1 + 0.05;
                    this.speedX = (Math.random() - 0.5) * 1.2;
                    this.speedY = (Math.random() - 0.5) * 1.2;
                }
            }

            update() {
                if (!isPaused) {
                    this.x += this.speedX;
                    this.y += this.speedY;

                    if (this.x > width + 50) this.x = -50;
                    else if (this.x < -50) this.x = width + 50;

                    if (this.y > (document.body.scrollHeight || 4000) + 50) this.y = -50;
                    else if (this.y < -50) this.y = (document.body.scrollHeight || 4000) + 50;
                }
            }

            draw() {
                ctx.strokeStyle = `rgba(255, 255, 255, ${this.opacity})`;
                ctx.lineWidth = this.border;
                ctx.strokeRect(this.x, this.y, this.w, this.h);
            }
        }

        function init() {
            resize();
            particles = [];

            figmaSquares.forEach(sq => {
                particles.push(new Particle(sq, true));
            });

            for (let i = 0; i < 50; i++) {
                let p = new Particle({}, false);
                p.y = Math.random() * (document.body.scrollHeight || 4000) + 1000;
                particles.push(p);
            }
            
            animate();
        }

        function animate() {
            ctx.clearRect(0, 0, width, height);
            const scrollY = window.scrollY;

            particles.forEach(p => {
                p.update();
                ctx.save();
                ctx.translate(0, -scrollY * 0.5);
                p.draw();
                ctx.restore();
            });

            animationFrameId = requestAnimationFrame(animate);
        }

        const handleMouseEnter = () => isPaused = true;
        const handleMouseLeave = () => isPaused = false;
        const handleClick = () => isPaused = !isPaused;

        // Add event listeners
        window.addEventListener('resize', resize);
        document.body.addEventListener('mouseenter', handleMouseEnter);
        document.body.addEventListener('mouseleave', handleMouseLeave);
        document.body.addEventListener('click', handleClick);

        // Start
        init();

        // Cleanup
        return () => {
            window.removeEventListener('resize', resize);
            document.body.removeEventListener('mouseenter', handleMouseEnter);
            document.body.removeEventListener('mouseleave', handleMouseLeave);
            document.body.removeEventListener('click', handleClick);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return <canvas id="bg-canvas" ref={canvasRef}></canvas>;
};

export default FloatingBackground;
