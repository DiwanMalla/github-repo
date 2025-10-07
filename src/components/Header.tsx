"use client";

import { useState } from "react";
import ThemeToggle from "./ThemeToggle";
import { Github, Linkedin, Globe, Menu, X } from "lucide-react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-foreground/10">
      <div className="container max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo/Name */}
          <div className="flex items-center gap-3">
            <h1 className="text-xl sm:text-2xl font-bold text-foreground">Diwan Malla</h1>
            <span className="text-sm text-muted-foreground hidden sm:inline">
              Full-Stack Developer
            </span>
          </div>

          {/* Navigation & Theme Toggle */}
          <div className="flex items-center gap-4">
            {/* Desktop Social Links */}
            <div className="hidden md:flex items-center gap-2">
              <a
                href="https://github.com/DiwanMalla"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 hover:bg-foreground/5 rounded-lg transition-colors flex items-center gap-2"
                title="GitHub"
              >
                <Github size={18} />
                <span className="hidden lg:inline text-sm">GitHub</span>
              </a>
              <a
                href="https://www.linkedin.com/in/diwan-malla-b51a79226/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 hover:bg-foreground/5 rounded-lg transition-colors flex items-center gap-2"
                title="LinkedIn"
              >
                <Linkedin size={18} />
                <span className="hidden lg:inline text-sm">LinkedIn</span>
              </a>
              <a
                href="https://diwanportfolio.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 hover:bg-foreground/5 rounded-lg transition-colors flex items-center gap-2"
                title="Portfolio"
              >
                <Globe size={18} />
                <span className="hidden lg:inline text-sm">Portfolio</span>
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="md:hidden p-2 hover:bg-foreground/5 rounded-lg transition-colors"
              aria-label="Toggle mobile menu"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            {/* Theme Toggle */}
            <ThemeToggle />
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-foreground/10 py-4 animate-in slide-in-from-top-1 duration-200">
            <div className="flex flex-col gap-2">
              <a
                href="https://github.com/DiwanMalla"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 hover:bg-foreground/5 rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <Github size={18} />
                <span className="text-sm font-medium">GitHub</span>
              </a>
              <a
                href="https://www.linkedin.com/in/diwan-malla-b51a79226/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 hover:bg-foreground/5 rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <Linkedin size={18} />
                <span className="text-sm font-medium">LinkedIn</span>
              </a>
              <a
                href="https://diwanportfolio.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 hover:bg-foreground/5 rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <Globe size={18} />
                <span className="text-sm font-medium">Portfolio</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}