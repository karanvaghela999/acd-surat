"use client";

import { useEffect } from "react";

/**
 * Disables browser scroll restoration and always scrolls to top on page load.
 * Must be a client component so it runs after hydration.
 */
export default function ScrollToTop() {
  useEffect(() => {
    // Disable the browser from restoring scroll position on reload
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    // Always start at the top
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);

  return null;
}
