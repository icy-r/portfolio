"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Copy, Check, RefreshCw } from "lucide-react";
import Button from "@/components/ui/Button";

export default function TimestampPage() {
  const [timestamp, setTimestamp] = useState("");
  const [date, setDate] = useState("");
  const [mode, setMode] = useState<"toDate" | "toTimestamp">("toDate");
  const [copied, setCopied] = useState(false);

  const convertToDate = () => {
    const ts = parseInt(timestamp);
    if (!isNaN(ts)) {
      const d = new Date(ts * 1000);
      setDate(d.toLocaleString());
    } else {
      setDate("Invalid timestamp");
    }
  };

  const convertToTimestamp = () => {
    const d = new Date(date);
    if (!isNaN(d.getTime())) {
      setTimestamp(Math.floor(d.getTime() / 1000).toString());
    } else {
      setTimestamp("Invalid date");
    }
  };

  const useCurrentTime = () => {
    const now = Math.floor(Date.now() / 1000);
    setTimestamp(now.toString());
    convertToDate();
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
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
          <h1 className="text-4xl font-bold text-white mb-2">Timestamp Converter</h1>
          <p className="text-gray-400">Convert Unix timestamps to readable dates and vice versa</p>
        </div>

        <div className="mb-6 flex gap-3">
          <button
            onClick={() => setMode("toDate")}
            className={`px-6 py-3 rounded-lg font-medium transition-all ${
              mode === "toDate"
                ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                : "bg-gray-800 text-gray-400 hover:bg-gray-700"
            }`}
          >
            Timestamp → Date
          </button>
          <button
            onClick={() => setMode("toTimestamp")}
            className={`px-6 py-3 rounded-lg font-medium transition-all ${
              mode === "toTimestamp"
                ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                : "bg-gray-800 text-gray-400 hover:bg-gray-700"
            }`}
          >
            Date → Timestamp
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-300px)]">
          <div className="flex flex-col">
            <label className="block text-sm text-gray-400 mb-2">
              {mode === "toDate" ? "Unix Timestamp" : "Date & Time"}
            </label>
            {mode === "toDate" ? (
              <div className="relative flex-1">
                <textarea
                  value={timestamp}
                  onChange={(e) => setTimestamp(e.target.value)}
                  placeholder="1704067200"
                  className="w-full h-full px-4 py-3 bg-[#0a0a0a] border border-gray-700 rounded-lg text-white text-lg font-mono focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent resize-none pr-12"
                />
                <button
                  onClick={useCurrentTime}
                  className="absolute right-2 top-2 p-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-gray-400 hover:text-white transition-colors"
                  title="Use current time"
                >
                  <RefreshCw size={18} />
                </button>
              </div>
            ) : (
              <input
                type="datetime-local"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="flex-1 px-4 py-3 bg-[#0a0a0a] border border-gray-700 rounded-lg text-white text-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            )}
            <div className="mt-4 flex gap-3">
              <Button
                onClick={mode === "toDate" ? convertToDate : convertToTimestamp}
                variant="primary"
                className="flex-1"
              >
                Convert
              </Button>
              <Button
                onClick={() => {
                  setTimestamp("");
                  setDate("");
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
                {mode === "toDate" ? "Date & Time" : "Unix Timestamp"}
              </label>
              {(date || timestamp) && (
                <button
                  onClick={() => copyToClipboard(mode === "toDate" ? date : timestamp)}
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
              value={mode === "toDate" ? date : timestamp}
              readOnly
              className="flex-1 w-full px-4 py-3 bg-[#0a0a0a] border border-gray-700 rounded-lg text-white text-lg font-mono focus:outline-none resize-none"
              placeholder="Result will appear here..."
            />
          </div>
        </div>
      </div>
    </main>
  );
}

