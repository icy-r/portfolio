"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import {
  BookOpen,
  Mail,
  Plus,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  LogOut,
  Home,
  Star,
} from "lucide-react";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  published: boolean;
  createdAt: string;
}

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
  read: boolean;
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<"blogs" | "contacts">("blogs");
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [contacts, setContacts] = useState<ContactSubmission[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      if (activeTab === "blogs") {
        const res = await fetch("/api/blogs");
        const data = await res.json();
        setBlogs(data);
      } else {
        const res = await fetch("/api/contacts");
        const data = await res.json();
        setContacts(data);
      }
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteBlog = async (id: string) => {
    if (!confirm("Are you sure you want to delete this blog post?")) return;

    try {
      const res = await fetch(`/api/blogs?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        fetchData();
      }
    } catch (error) {
      console.error("Failed to delete blog:", error);
    }
  };

  const handleTogglePublish = async (blog: BlogPost) => {
    try {
      const res = await fetch("/api/blogs", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: blog.id,
          published: !blog.published,
        }),
      });
      if (res.ok) {
        fetchData();
      }
    } catch (error) {
      console.error("Failed to update blog:", error);
    }
  };

  const handleMarkAsRead = async (id: string) => {
    try {
      const res = await fetch("/api/contacts", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, read: true }),
      });
      if (res.ok) {
        fetchData();
      }
    } catch (error) {
      console.error("Failed to mark as read:", error);
    }
  };

  const handleDeleteContact = async (id: string) => {
    if (!confirm("Are you sure you want to delete this contact?")) return;

    try {
      const res = await fetch(`/api/contacts?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        fetchData();
      }
    } catch (error) {
      console.error("Failed to delete contact:", error);
    }
  };

  const handleLogout = async () => {
    await signOut({ redirect: true, callbackUrl: "/" });
  };

  return (
    <main className="min-h-screen bg-black pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Admin Dashboard</h1>
            <p className="text-gray-400">Manage blogs and view contact submissions</p>
          </div>
          <div className="flex gap-3">
            <Link href="/">
              <Button variant="outline">
                <Home size={18} className="mr-2" />
                Home
              </Button>
            </Link>
            <Link href="/admin/repos">
              <Button variant="outline">
                <Star size={18} className="mr-2" />
                Manage Repos
              </Button>
            </Link>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut size={18} className="mr-2" />
              Logout
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-6 border-b border-gray-800">
          <button
            onClick={() => setActiveTab("blogs")}
            className={`px-6 py-3 font-medium transition-colors border-b-2 ${activeTab === "blogs"
              ? "border-blue-600 text-blue-400"
              : "border-transparent text-gray-400 hover:text-white"
              }`}
          >
            <BookOpen size={20} className="inline mr-2" />
            Blogs ({blogs.length})
          </button>
          <button
            onClick={() => setActiveTab("contacts")}
            className={`px-6 py-3 font-medium transition-colors border-b-2 relative ${activeTab === "contacts"
              ? "border-blue-600 text-blue-400"
              : "border-transparent text-gray-400 hover:text-white"
              }`}
          >
            <Mail size={20} className="inline mr-2" />
            Contacts ({contacts.length})
            {contacts.filter((c) => !c.read).length > 0 && (
              <span className="ml-2 px-2 py-0.5 bg-blue-600 text-white text-xs rounded-full">
                {contacts.filter((c) => !c.read).length}
              </span>
            )}
          </button>
        </div>

        {/* Content */}
        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-gray-400">Loading...</p>
          </div>
        ) : activeTab === "blogs" ? (
          <div>
            <div className="mb-6">
              <Link href="/admin/blogs/new">
                <Button variant="primary">
                  <Plus size={18} className="mr-2" />
                  New Blog Post
                </Button>
              </Link>
            </div>
            <div className="space-y-4">
              {blogs.length === 0 ? (
                <Card>
                  <p className="text-gray-400 text-center py-8">
                    No blog posts yet. Create your first one!
                  </p>
                </Card>
              ) : (
                blogs.map((blog) => (
                  <Card key={blog.id} hover>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-semibold text-white">
                            {blog.title}
                          </h3>
                          {blog.published ? (
                            <span className="px-2 py-1 bg-green-600/20 text-green-400 text-xs rounded-full border border-green-600/30">
                              Published
                            </span>
                          ) : (
                            <span className="px-2 py-1 bg-gray-600/20 text-gray-400 text-xs rounded-full border border-gray-600/30">
                              Draft
                            </span>
                          )}
                        </div>
                        <p className="text-gray-400 mb-2">{blog.excerpt}</p>
                        <p className="text-gray-500 text-sm">
                          {new Date(blog.date).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <Link href={`/admin/blogs/${blog.id}`}>
                          <button className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-gray-400 hover:text-blue-400 transition-colors">
                            <Edit size={18} />
                          </button>
                        </Link>
                        <button
                          onClick={() => handleTogglePublish(blog)}
                          className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-gray-400 hover:text-blue-400 transition-colors"
                          title={blog.published ? "Unpublish" : "Publish"}
                        >
                          {blog.published ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                        <button
                          onClick={() => handleDeleteBlog(blog.id)}
                          className="p-2 bg-gray-800 hover:bg-red-900/20 rounded-lg text-gray-400 hover:text-red-400 transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  </Card>
                ))
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {contacts.length === 0 ? (
              <Card>
                <p className="text-gray-400 text-center py-8">
                  No contact submissions yet.
                </p>
              </Card>
            ) : (
              contacts.map((contact) => (
                <Card
                  key={contact.id}
                  className={!contact.read ? "border-blue-600/50" : ""}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-white">
                          {contact.name}
                        </h3>
                        {!contact.read && (
                          <span className="px-2 py-1 bg-blue-600/20 text-blue-400 text-xs rounded-full">
                            New
                          </span>
                        )}
                      </div>
                      <p className="text-blue-400 mb-2">{contact.email}</p>
                      <p className="text-gray-400 mb-2">{contact.message}</p>
                      <p className="text-gray-500 text-sm">
                        {new Date(contact.createdAt).toLocaleString()}
                      </p>
                    </div>
                    <div className="flex gap-2 ml-4">
                      {!contact.read && (
                        <button
                          onClick={() => handleMarkAsRead(contact.id)}
                          className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-gray-400 hover:text-blue-400 transition-colors"
                          title="Mark as read"
                        >
                          <Eye size={18} />
                        </button>
                      )}
                      <button
                        onClick={() => handleDeleteContact(contact.id)}
                        className="p-2 bg-gray-800 hover:bg-red-900/20 rounded-lg text-gray-400 hover:text-red-400 transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </Card>
              ))
            )}
          </div>
        )}
      </div>
    </main>
  );
}

