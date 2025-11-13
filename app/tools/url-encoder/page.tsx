"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Copy, Check } from "lucide-react";
import Button from "@/components/ui/Button";

export default function URLEncoderPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [copied, setCopied] = useState(false);

  const handleConvert = () => {
    try {
      if (mode === "encode") {
        setOutput(encodeURIComponent(input));
      } else {
        setOutput(decodeURIComponent(input));
      }
    } catch (e) {
      setOutput("Invalid URL encoding");
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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
          <h1 className="text-4xl font-bold text-white mb-2">URL Encoder/Decoder</h1>
          <p className="text-gray-400">Encode or decode URL strings</p>
        </div>

        <div className="mb-6 flex gap-3">
          <button
            onClick={() => setMode("encode")}
            className={`px-6 py-3 rounded-lg font-medium transition-all ${
              mode === "encode"
                ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                : "bg-gray-800 text-gray-400 hover:bg-gray-700"
            }`}
          >
            Encode
          </button>
          <button
            onClick={() => setMode("decode")}
            className={`px-6 py-3 rounded-lg font-medium transition-all ${
              mode === "decode"
                ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                : "bg-gray-800 text-gray-400 hover:bg-gray-700"
            }`}
          >
            Decode
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-300px)]">
          <div className="flex flex-col">
            <label className="block text-sm text-gray-400 mb-2">
              {mode === "encode" ? "URL to Encode" : "Encoded URL"}
            </label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={mode === "encode" ? "Enter URL to encode" : "Enter encoded URL"}
              className="flex-1 w-full px-4 py-3 bg-[#0a0a0a] border border-gray-700 rounded-lg text-white text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent resize-none"
            />
            <div className="mt-4 flex gap-3">
              <Button onClick={handleConvert} variant="primary" className="flex-1">
                {mode === "encode" ? "Encode" : "Decode"}
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
              <label className="block text-sm text-gray-400">
                {mode === "encode" ? "Encoded Output" : "Decoded URL"}
              </label>
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
              className="flex-1 w-full px-4 py-3 bg-[#0a0a0a] border border-gray-700 rounded-lg text-white text-sm font-mono focus:outline-none resize-none"
              placeholder={`${mode === "encode" ? "Encoded" : "Decoded"} result will appear here...`}
            />
          </div>
        </div>
      </div>
    </main>
  );
}

