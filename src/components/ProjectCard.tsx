"use client";

import { useState, useEffect } from "react";
import { ExternalLink, Github, Star, BookOpen, Loader2 } from "lucide-react";
import ReadmeModal from "./ReadmeModal";
import { GitHubService } from "../lib/github";

interface ProjectCardProps {
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  topics: string[];
}

export default function ProjectCard({
  name,
  description,
  html_url,
  homepage,
  language,
  stargazers_count,
  topics,
}: ProjectCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [readmeContent, setReadmeContent] = useState<string | null>(null);
  const [isLoadingReadme, setIsLoadingReadme] = useState(false);
  const [readmePreview, setReadmePreview] = useState<string | null>(null);
  const [isLoadingPreview, setIsLoadingPreview] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile on component mount
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Auto-fetch README preview if no description
  useEffect(() => {
    if (!description && !readmePreview && !isLoadingPreview) {
      setIsLoadingPreview(true);
      GitHubService.fetchReadmePreview(name)
        .then((preview) => {
          setReadmePreview(preview);
        })
        .catch(() => {
          setReadmePreview(null);
        })
        .finally(() => {
          setIsLoadingPreview(false);
        });
    }
  }, [description, name, readmePreview, isLoadingPreview]);

  const handleReadMoreClick = async () => {
    if (!readmeContent) {
      setIsLoadingReadme(true);
      try {
        const content = await GitHubService.fetchFullReadme(name);
        setReadmeContent(content || "No README found for this project.");
      } catch {
        setReadmeContent("Failed to load README content.");
      } finally {
        setIsLoadingReadme(false);
      }
    }
    setIsModalOpen(true);
  };

  return (
    <div className="group relative bg-background dark:bg-muted/20 border border-foreground/10 dark:border-foreground/20 rounded-lg p-4 sm:p-6 hover:border-foreground/30 dark:hover:border-foreground/40 transition-all duration-300 hover:shadow-lg dark:hover:shadow-2xl">
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="mb-3 sm:mb-4">
          <h3 className="text-lg sm:text-xl font-semibold mb-2 group-hover:text-foreground/80 transition-colors leading-tight">
            {name}
          </h3>
          <div className="text-muted-foreground text-sm line-clamp-2 min-h-[2.5rem]">
            {description ? (
              <p className="leading-relaxed">{description}</p>
            ) : (
              <div>
                {isLoadingPreview ? (
                  <div className="flex items-center gap-2 text-muted-foreground/60">
                    <Loader2 size={14} className="animate-spin" />
                    <span className="text-xs">Loading description...</span>
                  </div>
                ) : readmePreview ? (
                  <p className="italic leading-relaxed">{readmePreview}</p>
                ) : (
                  <p className="text-muted-foreground/60 text-xs">No description available</p>
                )}
              </div>
            )}
          </div>
          
          {/* Read More Button - Show if no description or if we have README content */}
          {(!description || readmePreview) && (
            <button
              onClick={handleReadMoreClick}
              disabled={isLoadingReadme}
              className="mt-2 flex items-center gap-2 text-xs sm:text-sm text-blue-500 hover:text-blue-600 disabled:opacity-50 disabled:cursor-not-allowed p-1 -ml-1 rounded hover:bg-blue-50/50 transition-colors"
            >
              {isLoadingReadme ? (
                <>
                  <Loader2 size={12} className="animate-spin" />
                  <span>Loading...</span>
                </>
              ) : (
                <>
                  <BookOpen size={12} />
                  <span>{readmePreview ? 'Read Full README' : 'Read More'}</span>
                </>
              )}
            </button>
          )}
        </div>

        {/* Topics */}
        {topics && topics.length > 0 && (
          <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
            {topics.slice(0, isMobile ? 2 : 3).map((topic) => (
              <span
                key={topic}
                className="text-xs px-2 py-1 bg-foreground/5 rounded-full text-foreground/70 leading-none"
              >
                {topic}
              </span>
            ))}
            {topics.length > (isMobile ? 2 : 3) && (
              <span className="text-xs px-2 py-1 bg-foreground/5 rounded-full text-foreground/70 leading-none">
                +{topics.length - (isMobile ? 2 : 3)}
              </span>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="mt-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0 pt-3 sm:pt-4 border-t border-foreground/5">
          <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
            {language && (
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-blue-500"></span>
                <span className="truncate max-w-[80px] sm:max-w-none">{language}</span>
              </span>
            )}
            <span className="flex items-center gap-1">
              <Star size={12} className="sm:size-14" />
              <span>{stargazers_count}</span>
            </span>
          </div>

          {/* Links */}
          <div className="flex gap-1 sm:gap-2 self-end sm:self-auto">
            <a
              href={html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 hover:bg-foreground/5 rounded-full transition-colors min-h-[40px] min-w-[40px] flex items-center justify-center"
              title="View on GitHub"
            >
              <Github size={16} className="sm:size-18" />
            </a>
            {homepage && (
              <a
                href={homepage}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 hover:bg-foreground/5 rounded-full transition-colors min-h-[40px] min-w-[40px] flex items-center justify-center"
                title="View live demo"
              >
                <ExternalLink size={16} className="sm:size-18" />
              </a>
            )}
          </div>
        </div>
      </div>

      {/* README Modal */}
      {readmeContent && (
        <ReadmeModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          repoName={name}
          repoUrl={html_url}
          homepage={homepage}
          readmeContent={readmeContent}
        />
      )}
    </div>
  );
}
