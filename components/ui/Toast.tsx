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
        success: <CheckCircle className="text-green-500" size={24} />,
        error: <XCircle className="text-red-500" size={24} />,
        info: <AlertCircle className="text-blue-500" size={24} />,
    };

    const bgColors = {
        success: "border-green-500/50 bg-green-500/10",
        error: "border-red-500/50 bg-red-500/10",
        info: "border-blue-500/50 bg-blue-500/10",
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, x: 100, scale: 0.9 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: 100, scale: 0.9 }}
                    className="fixed bottom-4 right-4 left-4 md:left-auto md:right-4 z-[9999] md:max-w-md"
                >
                    <div
                        className={`flex items-center gap-3 p-4 rounded-lg border-2 ${bgColors[type]} bg-gray-900 dark:bg-gray-900 backdrop-blur-md shadow-2xl`}
                    >
                        {icons[type]}
                        <p className="text-white flex-1 font-medium">{message}</p>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-white transition-colors p-1"
                        >
                            <X size={18} />
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
