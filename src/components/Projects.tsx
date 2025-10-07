"use client";

import { useState, useEffect } from "react";
import {
  ArrowUpDown,
  SortAsc,
  Star,
  Clock,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import ProjectCard from "./ProjectCard";
import { Repository, SortOption, GitHubService } from "../lib/github";

interface ProjectsProps {
  repos: Repository[];
  isLoading?: boolean;
}

export default function Projects({ repos, isLoading = false }: ProjectsProps) {
  const [sortBy, setSortBy] = useState<SortOption>("recent");
  const [sortedRepos, setSortedRepos] = useState<Repository[]>(repos);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);

  const handleSortChange = (newSortBy: SortOption) => {
    setSortBy(newSortBy);
    const sorted = GitHubService.sortRepositories(repos, newSortBy);
    setSortedRepos(sorted);
    setCurrentPage(1); // Reset to first page when sorting
  };

  // Calculate pagination
  const totalPages = Math.ceil(sortedRepos.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentRepos = sortedRepos.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top of projects section
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1); // Reset to first page
  };

  // Update sorted repos when repos prop changes
  useEffect(() => {
    const sorted = GitHubService.sortRepositories(repos, sortBy);
    setSortedRepos(sorted);
  }, [repos, sortBy]);

  const getSortIcon = (option: SortOption) => {
    switch (option) {
      case "recent":
      case "created":
        return <Clock size={16} />;
      case "alphabetical":
        return <SortAsc size={16} />;
      case "stars":
        return <Star size={16} />;
      default:
        return <ArrowUpDown size={16} />;
    }
  };

  const getSortLabel = (option: SortOption) => {
    switch (option) {
      case "recent":
        return "Recently Updated";
      case "alphabetical":
        return "A-Z";
      case "stars":
        return "Most Stars";
      case "created":
        return "Recently Created";
      default:
        return "Sort";
    }
  };
  return (
    <section className="py-16 px-4 bg-muted/30 dark:bg-muted/10">
      <div className="container max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">All Projects</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A complete showcase of my work spanning web applications, mobile
            apps, AI solutions, and e-commerce platforms. Each project
            demonstrates different technologies and innovative problem-solving
            approaches.
          </p>

          {/* Sort Controls */}
          <div className="flex flex-wrap justify-center gap-2 mt-8">
            {(
              ["recent", "alphabetical", "stars", "created"] as SortOption[]
            ).map((option) => (
              <button
                key={option}
                onClick={() => handleSortChange(option)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-colors ${
                  sortBy === option
                    ? "bg-foreground text-background border-foreground"
                    : "border-foreground/20 hover:border-foreground/40 hover:bg-foreground/5"
                }`}
              >
                {getSortIcon(option)}
                {getSortLabel(option)}
              </button>
            ))}
          </div>

          {/* Results Counter and Per-Page Selector */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-4">
            <p className="text-muted-foreground text-sm">
              Showing {startIndex + 1}-{Math.min(endIndex, sortedRepos.length)} of {sortedRepos.length} repositories • Sorted by {getSortLabel(sortBy).toLowerCase()}
            </p>
            
            <div className="flex items-center gap-2 text-sm">
              <span className="text-muted-foreground">Show:</span>
              {[6, 12, 20, 30].map((count) => (
                <button
                  key={count}
                  onClick={() => handleItemsPerPageChange(count)}
                  className={`px-3 py-1 rounded-full border transition-colors ${
                    itemsPerPage === count
                      ? 'bg-foreground text-background border-foreground'
                      : 'border-foreground/20 hover:border-foreground/40 hover:bg-foreground/5'
                  }`}
                >
                  {count}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-64 bg-muted/50 rounded-lg animate-pulse"
              />
            ))}
          </div>
        ) : /* Projects Grid */
        currentRepos.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentRepos.map((repo) => (
                <ProjectCard
                  key={repo.id}
                  name={repo.name}
                  description={repo.description}
                  html_url={repo.html_url}
                  homepage={repo.homepage}
                  language={repo.language}
                  stargazers_count={repo.stargazers_count}
                  topics={repo.topics}
                />
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-12">
                {/* Previous Button */}
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="flex items-center gap-2 px-4 py-2 border border-foreground/20 rounded-lg hover:bg-foreground/5 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft size={16} />
                  Previous
                </button>

                {/* Page Numbers */}
                <div className="flex gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1)
                    .filter(page => {
                      // Show first, last, current, and adjacent pages
                      return page === 1 || 
                             page === totalPages || 
                             Math.abs(page - currentPage) <= 1;
                    })
                    .map((page, index, array) => {
                      const showEllipsis = index > 0 && page - array[index - 1] > 1;
                      
                      return (
                        <div key={page} className="flex items-center gap-1">
                          {showEllipsis && (
                            <span className="px-2 text-muted-foreground">...</span>
                          )}
                          <button
                            onClick={() => handlePageChange(page)}
                            className={`w-10 h-10 rounded-lg border transition-colors ${
                              currentPage === page
                                ? 'bg-foreground text-background border-foreground'
                                : 'border-foreground/20 hover:border-foreground/40 hover:bg-foreground/5'
                            }`}
                          >
                            {page}
                          </button>
                        </div>
                      );
                    })}
                </div>

                {/* Next Button */}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="flex items-center gap-2 px-4 py-2 border border-foreground/20 rounded-lg hover:bg-foreground/5 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                  <ChevronRight size={16} />
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              No projects found. Check back soon!
            </p>
          </div>
        )}

        {/* View More Link */}
        <div className="text-center mt-12">
          <a
            href="https://github.com/DiwanMalla?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 border-2 border-foreground rounded-full hover:bg-foreground hover:text-background transition-colors font-medium"
          >
            View All Projects on GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
