"use client";

import { useRef } from "react";
import { useIntersectionObserver } from "@/lib/hooks";
import Link from "next/link";
import Card from "./ui/Card";
import { ArrowRight } from "lucide-react";

const tools = [
  {
    id: "json-formatter",
    title: "JSON Formatter",
    description: "Format and validate JSON data",
    category: "Text & Data",
  },
  {
    id: "base64",
    title: "Base64 Encoder/Decoder",
    description: "Encode or decode Base64 strings",
    category: "Text & Data",
  },
  {
    id: "url-encoder",
    title: "URL Encoder/Decoder",
    description: "Encode or decode URL strings",
    category: "Text & Data",
  },
  {
    id: "color-converter",
    title: "Color Converter",
    description: "Convert between HEX, RGB, and HSL",
    category: "Conversion",
  },
  {
    id: "timestamp",
    title: "Timestamp Converter",
    description: "Convert Unix timestamps to dates",
    category: "Conversion",
  },
  {
    id: "text-case",
    title: "Text Case Converter",
    description: "Convert text to different cases",
    category: "Conversion",
  },
];

export default function Tools() {
  const sectionRef = useRef<HTMLElement>(null);
  useIntersectionObserver(sectionRef, 0.1, "0px");

  const textDataTools = tools.filter((t) => t.category === "Text & Data");
  const conversionTools = tools.filter((t) => t.category === "Conversion");

  return (
    <section
      ref={sectionRef}
      id="tools"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50 dark:bg-black/30 backdrop-blur-sm fade-in-section"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Useful Tools</h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Handy developer tools and utilities for your daily workflow
          </p>
        </div>

        {/* Text & Data Tools */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-4 px-2">Text & Data Tools</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {textDataTools.map((tool) => (
              <Link key={tool.id} href={`/tools/${tool.id}`}>
                <Card hover className="h-full group cursor-pointer">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">{tool.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">{tool.description}</p>
                    </div>
                    <ArrowRight
                      size={20}
                      className="text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:translate-x-1 transition-all flex-shrink-0 ml-4"
                    />
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Conversion Tools */}
        <div>
          <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-4 px-2">Conversion Tools</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {conversionTools.map((tool) => (
              <Link key={tool.id} href={`/tools/${tool.id}`}>
                <Card hover className="h-full group cursor-pointer">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">{tool.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">{tool.description}</p>
                    </div>
                    <ArrowRight
                      size={20}
                      className="text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:translate-x-1 transition-all flex-shrink-0 ml-4"
                    />
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

