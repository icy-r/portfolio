"use client";

import { useRef } from "react";
import { useIntersectionObserver } from "@/lib/utils";
import Card from "./ui/Card";
import Button from "./ui/Button";
import { ExternalLink } from "lucide-react";

export default function Blog() {
  const sectionRef = useRef<HTMLElement>(null);
  useIntersectionObserver(sectionRef, 0.1, "0px");
  // Placeholder for blog posts - can be replaced with actual blog data
  const blogPosts = [
    {
      title: "Building Modern Web Applications with Next.js",
      excerpt: "Exploring the latest features and best practices in Next.js development...",
      date: "Coming Soon",
      link: "#",
    },
    {
      title: "My Journey as a Software Engineering Student",
      excerpt: "Reflections on learning, projects, and growth in software development...",
      date: "Coming Soon",
      link: "#",
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="blog"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-black/30 backdrop-blur-sm fade-in-section"
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">Blog & Articles</h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Thoughts, tutorials, and insights about software development and technology
          </p>
        </div>

        <div className="space-y-6">
          {blogPosts.map((post, index) => (
            <Card key={index} hover>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-400 mb-4">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500 text-sm">{post.date}</span>
                    <Button
                      href={post.link}
                      variant="outline"
                      className="text-sm"
                    >
                      Read More
                      <ExternalLink size={16} className="ml-2" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Card>
            <p className="text-gray-300 mb-4">
              More articles coming soon! Check back for updates.
            </p>
            <Button
              href="https://icy-r.dev"
              target="_blank"
              rel="noopener noreferrer"
              variant="outline"
            >
              Visit Blog
            </Button>
          </Card>
        </div>
      </div>
    </section>
  );
}

