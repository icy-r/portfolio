import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

export default function Card({ children, className = "", hover = false, onClick }: CardProps) {
  const baseStyles =
    "bg-white dark:bg-[#111111] border border-gray-200 dark:border-[#1f1f1f] rounded-xl p-6 transition-all duration-300 shadow-sm dark:shadow-none";
  const hoverStyles = hover
    ? "hover:border-blue-500 dark:hover:border-blue-600/50 hover:shadow-lg hover:shadow-blue-500/20 dark:hover:shadow-blue-500/10 hover:-translate-y-1"
    : "";

  return (
    <div className={`${baseStyles} ${hoverStyles} ${className}`} onClick={onClick}>
      {children}
    </div>
  );
}


