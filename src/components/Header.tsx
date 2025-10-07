"use client";

import ThemeToggle from "./ThemeToggle";
import { Github, Linkedin, Globe } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-sm border-b border-foreground/10">
      <div className="container max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo/Name */}
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-bold text-foreground">Diwan Malla</h1>
            <span className="text-sm text-muted-foreground hidden sm:inline">
              Full-Stack Developer
            </span>
          </div>

          {/* Navigation & Theme Toggle */}
          <div className="flex items-center gap-4">
            {/* Social Links */}
            <div className="hidden md:flex items-center gap-2">
              <a
                href="https://github.com/DiwanMalla"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 hover:bg-foreground/5 rounded-lg transition-colors"
                title="GitHub"
              >
                <Github size={18} />
              </a>
              <a
                href="https://www.linkedin.com/in/diwan-malla-b51a79226/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 hover:bg-foreground/5 rounded-lg transition-colors"
                title="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
              <a
                href="https://diwanportfolio.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 hover:bg-foreground/5 rounded-lg transition-colors"
                title="Portfolio"
              >
                <Globe size={18} />
              </a>
            </div>

            {/* Theme Toggle */}
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}