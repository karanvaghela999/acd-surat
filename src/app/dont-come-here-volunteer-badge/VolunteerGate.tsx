"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import BadgeStudio from "../badge/BadgeStudio";
import styles from "./volunteer.module.css";

// A salted verifier avoids shipping the password. This static gate is still
// bypassable in the browser; it is not server-side access control.
const PASSWORD_SALT = "ec0daa7972957448107a0382fcb38ddc";
const PASSWORD_VERIFIER = "be95b253c602b77fa8f3ab0eadfec051b706eda7fd4a19b96bc7ed09208fc7d6";

async function matchesPassword(value: string) {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey("raw", encoder.encode(value), "PBKDF2", false, ["deriveBits"]);
  const bits = await crypto.subtle.deriveBits({
    name: "PBKDF2", salt: encoder.encode(PASSWORD_SALT), iterations: 600_000, hash: "SHA-256",
  }, key, 256);
  const verifier = Array.from(new Uint8Array(bits), byte => byte.toString(16).padStart(2, "0")).join("");
  return verifier === PASSWORD_VERIFIER;
}

export default function VolunteerGate() {
  const [unlocked, setUnlocked] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [checking, setChecking] = useState(false);

  async function unlock(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (checking) return;
    setChecking(true);
    setError("");
    const candidate = password;
    setPassword("");
    try {
      if (!await matchesPassword(candidate)) {
        setError("That password doesn’t match. Please try again.");
        return;
      }
      setUnlocked(true);
    } catch {
      setError("Password checking is unavailable. Open this page over HTTPS or localhost and try again.");
    } finally {
      setChecking(false);
    }
  }

  if (unlocked) return <>
    <div className={styles.lockBar}><button onClick={() => setUnlocked(false)}>Lock volunteer studio ↗</button></div>
    <BadgeStudio variant="volunteer" />
  </>;

  return <main className={styles.gate}>
    <Link href="/" className={styles.back}>← Back to the event</Link>
    <div className={styles.card}>
      <p className={styles.eyebrow}>AWS COMMUNITY DAY / SURAT 2026</p>
      <span className={styles.tag}>VOLUNTEER CREW</span>
      <h1>You make it happen.</h1>
      <p>Your community. Your crew. Your volunteer badge.</p>
      <form onSubmit={unlock}>
        <label htmlFor="volunteer-password">Volunteer password</label>
        <input id="volunteer-password" type="password" autoComplete="current-password" required disabled={checking} value={password} aria-invalid={!!error} aria-describedby={error ? "password-error" : undefined} onChange={(event) => { setPassword(event.target.value); setError(""); }} />
        {error && <p id="password-error" role="alert" className={styles.error}>{error}</p>}
        <button type="submit" disabled={checking}>{checking ? "Checking password…" : "Open badge studio"} <span aria-hidden="true">↗</span></button>
      </form>
    </div>
  </main>;
}
