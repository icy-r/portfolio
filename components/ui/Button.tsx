import Link from "next/link";
import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "outline";
  className?: string;
  target?: string;
  rel?: string;
  type?: "button" | "submit" | "reset";
  download?: string;
  disabled?: boolean;
}

export default function Button({
  children,
  href,
  onClick,
  variant = "primary",
  className = "",
  target,
  rel,
  type = "button",
  download,
  disabled = false,
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center px-6 py-3 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black";

  const variants = {
    primary:
      "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 shadow-lg shadow-blue-500/50",
    secondary:
      "bg-gray-800 text-white hover:bg-gray-700 focus:ring-gray-500 border border-gray-700",
    outline:
      "border-2 border-gray-700 text-gray-300 hover:border-blue-600 hover:text-blue-400 focus:ring-blue-500 bg-transparent",
  };

  const combinedClassName = `${baseStyles} ${variants[variant]} ${className} ${disabled ? "opacity-50 cursor-not-allowed" : ""}`;

      if (href) {
        // Use regular anchor tag for downloads (Next.js Link doesn't support download attribute)
        if (download) {
          return (
            <a
              href={href}
              download={download}
              className={combinedClassName}
              target={target}
              rel={rel}
              aria-disabled={disabled}
            >
              {children}
            </a>
          );
        }
        return (
          <Link
            href={href}
            className={combinedClassName}
            target={target}
            rel={rel}
            aria-disabled={disabled}
          >
            {children}
          </Link>
        );
      }

      return (
        <button 
          type={type} 
          onClick={onClick} 
          className={combinedClassName}
          disabled={disabled}
        >
          {children}
        </button>
      );
}

