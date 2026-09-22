"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { CAPTION, VOLUNTEER_CAPTION, EVENT_URL, drawBadge, loadImage, preparePhoto } from "./drawBadge";
import styles from "./badge.module.css";

function platformLinks(caption: string) { return [
  { name: "X", label: "Post on X", href: `https://x.com/intent/tweet?${new URLSearchParams({ text: caption, url: EVENT_URL })}`, hint: "X opens with your caption and the event link. Attach your downloaded badge before posting." },
  { name: "LinkedIn", label: "LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?${new URLSearchParams({ url: EVENT_URL })}`, hint: "Sign in to LinkedIn if prompted. Paste your caption and attach your downloaded badge to your post." },
  { name: "WhatsApp", label: "WhatsApp message", href: `https://wa.me/?${new URLSearchParams({ text: `${caption}\n${EVENT_URL}` })}`, hint: "Choose a WhatsApp contact or group to share the caption and event link. For a Status, use the Status button below." },
  { name: "Instagram", label: "Open Instagram", href: "https://www.instagram.com/", hint: "In Instagram, create a post or story and select your downloaded badge. Paste the caption for a post." },
]; }

export default function BadgeStudio({ variant = "attendee" }: { variant?: "attendee" | "volunteer" }) {
  const volunteer = variant === "volunteer";
  const badgeCaption = volunteer ? VOLUNTEER_CAPTION : CAPTION;
  const links = platformLinks(badgeCaption);
  const canvas = useRef<HTMLCanvasElement>(null);
  const uploadVersion = useRef(0);
  const [logos, setLogos] = useState<HTMLImageElement[] | null>(null);
  const [photo, setPhoto] = useState<HTMLCanvasElement | null>(null);
  const [zoom, setZoom] = useState(1);
  const [x, setX] = useState(50);
  const [y, setY] = useState(50);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [sharing, setSharing] = useState(false);
  const [platform, setPlatform] = useState<ReturnType<typeof platformLinks>[number] | null>(null);

  useEffect(() => {
    let active = true;
    Promise.all([loadImage("/badge/aws-ug-surat-emblem.png"), loadImage("/aws-white.svg")])
      .then((images) => { if (active) setLogos(images); })
      .catch(() => { if (active) setError("The frame could not load. Please refresh to try again."); });
    return () => { active = false; };
  }, []);

  useEffect(() => {
    if (!canvas.current || !logos) return;
    const preview = canvas.current;
    let active = true;
    const frame = requestAnimationFrame(() => { try {
      drawBadge(preview, logos, photo, zoom, x, y, variant);
      if (photo) preview.toBlob((blob) => {
        if (!active) return;
        if (blob) setFile(new File([blob], `aws-community-day-surat-2026${volunteer ? "-volunteer" : ""}.png`, { type: "image/png" }));
        else setError("Could not create your badge. Try a different photo.");
      }, "image/png");
    } catch { setError("Could not render your badge. Please reload and try again."); } });
    return () => { active = false; cancelAnimationFrame(frame); };
  }, [logos, photo, zoom, x, y, variant, volunteer]);

  async function upload(selected?: File) {
    if (!selected) return;
    const version = ++uploadVersion.current;
    setError(""); setMessage("");
    if (!["image/jpeg", "image/png", "image/webp"].includes(selected.type)) {
      setError("Choose a JPG, PNG or WebP photo."); return;
    }
    if (selected.size > 20 * 1024 * 1024) { setError("Choose a photo smaller than 20 MB."); return; }
    setLoading(true); setFile(null);
    const url = URL.createObjectURL(selected);
    try {
      const image = await loadImage(url);
      if (version !== uploadVersion.current) return;
      const converted = preparePhoto(image);
      setPhoto(converted); setZoom(1); setX(50); setY(50);
      setMessage("Photo added. Adjust the crop, then download or share your badge.");
    } catch (err) {
      if (version === uploadVersion.current) {
        setPhoto(null);
        setError(err instanceof Error && err.message.includes("megapixels") ? err.message : "This photo could not be opened. Try a different JPG, PNG or WebP.");
      }
    } finally {
      URL.revokeObjectURL(url);
      if (version === uploadVersion.current) setLoading(false);
    }
  }

  function download() {
    if (!file) return;
    const url = URL.createObjectURL(file);
    const a = document.createElement("a"); a.href = url; a.download = file.name;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 30_000);
    setMessage("Badge downloaded. Attach it to your post or add it to your story/status.");
  }

  async function share(target?: string) {
    if (!file) return;
    let canShare = false;
    try { canShare = !!navigator.share && !!navigator.canShare?.({ files: [file] }); } catch { /* Use the download fallback if the browser denies capability checks. */ }
    if (!canShare) {
      download();
      setMessage(`Badge downloaded. ${target === "WhatsApp" ? "Open WhatsApp → Updates → Add status and select your badge." : target === "Instagram" ? "Open Instagram and select your badge for a post or story." : "Open your preferred app and attach the badge."}`);
      return;
    }
    setSharing(true);
    try {
      // File-only payload gives photo destinations the best chance of accepting it.
      await navigator.share({ files: [file] });
      setMessage("Share sheet closed. Finish posting in the app you selected.");
    } catch (err) {
      if (!(err instanceof Error && err.name === "AbortError")) setMessage("Sharing is unavailable here. Download your badge and attach it in the app.");
    } finally { setSharing(false); }
  }

  function adjust(setter: (value: number) => void, value: number) { setFile(null); setter(value); }
  const ready = !!file && !loading && !sharing;
  const caption = `${badgeCaption}\n${EVENT_URL}`;

  return <main className={styles.page}>
    <nav className={styles.nav} aria-label="Badge navigation"><Link href="/">← Back to the event</Link><span>AWS COMMUNITY DAY / SURAT 2026</span></nav>
    <header className={styles.heading}><p className={styles.eyebrow}>THE COMMUNITY LOOKS GOOD ON YOU</p><h1>See you in <em>Surat.</em></h1><p>{volunteer ? "You make it happen. Create your Community Day volunteer badge." : "Make it official. Turn your photo into your Community Day attendee badge."}</p></header>
    <div className={styles.studio}>
      <section className={styles.preview} aria-label="Badge preview"><div className={styles.previewLabel}><span>{volunteer ? "YOUR VOLUNTEER BADGE" : "YOUR ATTENDEE BADGE"}</span><span>4:5 / PNG</span></div><canvas ref={canvas} width={1200} height={1500} role="img" aria-label={photo ? `Your photo in the AWS Community Day Surat ${variant} frame` : `${volunteer ? "Volunteer" : "Attendee"} frame preview with a placeholder portrait`} /><p>03 October 2026 <span>•</span> La Fountain, Surat</p></section>
      <div className={styles.controls}>
        <section className={styles.panel}><span className={styles.step}>01 / ADD YOUR PHOTO</span><h2>Your place in the frame.</h2><p>Pick a portrait you love. We’ll preserve its original colours and fit it into the frame.</p><label className={styles.upload}> <span>{loading ? "Opening your photo…" : photo ? "Choose a different photo ↗" : "Upload your photo ↗"}</span><input aria-label="Upload your photo" type="file" accept="image/jpeg,image/png,image/webp" disabled={loading} onChange={(e) => { void upload(e.target.files?.[0]); e.target.value = ""; }} /><small>JPG, PNG or WebP · Up to 20 MB</small></label><p className={styles.privacy}>Your photo stays on your device. No account needed.</p></section>
        <section className={styles.panel}><span className={styles.step}>02 / FIND YOUR FIT</span><h2>A little closer. A little you.</h2><fieldset disabled={!photo || loading} className={styles.sliders}><legend className={styles.srOnly}>Adjust your photo</legend><label>Zoom <output>{zoom.toFixed(1)}×</output><input aria-label="Zoom" type="range" min="1" max="3" step="0.05" value={zoom} onChange={(e) => adjust(setZoom, Number(e.target.value))} /></label><label>Horizontal position<input aria-label="Horizontal position" type="range" min="0" max="100" value={x} onChange={(e) => adjust(setX, Number(e.target.value))} /></label><label>Vertical position<input aria-label="Vertical position" type="range" min="0" max="100" value={y} onChange={(e) => adjust(setY, Number(e.target.value))} /></label><button className={styles.reset} onClick={() => { if (zoom !== 1 || x !== 50 || y !== 50) { setFile(null); setZoom(1); setX(50); setY(50); } }}>Reset crop ↺</button></fieldset></section>
        <section className={styles.panel}><span className={styles.step}>03 / LET YOUR PEOPLE KNOW</span><h2>Ready for your feed.</h2><div className={styles.actions}><button className={styles.primary} disabled={!ready} onClick={download}>Download badge ↓</button><button className={styles.secondary} disabled={!ready} onClick={() => void share()}>Share image ↗</button></div><p className={styles.help}>Download your badge, then attach it to your post. On supported phones, Share image opens your apps.</p>
          <div className={styles.socials}>
            {links.map((link) => <a key={link.name} href={link.href} target="_blank" rel="noopener noreferrer" onClick={() => setPlatform(link)}>{link.label} ↗</a>)}
          </div>
          {platform && <div className={styles.shareHelp} role="status">
            <p>{platform.hint}</p>
            <a href={platform.href} target="_self">{platform.name} didn’t open? Continue in this tab ↗</a>
            <p>Download your badge first. If sign-in is blocked in this preview, open this page in your regular browser.</p>
          </div>}
          <p className={styles.help}>Platform links open in a new tab and cannot attach your local photo automatically. Download the badge first, then attach it in the app.</p>
          <div className={styles.socials}>
            <button disabled={!ready} onClick={() => { setPlatform({ name: "WhatsApp", label: "WhatsApp", href: "https://web.whatsapp.com/", hint: "On your phone, open WhatsApp → Updates → Add status and choose your badge. The web link opens WhatsApp Web." }); void share("WhatsApp"); }}>WhatsApp Status ↗</button>
            <button disabled={!ready} onClick={() => { setPlatform(links[3]); void share("Instagram"); }}>Instagram image / story ↗</button>
          </div>
          <p className={styles.help}>For Status or Stories, choose the app in your device’s share menu. If image sharing is unavailable, the badge downloads instead.</p>
          <label className={styles.caption}>Your caption<textarea readOnly value={caption} rows={4} aria-label="Share caption" /></label><button className={styles.reset} onClick={async () => { try { await navigator.clipboard.writeText(caption); setMessage("Caption copied."); } catch { setMessage("Select the caption above and copy it manually."); } }}>Copy caption ↗</button>
        </section>
        {error && <p role="alert" className={styles.error}>{error}</p>}<p role="status" className={styles.status}>{message}</p>
      </div>
    </div><footer className={styles.footer}>Made for the people who make the community.</footer>
  </main>;
}
