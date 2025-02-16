"use client";

import React, { useEffect, useRef } from "react";

const StarBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<{ x: number; y: number; size: number; opacity: number; speed: number }[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      createStars();
    };

    const createStars = () => {
      const numStars = Math.floor((window.innerWidth * window.innerHeight) / 1000); // Adjust density
      starsRef.current = Array.from({ length: numStars }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.5 + 0.5, // Tiny point-like stars
        opacity: Math.random() * 0.5 + 0.5,
        speed: Math.random() * 0.2 + 0.1, // Subtle movement
      }));
    };

    const drawStar = (x: number, y: number, size: number, opacity: number) => {
      ctx.save();
      ctx.globalAlpha = opacity;

      ctx.beginPath();
      for (let i = 0; i < 5; i++) {
        const angle = ((Math.PI * 2) / 5) * i - Math.PI / 2;
        const xPos = x + Math.cos(angle) * size;
        const yPos = y + Math.sin(angle) * size;
        if (i === 0) {
          ctx.moveTo(xPos, yPos);
        } else {
          ctx.lineTo(xPos, yPos);
        }
      }
      ctx.closePath();
      ctx.fillStyle = "white";
      ctx.fill();

      ctx.restore();
    };

    let lastTime = 0;
    const animate = (time: number) => {
      const deltaTime = time - lastTime;
      lastTime = time;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      starsRef.current.forEach((star) => {
        // Twinkling effect
        star.opacity += (Math.random() - 0.5) * 0.02;
        star.opacity = Math.max(0.3, Math.min(1, star.opacity));

        // Tiny movement for realism
        star.x += Math.sin(time / 5000) * star.speed;
        star.y += Math.cos(time / 5000) * star.speed;

        // Wrap around screen
        if (star.x > canvas.width) star.x = 0;
        if (star.y > canvas.height) star.y = 0;
        if (star.x < 0) star.x = canvas.width;
        if (star.y < 0) star.y = canvas.height;

        drawStar(star.x, star.y, star.size, star.opacity);
      });

      requestAnimationFrame(animate);
    };

    resizeCanvas();
    requestAnimationFrame(animate);

    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full z-[20] pointer-events-none"
    />
  );
};

export default StarBackground;
