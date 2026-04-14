"use client";

import ScrollReveal from "./ScrollReveal";
import { ScrollParallax } from "./ScrollReveal";
import SectionHeader from "./SectionHeader";
import { MapPin, GraduationCap, Briefcase } from "lucide-react";

export default function About() {
  return (
    <section id="about" className="py-40 relative overflow-hidden">
      {/* Full-width accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />

      <div className="px-6 lg:px-0 lg:ml-[12vw] lg:mr-[8vw]">
        <SectionHeader label="About" title="A bit about me" />
      </div>

      {/* Asymmetric 2-column layout */}
      <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-0">
        {/* Left column — bio text, bleeds to edge */}
        <ScrollReveal delay={0.1} className="lg:col-span-7">
          <div className="px-6 lg:pl-[12vw] lg:pr-16 py-12 section-glass border-y border-white/[0.04] overflow-hidden">
            <p className="text-muted leading-[2] text-base lg:text-lg mb-8">
              Associate Software Engineer with 1+ year of experience at IFS,
              specializing in full-stack development, database management, and
              cloud architecture.
            </p>
            <p className="text-muted leading-[2] text-sm lg:text-base mb-8">
              Proven track record in developing scalable applications using MERN
              stack, Docker, and Kubernetes. Active contributor to open-source
              projects with strong leadership experience.
            </p>
            <p className="text-muted leading-[2] text-sm">
              Currently developing enterprise-grade software solutions using
              Oracle Database and server-side technologies for international
              clients at IFS.
            </p>
          </div>
        </ScrollReveal>

        {/* Right column — info cards, offset vertically */}
        <div className="lg:col-span-5 flex flex-col gap-0 lg:-mt-12">
          {[
            {
              icon: GraduationCap,
              title: "Education",
              line1: "BSc (Hons) Software Engineering",
              line2: "SLIIT  ·  CGPA 3.7/4.0",
              delay: 0.2,
            },
            {
              icon: Briefcase,
              title: "Experience",
              line1: "1+ Year at IFS",
              line2: "Associate Software Engineer",
              delay: 0.3,
            },
            {
              icon: MapPin,
              title: "Location",
              line1: "Colombo, Sri Lanka",
              line2: "Open to remote work",
              delay: 0.4,
            },
          ].map((item) => (
            <ScrollReveal key={item.title} delay={item.delay} direction="right">
              <div className="group px-6 lg:px-10 py-8 border-b border-white/[0.04] hover:bg-white/[0.02] transition-all duration-700">
                <div className="flex items-start gap-4">
                  <ScrollParallax speed={0.2}>
                    <div className="w-10 h-10 rounded-xl bg-accent/[0.08] border border-accent/[0.15] flex items-center justify-center flex-shrink-0 group-hover:border-accent/30 transition-colors duration-500">
                      <item.icon size={18} className="text-accent/60" />
                    </div>
                  </ScrollParallax>
                  <div>
                    <h3 className="text-xs font-semibold text-foreground tracking-wider uppercase mb-2">
                      {item.title}
                    </h3>
                    <p className="text-muted text-sm">{item.line1}</p>
                    <p className="text-muted text-xs mt-1">{item.line2}</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
