export interface Repository {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  topics: string[];
  updated_at: string;
  created_at: string;
  size: number;
  forks_count: number;
  open_issues_count: number;
  default_branch: string;
  private: boolean;
  fork: boolean;
}

export type SortOption = "recent" | "alphabetical" | "stars" | "created";

export class GitHubService {
  private static readonly GITHUB_API_URL = "https://api.github.com";
  private static readonly USERNAME =
    process.env.NEXT_PUBLIC_GITHUB_USERNAME || "DiwanMalla";
  private static readonly TOKEN = process.env.NEXT_PUBLIC_GITHUB_TOKEN;

  private static getHeaders() {
    const headers: Record<string, string> = {
      Accept: "application/vnd.github.v3+json",
      "User-Agent": "DiwanMalla-Portfolio/1.0",
    };

    // Add authentication if token is available
    if (this.TOKEN) {
      headers["Authorization"] = `token ${this.TOKEN}`;
      console.log("GitHub token found, using authenticated requests");
    } else {
      console.warn(
        "No GitHub token found. Using unauthenticated requests (60/hour limit)"
      );
    }

    return headers;
  }

  static async fetchAllRepositories(): Promise<Repository[]> {
    try {
      // Add timeout and better error handling
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

      const response = await fetch(
        `${this.GITHUB_API_URL}/users/${this.USERNAME}/repos?per_page=100&type=owner&sort=updated`,
        {
          headers: this.getHeaders(),
          signal: controller.signal,
          // Increase cache time to reduce API calls
          next: { revalidate: 7200 }, // Cache for 2 hours
        }
      );

      clearTimeout(timeoutId);

      if (!response.ok) {
        if (response.status === 403) {
          const errorData = await response.json().catch(() => ({}));
          if (errorData.message && errorData.message.includes("rate limit")) {
            throw new Error(
              "GitHub API rate limit exceeded. Please add a GitHub token to increase the limit."
            );
          }
        }
        throw new Error(
          `GitHub API error: ${response.status} ${response.statusText}`
        );
      }

      const repos: Repository[] = await response.json();

      // Filter out forks and private repos, keep only public original repos
      return repos.filter((repo) => !repo.fork && !repo.private);
    } catch (error) {
      console.error("Error fetching repositories:", error);

      // Check if it's a network/fetch error
      if (error instanceof Error) {
        if (error.name === "AbortError") {
          throw new Error(
            "Request timed out. Please check your internet connection."
          );
        }
        if (error.message.includes("fetch")) {
          throw new Error(
            "Network error. Please check your internet connection and try again."
          );
        }
      }

      throw error;
    }
  }

  static sortRepositories(
    repositories: Repository[],
    sortBy: SortOption
  ): Repository[] {
    const sorted = [...repositories];

    switch (sortBy) {
      case "recent":
        return sorted.sort(
          (a, b) =>
            new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
        );

      case "alphabetical":
        return sorted.sort((a, b) =>
          a.name.toLowerCase().localeCompare(b.name.toLowerCase())
        );

      case "stars":
        return sorted.sort((a, b) => b.stargazers_count - a.stargazers_count);

      case "created":
        return sorted.sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );

      default:
        return sorted;
    }
  }

  static formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  static getRepositoryStats(repo: Repository) {
    return {
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      issues: repo.open_issues_count,
      size: repo.size,
      lastUpdated: this.formatDate(repo.updated_at),
      created: this.formatDate(repo.created_at),
    };
  }

  static async fetchReadmePreview(repoName: string): Promise<string | null> {
    try {
      // Try different README file names
      const readmeFiles = ["README.md", "readme.md", "README.txt", "README"];

      for (const fileName of readmeFiles) {
        try {
          const response = await fetch(
            `${this.GITHUB_API_URL}/repos/${this.USERNAME}/${repoName}/contents/${fileName}`,
            {
              headers: this.getHeaders(),
              next: { revalidate: 7200 }, // Cache for 2 hours
            }
          );

          if (response.ok) {
            const data = await response.json();

            // GitHub API returns base64 encoded content
            if (data.content && data.encoding === "base64") {
              const decodedContent = atob(data.content);

              // Extract meaningful preview (skip title, get description)
              const lines = decodedContent.split("\n");
              let preview = "";

              for (const line of lines) {
                const trimmed = line.trim();
                // Skip empty lines, headers, and markdown syntax
                if (
                  trimmed &&
                  !trimmed.startsWith("#") &&
                  !trimmed.startsWith("!") &&
                  !trimmed.startsWith("[![") &&
                  !trimmed.startsWith("---") &&
                  trimmed.length > 20
                ) {
                  preview = trimmed;
                  break;
                }
              }

              // If no good preview found, use first meaningful content
              if (!preview) {
                const cleanContent = decodedContent
                  .replace(/^#.*/gm, "") // Remove headers
                  .replace(/!\[.*?\]\(.*?\)/g, "") // Remove images
                  .replace(/\[.*?\]\(.*?\)/g, "") // Remove links
                  .trim();

                preview = cleanContent.substring(0, 150);
              }

              // Limit preview length and add ellipsis
              return preview.length > 150
                ? preview.substring(0, 150) + "..."
                : preview;
            }
          }
        } catch {
          // Continue to next file if this one fails
          continue;
        }
      }

      return null;
    } catch (error) {
      console.error("Error fetching README preview:", error);
      return null;
    }
  }

  // Keep the original method for compatibility
  static async fetchRepositoryReadme(repoName: string): Promise<string | null> {
    return this.fetchReadmePreview(repoName);
  }

  static async fetchFullReadme(repoName: string): Promise<string | null> {
    try {
      const readmeFiles = ["README.md", "readme.md", "README.txt", "README"];

      for (const fileName of readmeFiles) {
        try {
          const response = await fetch(
            `${this.GITHUB_API_URL}/repos/${this.USERNAME}/${repoName}/contents/${fileName}`,
            {
              headers: this.getHeaders(),
              next: { revalidate: 7200 },
            }
          );

          if (response.ok) {
            const data = await response.json();

            if (data.content && data.encoding === "base64") {
              return atob(data.content);
            }
          }
        } catch {
          continue;
        }
      }

      return null;
    } catch (error) {
      console.error("Error fetching full README:", error);
      return null;
    }
  }
}
