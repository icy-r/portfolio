"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { ArrowLeft, Save } from "lucide-react";

export default function EditBlogPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    date: "",
    published: false,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchBlog();
  }, [id]);

  const fetchBlog = async () => {
    try {
      const res = await fetch(`/api/blogs?id=${id}`);
      if (res.ok) {
        const blog = await res.json();
        setFormData({
          title: blog.title,
          excerpt: blog.excerpt,
          content: blog.content,
          date: blog.date.split("T")[0],
          published: blog.published,
        });
      }
    } catch (error) {
      console.error("Failed to fetch blog:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const res = await fetch("/api/blogs", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...formData }),
      });

      if (res.ok) {
        router.push("/admin");
      } else {
        alert("Failed to update blog post");
      }
    } catch (error) {
      alert("An error occurred");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <main className="min-h-screen bg-black pt-20 flex items-center justify-center">
        <p className="text-gray-400">Loading...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          href="/admin"
          className="inline-flex items-center text-gray-400 hover:text-blue-400 transition-colors mb-6"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back to Dashboard
        </Link>

        <h1 className="text-4xl font-bold text-white mb-8">Edit Blog Post</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Title
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-3 bg-[#0a0a0a] border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Excerpt
            </label>
            <textarea
              value={formData.excerpt}
              onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
              className="w-full px-4 py-3 bg-[#0a0a0a] border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-600 resize-none"
              rows={3}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Content (Markdown supported)
            </label>
            <textarea
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              className="w-full px-4 py-3 bg-[#0a0a0a] border border-gray-700 rounded-lg text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 resize-none"
              rows={15}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Date
              </label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full px-4 py-3 bg-[#0a0a0a] border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <div className="flex items-end">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.published}
                  onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                  className="w-5 h-5 rounded border-gray-700 bg-[#0a0a0a] text-blue-600 focus:ring-2 focus:ring-blue-600"
                />
                <span className="text-gray-300">Published</span>
              </label>
            </div>
          </div>

          <div className="flex gap-4">
            <Button type="submit" variant="primary" disabled={isSaving}>
              <Save size={18} className="mr-2" />
              {isSaving ? "Saving..." : "Save Changes"}
            </Button>
            <Link href="/admin">
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}

