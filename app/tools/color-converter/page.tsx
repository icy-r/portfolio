"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Copy, Check } from "lucide-react";
import Button from "@/components/ui/Button";

export default function ColorConverterPage() {
  const [hex, setHex] = useState("#3b82f6");
  const [rgb, setRgb] = useState("rgb(59, 130, 246)");
  const [hsl, setHsl] = useState("hsl(217, 91%, 60%)");
  const [copied, setCopied] = useState("");
  const [rgbValues, setRgbValues] = useState({ r: 59, g: 130, b: 246 });

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (result) {
      const r = parseInt(result[1], 16);
      const g = parseInt(result[2], 16);
      const b = parseInt(result[3], 16);
      return { r, g, b };
    }
    return null;
  };

  const rgbToHsl = (r: number, g: number, b: number) => {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0,
      s = 0,
      l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
          break;
        case g:
          h = ((b - r) / d + 2) / 6;
          break;
        case b:
          h = ((r - g) / d + 4) / 6;
          break;
      }
    }

    h = Math.round(h * 360);
    s = Math.round(s * 100);
    l = Math.round(l * 100);

    return `hsl(${h}, ${s}%, ${l}%)`;
  };

  useEffect(() => {
    const rgb = hexToRgb(hex);
    if (rgb) {
      setRgbValues(rgb);
      setRgb(`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`);
      setHsl(rgbToHsl(rgb.r, rgb.g, rgb.b));
    }
  }, [hex]);

  const handleHexChange = (value: string) => {
    if (value.length <= 7) {
      setHex(value);
    }
  };

  const handleRgbChange = (value: string) => {
    setRgb(value);
    const match = value.match(/\d+/g);
    if (match && match.length === 3) {
      const r = parseInt(match[0]);
      const g = parseInt(match[1]);
      const b = parseInt(match[2]);
      if (r >= 0 && r <= 255 && g >= 0 && g <= 255 && b >= 0 && b <= 255) {
        setRgbValues({ r, g, b });
        const hexValue = `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1)}`;
        setHex(hexValue);
        setHsl(rgbToHsl(r, g, b));
      }
    }
  };

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(""), 2000);
  };

  return (
    <main className="min-h-screen bg-black/30 backdrop-blur-sm pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          href="/tools"
          className="inline-flex items-center text-gray-400 hover:text-blue-400 transition-colors mb-6"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back to Tools
        </Link>

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Color Converter</h1>
          <p className="text-gray-400">Convert between HEX, RGB, and HSL color formats</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm text-gray-400 mb-2">HEX</label>
              <div className="flex gap-3">
                <input
                  type="color"
                  value={hex}
                  onChange={(e) => handleHexChange(e.target.value)}
                  className="h-14 w-20 rounded-lg border-2 border-gray-700 cursor-pointer bg-transparent"
                  style={{ backgroundColor: hex }}
                />
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={hex}
                    onChange={(e) => handleHexChange(e.target.value)}
                    className="w-full px-4 py-3 bg-[#0a0a0a] border border-gray-700 rounded-lg text-white text-lg font-mono focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                  <button
                    onClick={() => copyToClipboard(hex, "hex")}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-gray-800 hover:bg-gray-700 rounded text-gray-400 hover:text-white transition-colors"
                    title="Copy HEX"
                  >
                    {copied === "hex" ? <Check size={18} /> : <Copy size={18} />}
                  </button>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">RGB</label>
              <div className="relative">
                <input
                  type="text"
                  value={rgb}
                  onChange={(e) => handleRgbChange(e.target.value)}
                  className="w-full px-4 py-3 bg-[#0a0a0a] border border-gray-700 rounded-lg text-white text-lg font-mono focus:outline-none focus:ring-2 focus:ring-blue-600 pr-12"
                />
                <button
                  onClick={() => copyToClipboard(rgb, "rgb")}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-gray-800 hover:bg-gray-700 rounded text-gray-400 hover:text-white transition-colors"
                  title="Copy RGB"
                >
                  {copied === "rgb" ? <Check size={18} /> : <Copy size={18} />}
                </button>
              </div>
              <div className="grid grid-cols-3 gap-3 mt-3">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">R</label>
                  <input
                    type="number"
                    min="0"
                    max="255"
                    value={rgbValues.r}
                    onChange={(e) => {
                      const r = parseInt(e.target.value) || 0;
                      handleRgbChange(`rgb(${r}, ${rgbValues.g}, ${rgbValues.b})`);
                    }}
                    className="w-full px-3 py-2 bg-[#0a0a0a] border border-gray-700 rounded-lg text-white text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">G</label>
                  <input
                    type="number"
                    min="0"
                    max="255"
                    value={rgbValues.g}
                    onChange={(e) => {
                      const g = parseInt(e.target.value) || 0;
                      handleRgbChange(`rgb(${rgbValues.r}, ${g}, ${rgbValues.b})`);
                    }}
                    className="w-full px-3 py-2 bg-[#0a0a0a] border border-gray-700 rounded-lg text-white text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">B</label>
                  <input
                    type="number"
                    min="0"
                    max="255"
                    value={rgbValues.b}
                    onChange={(e) => {
                      const b = parseInt(e.target.value) || 0;
                      handleRgbChange(`rgb(${rgbValues.r}, ${rgbValues.g}, ${b})`);
                    }}
                    className="w-full px-3 py-2 bg-[#0a0a0a] border border-gray-700 rounded-lg text-white text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">HSL</label>
              <div className="relative">
                <input
                  type="text"
                  value={hsl}
                  readOnly
                  className="w-full px-4 py-3 bg-[#0a0a0a] border border-gray-700 rounded-lg text-white text-lg font-mono focus:outline-none pr-12"
                />
                <button
                  onClick={() => copyToClipboard(hsl, "hsl")}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-gray-800 hover:bg-gray-700 rounded text-gray-400 hover:text-white transition-colors"
                  title="Copy HSL"
                >
                  {copied === "hsl" ? <Check size={18} /> : <Copy size={18} />}
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Color Preview</label>
              <div
                className="w-full h-64 rounded-lg border-2 border-gray-700 shadow-2xl transition-all duration-300"
                style={{ backgroundColor: hex }}
              />
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <div
                  className="w-full h-16 rounded-lg border border-gray-700"
                  style={{ backgroundColor: hex }}
                />
                <p className="text-xs text-gray-500 mt-2 text-center">100%</p>
              </div>
              <div>
                <div
                  className="w-full h-16 rounded-lg border border-gray-700"
                  style={{ backgroundColor: hex, opacity: 0.7 }}
                />
                <p className="text-xs text-gray-500 mt-2 text-center">70%</p>
              </div>
              <div>
                <div
                  className="w-full h-16 rounded-lg border border-gray-700"
                  style={{ backgroundColor: hex, opacity: 0.4 }}
                />
                <p className="text-xs text-gray-500 mt-2 text-center">40%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

