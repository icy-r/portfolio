import Link from "next/link";
import { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const MotionLink = motion.create(Link);
const MotionA = motion.create("a");
const MotionButton = motion.create("button");

interface ButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "outline" | "ghost";
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
    "inline-flex items-center justify-center px-6 py-3 rounded-xl font-medium text-sm tracking-wide transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:ring-offset-2 focus:ring-offset-background";

  const variants = {
    primary:
      "bg-accent text-black hover:bg-accent/90 shadow-lg shadow-accent/20",
    secondary:
      "bg-white/[0.06] text-foreground hover:bg-white/[0.1] border border-white/[0.08]",
    outline:
      "border border-white/[0.12] text-foreground hover:border-accent/50 hover:text-accent bg-transparent",
    ghost:
      "text-muted hover:text-foreground bg-transparent",
  };

  const combinedClassName = cn(
    baseStyles,
    variants[variant],
    disabled && "opacity-40 cursor-not-allowed pointer-events-none",
    className
  );

  const hoverProps = {
    whileHover: { scale: 1.02 },
    whileTap: { scale: 0.98 },
    transition: { type: "spring" as const, stiffness: 400, damping: 17 },
  };

  if (href) {
    if (download) {
      return (
        <MotionA
          href={href}
          download={download}
          className={combinedClassName}
          target={target}
          rel={rel}
          aria-disabled={disabled}
          {...hoverProps}
        >
          {children}
        </MotionA>
      );
    }
    return (
      <MotionLink
        href={href}
        className={combinedClassName}
        target={target}
        rel={rel}
        aria-disabled={disabled}
        {...hoverProps}
      >
        {children}
      </MotionLink>
    );
  }

  return (
    <MotionButton
      type={type}
      onClick={onClick}
      className={combinedClassName}
      disabled={disabled}
      {...hoverProps}
    >
      {children}
    </MotionButton>
  );
}
