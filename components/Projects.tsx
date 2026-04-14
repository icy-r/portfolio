"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { type GitHubRepo } from "@/lib/github";
import { Github, ExternalLink, Star, ArrowUpRight } from "lucide-react";
import Button from "./ui/Button";
import ScrollReveal from "./ScrollReveal";
import SectionHeader from "./SectionHeader";

const languageColors: Record<string, string> = {
  TypeScript: "#3178c6", JavaScript: "#f1e05a", Python: "#3572A5",
  Java: "#b07219", Kotlin: "#A97BFF", HTML: "#e34c26",
  CSS: "#563d7c", Go: "#00ADD8", Rust: "#dea584", Shell: "#89e051",
};

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
        const pinnedData = await pinnedRes.json();
        const pinnedIds: number[] = Array.isArray(pinnedData)
          ? pinnedData.map((p: { repoId?: number }) => p.repoId).filter((id): id is number => typeof id === "number")
          : [];
        let displayRepos: GitHubRepo[];
        if (pinnedIds.length > 0) {
          const pinned = reposData.filter((r) => pinnedIds.includes(r.id));
          const unpinned = reposData.filter((r) => !pinnedIds.includes(r.id));
          displayRepos = [...pinned, ...unpinned].slice(0, 6);
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

  return (
    <section id="projects" className="py-40 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />

      <div className="px-6 lg:px-0 lg:ml-[12vw] lg:mr-[8vw]">
        <SectionHeader label="Projects" title="Things I've built" />
      </div>

      {/* Projects as full-width rows instead of card grid */}
      <div className="mt-16">
        {isLoading ? (
          <div className="space-y-0">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="border-b border-white/[0.04] px-6 lg:px-[12vw] py-8 animate-pulse">
                <div className="h-5 bg-white/[0.04] rounded w-48 mb-3" />
                <div className="h-3 bg-white/[0.03] rounded w-96" />
              </div>
            ))}
          </div>
        ) : repos.length > 0 ? (
          <>
            {repos.map((repo, i) => (
              <ScrollReveal key={repo.id} delay={i * 0.06}>
                <Link
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block border-b border-white/[0.04] hover:bg-white/[0.015] transition-all duration-700"
                >
                  <div className="px-6 lg:px-[12vw] py-8 flex items-start sm:items-center justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      {/* Project name + language */}
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg sm:text-xl font-semibold text-foreground group-hover:text-accent transition-colors duration-300 truncate">
                          {repo.name}
                        </h3>
                        {repo.language && (
                          <div className="hidden sm:flex items-center gap-1.5 flex-shrink-0">
                            <span
                              className="w-2 h-2 rounded-full"
                              style={{ backgroundColor: languageColors[repo.language] || "#737373" }}
                            />
                            <span className="text-[10px] text-muted tracking-wide">{repo.language}</span>
                          </div>
                        )}
                      </div>
                      {/* Description */}
                      {repo.description && (
                        <p className="text-sm text-muted line-clamp-1 max-w-2xl">
                          {repo.description}
                        </p>
                      )}
                    </div>

                    {/* Right side — stars + arrow */}
                    <div className="flex items-center gap-4 flex-shrink-0">
                      {repo.stargazers_count > 0 && (
                        <div className="hidden sm:flex items-center gap-1 text-muted text-xs">
                          <Star size={12} className="fill-yellow-500/60 text-yellow-500/60" />
                          {repo.stargazers_count}
                        </div>
                      )}
                      {repo.homepage && (
                        <span className="text-muted">
                          <ExternalLink size={14} />
                        </span>
                      )}
                      <ArrowUpRight
                        size={18}
                        className="text-muted/60 group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300"
                      />
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}

            <ScrollReveal delay={0.4}>
              <div className="px-6 lg:px-[12vw] py-10">
                <Button
                  href="https://github.com/icy-r?tab=repositories"
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="ghost"
                  className="text-muted/50 hover:text-accent"
                >
                  <Github size={14} className="mr-2" />
                  View all on GitHub
                  <ArrowUpRight size={14} className="ml-1" />
                </Button>
              </div>
            </ScrollReveal>
          </>
        ) : (
          <div className="text-center text-muted py-16">
            <p className="text-sm">No projects found.</p>
          </div>
        )}
      </div>
    </section>
  );
}
