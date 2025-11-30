"use client";

import { useEffect, useState, useRef } from "react";
import { useIntersectionObserver } from "@/lib/hooks";
import ProjectCard from "./ui/ProjectCard";
import { type GitHubRepo } from "@/lib/github";
import { Github } from "lucide-react";
import Button from "./ui/Button";

export default function Projects() {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadRepos() {
      try {
        const [reposRes, pinnedRes] = await Promise.all([
          fetch("/api/github?type=repos&username=icy-r&limit=100"),
          fetch("/api/admin/pinned-repos"),
        ]);

        const reposData: GitHubRepo[] = await reposRes.json();
        const pinnedIds: number[] = await pinnedRes.json();

        // Filter repos to only show pinned ones, or show pinned first
        // If pinned IDs exist, show those. If not, show latest 6.
        // Or show pinned first, then others up to limit.

        let displayRepos: GitHubRepo[] = [];

        if (pinnedIds.length > 0) {
          const pinnedRepos = reposData.filter((repo) =>
            pinnedIds.includes(repo.id)
          );
          // Sort pinned repos by order in pinnedIds if needed, or just by update time
          // For now, let's just put them at the top
          const unpinnedRepos = reposData.filter(
            (repo) => !pinnedIds.includes(repo.id)
          );
          displayRepos = [...pinnedRepos, ...unpinnedRepos].slice(0, 6);
        } else {
          displayRepos = reposData.slice(0, 6);
        }

        setRepos(displayRepos);
      } catch (error) {
        console.error("Failed to load repositories:", error);
      } finally {
        setIsLoading(false);
      }
    }
    loadRepos();
  }, []);

  const sectionRef = useRef<HTMLElement>(null);
  useIntersectionObserver(sectionRef, 0.1, "0px");

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50 dark:bg-black/30 backdrop-blur-sm fade-in-section"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Projects</h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            A selection of my recent projects and contributions. Check out my GitHub
            for more!
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="bg-white dark:bg-[#111111] border border-gray-200 dark:border-[#1f1f1f] rounded-xl p-6 animate-pulse"
              >
                <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-5/6"></div>
              </div>
            ))}
          </div>
        ) : repos.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {repos.map((repo) => (
                <ProjectCard
                  key={repo.id}
                  name={repo.name}
                  description={repo.description}
                  language={repo.language}
                  stars={repo.stargazers_count}
                  url={repo.html_url}
                  homepage={repo.homepage}
                />
              ))}
            </div>
            <div className="text-center">
              <Button
                href="https://github.com/icy-r?tab=repositories"
                target="_blank"
                rel="noopener noreferrer"
                variant="outline"
              >
                <Github size={20} className="mr-2" />
                View All Repositories
              </Button>
            </div>
          </>
        ) : (
          <div className="text-center text-gray-600 dark:text-gray-400 py-12">
            <p>No projects found. Check back later!</p>
          </div>
        )}
      </div>
    </section>
  );
}

