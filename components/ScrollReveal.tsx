"use client";

import { useEffect, useRef, ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  direction?: "up" | "left" | "right" | "scale";
  delay?: number;
  duration?: number;
  distance?: number;
  once?: boolean;
}

export default function ScrollReveal({
  children,
  className = "",
  direction = "up",
  delay = 0,
  duration = 1,
  distance = 60,
  once = false,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const initial: gsap.TweenVars = { opacity: 0 };
    const animate: gsap.TweenVars = {
      opacity: 1,
      duration,
      delay,
      ease: "power3.out",
    };

    switch (direction) {
      case "up":
        initial.y = distance;
        animate.y = 0;
        break;
      case "left":
        initial.x = distance;
        animate.x = 0;
        break;
      case "right":
        initial.x = -distance;
        animate.x = 0;
        break;
      case "scale":
        initial.scale = 0.85;
        animate.scale = 1;
        break;
    }

    gsap.set(el, initial);

    // "play reverse play reverse" = play on enter, reverse on leave, replay on re-enter
    const tween = gsap.to(el, {
      ...animate,
      scrollTrigger: {
        trigger: el,
        start: "top 88%",
        end: "top 15%",
        toggleActions: once
          ? "play none none none"
          : "play reverse play reverse",
      },
    });

    return () => {
      tween.kill();
    };
  }, [direction, delay, duration, distance, once]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

/**
 * Parallax scroll effect - elements move at different speeds
 */
export function ScrollParallax({
  children,
  className = "",
  speed = 0.5,
}: {
  children: ReactNode;
  className?: string;
  speed?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const tween = gsap.to(el, {
      yPercent: speed * -50,
      ease: "none",
      scrollTrigger: {
        trigger: el,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    return () => {
      tween.kill();
    };
  }, [speed]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
