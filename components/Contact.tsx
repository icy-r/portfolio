"use client";

import { useState } from "react";
import Button from "./ui/Button";
import Toast from "./ui/Toast";
import { Mail, Github, Send, Linkedin, Phone, MessageCircle, ArrowUpRight } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import PretextSectionTitle from "./PretextSectionTitle";

const contactLinks = [
  { icon: Mail, label: "Email", value: "asath12882@gmail.com", href: "mailto:asath12882@gmail.com" },
  { icon: Phone, label: "Phone", value: "+94 77 066 4182", href: "tel:+94770664182" },
  { icon: MessageCircle, label: "WhatsApp", value: "+94 77 066 4182", href: "https://wa.me/94770664182", external: true },
  { icon: Github, label: "GitHub", value: "icy-r", href: "https://github.com/icy-r", external: true },
  { icon: Linkedin, label: "LinkedIn", value: "mohomed-asath", href: "https://linkedin.com/in/mohomed-asath-92ab682a7", external: true },
];

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState({ isOpen: false, message: "", type: "success" as "success" | "error" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setFormData({ name: "", email: "", message: "" });
        setToast({ isOpen: true, message: "Message sent! I'll get back to you soon.", type: "success" });
      } else {
        setToast({ isOpen: true, message: "Failed to send. Please try again.", type: "error" });
      }
    } catch {
      setToast({ isOpen: true, message: "An error occurred. Please try again.", type: "error" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const inputClasses =
    "w-full px-0 py-4 bg-transparent border-0 border-b border-white/[0.12] text-foreground text-sm placeholder:text-muted/60 focus:outline-none focus:border-accent/50 transition-all duration-500";

  return (
    <section id="contact" className="py-40 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />

      <div className="px-6 lg:px-0 lg:ml-[12vw] lg:mr-[8vw]">
        <ScrollReveal>
          <PretextSectionTitle label="Contact" title="Get in touch" />
        </ScrollReveal>
      </div>

      <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-0">
        {/* Left — contact links as a simple list */}
        <div className="lg:col-span-4">
          {contactLinks.map((link, i) => (
            <ScrollReveal key={link.label} delay={0.05 + i * 0.05} direction="left">
              <a
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                className="group flex items-center justify-between px-6 lg:pl-[12vw] lg:pr-8 py-5 border-b border-white/[0.04] hover:bg-white/[0.015] transition-all duration-500"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <link.icon size={16} className="text-muted group-hover:text-accent transition-colors duration-300 flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="text-[10px] text-muted tracking-wider uppercase">{link.label}</p>
                    <p className="text-sm text-foreground/80 group-hover:text-foreground transition-colors duration-300 truncate">{link.value}</p>
                  </div>
                </div>
                <ArrowUpRight size={14} className="text-muted/50 group-hover:text-accent transition-all duration-300 flex-shrink-0" />
              </a>
            </ScrollReveal>
          ))}
        </div>

        {/* Right — form, clean and minimal */}
        <ScrollReveal delay={0.2} direction="right" className="lg:col-span-8">
          <div className="px-6 lg:px-16 py-12 section-glass border-l border-white/[0.04]">
            <p className="text-xs text-muted tracking-wider uppercase mb-10">
              Send a message
            </p>
            <form onSubmit={handleSubmit} className="space-y-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
                <div>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className={inputClasses}
                    placeholder="Name"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className={inputClasses}
                    placeholder="Email"
                  />
                </div>
              </div>
              <div>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className={`${inputClasses} resize-none`}
                  placeholder="Message"
                />
              </div>
              <div className="pt-6">
                <Button type="submit" variant="primary" disabled={isSubmitting}>
                  {isSubmitting ? "Sending..." : <><Send size={14} className="mr-2" />Send</>}
                </Button>
              </div>
            </form>
          </div>
        </ScrollReveal>
      </div>

      <Toast isOpen={toast.isOpen} message={toast.message} type={toast.type} onClose={() => setToast({ ...toast, isOpen: false })} />
    </section>
  );
}
