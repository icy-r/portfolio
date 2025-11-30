"use client";

import { X } from "lucide-react";
import Card from "./Card";
import Button from "./Button";

interface ContactDetailModalProps {
    contact: {
        id: string;
        name: string;
        email: string;
        message: string;
        createdAt: string;
        read: boolean;
    } | null;
    onClose: () => void;
    onMarkAsRead?: (id: string) => void;
    onDelete?: (id: string) => void;
}

export default function ContactDetailModal({
    contact,
    onClose,
    onMarkAsRead,
    onDelete,
}: ContactDetailModalProps) {
    if (!contact) return null;

    const handleMarkAsRead = () => {
        if (onMarkAsRead && !contact.read) {
            onMarkAsRead(contact.id);
        }
    };

    const handleDelete = () => {
        if (onDelete) {
            onDelete(contact.id);
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <Card className="relative">
                    {/* Close button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white transition-colors"
                        aria-label="Close"
                    >
                        <X size={24} />
                    </button>

                    {/* Header */}
                    <div className="mb-6 pr-10">
                        <div className="flex items-center gap-3 mb-2">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                Contact Details
                            </h2>
                            {!contact.read && (
                                <span className="px-2 py-1 bg-blue-600/20 text-blue-400 text-xs rounded-full border border-blue-600/30">
                                    New
                                </span>
                            )}
                        </div>
                        <p className="text-gray-500 dark:text-gray-400 text-sm">
                            Received on {new Date(contact.createdAt).toLocaleString()}
                        </p>
                    </div>

                    {/* Content */}
                    <div className="space-y-4 mb-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                                Name
                            </label>
                            <p className="text-lg text-gray-900 dark:text-white font-medium">
                                {contact.name}
                            </p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                                Email
                            </label>
                            <a
                                href={`mailto:${contact.email}`}
                                className="text-lg text-blue-600 dark:text-blue-400 hover:underline"
                            >
                                {contact.email}
                            </a>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                                Message
                            </label>
                            <div className="bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 rounded-lg p-4">
                                <p className="text-gray-900 dark:text-gray-300 whitespace-pre-wrap">
                                    {contact.message}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 justify-end pt-4 border-t border-gray-200 dark:border-gray-800">
                        {!contact.read && onMarkAsRead && (
                            <Button variant="outline" onClick={handleMarkAsRead}>
                                Mark as Read
                            </Button>
                        )}
                        <a href={`mailto:${contact.email}`}>
                            <Button variant="primary">Reply via Email</Button>
                        </a>
                        {onDelete && (
                            <Button variant="outline" onClick={handleDelete}>
                                Delete
                            </Button>
                        )}
                    </div>
                </Card>
            </div>
        </div>
    );
}
