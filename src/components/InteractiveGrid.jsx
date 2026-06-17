import React, { useEffect } from 'react';

const InteractiveGrid = () => {
    useEffect(() => {
        const canvas = document.getElementById('global-grid-canvas-bg');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const gridSize = 40;
        let trails = [];
        let animationFrameId;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener('resize', resize);

        const onMove = (e) => {
            const x = e.clientX;
            const y = e.clientY;
            
            const gridX = Math.floor(x / gridSize) * gridSize;
            const gridY = Math.floor(y / gridSize) * gridSize;
            
            const existing = trails.find(t => t.x === gridX && t.y === gridY);
            if (existing) {
                existing.life = 1;
            } else {
                trails.push({ x: gridX, y: gridY, life: 1 });
            }
        };
        window.addEventListener('mousemove', onMove);

        const animateCanvas = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            for (let i = trails.length - 1; i >= 0; i--) {
                const trail = trails[i];
                ctx.fillStyle = `rgba(16, 185, 129, ${trail.life * 0.2})`; // Lighter green overlay
                ctx.fillRect(trail.x, trail.y, gridSize, gridSize);
                
                trail.life -= 0.02;
                if (trail.life <= 0) {
                    trails.splice(i, 1);
                }
            }
            animationFrameId = requestAnimationFrame(animateCanvas);
        };
        animateCanvas();

        return () => {
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', onMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas id="global-grid-canvas-bg" className="fixed inset-0 w-full h-full pointer-events-none z-0 opacity-40"></canvas>
    );
};

export default InteractiveGrid;
