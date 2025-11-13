import Link from "next/link";
import { Github, ExternalLink } from "lucide-react";

interface ProjectCardProps {
  name: string;
  description: string | null;
  language: string | null;
  stars: number;
  url: string;
  homepage?: string | null;
}

export default function ProjectCard({
  name,
  description,
  language,
  stars,
  url,
  homepage,
}: ProjectCardProps) {
  return (
    <div className="group bg-[#111111] border border-[#1f1f1f] rounded-xl p-6 transition-all duration-300 hover:border-blue-600/50 hover:shadow-lg hover:shadow-blue-500/10 hover:-translate-y-1">
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-xl font-semibold text-white group-hover:text-blue-400 transition-colors">
          {name}
        </h3>
        <div className="flex gap-2">
          <Link
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-blue-400 transition-colors"
            aria-label="View on GitHub"
          >
            <Github size={20} />
          </Link>
          {homepage && (
            <Link
              href={homepage}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-400 transition-colors"
              aria-label="View live site"
            >
              <ExternalLink size={20} />
            </Link>
          )}
        </div>
      </div>
      {description && (
        <p className="text-gray-400 mb-4 line-clamp-3">{description}</p>
      )}
      <div className="flex items-center justify-between">
        {language && (
          <span className="px-3 py-1 bg-blue-600/20 text-blue-400 rounded-full text-sm font-medium">
            {language}
          </span>
        )}
        <div className="flex items-center gap-1 text-gray-500 text-sm">
          <span>⭐</span>
          <span>{stars}</span>
        </div>
      </div>
    </div>
  );
}

