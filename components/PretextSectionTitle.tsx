"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { prepareWithSegments, layoutWithLines } from "@chenglou/pretext";

interface PretextSectionTitleProps {
  label: string;
  title: string;
}

export default function PretextSectionTitle({ label, title }: PretextSectionTitleProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const [triggered, setTriggered] = useState(false);
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

    // Label text (small uppercase)
    const labelFontSize = 11;
    const labelFont = `500 ${labelFontSize}px Inter, system-ui, sans-serif`;
    const preparedLabel = prepareWithSegments(label.toUpperCase(), labelFont);
    const labelLayout = layoutWithLines(preparedLabel, rect.width, labelFontSize * 1.5);

    // Draw label
    for (let i = 0; i < labelLayout.lines.length; i++) {
      const line = labelLayout.lines[i];
      const y = i * labelFontSize * 1.5 + labelFontSize;
      const labelProgress = Math.max(0, Math.min(1, progress * 3));

      ctx.save();
      ctx.font = labelFont;
      ctx.letterSpacing = "0.2em";
      ctx.fillStyle = `rgba(167, 139, 250, ${labelProgress})`;
      ctx.fillText(line.text, 0, y + (1 - labelProgress) * 8);
      ctx.restore();
    }

    // Title text (large bold)
    const titleFontSize = Math.min(rect.width * 0.065, 40);
    const titleFont = `700 ${titleFontSize}px Inter, system-ui, sans-serif`;
    const preparedTitle = prepareWithSegments(title, titleFont);
    const titleLayout = layoutWithLines(preparedTitle, rect.width, titleFontSize * 1.2);

    const titleStartY = labelLayout.lines.length * labelFontSize * 1.5 + 12;

    // Draw title with sweep reveal
    for (let i = 0; i < titleLayout.lines.length; i++) {
      const line = titleLayout.lines[i];
      const y = titleStartY + i * titleFontSize * 1.2 + titleFontSize * 0.9;
      const lineText = line.text;

      let x = 0;
      for (let c = 0; c < lineText.length; c++) {
        const charRatio = c / Math.max(lineText.length - 1, 1);
        const titleDelay = 0.2;
        const charProgress = Math.max(0, Math.min(1,
          ((progress - titleDelay) / (1 - titleDelay) - charRatio * 0.5) / 0.5
        ));

        const char = lineText[c];

        // Glow during reveal
        if (charProgress > 0 && charProgress < 1) {
          ctx.save();
          ctx.shadowColor = "rgba(167, 139, 250, 0.8)";
          ctx.shadowBlur = 20;
          ctx.font = titleFont;
          ctx.fillStyle = `rgba(167, 139, 250, ${(1 - charProgress) * 0.3})`;
          ctx.fillText(char, x, y);
          ctx.restore();
        }

        ctx.save();
        ctx.font = titleFont;
        ctx.fillStyle = `rgba(240, 240, 240, ${charProgress})`;
        ctx.fillText(char, x, y + (1 - charProgress) * 12);
        ctx.restore();

        ctx.font = titleFont;
        x += ctx.measureText(char).width;
      }
    }
  }, [label, title]);

  // Intersection observer — re-trigger every time it enters view
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          // Reset and replay
          progressRef.current = 0;
          setTriggered(false);
          // Use microtask to ensure state clears before re-triggering
          queueMicrotask(() => setTriggered(true));
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(canvas);
    return () => observer.disconnect();
  }, []);

  // Run animation when triggered
  useEffect(() => {
    if (!triggered) return;

    let startTime: number | null = null;
    const duration = 1200;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      progressRef.current = Math.min(1, elapsed / duration);
      draw();

      if (progressRef.current < 1) {
        animRef.current = requestAnimationFrame(animate);
      }
    };

    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, [triggered, draw]);

  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      if (progressRef.current >= 1) draw();
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [draw]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full"
      style={{ height: "90px" }}
    />
  );
}
