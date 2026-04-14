"use client";

import ScrollReveal from "./ScrollReveal";
import PretextSectionTitle from "./PretextSectionTitle";

const skills = [
  { category: "Languages", items: ["JavaScript", "TypeScript", "Java", "Python", "SQL", "Kotlin"] },
  { category: "Frontend", items: ["React.js", "Next.js", "Vue.js", "HTML5", "CSS3", "Vite"] },
  { category: "Backend", items: ["Node.js", "Express.js", "RESTful APIs"] },
  { category: "Databases", items: ["MongoDB", "Oracle Database", "MySQL", "SQL"] },
  { category: "DevOps & Cloud", items: ["Docker", "Kubernetes", "Git", "Linux", "CI/CD"] },
  { category: "Tools", items: ["Agile", "Version Control", "MCP"] },
];

export default function Skills() {
  return (
    <section id="skills" className="py-40 relative overflow-hidden section-glass">
      <div className="px-6 lg:px-0 lg:ml-[12vw] lg:mr-[8vw]">
        <ScrollReveal>
          <PretextSectionTitle label="Skills" title="Technologies I work with" />
        </ScrollReveal>
      </div>

      {/* Horizontal flowing skill ribbons instead of grid boxes */}
      <div className="mt-16 space-y-0">
        {skills.map((group, i) => (
          <ScrollReveal
            key={group.category}
            delay={i * 0.06}
            direction={i % 2 === 0 ? "left" : "right"}
          >
            <div className="group border-b border-white/[0.04] hover:bg-white/[0.015] transition-all duration-700">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-0 px-6 lg:px-[12vw] py-6">
                {/* Category label — fixed width */}
                <div className="sm:w-48 flex-shrink-0">
                  <span className="text-[11px] font-semibold text-accent tracking-[0.15em] uppercase">
                    {group.category}
                  </span>
                </div>

                {/* Skills — flow horizontally */}
                <div className="flex flex-wrap gap-3 flex-1">
                  {group.items.map((tech) => (
                    <span
                      key={tech}
                      className="text-sm text-muted hover:text-foreground transition-colors duration-300 cursor-default relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-accent/40 hover:after:w-full after:transition-all after:duration-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Count */}
                <div className="hidden lg:block text-right w-12">
                  <span className="text-xs text-muted/70 tabular-nums">
                    {String(group.items.length).padStart(2, "0")}
                  </span>
                </div>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
