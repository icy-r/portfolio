"use client";

import { useRef } from "react";
import { useIntersectionObserver } from "@/lib/utils";
import Card from "./ui/Card";
import Timeline, { TimelineItem } from "./ui/Timeline";

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  useIntersectionObserver(sectionRef, 0.1, "0px");

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0a0a0a]/30 backdrop-blur-sm fade-in-section"
    >
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-white mb-4 text-center">
          Experience & Education
        </h2>
        <div className="w-24 h-1 bg-blue-600 mx-auto mb-12"></div>

        <Card>
          <Timeline>
            <TimelineItem
              title="Associate Software Engineer"
              organization="IFS"
              period="May 2025 - Present"
              description="Promoted after completing 6-month internship. Develop and maintain enterprise-grade software solutions using Oracle Database and server-side technologies for international clients. Collaborate with cross-functional teams to deliver scalable applications, improving system efficiency and user experience."
            />
            <TimelineItem
              title="Software Engineer Intern"
              organization="IFS"
              period="November 2024 - April 2025"
              description="Gained hands-on experience in enterprise software development, working with database management systems and real-world production code. Assisted in developing features for IFS Cloud platform, contributing to modules used by enterprise clients globally."
            />
            <TimelineItem
              title="BSc (Hons) in Software Engineering"
              organization="Sri Lanka Institute of Information Technology (SLIIT)"
              period="February 2023 - August 2027 (Expected)"
              description="Pursuing degree with CGPA of 3.7/4.0. Dean's List Recognition - Year 2 Semester 2. Batch Representative for Software Engineering program."
              isLast
            />
          </Timeline>
        </Card>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card hover>
            <h3 className="text-xl font-semibold text-white mb-3">
              Key Achievements
            </h3>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-start">
                <span className="text-blue-400 mr-2">•</span>
                <span>Dean's List Recognition - Year 2 Semester 2, SLIIT</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-2">•</span>
                <span>Batch Representative - SLIIT Software Engineering</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-2">•</span>
                <span>Winner - Mini Hackathon, Microsoft Club SLIIT</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-2">•</span>
                <span>Published NPM package - KubeMCP</span>
              </li>
            </ul>
          </Card>
          <Card hover>
            <h3 className="text-xl font-semibold text-white mb-3">
              Leadership Roles
            </h3>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-start">
                <span className="text-blue-400 mr-2">•</span>
                <span>Secretary & Dev Team - SLIIT FOSS Community</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-2">•</span>
                <span>Secretary & Dev Team - Mozilla Campus Club SLIIT</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-2">•</span>
                <span>Team Leader - AIESEC in SLIIT (oGTe)</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-2">•</span>
                <span>Committee Member - Faculty of Computing Students Community</span>
              </li>
            </ul>
          </Card>
        </div>
      </div>
    </section>
  );
}

