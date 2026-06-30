import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 — Page Not Found | AWS Community Day Surat 2026",
};

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--surface-dark)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        textAlign: "center",
        fontFamily: "var(--font-body)",
      }}
    >
      <a href="/" style={{ marginBottom: "2.5rem", display: "inline-flex", alignItems: "center", gap: "0.75rem", textDecoration: "none" }}>
        <Image src="/aws-white.svg" alt="AWS Logo" width={40} height={40} />
        <span style={{ color: "var(--text-on-dark)", fontFamily: "var(--font-heading)", fontSize: "0.85rem", letterSpacing: "0.12em", textTransform: "uppercase", lineHeight: 1.2 }}>
          Community Day<br />Surat 2026
        </span>
      </a>

      <div
        style={{
          fontSize: "clamp(6rem, 20vw, 12rem)",
          fontFamily: "var(--font-heading)",
          fontWeight: 700,
          lineHeight: 1,
          color: "transparent",
          WebkitTextStroke: "2px var(--accent-green)",
          marginBottom: "1.5rem",
          userSelect: "none",
        }}
      >
        404
      </div>

      <h1
        style={{
          color: "var(--text-on-dark)",
          fontFamily: "var(--font-heading)",
          fontSize: "clamp(1.25rem, 3vw, 1.75rem)",
          fontWeight: 600,
          marginBottom: "0.75rem",
        }}
      >
        Page not found
      </h1>

      <p
        style={{
          color: "var(--text-on-dark-muted)",
          fontSize: "clamp(0.9rem, 2vw, 1rem)",
          maxWidth: "420px",
          lineHeight: 1.6,
          marginBottom: "2.5rem",
        }}
      >
        Looks like this page drifted off into the cloud. Head back to the event homepage.
      </p>

      <a
        href="/"
        className="btn btn-primary"
        style={{
          background: "var(--accent-green)",
          color: "var(--surface-dark)",
          border: "none",
          fontWeight: 600,
          padding: "0.75rem 2rem",
          borderRadius: "var(--radius-md)",
          fontSize: "0.95rem",
          textDecoration: "none",
        }}
      >
        Back to home
      </a>
    </div>
  );
}
