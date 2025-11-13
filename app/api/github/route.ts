import { NextResponse } from "next/server";
import { fetchGitHubUser, fetchGitHubRepos } from "@/lib/github";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type");
  const username = searchParams.get("username") || "icy-r";

  try {
    if (type === "user") {
      const user = await fetchGitHubUser(username);
      return NextResponse.json(user);
    } else if (type === "repos") {
      const limit = parseInt(searchParams.get("limit") || "6");
      const repos = await fetchGitHubRepos(username, limit);
      return NextResponse.json(repos);
    } else {
      const [user, repos] = await Promise.all([
        fetchGitHubUser(username),
        fetchGitHubRepos(username, 6),
      ]);
      return NextResponse.json({ user, repos });
    }
  } catch (error) {
    console.error("GitHub API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch GitHub data" },
      { status: 500 }
    );
  }
}

