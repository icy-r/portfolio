import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

export default function Card({
  children,
  className = "",
  hover = false,
  onClick,
}: CardProps) {
  return (
    <div
      className={cn(
        "bg-[#0a0a0a]/80 border border-white/[0.06] rounded-2xl p-6 backdrop-blur-sm transition-all duration-500",
        hover &&
          "hover:border-white/[0.12] hover:bg-white/[0.03] hover:shadow-[0_0_40px_rgba(167,139,250,0.06)] hover:-translate-y-1",
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
