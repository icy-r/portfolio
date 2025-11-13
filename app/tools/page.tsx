import Link from "next/link";
import Card from "@/components/ui/Card";
import { ArrowRight } from "lucide-react";

const tools = [
  {
    id: "json-formatter",
    title: "JSON Formatter",
    description: "Format and validate JSON data with syntax highlighting",
    icon: "{}",
  },
  {
    id: "base64",
    title: "Base64 Encoder/Decoder",
    description: "Encode or decode Base64 strings",
    icon: "64",
  },
  {
    id: "url-encoder",
    title: "URL Encoder/Decoder",
    description: "Encode or decode URL strings",
    icon: "URL",
  },
  {
    id: "color-converter",
    title: "Color Converter",
    description: "Convert between HEX, RGB, and other color formats",
    icon: "🎨",
  },
  {
    id: "timestamp",
    title: "Timestamp Converter",
    description: "Convert Unix timestamps to readable dates",
    icon: "⏰",
  },
  {
    id: "text-case",
    title: "Text Case Converter",
    description: "Convert text to different cases (upper, lower, camel, etc.)",
    icon: "Aa",
  },
];

export default function ToolsPage() {
  return (
    <main className="min-h-screen bg-black pt-20 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">Developer Tools</h1>
          <div className="w-24 h-1 bg-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Useful utilities and converters for your daily development workflow
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool) => (
            <Link key={tool.id} href={`/tools/${tool.id}`}>
              <Card hover className="h-full group cursor-pointer">
                <div className="flex items-start justify-between mb-4">
                  <div className="text-4xl mb-2">{tool.icon}</div>
                  <ArrowRight
                    size={20}
                    className="text-gray-400 group-hover:text-blue-400 group-hover:translate-x-1 transition-all"
                  />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{tool.title}</h3>
                <p className="text-gray-400 text-sm">{tool.description}</p>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}

