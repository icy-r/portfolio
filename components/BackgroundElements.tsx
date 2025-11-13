"use client";

import { useEffect, useRef } from "react";

export default function BackgroundElements() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Animated gradient circles
    const circles: Array<{
      x: number;
      y: number;
      radius: number;
      vx: number;
      vy: number;
      opacity: number;
    }> = [];

    const createCircle = () => {
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 200 + 50,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.1 + 0.05,
      };
    };

    // Create initial circles
    for (let i = 0; i < 5; i++) {
      circles.push(createCircle());
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      circles.forEach((circle) => {
        circle.x += circle.vx;
        circle.y += circle.vy;

        // Bounce off edges
        if (circle.x + circle.radius > canvas.width || circle.x - circle.radius < 0) {
          circle.vx *= -1;
        }
        if (circle.y + circle.radius > canvas.height || circle.y - circle.radius < 0) {
          circle.vy *= -1;
        }

        // Draw gradient circle
        const gradient = ctx.createRadialGradient(
          circle.x,
          circle.y,
          0,
          circle.x,
          circle.y,
          circle.radius
        );
        gradient.addColorStop(0, `rgba(59, 130, 246, ${circle.opacity})`);
        gradient.addColorStop(0.5, `rgba(59, 130, 246, ${circle.opacity * 0.5})`);
        gradient.addColorStop(1, `rgba(59, 130, 246, 0)`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <div className="fixed inset-0 w-screen h-screen pointer-events-none" style={{ zIndex: 0 }}>
      {/* Animated gradient circles */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ opacity: 0.3 }}
      />

      {/* SVG Vector Patterns */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <svg
          className="absolute inset-0 w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 900"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#2563eb" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="gradient2" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#2563eb" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Animated blob shapes */}
          <g className="animate-pulse-slow">
            <path
              d="M0,200 Q300,100 600,200 T1200,200 L1440,200 L1440,0 L0,0 Z"
              fill="url(#gradient1)"
              className="animate-blob"
            />
          </g>
          <g className="animate-pulse-slow" style={{ animationDelay: "2s" }}>
            <path
              d="M0,700 Q400,600 800,700 T1440,700 L1440,900 L0,900 Z"
              fill="url(#gradient2)"
              className="animate-blob"
              style={{ animationDelay: "1s" }}
            />
          </g>

          {/* Grid pattern overlay */}
          <pattern
            id="grid"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 40 0 L 0 0 0 40"
              fill="none"
              stroke="rgba(59, 130, 246, 0.05)"
              strokeWidth="1"
            />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>

        {/* Floating geometric shapes */}
        <div className="absolute top-20 left-10 w-64 h-64 opacity-10">
          <svg viewBox="0 0 200 200" className="w-full h-full">
            <polygon
              points="100,10 190,90 100,170 10,90"
              fill="none"
              stroke="#3b82f6"
              strokeWidth="2"
              className="animate-spin-slow"
              style={{ animationDuration: "20s" }}
            />
          </svg>
        </div>

        <div className="absolute bottom-20 right-10 w-96 h-96 opacity-10">
          <svg viewBox="0 0 300 300" className="w-full h-full">
            <circle
              cx="150"
              cy="150"
              r="100"
              fill="none"
              stroke="#3b82f6"
              strokeWidth="2"
              className="animate-pulse-slow"
            />
            <circle
              cx="150"
              cy="150"
              r="70"
              fill="none"
              stroke="#2563eb"
              strokeWidth="1"
              className="animate-pulse-slow"
              style={{ animationDelay: "1s" }}
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

