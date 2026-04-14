"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle, AlertCircle, X } from "lucide-react";
import { useEffect } from "react";

interface ToastProps {
  message: string;
  type?: "success" | "error" | "info";
  isOpen: boolean;
  onClose: () => void;
  duration?: number;
}

export default function Toast({
  message,
  type = "success",
  isOpen,
  onClose,
  duration = 3000,
}: ToastProps) {
  useEffect(() => {
    if (isOpen && duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isOpen, duration, onClose]);

  const icons = {
    success: <CheckCircle className="text-emerald-400" size={20} />,
    error: <XCircle className="text-red-400" size={20} />,
    info: <AlertCircle className="text-accent" size={20} />,
  };

  const borderColors = {
    success: "border-emerald-500/30",
    error: "border-red-500/30",
    info: "border-accent/30",
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          className="fixed bottom-6 right-6 left-6 md:left-auto md:right-6 z-[9999] md:max-w-sm"
        >
          <div
            className={`flex items-center gap-3 p-4 rounded-xl border ${borderColors[type]} bg-[#0a0a0a]/95 backdrop-blur-xl shadow-2xl`}
          >
            {icons[type]}
            <p className="text-foreground text-sm flex-1">{message}</p>
            <button
              onClick={onClose}
              className="text-muted hover:text-foreground transition-colors p-1"
            >
              <X size={16} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
