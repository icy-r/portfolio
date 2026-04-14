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
    <div className="relative pl-8 border-l border-white/[0.08]">
      {children}
    </div>
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
    <div className={isLast ? "" : "pb-10"}>
      <div className="absolute -left-[5px] mt-1.5 w-2.5 h-2.5 rounded-full bg-accent/80 ring-4 ring-background" />
      <div className="ml-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
          <div>
            <h3 className="text-base font-semibold text-foreground">
              {title}
            </h3>
            {organization && (
              <p className="text-accent/80 text-sm mt-0.5">{organization}</p>
            )}
          </div>
          <span className="text-muted text-xs font-medium tracking-wide uppercase mt-1 sm:mt-0">
            {period}
          </span>
        </div>
        <div className="text-muted text-sm leading-relaxed">{description}</div>
      </div>
    </div>
  );
}
