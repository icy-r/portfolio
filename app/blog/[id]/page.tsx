import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Button from "@/components/ui/Button";

async function getBlog(id: string) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/blogs?id=${id}&published=true`, {
      cache: "no-store",
    });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: { id: string };
}) {
  const blog = await getBlog(params.id);

  if (!blog) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-black pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link href="/#blog">
          <Button variant="outline" className="mb-8">
            <ArrowLeft size={18} className="mr-2" />
            Back to Blog
          </Button>
        </Link>

        <article className="bg-[#111111]/80 backdrop-blur-sm border border-gray-800 rounded-xl p-8">
          <header className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-4">{blog.title}</h1>
            <p className="text-gray-400 text-lg mb-4">{blog.excerpt}</p>
            <time className="text-gray-500 text-sm">
              {new Date(blog.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          </header>

          <div
            className="prose prose-invert prose-lg max-w-none text-gray-300"
            dangerouslySetInnerHTML={{
              __html: blog.content
                .split("\n")
                .map((line: string) => {
                  if (line.startsWith("# ")) {
                    return `<h1 class="text-3xl font-bold text-white mt-8 mb-4">${line.slice(2)}</h1>`;
                  }
                  if (line.startsWith("## ")) {
                    return `<h2 class="text-2xl font-bold text-white mt-6 mb-3">${line.slice(3)}</h2>`;
                  }
                  if (line.startsWith("### ")) {
                    return `<h3 class="text-xl font-semibold text-white mt-4 mb-2">${line.slice(4)}</h3>`;
                  }
                  if (line.trim() === "") {
                    return "<br />";
                  }
                  return `<p class="mb-4 leading-relaxed">${line}</p>`;
                })
                .join(""),
            }}
          />
        </article>
      </div>
    </main>
  );
}

