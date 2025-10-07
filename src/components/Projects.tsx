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
    <section id="projects" className="py-12 sm:py-16 px-4 bg-muted/30 dark:bg-muted/10">
      <div className="container max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">All Projects</h2>
          <p className="text-muted-foreground text-sm sm:text-base lg:text-lg max-w-2xl mx-auto leading-relaxed">
            A complete showcase of my work spanning web applications, mobile
            apps, AI solutions, and e-commerce platforms. Each project
            demonstrates different technologies and innovative problem-solving
            approaches.
          </p>

          {/* Sort Controls */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mt-6 sm:mt-8">
            {(
              ["recent", "alphabetical", "stars", "created"] as SortOption[]
            ).map((option) => (
              <button
                key={option}
                onClick={() => handleSortChange(option)}
                className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-full border transition-colors text-xs sm:text-sm font-medium min-h-[40px] ${
                  sortBy === option
                    ? "bg-foreground text-background border-foreground"
                    : "border-foreground/20 hover:border-foreground/40 hover:bg-foreground/5 active:bg-foreground/10"
                }`}
              >
                {getSortIcon(option)}
                <span className="whitespace-nowrap">{getSortLabel(option)}</span>
              </button>
            ))}
          </div>

          {/* Results Counter and Per-Page Selector */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4 mt-4 sm:mt-6">
            <p className="text-muted-foreground text-xs sm:text-sm text-center sm:text-left">
              <span className="block sm:inline">Showing {startIndex + 1}-{Math.min(endIndex, sortedRepos.length)} of {sortedRepos.length} repositories</span>
              <span className="hidden sm:inline"> • </span>
              <span className="block sm:inline">Sorted by {getSortLabel(sortBy).toLowerCase()}</span>
            </p>
            
            <div className="flex items-center gap-2 text-xs sm:text-sm">
              <span className="text-muted-foreground">Show:</span>
              <div className="flex gap-1 sm:gap-2">
                {[6, 12, 20, 30].map((count) => (
                  <button
                    key={count}
                    onClick={() => handleItemsPerPageChange(count)}
                    className={`px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-full border transition-colors min-w-[36px] sm:min-w-[40px] ${
                      itemsPerPage === count
                        ? 'bg-foreground text-background border-foreground'
                        : 'border-foreground/20 hover:border-foreground/40 hover:bg-foreground/5 active:bg-foreground/10'
                    }`}
                  >
                    {count}
                  </button>
                ))}
              </div>
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
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
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-2 mt-8 sm:mt-12">
                {/* Mobile: Page info */}
                <div className="sm:hidden text-xs text-muted-foreground mb-2">
                  Page {currentPage} of {totalPages}
                </div>
                
                <div className="flex items-center gap-2">
                  {/* Previous Button */}
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 border border-foreground/20 rounded-lg hover:bg-foreground/5 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm min-h-[44px]"
                  >
                    <ChevronLeft size={16} />
                    <span className="hidden sm:inline">Previous</span>
                    <span className="sm:hidden">Prev</span>
                  </button>

                  {/* Page Numbers - Simplified for mobile */}
                  <div className="flex gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1)
                      .filter(page => {
                        // On mobile, show fewer pages
                        if (window.innerWidth < 640) {
                          return page === 1 || 
                                 page === totalPages || 
                                 page === currentPage ||
                                 (Math.abs(page - currentPage) === 1 && totalPages <= 7);
                        }
                        // Desktop: show more pages
                        return page === 1 || 
                               page === totalPages || 
                               Math.abs(page - currentPage) <= 1;
                      })
                      .map((page, index, array) => {
                        const showEllipsis = index > 0 && page - array[index - 1] > 1;
                        
                        return (
                          <div key={page} className="flex items-center gap-1">
                            {showEllipsis && (
                              <span className="px-1 sm:px-2 text-muted-foreground text-xs sm:text-sm">...</span>
                            )}
                            <button
                              onClick={() => handlePageChange(page)}
                              className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg border transition-colors text-xs sm:text-sm font-medium ${
                                currentPage === page
                                  ? 'bg-foreground text-background border-foreground'
                                  : 'border-foreground/20 hover:border-foreground/40 hover:bg-foreground/5 active:bg-foreground/10'
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
                    className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 border border-foreground/20 rounded-lg hover:bg-foreground/5 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm min-h-[44px]"
                  >
                    <span className="hidden sm:inline">Next</span>
                    <span className="sm:hidden">Next</span>
                    <ChevronRight size={16} />
                  </button>
                </div>
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
        <div className="text-center mt-8 sm:mt-12">
          <a
            href="https://github.com/DiwanMalla?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 border-2 border-foreground rounded-full hover:bg-foreground hover:text-background transition-colors font-medium text-sm sm:text-base min-h-[48px] w-full sm:w-auto max-w-sm sm:max-w-none"
          >
            <span>View All Projects on GitHub</span>
          </a>
        </div>
      </div>
    </section>
  );
}
