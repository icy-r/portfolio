import { ReactNode } from "react";

interface TimelineItemProps {
  title: string;
  organization?: string;
  period: string;
  description: string | ReactNode;
  isLast?: boolean;
}

export default function Timeline({ children }: { children: ReactNode }) {
  return (
    <div className="relative pl-8 border-l-2 border-gray-800">{children}</div>
  );
}

export function TimelineItem({
  title,
  organization,
  period,
  description,
  isLast = false,
}: TimelineItemProps) {
  return (
    <div className={`relative pb-8 ${isLast ? "" : ""}`}>
      <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-blue-600 border-2 border-black"></div>
      <div className="ml-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
          <div>
            <h3 className="text-lg font-semibold text-white">{title}</h3>
            {organization && (
              <p className="text-blue-400 text-sm mt-1">{organization}</p>
            )}
          </div>
          <span className="text-gray-500 text-sm mt-1 sm:mt-0">{period}</span>
        </div>
        <div className="text-gray-400 text-sm leading-relaxed">
          {description}
        </div>
      </div>
    </div>
  );
}

