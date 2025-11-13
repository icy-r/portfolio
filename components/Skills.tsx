"use client";

import { useRef } from "react";
import { useIntersectionObserver } from "@/lib/utils";
import Card from "./ui/Card";

const skills = [
  {
    category: "Languages",
    technologies: [
      "JavaScript",
      "TypeScript",
      "Java",
      "Python",
      "SQL",
      "Kotlin",
    ],
  },
  {
    category: "Frontend",
    technologies: [
      "React.js",
      "Vue.js",
      "HTML5",
      "CSS3",
      "Vite",
      "Next.js",
    ],
  },
  {
    category: "Backend",
    technologies: [
      "Node.js",
      "Express.js",
      "RESTful APIs",
    ],
  },
  {
    category: "Databases",
    technologies: [
      "MongoDB",
      "Oracle Database",
      "SQL",
      "MySQL",
    ],
  },
  {
    category: "DevOps & Cloud",
    technologies: [
      "Docker",
      "Kubernetes",
      "Git",
      "Linux",
      "Cloud Architecture",
    ],
  },
  {
    category: "Tools & Methodologies",
    technologies: [
      "Agile",
      "Version Control",
      "MCP",
      "CI/CD",
    ],
  },
];

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  useIntersectionObserver(sectionRef, 0.1, "0px");

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0a0a0a]/30 backdrop-blur-sm fade-in-section"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">Skills & Technologies</h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Technologies and tools I work with to build modern web applications
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skillGroup, index) => (
            <Card key={index} hover>
              <h3 className="text-xl font-semibold text-white mb-4">
                {skillGroup.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {skillGroup.technologies.map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className="px-3 py-1.5 bg-blue-600/20 text-blue-400 rounded-lg text-sm font-medium border border-blue-600/30"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </Card>
          ))}
        </div>

      </div>
    </section>
  );
}

