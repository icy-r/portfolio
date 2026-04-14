"use client";

import Image from "next/image";
import Button from "./ui/Button";
import { ArrowDown } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import PretextHero from "./PretextHero";

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: [0.25, 0.4, 0.25, 1] as const },
});

interface HeroProps {
  avatarUrl?: string;
}

export default function Hero({ avatarUrl }: HeroProps) {
  const { scrollY } = useScroll();

  // Parallax and fade effects on scroll — longer range so content doesn't vanish too fast on mobile
  const heroOpacity = useTransform(scrollY, [0, 800], [1, 0]);
  const heroY = useTransform(scrollY, [0, 800], [0, -80]);
  const ctaOpacity = useTransform(scrollY, [100, 500], [1, 0]);
  const ctaScale = useTransform(scrollY, [100, 500], [1, 0.95]);

  const scrollToSection = (sectionId: string) => {
    const element = document.querySelector(sectionId);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center px-6 lg:px-8 pt-16 relative overflow-hidden"
    >
      <motion.div
        style={{ opacity: heroOpacity, y: heroY }}
        className="max-w-5xl mx-auto text-center z-10 w-full"
      >
        {/* Avatar */}
        <motion.div {...fadeUp(0.3)} className="mb-8">
          {avatarUrl && (
            <div className="relative inline-block group">
              <div className="absolute -inset-2 bg-accent/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
              <Image
                src={avatarUrl}
                alt="Mohamed Asath"
                width={100}
                height={100}
                className="relative w-24 h-24 rounded-full border border-white/[0.08] ring-1 ring-accent/20"
              />
            </div>
          )}
        </motion.div>

        {/* Status badge */}
        <motion.div {...fadeUp(0.5)} className="mb-6">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.06] text-xs text-muted tracking-wider uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Available for opportunities
          </span>
        </motion.div>

        {/* Pretext-rendered name */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <PretextHero name="Mohamed Asath" subtitle="Software Engineer" />
        </motion.div>

        {/* Description */}
        <motion.p
          {...fadeUp(1.2)}
          className="text-sm sm:text-base text-muted mb-12 max-w-lg mx-auto leading-relaxed"
        >
          Building scalable full-stack applications with modern web technologies.
          Passionate about clean architecture, cloud infrastructure, and open source.
        </motion.p>

        {/* CTAs - fade out on scroll (they move to navbar) */}
        <motion.div
          style={{ opacity: ctaOpacity, scale: ctaScale }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-16"
        >
          <motion.div {...fadeUp(1.4)} className="flex flex-col sm:flex-row items-center gap-3">
            <Button
              href="https://github.com/icy-r"
              target="_blank"
              rel="noopener noreferrer"
              variant="primary"
            >
              GitHub
            </Button>
            <Button
              href="/cv.pdf"
              download="Mohamed_Asath_CV.pdf"
              variant="secondary"
            >
              Resume
            </Button>
            <Button onClick={() => scrollToSection("#contact")} variant="outline">
              Get In Touch
            </Button>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          onClick={() => scrollToSection("#about")}
          className="text-muted/60 hover:text-accent transition-colors duration-500 absolute bottom-10 left-1/2 -translate-x-1/2"
          aria-label="Scroll down"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowDown size={18} />
          </motion.div>
        </motion.button>
      </motion.div>
    </section>
  );
}
