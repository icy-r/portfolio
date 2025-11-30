export interface GitHubUser {
  login: string;
  name: string;
  bio: string | null;
  blog: string | null;
  location: string | null;
  public_repos: number;
  followers: number;
  following: number;
  avatar_url: string;
  html_url: string;
  created_at: string;
}

export interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  html_url: string;
  homepage: string | null;
  created_at: string;
  updated_at: string;
  topics: string[];
}

const GITHUB_API_BASE = "https://api.github.com";

export async function fetchGitHubUser(username: string): Promise<GitHubUser> {
  const response = await fetch(`${GITHUB_API_BASE}/users/${username}`, {
    next: { revalidate: 3600 }, // Cache for 1 hour
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch GitHub user: ${response.statusText}`);
  }

  return response.json();
}

export async function fetchGitHubRepos(
  username: string,
  limit: number = 6
): Promise<GitHubRepo[]> {
  const response = await fetch(
    `${GITHUB_API_BASE}/users/${username}/repos?sort=updated&per_page=${limit}`,
    {
      next: { revalidate: 3600 }, // Cache for 1 hour
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch GitHub repos: ${response.statusText}`);
  }

  const repos: GitHubRepo[] = await response.json();
  return repos.filter((repo) => !repo.name.includes("1st-Year")); // Filter out academic repos
}

export async function fetchPinnedRepos(): Promise<number[]> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/api/admin/pinned-repos`, {
      next: { revalidate: 0 }, // No cache for pinned repos
    });
    if (!response.ok) return [];
    return response.json();
  } catch (error) {
    return [];
  }
}

