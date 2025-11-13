"use client";

import { useEffect, useState } from "react";
import Button from "./ui/Button";
import { Github, Download, ArrowDown } from "lucide-react";
import { fetchGitHubUser, type GitHubUser } from "@/lib/github";

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
      className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-16 bg-gradient-to-b from-black/50 via-[#0a0a0a]/50 to-black/50 backdrop-blur-sm"
    >
      <div className="max-w-4xl mx-auto text-center animate-fade-in-up">
        <div className="mb-8">
          {user?.avatar_url && (
            <img
              src={user.avatar_url}
              alt="Mohamed Asath"
              className="w-32 h-32 rounded-full mx-auto mb-6 border-4 border-blue-600/50 shadow-lg shadow-blue-500/20"
            />
          )}
        </div>

        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-4">
          M Mohamed Asath
        </h1>
        <p className="text-xl sm:text-2xl text-blue-400 mb-6 font-medium">
          Associate Software Engineer
        </p>
        <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
          Associate Software Engineer at IFS with 1+ year of experience, specializing in full-stack development, database management, and cloud architecture. Pursuing BSc in Software Engineering at SLIIT (CGPA 3.7).
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
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
            variant="primary"
            className="bg-gray-800 hover:bg-gray-700 border-gray-700"
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
        </div>

        <div className="flex items-center justify-center gap-8 text-sm text-gray-500 mb-8">
          {user && (
            <>
              <div>
                <span className="text-blue-400 font-semibold">{user.public_repos}</span>{" "}
                Repositories
              </div>
              <div>
                <span className="text-blue-400 font-semibold">{user.followers}</span>{" "}
                Followers
              </div>
            </>
          )}
        </div>

        <button
          onClick={() => scrollToSection("#about")}
          className="text-gray-500 hover:text-blue-400 transition-colors animate-bounce"
          aria-label="Scroll to about section"
        >
          <ArrowDown size={24} />
        </button>
      </div>
    </section>
  );
}

