"use client";

import { useState } from "react";
import { RefreshCw } from "lucide-react";

export default function SyncButton() {
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncMessage, setSyncMessage] = useState("");

  const handleSync = async () => {
    setIsSyncing(true);
    setSyncMessage("");

    try {
      // Call the route that will revalidate the cache
      const response = await fetch("/api/sync-github", {
        method: "POST",
      });

      if (response.ok) {
        setSyncMessage("✓ Synced successfully!");
        // Reload the page to show updated data
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        setSyncMessage("✗ Sync failed. Please try again.");
      }
    } catch (error) {
      console.error("Sync error:", error);
      setSyncMessage("✗ Network error. Please check your connection.");
    } finally {
      setTimeout(() => {
        setIsSyncing(false);
        setSyncMessage("");
      }, 3000);
    }
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <button
        onClick={handleSync}
        disabled={isSyncing}
        className="flex items-center gap-2 px-4 py-2 text-sm font-medium border border-foreground/20 rounded-lg hover:bg-foreground/5 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        title="Sync with GitHub to fetch latest repositories"
      >
        <RefreshCw className={`w-4 h-4 ${isSyncing ? "animate-spin" : ""}`} />
        <span>{isSyncing ? "Syncing..." : "Sync with GitHub"}</span>
      </button>
      {syncMessage && (
        <p
          className={`text-xs ${
            syncMessage.includes("✓")
              ? "text-green-600 dark:text-green-400"
              : "text-red-600 dark:text-red-400"
          }`}
        >
          {syncMessage}
        </p>
      )}
    </div>
  );
}
