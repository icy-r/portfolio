"use client";

import { useState, useRef } from "react";
import { useIntersectionObserver } from "@/lib/utils";
import Card from "./ui/Card";
import Button from "./ui/Button";
import { Mail, Github, Globe, Send, Linkedin, Phone } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // In a real application, you would send this to an API endpoint
    // For now, we'll use mailto as a fallback
    const mailtoLink = `mailto:asath12882@gmail.com?subject=Contact from ${formData.name}&body=${encodeURIComponent(formData.message)}`;
    window.location.href = mailtoLink;
    
    setTimeout(() => {
      setIsSubmitting(false);
      setFormData({ name: "", email: "", message: "" });
    }, 1000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const sectionRef = useRef<HTMLElement>(null);
  useIntersectionObserver(sectionRef, 0.1, "0px");

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0a0a0a]/30 backdrop-blur-sm fade-in-section"
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">Get In Touch</h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-400 max-w-2xl mx-auto">
            I'm always open to discussing new projects, opportunities, or just
            having a chat about technology!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <Card hover>
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center mr-4">
                <Mail className="text-blue-400" size={24} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Email</h3>
                <a
                  href="mailto:asath12882@gmail.com"
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                  asath12882@gmail.com
                </a>
              </div>
            </div>
          </Card>

          <Card hover>
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center mr-4">
                <Phone className="text-blue-400" size={24} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Phone</h3>
                <a
                  href="tel:+94770664182"
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                  +94 77 066 4182
                </a>
              </div>
            </div>
          </Card>

          <Card hover>
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center mr-4">
                <Github className="text-blue-400" size={24} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">GitHub</h3>
                <a
                  href="https://github.com/icy-r"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                  github.com/icy-r
                </a>
              </div>
            </div>
          </Card>

          <Card hover>
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center mr-4">
                <Linkedin className="text-blue-400" size={24} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">LinkedIn</h3>
                <a
                  href="https://linkedin.com/in/mohomed-asath-92ab682a7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                  mohomed-asath
                </a>
              </div>
            </div>
          </Card>
        </div>

        <Card>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-[#0a0a0a] border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                placeholder="Your name"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-[#0a0a0a] border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                placeholder="your.email@example.com"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                className="w-full px-4 py-3 bg-[#0a0a0a] border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent resize-none"
                placeholder="Your message..."
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              className="w-full sm:w-auto"
            >
              {isSubmitting ? (
                "Sending..."
              ) : (
                <>
                  <Send size={20} className="mr-2" />
                  Send Message
                </>
              )}
            </Button>
          </form>
        </Card>

        <div className="mt-12 text-center">
          <div className="flex items-center justify-center gap-6">
            <a
              href="https://github.com/icy-r"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-400 transition-colors"
              aria-label="GitHub"
            >
              <Github size={24} />
            </a>
            <a
              href="https://linkedin.com/in/mohomed-asath-92ab682a7"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-400 transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={24} />
            </a>
            <a
              href="https://icy-r.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-400 transition-colors"
              aria-label="Website"
            >
              <Globe size={24} />
            </a>
            <a
              href="mailto:asath12882@gmail.com"
              className="text-gray-400 hover:text-blue-400 transition-colors"
              aria-label="Email"
            >
              <Mail size={24} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

