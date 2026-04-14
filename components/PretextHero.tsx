"use client";

import { useEffect, useRef, useCallback } from "react";
import { prepareWithSegments, layoutWithLines } from "@chenglou/pretext";

interface PretextHeroProps {
  name: string;
  subtitle: string;
}

export default function PretextHero({ name, subtitle }: PretextHeroProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const isReady = useRef(false);
  const progressRef = useRef(0);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    ctx.clearRect(0, 0, rect.width, rect.height);

    const progress = progressRef.current;

    // Main name - large bold text
    const fontSize = Math.min(rect.width * 0.12, 120);
    const nameFont = `800 ${fontSize}px Inter, system-ui, sans-serif`;
    const preparedName = prepareWithSegments(name, nameFont);
    const nameLayout = layoutWithLines(preparedName, rect.width, fontSize * 1.1);

    // Subtitle
    const subFontSize = Math.min(rect.width * 0.03, 24);
    const subFont = `300 ${subFontSize}px Inter, system-ui, sans-serif`;
    const preparedSub = prepareWithSegments(subtitle, subFont);
    const subLayout = layoutWithLines(preparedSub, rect.width, subFontSize * 1.5);

    const totalNameHeight = nameLayout.lines.length * fontSize * 1.1;
    const totalSubHeight = subLayout.lines.length * subFontSize * 1.5;
    const gap = 20;
    const totalHeight = totalNameHeight + gap + totalSubHeight;
    const startY = (rect.height - totalHeight) / 2;

    // Draw name lines with per-character reveal
    for (let i = 0; i < nameLayout.lines.length; i++) {
      const line = nameLayout.lines[i];
      const y = startY + i * fontSize * 1.1 + fontSize * 0.85;
      const lineText = line.text;
      const totalChars = name.length;

      let x = (rect.width - line.width) / 2; // center

      for (let c = 0; c < lineText.length; c++) {
        const charIndex = (i > 0 ? nameLayout.lines[0].text.length : 0) + c;
        const charProgress = Math.max(0, Math.min(1, (progress * totalChars - charIndex) / 1));

        const char = lineText[c];

        // Glow effect
        if (charProgress > 0.5) {
          ctx.save();
          ctx.shadowColor = "rgba(167, 139, 250, 0.6)";
          ctx.shadowBlur = 30 * (1 - charProgress);
          ctx.font = nameFont;
          ctx.fillStyle = `rgba(167, 139, 250, ${(1 - charProgress) * 0.5})`;
          ctx.fillText(char, x, y);
          ctx.restore();
        }

        // Main character
        ctx.save();
        ctx.font = nameFont;

        // Gradient per character
        const isAccent = name.indexOf("Asath") !== -1 && charIndex >= name.indexOf("Asath") && charIndex < name.indexOf("Asath") + 5;

        if (isAccent) {
          const grad = ctx.createLinearGradient(x, y - fontSize, x + fontSize * 0.5, y);
          grad.addColorStop(0, `rgba(167, 139, 250, ${charProgress})`);
          grad.addColorStop(0.5, `rgba(196, 181, 253, ${charProgress})`);
          grad.addColorStop(1, `rgba(129, 140, 248, ${charProgress})`);
          ctx.fillStyle = grad;
        } else {
          ctx.fillStyle = `rgba(240, 240, 240, ${charProgress})`;
        }

        // Slight vertical offset during reveal
        const offsetY = (1 - charProgress) * 15;
        ctx.fillText(char, x, y + offsetY);
        ctx.restore();

        // Advance x
        ctx.font = nameFont;
        x += ctx.measureText(char).width;
      }
    }

    // Draw subtitle
    const subY = startY + totalNameHeight + gap;
    for (let i = 0; i < subLayout.lines.length; i++) {
      const line = subLayout.lines[i];
      const y = subY + i * subFontSize * 1.5 + subFontSize;
      const lineX = (rect.width - line.width) / 2;

      const subDelay = 0.7;
      const subProgress = Math.max(0, (progress - subDelay) / (1 - subDelay));

      ctx.save();
      ctx.font = subFont;
      ctx.fillStyle = `rgba(156, 163, 175, ${subProgress})`;
      ctx.letterSpacing = "0.15em";
      ctx.fillText(line.text.toUpperCase(), lineX, y + (1 - subProgress) * 10);
      ctx.restore();
    }
  }, [name, subtitle]);

  useEffect(() => {
    isReady.current = true;
    let startTime: number | null = null;
    const duration = 2000; // 2 seconds for full reveal

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      progressRef.current = Math.min(1, elapsed / duration);

      draw();

      if (progressRef.current < 1) {
        animRef.current = requestAnimationFrame(animate);
      }
    };

    // Small delay before starting
    const timer = setTimeout(() => {
      animRef.current = requestAnimationFrame(animate);
    }, 300);

    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(animRef.current);
    };
  }, [draw]);

  // Handle resize
  useEffect(() => {
    const handleResize = () => draw();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [draw]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full"
      style={{ height: "260px" }}
    />
  );
}
