"use client";

import { useEffect } from "react";

/**
 * Handles initial scroll position on page load.
 * If the URL contains a hash (e.g. #tickets), scrolls to that section.
 * Otherwise, scrolls to top and disables browser scroll restoration.
 */
export default function ScrollToTop() {
  useEffect(() => {
    // Disable the browser from restoring scroll position on reload
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    const hash = window.location.hash;
    if (hash) {
      // Small delay to let components render before scrolling to hash target
      setTimeout(() => {
        const el = document.querySelector(hash);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } else {
      // No hash — start at the top
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
  }, []);

  return null;
}
