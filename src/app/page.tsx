import { Suspense } from "react";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Footer from "@/components/Footer";
import { GitHubService, Repository } from "@/lib/github";

async function getRepositories() {
  try {
    return await GitHubService.fetchAllRepositories();
  } catch (error) {
    console.error('Failed to fetch repositories:', error);
    
    // Log specific error messages
    if (error instanceof Error) {
      if (error.message.includes('rate limit')) {
        console.warn('GitHub API rate limit exceeded. Using fallback projects. Consider adding a GitHub token to .env.local for higher rate limits.');
      } else if (error.message.includes('Network error') || error.message.includes('fetch')) {
        console.warn('Network error while fetching GitHub repositories. Using fallback projects. Please check your internet connection.');
      } else if (error.message.includes('timed out')) {
        console.warn('GitHub API request timed out. Using fallback projects. The API might be temporarily unavailable.');
      } else {
        console.warn('GitHub API error:', error.message, 'Using fallback projects.');
      }
    }
    
    return [];
  }
}

// Fallback featured projects (in case API fails) - matching Repository interface
const fallbackProjects: Repository[] = [
  {
    id: 1,
    name: "aurora-alarm-clock",
    description: "A next-generation React Native alarm clock app with smart wake-up features, beautiful UI, and wellness integrations",
    html_url: "https://github.com/DiwanMalla/aurora-alarm-clock",
    homepage: null,
    language: "TypeScript",
    stargazers_count: 0,
    topics: ["react-native", "mobile-app", "alarm-clock"],
    updated_at: "2025-10-06T09:44:50Z",
    created_at: "2025-10-06T09:44:50Z",
    size: 1024,
    forks_count: 0,
    open_issues_count: 0,
    default_branch: "main",
    private: false,
    fork: false,
  },
  {
    id: 2,
    name: "BrainiX",
    description: "AI-powered brain training application with interactive games and cognitive exercises",
    html_url: "https://github.com/DiwanMalla/BrainiX",
    homepage: "https://braini-x-one.vercel.app",
    language: "TypeScript",
    stargazers_count: 0,
    topics: ["ai", "brain-training", "nextjs"],
    updated_at: "2025-06-18T12:54:07Z",
    created_at: "2025-06-18T12:54:07Z",
    size: 2048,
    forks_count: 0,
    open_issues_count: 0,
    default_branch: "main",
    private: false,
    fork: false,
  },
  {
    id: 3,
    name: "horizon_banking",
    description: "Horizon is a modern banking platform for everyone with secure transactions and modern UI",
    html_url: "https://github.com/DiwanMalla/horizon_banking",
    homepage: "https://horizon-banking-sooty.vercel.app",
    language: "TypeScript",
    stargazers_count: 0,
    topics: ["nextjs14", "banking", "fintech"],
    updated_at: "2024-08-25T10:18:31Z",
    created_at: "2024-08-25T10:18:31Z",
    size: 3072,
    forks_count: 0,
    open_issues_count: 0,
    default_branch: "main",
    private: false,
    fork: false,
  },
];

export default async function Home() {
  const repositories = await getRepositories();
  
  return (
    <>
      <Hero />
      <Suspense fallback={<Projects repos={[]} isLoading={true} />}>
        <Projects repos={repositories.length > 0 ? repositories : fallbackProjects} />
      </Suspense>
      <Footer />
    </>
  );
}
