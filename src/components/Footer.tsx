import Image from "next/image";
import styles from "./Footer.module.css";

const EXPLORE_LINKS = [
  { label: "About", href: "#about" },
  { label: "Tickets", href: "#tickets" },
  { label: "Sponsors", href: "#sponsors" },
  { label: "Gallery", href: "#gallery" },
  { label: "FAQ", href: "#faq" },
];

const COMMUNITY_LINKS = [
  { label: "Become a Speaker", href: "#" },
  { label: "Become a Partner", href: "#" },
  { label: "Contact Us", href: "#" },
];

const SOCIAL_LINKS = [
  { label: "LinkedIn", href: "#" },
  { label: "X / Twitter", href: "#" },
  { label: "Instagram", href: "#" },
  { label: "Meetup", href: "#" },
  { label: "YouTube", href: "#" },
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.grid}`}>
        {/* Left Column: Brand */}
        <div className={styles.brandCol}>
          <a href="#hero" className={styles.logoLink}>
            <Image
              src="/aws-white.svg"
              alt="AWS Logo"
              width={48}
              height={48}
              className={styles.awsIcon}
            />
            <div className={styles.logoTextContainer}>
              <span className={styles.logoTextMain}>COMMUNITY DAY</span>
              <span className={styles.logoTextSub}>SURAT 2026</span>
            </div>
          </a>
          <p className={styles.brandText}>
            Built by the community, for the community.
          </p>
        </div>

        {/* Column 1: Explore */}
        <div className={styles.col}>
          <h4 className={styles.colTitle}>Explore</h4>
          <div className={styles.links}>
            {EXPLORE_LINKS.map((link) => (
              <a key={link.label} href={link.href} className={styles.link}>
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {/* Column 2: Community */}
        <div className={styles.col}>
          <h4 className={styles.colTitle}>Community</h4>
          <div className={styles.links}>
            {COMMUNITY_LINKS.map((link) => (
              <a key={link.label} href={link.href} className={styles.link}>
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {/* Column 3: Socials */}
        <div className={styles.col}>
          <h4 className={styles.colTitle}>Socials</h4>
          <div className={styles.links}>
            {SOCIAL_LINKS.map((link) => (
              <a key={link.label} href={link.href} className={styles.link}>
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className={`container ${styles.bottom}`}>
        <p className={styles.copyright}>
          © 2026 AWS User Group Surat. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
