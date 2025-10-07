"use client";

import { X, Book, ExternalLink, Github } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface ReadmeModalProps {
  isOpen: boolean;
  onClose: () => void;
  repoName: string;
  repoUrl: string;
  homepage?: string | null;
  readmeContent: string;
}

export default function ReadmeModal({
  isOpen,
  onClose,
  repoName,
  repoUrl,
  homepage,
  readmeContent,
}: ReadmeModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-background rounded-lg shadow-2xl border border-foreground/10 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-foreground/10">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-foreground/5 rounded-lg">
              <Book size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold">{repoName}</h2>
              <p className="text-sm text-muted-foreground">Project README</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Action Buttons */}
            <a
              href={repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 hover:bg-foreground/5 rounded-lg transition-colors"
              title="View on GitHub"
            >
              <Github size={20} />
            </a>
            {homepage && (
              <a
                href={homepage}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 hover:bg-foreground/5 rounded-lg transition-colors"
                title="Live Demo"
              >
                <ExternalLink size={20} />
              </a>
            )}
            <button
              onClick={onClose}
              className="p-2 hover:bg-foreground/5 rounded-lg transition-colors"
              title="Close"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="prose prose-gray dark:prose-invert max-w-none">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                // Custom components for better styling
                h1: ({ children }) => (
                  <h1 className="text-2xl font-bold mb-4 text-foreground border-b border-foreground/20 pb-2">
                    {children}
                  </h1>
                ),
                h2: ({ children }) => (
                  <h2 className="text-xl font-semibold mb-3 text-foreground">
                    {children}
                  </h2>
                ),
                h3: ({ children }) => (
                  <h3 className="text-lg font-medium mb-2 text-foreground">
                    {children}
                  </h3>
                ),
                p: ({ children }) => (
                  <p className="mb-4 text-muted-foreground leading-relaxed">
                    {children}
                  </p>
                ),
                a: ({ href, children }) => (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-600 underline"
                  >
                    {children}
                  </a>
                ),
                code: ({ children, className }) => {
                  const isInline = !className;
                  if (isInline) {
                    return (
                      <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono">
                        {children}
                      </code>
                    );
                  }
                  return (
                    <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
                      <code className="text-sm font-mono">{children}</code>
                    </pre>
                  );
                },
                ul: ({ children }) => (
                  <ul className="list-disc pl-6 mb-4 space-y-1">{children}</ul>
                ),
                ol: ({ children }) => (
                  <ol className="list-decimal pl-6 mb-4 space-y-1">{children}</ol>
                ),
                li: ({ children }) => (
                  <li className="text-muted-foreground">{children}</li>
                ),
                blockquote: ({ children }) => (
                  <blockquote className="border-l-4 border-foreground/20 pl-4 italic text-muted-foreground">
                    {children}
                  </blockquote>
                ),
              }}
            >
              {readmeContent}
            </ReactMarkdown>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-foreground/10 bg-muted/20">
          <p className="text-sm text-muted-foreground">
            README from{" "}
            <a
              href={repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-600"
            >
              {repoName}
            </a>
          </p>
          <div className="flex gap-2">
            {homepage && (
              <a
                href={homepage}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium"
              >
                View Live Demo
              </a>
            )}
            <a
              href={repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 border border-foreground/20 rounded-lg hover:bg-foreground/5 transition-colors text-sm font-medium"
            >
              View Source
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}