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
    <div className="group relative bg-background dark:bg-muted/20 border border-foreground/10 dark:border-foreground/20 rounded-lg p-6 hover:border-foreground/30 dark:hover:border-foreground/40 transition-all duration-300 hover:shadow-lg dark:hover:shadow-2xl">
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2 group-hover:text-foreground/80 transition-colors">
            {name}
          </h3>
          <div className="text-muted-foreground text-sm line-clamp-2 min-h-[2.5rem]">
            {description ? (
              <p>{description}</p>
            ) : (
              <div>
                {isLoadingPreview ? (
                  <div className="flex items-center gap-2 text-muted-foreground/60">
                    <Loader2 size={14} className="animate-spin" />
                    Loading description...
                  </div>
                ) : readmePreview ? (
                  <p className="italic">{readmePreview}</p>
                ) : (
                  <p className="text-muted-foreground/60">No description available</p>
                )}
              </div>
            )}
          </div>
          
          {/* Read More Button - Show if no description or if we have README content */}
          {(!description || readmePreview) && (
            <button
              onClick={handleReadMoreClick}
              disabled={isLoadingReadme}
              className="mt-2 flex items-center gap-2 text-sm text-blue-500 hover:text-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoadingReadme ? (
                <>
                  <Loader2 size={14} className="animate-spin" />
                  Loading...
                </>
              ) : (
                <>
                  <BookOpen size={14} />
                  {readmePreview ? 'Read Full README' : 'Read More'}
                </>
              )}
            </button>
          )}
        </div>

        {/* Topics */}
        {topics && topics.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {topics.slice(0, 3).map((topic) => (
              <span
                key={topic}
                className="text-xs px-2 py-1 bg-foreground/5 rounded-full text-foreground/70"
              >
                {topic}
              </span>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="mt-auto flex items-center justify-between pt-4 border-t border-foreground/5">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            {language && (
              <span className="flex items-center gap-1">
                <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                {language}
              </span>
            )}
            <span className="flex items-center gap-1">
              <Star size={14} />
              {stargazers_count}
            </span>
          </div>

          {/* Links */}
          <div className="flex gap-2">
            <a
              href={html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 hover:bg-foreground/5 rounded-full transition-colors"
              title="View on GitHub"
            >
              <Github size={18} />
            </a>
            {homepage && (
              <a
                href={homepage}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 hover:bg-foreground/5 rounded-full transition-colors"
                title="View live demo"
              >
                <ExternalLink size={18} />
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
