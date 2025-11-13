import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export default function Card({ children, className = "", hover = false }: CardProps) {
  const baseStyles =
    "bg-[#111111] border border-[#1f1f1f] rounded-xl p-6 transition-all duration-300";
  const hoverStyles = hover
    ? "hover:border-blue-600/50 hover:shadow-lg hover:shadow-blue-500/10 hover:-translate-y-1"
    : "";

  return (
    <div className={`${baseStyles} ${hoverStyles} ${className}`}>
      {children}
    </div>
  );
}

