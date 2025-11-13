import fs from "fs";
import path from "path";

const dataDir = path.join(process.cwd(), "data");

// Ensure data directory exists
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const blogsFile = path.join(dataDir, "blogs.json");
const contactsFile = path.join(dataDir, "contacts.json");

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
  read: boolean;
}

// Blogs CRUD
export function getBlogs(): BlogPost[] {
  if (!fs.existsSync(blogsFile)) {
    return [];
  }
  try {
    const data = fs.readFileSync(blogsFile, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

export function getBlog(id: string): BlogPost | null {
  const blogs = getBlogs();
  return blogs.find((b) => b.id === id) || null;
}

export function createBlog(blog: Omit<BlogPost, "id" | "createdAt" | "updatedAt">): BlogPost {
  const blogs = getBlogs();
  const newBlog: BlogPost = {
    ...blog,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  blogs.push(newBlog);
  fs.writeFileSync(blogsFile, JSON.stringify(blogs, null, 2));
  return newBlog;
}

export function updateBlog(id: string, updates: Partial<BlogPost>): BlogPost | null {
  const blogs = getBlogs();
  const index = blogs.findIndex((b) => b.id === id);
  if (index === -1) return null;
  
  blogs[index] = {
    ...blogs[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };
  fs.writeFileSync(blogsFile, JSON.stringify(blogs, null, 2));
  return blogs[index];
}

export function deleteBlog(id: string): boolean {
  const blogs = getBlogs();
  const filtered = blogs.filter((b) => b.id !== id);
  if (filtered.length === blogs.length) return false;
  
  fs.writeFileSync(blogsFile, JSON.stringify(filtered, null, 2));
  return true;
}

// Contacts CRUD
export function getContacts(): ContactSubmission[] {
  if (!fs.existsSync(contactsFile)) {
    return [];
  }
  try {
    const data = fs.readFileSync(contactsFile, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

export function getContact(id: string): ContactSubmission | null {
  const contacts = getContacts();
  return contacts.find((c) => c.id === id) || null;
}

export function createContact(contact: Omit<ContactSubmission, "id" | "createdAt" | "read">): ContactSubmission {
  const contacts = getContacts();
  const newContact: ContactSubmission = {
    ...contact,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    read: false,
  };
  contacts.push(newContact);
  fs.writeFileSync(contactsFile, JSON.stringify(contacts, null, 2));
  return newContact;
}

export function markContactAsRead(id: string): boolean {
  const contacts = getContacts();
  const contact = contacts.find((c) => c.id === id);
  if (!contact) return false;
  
  contact.read = true;
  fs.writeFileSync(contactsFile, JSON.stringify(contacts, null, 2));
  return true;
}

export function deleteContact(id: string): boolean {
  const contacts = getContacts();
  const filtered = contacts.filter((c) => c.id !== id);
  if (filtered.length === contacts.length) return false;
  
  fs.writeFileSync(contactsFile, JSON.stringify(filtered, null, 2));
  return true;
}

