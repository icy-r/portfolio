"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { GitHubRepo } from "@/lib/github";
import { Loader2, Star, Save } from "lucide-react";
import Button from "@/components/ui/Button";
import ConfirmationModal from "@/components/ui/ConfirmationModal";

export default function ManageRepos() {
    const [repos, setRepos] = useState<GitHubRepo[]>([]);
    const [pinnedIds, setPinnedIds] = useState<Set<number>>(new Set());
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        async function fetchData() {
            try {
                const [reposRes, pinnedRes] = await Promise.all([
                    fetch("/api/github?type=repos&limit=100"),
                    fetch("/api/admin/pinned-repos"),
                ]);

                const reposData = await reposRes.json();
                const pinnedData = await pinnedRes.json();

                setRepos(reposData);
                const raw: unknown[] = Array.isArray(pinnedData) ? pinnedData : [];
                const ids = raw
                    .map((p) => {
                        if (typeof p === "number") return p;
                        if (typeof p === "object" && p !== null) {
                            const obj = p as Record<string, unknown>;
                            return (typeof obj.repoId === "number" ? obj.repoId : undefined)
                                ?? (typeof obj.id === "number" ? obj.id : undefined);
                        }
                        return undefined;
                    })
                    .filter((id): id is number => typeof id === "number");
                setPinnedIds(new Set(ids));
            } catch (error) {
                console.error("Failed to fetch data:", error);
            } finally {
                setIsLoading(false);
            }
        }
        fetchData();
    }, []);

    const togglePin = (id: number) => {
        setPinnedIds((prev) => {
            const next = new Set(prev);
            if (next.has(id)) {
                next.delete(id);
            } else {
                next.add(id);
            }
            return next;
        });
    };

    const handleSaveClick = () => {
        setIsModalOpen(true);
    };

    const handleConfirmSave = async () => {
        setIsSaving(true);
        try {
            const pinnedRepos = repos
                .filter((r) => pinnedIds.has(r.id))
                .map((r) => ({
                    id: r.id,
                    name: r.name,
                    description: r.description || "",
                    url: r.html_url,
                    stars: r.stargazers_count,
                    language: r.language || "",
                }));
            const res = await fetch("/api/admin/pinned-repos", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(pinnedRepos),
            });

            if (res.ok) {
                // Optional: Show success toast here
                setIsModalOpen(false);
            } else {
                alert("Failed to update pinned repositories.");
            }
        } catch (error) {
            console.error("Failed to save:", error);
            alert("An error occurred while saving.");
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-64">
                <Loader2 className="animate-spin text-blue-500" size={32} />
            </div>
        );
    }

    return (
        <div className="space-y-6 pt-8 px-4 max-w-7xl mx-auto">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/admin">
                        <Button variant="outline">Back</Button>
                    </Link>
                    <h1 className="text-3xl font-bold text-white">Manage Repositories</h1>
                </div>
                <Button onClick={handleSaveClick} disabled={isSaving} variant="primary">
                    {isSaving ? (
                        <>
                            <Loader2 className="animate-spin mr-2" size={20} />
                            Saving...
                        </>
                    ) : (
                        <>
                            <Save className="mr-2" size={20} />
                            Save Changes
                        </>
                    )}
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {repos.map((repo) => (
                    <div
                        key={repo.id}
                        className={`p-4 rounded-xl border transition-all cursor-pointer ${pinnedIds.has(repo.id)
                            ? "bg-blue-900/20 border-blue-500"
                            : "bg-[#111111] border-gray-800 hover:border-gray-600"
                            }`}
                        onClick={() => togglePin(repo.id)}
                    >
                        <div className="flex items-start justify-between mb-2">
                            <h3 className="font-semibold text-white truncate pr-2">
                                {repo.name}
                            </h3>
                            <Star
                                size={20}
                                className={
                                    pinnedIds.has(repo.id)
                                        ? "fill-yellow-400 text-yellow-400"
                                        : "text-gray-600"
                                }
                            />
                        </div>
                        <p className="text-sm text-gray-400 line-clamp-2 mb-3">
                            {repo.description || "No description"}
                        </p>
                        <div className="flex items-center justify-between text-xs text-gray-500">
                            <span>{repo.language}</span>
                            <span>{repo.stargazers_count} stars</span>
                        </div>
                    </div>
                ))}
            </div>

            <ConfirmationModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={handleConfirmSave}
                title="Save Changes?"
                message={`Are you sure you want to save the selected repositories? You have selected ${pinnedIds.size} repositories to be displayed on your portfolio.`}
                confirmText="Save Changes"
                isLoading={isSaving}
            />
        </div>
    );
}
