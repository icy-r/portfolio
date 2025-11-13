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
    <div className="group bg-[#111111]/80 backdrop-blur-sm border border-gray-800 rounded-xl p-6 transition-all duration-300 hover:border-blue-600/50 hover:shadow-lg hover:shadow-blue-500/20 hover:-translate-y-1 h-full flex flex-col">
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-xl font-semibold text-white group-hover:text-blue-400 transition-colors flex-1 pr-2">
          {name}
        </h3>
        <div className="flex gap-2 flex-shrink-0">
          <Link
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-blue-400 transition-colors"
            aria-label="View on GitHub"
            onClick={(e) => e.stopPropagation()}
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
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink size={20} />
            </Link>
          )}
        </div>
      </div>
      {description && (
        <p className="text-gray-400 mb-4 line-clamp-3 flex-1">{description}</p>
      )}
      <div className="flex items-center justify-between mt-auto pt-4">
        {language && (
          <span className="px-3 py-1 bg-blue-600/20 text-blue-400 rounded-full text-xs font-medium border border-blue-600/30">
            {language}
          </span>
        )}
        <div className="flex items-center gap-1.5 text-gray-400 text-sm">
          <svg
            className="w-4 h-4 fill-yellow-400/80"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
          <span className="font-medium">{stars}</span>
        </div>
      </div>
    </div>
  );
}

