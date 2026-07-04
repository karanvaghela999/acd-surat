"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./Header.module.css";

const NAV_ITEMS = [
  { label: "About", href: "#about" },
  { label: "Tickets", href: "#tickets" },
  { label: "Sponsors", href: "#sponsors" },
  { label: "Agenda", href: "#agenda" },
  { label: "Gallery", href: "#gallery" },
  { label: "FAQ", href: "#faq" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    
    // Check initial theme preference
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    document.documentElement.setAttribute("data-theme", nextTheme);
    localStorage.setItem("theme", nextTheme);
  };

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const handleNavClick = () => {
    setMobileOpen(false);
  };

  // Determine logo source based on scroll and theme states
  const getLogoSrc = () => {
    if (mobileOpen) {
      return theme === "light" ? "/aws-black.svg" : "/aws-white.svg";
    }
    if (!scrolled) {
      // Transparent header on the dark Hero background
      return "/aws-white.svg";
    }
    return theme === "light" ? "/aws-black.svg" : "/aws-white.svg";
  };

  // Determine header wrapper classes
  const headerClass = `${styles.header} ${
    scrolled ? styles.scrolled : styles.onHero
  } ${mobileOpen ? styles.mobileActive : ""}`;

  return (
    <header className={headerClass} id="site-header">
      <div className={styles.inner}>
        {/* Logo */}
        <a href="#hero" className={styles.logo} onClick={handleNavClick}>
          <Image
            src={getLogoSrc()}
            alt="AWS Logo"
            width={48}
            height={48}
            className={styles.awsIcon}
            priority
          />
          <div className={styles.logoTextContainer}>
            <span className={styles.logoTextMain}>COMMUNITY DAY</span>
            <span className={styles.logoTextSub}>SURAT 2026</span>
          </div>
        </a>

        {/* Navigation & Theme Switcher */}
        <div className={styles.navWrapper}>
          <nav className={styles.nav} aria-label="Primary">
            {NAV_ITEMS.map((item) => (
              <a key={item.href} href={item.href} className={styles.navLink}>
                {item.label}
              </a>
            ))}
            <a
              href="#"
              className={`btn ${scrolled ? "btn-primary" : styles.heroBtn}`}
              style={{ fontSize: "11px", padding: "6px 12px" }}
            >
              Get Tickets
            </a>
          </nav>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className={styles.themeToggle}
            aria-label="Toggle dark/light theme"
          >
            {theme === "light" ? (
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
              </svg>
            ) : (
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>

          {/* Mobile Toggle */}
          <button
            className={`${styles.mobileToggle} ${mobileOpen ? styles.open : ""}`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className={styles.mobileOverlay} onClick={() => setMobileOpen(false)}>
          <nav
            className={styles.mobileNav}
            onClick={(e) => e.stopPropagation()}
          >
            {NAV_ITEMS.map((item, i) => (
              <a
                key={item.href}
                href={item.href}
                className={styles.mobileLink}
                onClick={handleNavClick}
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                {item.label}
              </a>
            ))}
            <a
              href="#"
              className="btn btn-primary btn-lg"
              style={{ width: "100%", marginTop: "1rem" }}
              onClick={handleNavClick}
            >
              Get Tickets
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
