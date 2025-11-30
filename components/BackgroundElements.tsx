"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";

export default function BackgroundElements() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
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

    // Animation objects
    const elements: Array<{
      x: number;
      y: number;
      size: number;
      vx: number;
      vy: number;
      rotation: number;
      vRotation: number;
      opacity: number;
      type: "circle" | "square";
    }> = [];

    const createElement = () => {
      const isLight = theme === "light";
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * (isLight ? 60 : 200) + (isLight ? 20 : 50),
        vx: (Math.random() - 0.5) * (isLight ? 0.8 : 0.5),
        vy: (Math.random() - 0.5) * (isLight ? 0.8 : 0.5),
        rotation: Math.random() * Math.PI * 2,
        vRotation: (Math.random() - 0.5) * 0.02,
        opacity: Math.random() * 0.1 + 0.05,
        type: isLight ? "square" : "circle" as "circle" | "square",
      };
    };

    // Create initial elements
    // Re-create elements when theme changes
    elements.length = 0;
    for (let i = 0; i < (theme === "light" ? 15 : 5); i++) {
      elements.push(createElement());
    }

    let animationFrameId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const isLight = theme === "light";

      elements.forEach((el) => {
        el.x += el.vx;
        el.y += el.vy;
        el.rotation += el.vRotation;

        // Bounce off edges
        if (el.x + el.size > canvas.width || el.x - el.size < 0) el.vx *= -1;
        if (el.y + el.size > canvas.height || el.y - el.size < 0) el.vy *= -1;

        ctx.save();
        ctx.translate(el.x, el.y);
        ctx.rotate(el.rotation);

        if (isLight) {
          // Draw floating squares/diamonds for light mode
          ctx.strokeStyle = `rgba(37, 99, 235, ${el.opacity})`;
          ctx.lineWidth = 2;
          ctx.strokeRect(-el.size / 2, -el.size / 2, el.size, el.size);

          // Optional: Fill with very light opacity
          ctx.fillStyle = `rgba(37, 99, 235, ${el.opacity * 0.1})`;
          ctx.fillRect(-el.size / 2, -el.size / 2, el.size, el.size);
        } else {
          // Draw gradient circles for dark mode
          // Reset rotation for circles as it doesn't matter visually but simplifies logic
          ctx.rotate(-el.rotation);

          const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, el.size);
          gradient.addColorStop(0, `rgba(59, 130, 246, ${el.opacity})`);
          gradient.addColorStop(0.5, `rgba(59, 130, 246, ${el.opacity * 0.5})`);
          gradient.addColorStop(1, `rgba(59, 130, 246, 0)`);

          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(0, 0, el.size, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme, mounted]);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 w-screen h-screen pointer-events-none" style={{ zIndex: 0 }}>
      {/* Canvas Layer */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ opacity: theme === "light" ? 0.6 : 0.3 }}
      />

      {/* SVG Vector Patterns - Using CSS variables for colors */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        {/* Grid pattern overlay */}
        <svg
          className="absolute inset-0 w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="100%"
        >
          <defs>
            <pattern
              id="grid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="var(--accent)"
                strokeOpacity="0.05"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>

        {/* Floating geometric shapes */}
        <div className="absolute top-20 left-10 w-64 h-64 opacity-10">
          <svg viewBox="0 0 200 200" className="w-full h-full">
            <polygon
              points="100,10 190,90 100,170 10,90"
              fill="none"
              stroke="var(--accent)"
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
              stroke="var(--accent)"
              strokeWidth="2"
              className="animate-pulse-slow"
            />
            <circle
              cx="150"
              cy="150"
              r="70"
              fill="none"
              stroke="var(--accent-hover)"
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

