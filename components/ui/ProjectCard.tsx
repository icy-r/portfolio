"use client";

import Link from "next/link";
import { Github, ExternalLink, Star } from "lucide-react";
import { motion } from "framer-motion";

interface ProjectCardProps {
  name: string;
  description: string | null;
  language: string | null;
  stars: number;
  url: string;
  homepage?: string | null;
}

const languageColors: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Python: "#3572A5",
  Java: "#b07219",
  Kotlin: "#A97BFF",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Go: "#00ADD8",
  Rust: "#dea584",
  Shell: "#89e051",
};

export default function ProjectCard({
  name,
  description,
  language,
  stars,
  url,
  homepage,
}: ProjectCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="group relative bg-[#0a0a0a]/80 backdrop-blur-sm border border-white/[0.06] rounded-2xl p-6 transition-all duration-500 hover:border-white/[0.12] hover:shadow-[0_0_60px_rgba(167,139,250,0.04)] h-full flex flex-col"
    >
      {/* Subtle top glow on hover */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/0 to-transparent group-hover:via-accent/30 transition-all duration-500" />

      <div className="flex items-start justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground group-hover:text-accent transition-colors duration-300 flex-1 pr-2">
          {name}
        </h3>
        <div className="flex gap-3 flex-shrink-0">
          <Link
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted hover:text-foreground transition-colors duration-300"
            aria-label="View on GitHub"
            onClick={(e) => e.stopPropagation()}
          >
            <Github size={18} />
          </Link>
          {homepage && (
            <Link
              href={homepage}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted hover:text-foreground transition-colors duration-300"
              aria-label="View live site"
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink size={18} />
            </Link>
          )}
        </div>
      </div>

      {description && (
        <p className="text-muted text-sm leading-relaxed mb-4 line-clamp-3 flex-1">
          {description}
        </p>
      )}

      <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/[0.04]">
        {language && (
          <div className="flex items-center gap-2">
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{
                backgroundColor: languageColors[language] || "#737373",
              }}
            />
            <span className="text-xs text-muted font-medium">{language}</span>
          </div>
        )}
        {stars > 0 && (
          <div className="flex items-center gap-1 text-muted text-xs">
            <Star size={13} className="fill-yellow-500/80 text-yellow-500/80" />
            <span>{stars}</span>
          </div>
        )}
      </div>
    </motion.div>
  );
}
