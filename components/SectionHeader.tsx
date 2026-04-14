"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface SectionHeaderProps {
  label: string;
  title: string;
  description?: string;
}

export default function SectionHeader({ label, title, description }: SectionHeaderProps) {
  const labelRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const els = [labelRef.current, titleRef.current, descRef.current].filter(Boolean);

    els.forEach((el, i) => {
      if (!el) return;
      gsap.set(el, { opacity: 0, y: 20 });
      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: i * 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
      });
    });
  }, []);

  return (
    <div>
      <p
        ref={labelRef}
        className="text-xs text-accent tracking-[0.2em] uppercase mb-3 font-medium"
      >
        {label}
      </p>
      <h2
        ref={titleRef}
        className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground tracking-tight"
      >
        {title}
      </h2>
      {description && (
        <p ref={descRef} className="text-muted text-sm mt-4 max-w-lg">
          {description}
        </p>
      )}
    </div>
  );
}
