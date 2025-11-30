"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import ContactDetailModal from "@/components/ui/ContactDetailModal";
import ConfirmationModal from "@/components/ui/ConfirmationModal";
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
  Search,
  Filter,
  ArrowUpDown,
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
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState<"all" | "unread" | "read" | "published" | "draft">("all");
  const [sortBy, setSortBy] = useState<"date" | "name" | "status">("date");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [selectedContact, setSelectedContact] = useState<ContactSubmission | null>(null);
  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
  }>({ isOpen: false, title: "", message: "", onConfirm: () => { } });
  const router = useRouter();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      // Fetch both blogs and contacts
      const [blogsRes, contactsRes] = await Promise.all([
        fetch("/api/blogs"),
        fetch("/api/contacts"),
      ]);

      const [blogsData, contactsData] = await Promise.all([
        blogsRes.json(),
        contactsRes.json(),
      ]);

      setBlogs(blogsData);
      setContacts(contactsData);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteBlog = async (id: string) => {
    setConfirmModal({
      isOpen: true,
      title: "Delete Blog Post",
      message: "Are you sure you want to delete this blog post? This action cannot be undone.",
      onConfirm: async () => {
        try {
          const res = await fetch(`/api/blogs?id=${id}`, { method: "DELETE" });
          if (res.ok) {
            fetchData();
          }
        } catch (error) {
          console.error("Failed to delete blog:", error);
        }
        setConfirmModal({ ...confirmModal, isOpen: false });
      },
    });
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
    setConfirmModal({
      isOpen: true,
      title: "Delete Contact",
      message: "Are you sure you want to delete this contact? This action cannot be undone.",
      onConfirm: async () => {
        try {
          const res = await fetch(`/api/contacts?id=${id}`, { method: "DELETE" });
          if (res.ok) {
            fetchData();
            setSelectedContact(null);
          }
        } catch (error) {
          console.error("Failed to delete contact:", error);
        }
        setConfirmModal({ ...confirmModal, isOpen: false });
      },
    });
  };

  const handleLogout = async () => {
    await signOut({ redirect: true, callbackUrl: "/" });
  };

  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === "all" ||
      (filter === "published" && blog.published) ||
      (filter === "draft" && !blog.published);
    return matchesSearch && matchesFilter;
  }).sort((a, b) => {
    if (sortBy === "date") {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    } else if (sortBy === "name") {
      return sortOrder === "asc"
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title);
    } else { // status
      const statusA = a.published ? 1 : 0;
      const statusB = b.published ? 1 : 0;
      return sortOrder === "asc" ? statusA - statusB : statusB - statusA;
    }
  });

  const filteredContacts = contacts.filter((contact) => {
    const matchesSearch = contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.message.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === "all" ||
      (filter === "unread" && !contact.read) ||
      (filter === "read" && contact.read);
    return matchesSearch && matchesFilter;
  }).sort((a, b) => {
    if (sortBy === "date") {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    } else if (sortBy === "name") {
      return sortOrder === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    } else { // status
      const statusA = a.read ? 1 : 0;
      const statusB = b.read ? 1 : 0;
      return sortOrder === "asc" ? statusA - statusB : statusB - statusA;
    }
  });

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

        {/* Filters & Search */}
        <div className="flex flex-col md:flex-row gap-4 mb-6 justify-between items-center bg-gray-900/50 p-4 rounded-lg border border-gray-800">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-black border border-gray-800 rounded-lg pl-10 pr-4 py-2 text-white focus:outline-none focus:border-blue-600 transition-colors"
            />
          </div>

          <div className="flex gap-2 w-full md:w-auto overflow-x-auto">
            {activeTab === "blogs" ? (
              <>
                <button
                  onClick={() => setFilter("all")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filter === "all" ? "bg-blue-600 text-white" : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                    }`}
                >
                  All
                </button>
                <button
                  onClick={() => setFilter("published")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filter === "published" ? "bg-green-600/20 text-green-400 border border-green-600/30" : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                    }`}
                >
                  Published
                </button>
                <button
                  onClick={() => setFilter("draft")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filter === "draft" ? "bg-gray-600/20 text-gray-400 border border-gray-600/30" : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                    }`}
                >
                  Drafts
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setFilter("all")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filter === "all" ? "bg-blue-600 text-white" : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                    }`}
                >
                  All
                </button>
                <button
                  onClick={() => setFilter("unread")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filter === "unread" ? "bg-blue-600/20 text-blue-400 border border-blue-600/30" : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                    }`}
                >
                  Unread
                </button>
                <button
                  onClick={() => setFilter("read")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filter === "read" ? "bg-gray-600/20 text-gray-400 border border-gray-600/30" : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                    }`}
                >
                  Read
                </button>
              </>
            )}
          </div>

          {/* Sort Controls */}
          <div className="flex gap-2 items-center">
            <span className="text-gray-400 text-sm whitespace-nowrap">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as "date" | "name" | "status")}
              className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-600"
            >
              <option value="date">Date</option>
              <option value="name">{activeTab === "blogs" ? "Title" : "Name"}</option>
              <option value="status">{activeTab === "blogs" ? "Status" : "Read Status"}</option>
            </select>
            <button
              onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
              className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-gray-400 hover:text-white transition-colors"
              title={sortOrder === "asc" ? "Ascending" : "Descending"}
            >
              <ArrowUpDown size={18} className={sortOrder === "desc" ? "rotate-180" : ""} />
            </button>
          </div>
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
              {filteredBlogs.length === 0 ? (
                <Card>
                  <p className="text-gray-400 text-center py-8">
                    No blog posts found matching your criteria.
                  </p>
                </Card>
              ) : (
                filteredBlogs.map((blog) => (
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
            {filteredContacts.length === 0 ? (
              <Card>
                <p className="text-gray-400 text-center py-8">
                  No contact submissions found matching your criteria.
                </p>
              </Card>
            ) : (
              filteredContacts.map((contact) => (
                <Card
                  key={contact.id}
                  className={`cursor-pointer ${!contact.read ? "border-blue-600/50" : ""}`}
                  hover
                  onClick={() => setSelectedContact(contact)}
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

        {/* Contact Detail Modal */}
        <ContactDetailModal
          contact={selectedContact}
          onClose={() => setSelectedContact(null)}
          onMarkAsRead={handleMarkAsRead}
          onDelete={handleDeleteContact}
        />

        {/* Confirmation Modal */}
        <ConfirmationModal
          isOpen={confirmModal.isOpen}
          onClose={() => setConfirmModal({ ...confirmModal, isOpen: false })}
          onConfirm={confirmModal.onConfirm}
          title={confirmModal.title}
          message={confirmModal.message}
          confirmText="Delete"
        />
      </div>
    </main>
  );
}

