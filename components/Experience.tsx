"use client";

import ScrollReveal from "./ScrollReveal";
import { ScrollParallax } from "./ScrollReveal";
import SectionHeader from "./SectionHeader";

const timeline = [
  {
    title: "Associate Software Engineer",
    org: "IFS",
    period: "May 2025 — Present",
    desc: "Develop and maintain enterprise-grade software solutions using Oracle Database and server-side technologies for international clients.",
    active: true,
  },
  {
    title: "Software Engineer Intern",
    org: "IFS",
    period: "Nov 2024 — Apr 2025",
    desc: "Gained hands-on experience in enterprise software development. Contributed to IFS Cloud platform modules used by enterprise clients globally.",
    active: false,
  },
  {
    title: "BSc (Hons) in Software Engineering",
    org: "SLIIT",
    period: "Feb 2023 — Aug 2027",
    desc: "CGPA 3.7/4.0. Dean's List — Year 2 Semester 2. Batch Representative for Software Engineering.",
    active: false,
  },
];

const achievements = [
  "Dean's List Recognition — Year 2 Semester 2, SLIIT",
  "Batch Representative — SLIIT Software Engineering",
  "Winner — Mini Hackathon, Microsoft Club SLIIT",
  "Published NPM package — KubeMCP",
];

const leadership = [
  "Secretary & Dev Team — SLIIT FOSS Community",
  "Secretary & Dev Team — Mozilla Campus Club SLIIT",
  "Team Leader — AIESEC in SLIIT (oGTe)",
  "Committee Member — Faculty of Computing Students Community",
];

export default function Experience() {
  return (
    <section id="experience" className="py-40 relative overflow-hidden section-glass">
      <div className="px-6 lg:px-0 lg:ml-[12vw] lg:mr-[8vw]">
        <SectionHeader label="Experience" title="Experience & Education" />
      </div>

      {/* Timeline — full-width rows */}
      <div className="mt-16">
        {timeline.map((item, i) => (
          <ScrollReveal key={item.title} delay={i * 0.1}>
            <div className="group border-b border-white/[0.04] hover:bg-white/[0.015] transition-all duration-700">
              <div className="px-6 lg:px-[12vw] py-10 grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8">
                {/* Period — left side */}
                <div className="lg:col-span-3 flex items-start gap-3">
                  {item.active && (
                    <span className="w-2 h-2 rounded-full bg-emerald-400 mt-1.5 flex-shrink-0 animate-pulse" />
                  )}
                  {!item.active && (
                    <span className="w-2 h-2 rounded-full bg-white/[0.1] mt-1.5 flex-shrink-0" />
                  )}
                  <div>
                    <span className="text-[11px] text-muted tracking-wider uppercase block">
                      {item.period}
                    </span>
                    <span className="text-xs text-accent/80 mt-1 block">
                      {item.org}
                    </span>
                  </div>
                </div>

                {/* Content — right side */}
                <div className="lg:col-span-9">
                  <h3 className="text-lg font-semibold text-foreground group-hover:text-accent transition-colors duration-300 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted leading-relaxed max-w-2xl">
                    {item.desc}
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>

      {/* Achievements & Leadership — side by side, staggered */}
      <div className="mt-20 grid grid-cols-1 lg:grid-cols-2">
        <ScrollReveal delay={0.1} direction="left">
          <div className="px-6 lg:pl-[12vw] lg:pr-12 py-10 border-b lg:border-b-0 lg:border-r border-white/[0.04]">
            <h3 className="text-[11px] font-semibold text-accent/80 tracking-[0.15em] uppercase mb-6">
              Achievements
            </h3>
            <ul className="space-y-4">
              {achievements.map((item, i) => (
                <ScrollParallax key={item} speed={0.05 * (i + 1)}>
                  <li className="text-sm text-muted hover:text-foreground transition-colors duration-300 pl-4 border-l border-white/[0.06] hover:border-accent/30">
                    {item}
                  </li>
                </ScrollParallax>
              ))}
            </ul>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.25} direction="right">
          <div className="px-6 lg:pl-12 lg:pr-[8vw] py-10 lg:mt-12">
            <h3 className="text-[11px] font-semibold text-accent/80 tracking-[0.15em] uppercase mb-6">
              Leadership
            </h3>
            <ul className="space-y-4">
              {leadership.map((item, i) => (
                <ScrollParallax key={item} speed={0.05 * (i + 1)}>
                  <li className="text-sm text-muted hover:text-foreground transition-colors duration-300 pl-4 border-l border-white/[0.06] hover:border-accent/30">
                    {item}
                  </li>
                </ScrollParallax>
              ))}
            </ul>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
