"use client";

import { useIntersectionObserver } from "@/lib/utils";
import { useRef } from "react";
import Card from "./ui/Card";

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  useIntersectionObserver(sectionRef, 0.1, "0px");

  return (
    <section
      ref={sectionRef}
      id="about"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-black fade-in-section"
    >
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-white mb-4 text-center">
          About Me
        </h2>
        <div className="w-24 h-1 bg-blue-600 mx-auto mb-12"></div>

        <Card className="mb-8">
          <p className="text-gray-300 leading-relaxed mb-6">
            Associate Software Engineer with 1+ year of experience at IFS, specializing in full-stack development, database management, and cloud architecture. Currently pursuing BSc in Software Engineering at SLIIT with a CGPA of 3.7.
          </p>
          <p className="text-gray-300 leading-relaxed mb-6">
            Proven track record in developing scalable applications using MERN stack, Docker, and Kubernetes. Active contributor to open-source projects with strong leadership experience. Delivered enterprise-grade solutions while maintaining academic excellence, including Dean's List recognition.
          </p>
          <p className="text-gray-300 leading-relaxed">
            Currently working at IFS, developing and maintaining enterprise-grade software solutions using Oracle Database and server-side technologies for international clients. Passionate about building innovative solutions and contributing to the open-source community.
          </p>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card hover>
            <h3 className="text-xl font-semibold text-white mb-2">Education</h3>
            <p className="text-gray-400">BSc (Hons) Software Engineering</p>
            <p className="text-gray-500 text-sm mt-1">SLIIT | CGPA: 3.7/4.0</p>
          </Card>
          <Card hover>
            <h3 className="text-xl font-semibold text-white mb-2">Experience</h3>
            <p className="text-gray-400">1+ Year at IFS</p>
            <p className="text-gray-500 text-sm mt-1">Associate Software Engineer</p>
          </Card>
          <Card hover>
            <h3 className="text-xl font-semibold text-white mb-2">Location</h3>
            <p className="text-gray-400">Colombo, Sri Lanka</p>
            <p className="text-gray-500 text-sm mt-1">Available for opportunities</p>
          </Card>
        </div>
      </div>
    </section>
  );
}

