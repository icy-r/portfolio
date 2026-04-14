"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Github, Download } from "lucide-react";
import { motion, AnimatePresence, useMotionValueEvent, useScroll } from "framer-motion";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

interface NavbarProps {
  avatarUrl?: string;
}

export default function Navbar({ avatarUrl }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 300);
  });

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node) && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMobileMenuOpen(false);
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const href = e.currentTarget.getAttribute("href");
    if (href?.startsWith("#")) {
      e.preventDefault();
      setIsMobileMenuOpen(false);
      if (pathname !== "/") {
        window.location.href = `/${href}`;
      } else {
        const element = document.querySelector(href);
        if (element) element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      {/* SVG Filter for liquid glass distortion */}
      <svg style={{ display: "none" }}>
        <filter id="lg-dist" x="0%" y="0%" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.012 0.012" numOctaves="2" seed="42" result="noise" />
          <feGaussianBlur in="noise" stdDeviation="3" result="blurred" />
          <feDisplacementMap in="SourceGraphic" in2="blurred" scale="40" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>

      {/* Floating Island Navbar */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
        className="fixed top-4 inset-x-0 z-50 flex justify-center pointer-events-none"
      >
        <motion.div
          layout
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="liquid-glass pointer-events-auto"
        >
          {/* Liquid glass layers */}
          <div className="liquid-glass__filter" />
          <div className="liquid-glass__overlay" />
          <div className="liquid-glass__specular" />

          {/* Content */}
          <div className="liquid-glass__content flex items-center gap-1 px-2 py-2">
            {/* Avatar - slides in on scroll */}
            <AnimatePresence>
              {isScrolled && avatarUrl && (
                <motion.div
                  initial={{ width: 0, opacity: 0, scale: 0.5 }}
                  animate={{ width: 32, opacity: 1, scale: 1 }}
                  exit={{ width: 0, opacity: 0, scale: 0.5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  className="overflow-hidden flex-shrink-0"
                >
                  <Image
                    src={avatarUrl}
                    alt="MA"
                    width={32}
                    height={32}
                    className="w-8 h-8 rounded-xl border border-white/[0.15]"
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Logo - when not scrolled */}
            <AnimatePresence>
              {!isScrolled && (
                <motion.div
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: "auto", opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  className="overflow-hidden"
                >
                  <Link
                    href="#home"
                    onClick={handleNavClick}
                    className="text-sm font-bold text-foreground hover:text-accent transition-colors duration-300 px-3 py-1 whitespace-nowrap"
                  >
                    MA<span className="text-accent">.</span>
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Divider */}
            <div className="w-px h-5 bg-white/[0.1] hidden md:block" />

            {/* Nav links */}
            <div className="hidden md:flex items-center gap-0.5">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={handleNavClick}
                  className="text-[11px] font-medium text-white/60 hover:text-white hover:bg-white/[0.08] px-3 py-1.5 rounded-xl transition-all duration-300 tracking-wide uppercase whitespace-nowrap"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Hero buttons - slide in on scroll */}
            <AnimatePresence>
              {isScrolled && (
                <>
                  <motion.div
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 1, opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    className="h-5 bg-white/[0.1] hidden md:block"
                  />
                  <motion.a
                    href="https://github.com/icy-r"
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ width: 0, opacity: 0, scale: 0.8 }}
                    animate={{ width: "auto", opacity: 1, scale: 1 }}
                    exit={{ width: 0, opacity: 0, scale: 0.8 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25, delay: 0.05 }}
                    className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-accent/20 text-accent text-[11px] font-medium hover:bg-accent/30 transition-colors duration-300 whitespace-nowrap overflow-hidden"
                  >
                    <Github size={13} />
                    GitHub
                  </motion.a>
                  <motion.a
                    href="/cv.pdf"
                    download="Mohamed_Asath_CV.pdf"
                    initial={{ width: 0, opacity: 0, scale: 0.8 }}
                    animate={{ width: "auto", opacity: 1, scale: 1 }}
                    exit={{ width: 0, opacity: 0, scale: 0.8 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25, delay: 0.1 }}
                    className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.08] text-white/80 text-[11px] font-medium hover:bg-white/[0.12] transition-colors duration-300 whitespace-nowrap overflow-hidden"
                  >
                    <Download size={13} />
                    CV
                  </motion.a>
                </>
              )}
            </AnimatePresence>

            {/* Mobile menu button */}
            <button
              className={cn(
                "md:hidden text-white/60 hover:text-white transition-all duration-300 p-2 rounded-xl hover:bg-white/[0.08]",
                isMobileMenuOpen && "opacity-0 pointer-events-none"
              )}
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={18} />
            </button>
          </div>
        </motion.div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-[60] md:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              ref={menuRef}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute top-0 right-0 h-full w-72 max-w-[80vw] bg-[#0a0a0a]/98 backdrop-blur-xl border-l border-white/[0.06]"
            >
              <div className="flex flex-col h-full pt-20 px-6">
                <button
                  className="absolute top-5 right-5 text-muted hover:text-foreground transition-colors p-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                  aria-label="Close menu"
                >
                  <X size={22} />
                </button>

                <nav className="flex flex-col gap-1">
                  {navLinks.map((link, index) => (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 + 0.1 }}
                    >
                      <Link
                        href={link.href}
                        onClick={handleNavClick}
                        className="block py-3 px-4 rounded-xl text-muted hover:text-foreground hover:bg-white/[0.04] transition-all duration-300 text-sm font-medium tracking-wide uppercase"
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  ))}
                </nav>

                <div className="mt-6 flex flex-col gap-2">
                  <a
                    href="https://github.com/icy-r"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 py-3 px-4 rounded-xl bg-accent/20 text-accent text-sm font-medium"
                  >
                    <Github size={16} /> GitHub
                  </a>
                  <a
                    href="/cv.pdf"
                    download="Mohamed_Asath_CV.pdf"
                    className="flex items-center gap-2 py-3 px-4 rounded-xl bg-white/[0.06] text-foreground/80 text-sm font-medium"
                  >
                    <Download size={16} /> Download CV
                  </a>
                </div>

                <div className="mt-auto pb-8 pt-8 border-t border-white/[0.06]">
                  <p className="text-xs text-muted/60 tracking-wide">Mohamed Asath</p>
                  <p className="text-xs text-muted mt-1">Software Engineer</p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
