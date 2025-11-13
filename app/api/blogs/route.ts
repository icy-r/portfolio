import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/app/api/auth/[...nextauth]/route";
import {
  getBlogs,
  createBlog,
  getBlog,
  updateBlog,
  deleteBlog,
} from "@/lib/data";

export async function GET(request: NextRequest) {
  const session = await auth();
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get("id");
  const published = searchParams.get("published");

  if (id) {
    const blog = getBlog(id);
    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }
    // Only show unpublished blogs to authenticated users
    if (!blog.published && !session) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }
    return NextResponse.json(blog);
  }

  const blogs = getBlogs();
  
  // Filter published blogs for public access
  if (published === "true" || !session) {
    return NextResponse.json(blogs.filter((b) => b.published));
  }

  // Return all blogs for admin
  return NextResponse.json(blogs);
}

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const blog = createBlog({
      title: body.title,
      excerpt: body.excerpt,
      content: body.content,
      date: body.date || new Date().toISOString(),
      published: body.published || false,
    });
    return NextResponse.json(blog, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
}

export async function PUT(request: NextRequest) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { id, ...updates } = body;
    const blog = updateBlog(id, updates);
    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }
    return NextResponse.json(blog);
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "ID required" }, { status: 400 });
  }

  const deleted = deleteBlog(id);
  if (!deleted) {
    return NextResponse.json({ error: "Blog not found" }, { status: 404 });
  }
  return NextResponse.json({ success: true });
}

