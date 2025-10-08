"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "./ThemeProvider";

export default function ThemeToggle() {
  const { theme, actualTheme, setTheme } = useTheme();

  const themes = [
    { value: "light" as const, icon: Sun, label: "Light" },
    { value: "dark" as const, icon: Moon, label: "Dark" },
    { value: "system" as const, icon: Monitor, label: "System" },
  ];

  return (
    <div className="relative">
      {/* Desktop: Dropdown */}
      <div className="hidden sm:block">
        <div className="relative group">
          <button
            className="flex items-center gap-2 px-3 py-2 rounded-lg border border-foreground/20 hover:border-foreground/40 hover:bg-foreground/5 transition-colors"
            title={`Current theme: ${theme} (${actualTheme})`}
          >
            {actualTheme === "dark" ? <Moon size={18} /> : <Sun size={18} />}
            <span className="text-sm">Theme</span>
          </button>

          {/* Dropdown Menu */}
          <div className="absolute right-0 top-full mt-2 w-40 bg-background border border-foreground/20 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
            <div className="p-2 space-y-1">
              {themes.map(({ value, icon: Icon, label }) => (
                <button
                  key={value}
                  onClick={() => setTheme(value)}
                  className={`w-full flex items-center gap-3 px-3 py-2 text-sm rounded-md transition-colors ${
                    theme === value
                      ? "bg-foreground text-background"
                      : "hover:bg-foreground/10"
                  }`}
                >
                  <Icon size={16} />
                  <span>{label}</span>
                  {theme === value && value === "system" && (
                    <span className="ml-auto text-xs opacity-70">
                      ({actualTheme})
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile: Cycle Button */}
      <div className="sm:hidden">
        <button
          onClick={() => {
            const currentIndex = themes.findIndex((t) => t.value === theme);
            const nextIndex = (currentIndex + 1) % themes.length;
            setTheme(themes[nextIndex].value);
          }}
          className="p-2 rounded-lg border border-foreground/20 hover:border-foreground/40 hover:bg-foreground/5 transition-colors"
          title={`Current: ${theme} (${actualTheme}) - Tap to cycle`}
        >
          {actualTheme === "dark" ? <Moon size={18} /> : <Sun size={18} />}
        </button>
      </div>
    </div>
  );
}
