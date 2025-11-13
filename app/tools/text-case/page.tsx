"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Copy, Check } from "lucide-react";
import Button from "@/components/ui/Button";

export default function TextCasePage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [caseType, setCaseType] = useState<"upper" | "lower" | "title" | "camel" | "kebab" | "snake">("lower");
  const [copied, setCopied] = useState(false);

  const convertCase = () => {
    switch (caseType) {
      case "upper":
        setOutput(input.toUpperCase());
        break;
      case "lower":
        setOutput(input.toLowerCase());
        break;
      case "title":
        setOutput(
          input
            .toLowerCase()
            .split(" ")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ")
        );
        break;
      case "camel":
        setOutput(
          input
            .toLowerCase()
            .replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase())
        );
        break;
      case "kebab":
        setOutput(input.toLowerCase().replace(/\s+/g, "-"));
        break;
      case "snake":
        setOutput(input.toLowerCase().replace(/\s+/g, "_"));
        break;
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const caseTypes = [
    { id: "upper", label: "UPPER CASE" },
    { id: "lower", label: "lower case" },
    { id: "title", label: "Title Case" },
    { id: "camel", label: "camelCase" },
    { id: "kebab", label: "kebab-case" },
    { id: "snake", label: "snake_case" },
  ] as const;

  return (
    <main className="min-h-screen bg-black pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          href="/tools"
          className="inline-flex items-center text-gray-400 hover:text-blue-400 transition-colors mb-6"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back to Tools
        </Link>

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Text Case Converter</h1>
          <p className="text-gray-400">Convert text to different cases</p>
        </div>

        <div className="mb-6">
          <label className="block text-sm text-gray-400 mb-3">Case Type</label>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {caseTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setCaseType(type.id)}
                className={`px-4 py-3 rounded-lg font-medium transition-all ${
                  caseType === type.id
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                    : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                }`}
              >
                {type.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-350px)]">
          <div className="flex flex-col">
            <label className="block text-sm text-gray-400 mb-2">Input Text</label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter text to convert"
              className="flex-1 w-full px-4 py-3 bg-[#0a0a0a] border border-gray-700 rounded-lg text-white text-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent resize-none"
            />
            <div className="mt-4 flex gap-3">
              <Button onClick={convertCase} variant="primary" className="flex-1">
                Convert
              </Button>
              <Button
                onClick={() => {
                  setInput("");
                  setOutput("");
                }}
                variant="outline"
              >
                Clear
              </Button>
            </div>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm text-gray-400">Output</label>
              {output && (
                <button
                  onClick={copyToClipboard}
                  className="flex items-center gap-2 px-3 py-1.5 bg-gray-800 hover:bg-gray-700 rounded-lg text-gray-400 hover:text-white transition-colors text-sm"
                >
                  {copied ? (
                    <>
                      <Check size={16} />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy size={16} />
                      Copy
                    </>
                  )}
                </button>
              )}
            </div>
            <textarea
              value={output}
              readOnly
              className="flex-1 w-full px-4 py-3 bg-[#0a0a0a] border border-gray-700 rounded-lg text-white text-lg focus:outline-none resize-none"
              placeholder="Converted text will appear here..."
            />
          </div>
        </div>
      </div>
    </main>
  );
}

