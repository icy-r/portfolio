"use client";

import { useEffect, useState } from "react";
import Button from "./ui/Button";
import { Github, Download, ArrowDown } from "lucide-react";
import { fetchGitHubUser, type GitHubUser } from "@/lib/github";
import { motion } from "framer-motion";

export default function Hero() {
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      try {
        const response = await fetch("/api/github?type=user&username=icy-r");
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error("Failed to load user data:", error);
      } finally {
        setIsLoading(false);
      }
    }
    loadUser();
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.querySelector(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-16 relative overflow-hidden"
    >
      {/* Background gradient mesh is now handled by globals.css or BackgroundElements, 
          but we can add a subtle overlay here if needed */}

      <div className="max-w-4xl mx-auto text-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          {user?.avatar_url && (
            <div className="relative inline-block group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200" />
              <img
                src={user.avatar_url}
                alt="Mohamed Asath"
                className="relative w-32 h-32 rounded-full mx-auto border-4 border-black shadow-2xl"
              />
            </div>
          )}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-4 tracking-tight"
        >
          M Mohamed <span className="text-gradient">Asath</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xl sm:text-2xl text-blue-400 mb-6 font-medium"
        >
          Associate Software Engineer
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto leading-relaxed"
        >
          Associate Software Engineer at IFS with 1+ year of experience, specializing in full-stack development, database management, and cloud architecture. Pursuing BSc in Software Engineering at SLIIT (CGPA 3.7).
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
        >
          <Button
            href="https://github.com/icy-r"
            target="_blank"
            rel="noopener noreferrer"
            variant="primary"
          >
            <Github size={20} className="mr-2" />
            View GitHub
          </Button>
          <Button
            href="/cv.pdf"
            download="Mohamed_Asath_CV.pdf"
            variant="secondary"
          >
            <Download size={20} className="mr-2" />
            Download CV
          </Button>
          <Button
            onClick={() => scrollToSection("#contact")}
            variant="outline"
          >
            Get In Touch
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex items-center justify-center gap-8 text-sm text-gray-500 mb-8"
        >
          {user && (
            <>
              <div className="flex flex-col items-center">
                <span className="text-2xl font-bold text-white">{user.public_repos}</span>
                <span>Repositories</span>
              </div>
              <div className="w-px h-8 bg-gray-800" />
              <div className="flex flex-col items-center">
                <span className="text-2xl font-bold text-white">{user.followers}</span>
                <span>Followers</span>
              </div>
            </>
          )}
        </motion.div>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          onClick={() => scrollToSection("#about")}
          className="text-gray-500 hover:text-blue-400 transition-colors animate-bounce absolute bottom-8 left-1/2 -translate-x-1/2"
          aria-label="Scroll to about section"
        >
          <ArrowDown size={24} />
        </motion.button>
      </div>
    </section>
  );
}

