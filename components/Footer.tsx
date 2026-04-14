import Link from "next/link";
import { Github, Mail, Linkedin } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 px-6 lg:px-[12vw] border-t border-white/[0.04]">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-6">
          <p className="text-xs text-muted">
            &copy; {currentYear}
          </p>
          <p className="text-xs text-muted">Mohamed Asath</p>
        </div>
        <div className="flex items-center gap-6">
          {[
            { href: "https://github.com/icy-r", icon: Github, label: "GitHub" },
            { href: "https://linkedin.com/in/mohomed-asath-92ab682a7", icon: Linkedin, label: "LinkedIn" },
            { href: "mailto:asath12882@gmail.com", icon: Mail, label: "Email" },
          ].map((item) => (
            <Link
              key={item.label}
              href={item.href}
              target={item.href.startsWith("mailto") ? undefined : "_blank"}
              rel={item.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
              className="text-muted hover:text-foreground transition-colors duration-500"
              aria-label={item.label}
            >
              <item.icon size={15} />
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
