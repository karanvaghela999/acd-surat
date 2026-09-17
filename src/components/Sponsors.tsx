import Image from "next/image";
import ScrollReveal from "./ScrollReveal";
import styles from "./Sponsors.module.css";

interface Sponsor {
  name: string;
  tier: string;
  logo: string;
  url: string;
  scale?: number;
  maxHeight?: number;
  maxWidth?: number;
}

const DIAMOND_SPONSORS: Sponsor[] = [
  {
    name: "Yanolja Cloud Solution",
    tier: "Diamond Tier",
    logo: "/sponsors/yanolja.png",
    url: "https://www.yanoljacloudsolution.com/",
    maxHeight: 115,
    maxWidth: 240,
    scale: 1.05,
  },
  {
    name: "DevX Labs",
    tier: "Diamond Tier",
    logo: "/sponsors/devx.png",
    url: "https://www.devxlabs.ai/",
    maxHeight: 52,
    maxWidth: 270,
    scale: 1.05,
  },
];

const GOLD_SPONSORS: Sponsor[] = [
  {
    name: "AppGambit",
    tier: "Gold Tier",
    logo: "/sponsors/appgambit.png",
    url: "https://www.appgambit.com/",
    maxHeight: 38,
    maxWidth: 190,
    scale: 1.05,
  },
  {
    name: "Sarvaswa AI Labs",
    tier: "Gold Tier",
    logo: "/sponsors/sarvaswa.png",
    url: "https://sarvaswa.ai/",
    maxHeight: 38,
    maxWidth: 175,
    scale: 1.0,
  },
  {
    name: "CirrOps",
    tier: "Gold Tier",
    logo: "/sponsors/cirops.png",
    url: "https://cirrops.in/",
    maxHeight: 36,
    maxWidth: 150,
    scale: 0.88,
  },
  {
    name: "Vartalaap",
    tier: "Gold Tier",
    logo: "/sponsors/vartalaap.png",
    url: "https://vartalaap.io/",
    maxHeight: 36,
    maxWidth: 180,
    scale: 1.05,
  },
];

const SILVER_SPONSORS: Sponsor[] = [
  {
    name: "Narola Infotech",
    tier: "Silver Tier",
    logo: "/sponsors/narola.png",
    url: "https://www.narolainfotech.com/",
    maxHeight: 46,
    maxWidth: 190,
    scale: 0.95,
  },
  {
    name: "Red & White",
    tier: "Silver Tier",
    logo: "/sponsors/redandwhite.webp",
    url: "https://www.rwskill.edu.in/",
    maxHeight: 48,
    maxWidth: 210,
    scale: 1.0,
  },
];

export default function Sponsors() {
  const partnerLink = "https://drive.google.com/file/d/1mWPlF9lcDQdOX65H0hTVR2oqsKPIj55G/view?usp=drive_link";

  return (
    <section id="sponsors" className={`section ${styles.sponsors}`}>
      <div className="container">
        {/* Section Header Row */}
        <div className={styles.headerRow}>
          <div className={styles.headerText}>
            <span className="section-label">Partners</span>
            <h2 className="section-title">Event Sponsors</h2>
            <p className="section-subtitle">
              Help power the first-ever AWS Community Day in Surat. Partner with us to connect with developers, engineers, cloud practitioners, and decision makers.
            </p>
          </div>
          <div className={styles.headerAction}>
            <a
              href={partnerLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
              style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}
            >
              PARTNER WITH US &gt;
            </a>
          </div>
        </div>

        {/* 1. Diamond Tier — 2-Column Hero Grid */}
        <ScrollReveal className={styles.tierSection}>
          <div className={styles.tierHeader}>
            <span className={`${styles.tierBadge} ${styles.tierBadgeDiamond}`}>
              💎 Diamond Sponsors
            </span>
            <div className={styles.tierLine} />
          </div>
          <div className={styles.diamondGrid}>
            {DIAMOND_SPONSORS.map((sponsor, idx) => (
              <a
                key={idx}
                href={sponsor.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.sponsorCard} ${styles.diamondCard}`}
                title={sponsor.name}
              >
                <span className={styles.linkHint}>↗</span>
                <div className={`${styles.logoWrapper} ${styles.diamondLogoFrame}`}>
                  <Image
                    src={sponsor.logo}
                    alt={sponsor.name}
                    width={400}
                    height={200}
                    className={styles.sponsorLogo}
                    style={{
                      width: "auto",
                      height: "auto",
                      transform: sponsor.scale ? `scale(${sponsor.scale})` : undefined,
                      maxHeight: sponsor.maxHeight ? `${sponsor.maxHeight}px` : undefined,
                      maxWidth: sponsor.maxWidth ? `${sponsor.maxWidth}px` : undefined,
                    }}
                  />
                </div>
              </a>
            ))}
          </div>
        </ScrollReveal>

        {/* 2. Gold Tier — 4-Column Balanced Grid */}
        <ScrollReveal className={styles.tierSection}>
          <div className={styles.tierHeader}>
            <span className={`${styles.tierBadge} ${styles.tierBadgeGold}`}>
              ⚡ Gold Sponsors
            </span>
            <div className={styles.tierLine} />
          </div>
          <div className={styles.goldGrid}>
            {GOLD_SPONSORS.map((sponsor, idx) => (
              <a
                key={idx}
                href={sponsor.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.sponsorCard} ${styles.goldCard}`}
                title={sponsor.name}
              >
                <span className={styles.linkHint}>↗</span>
                <div className={`${styles.logoWrapper} ${styles.goldLogoFrame}`}>
                  <Image
                    src={sponsor.logo}
                    alt={sponsor.name}
                    width={320}
                    height={140}
                    className={styles.sponsorLogo}
                    style={{
                      width: "auto",
                      height: "auto",
                      transform: sponsor.scale ? `scale(${sponsor.scale})` : undefined,
                      maxHeight: sponsor.maxHeight ? `${sponsor.maxHeight}px` : undefined,
                      maxWidth: sponsor.maxWidth ? `${sponsor.maxWidth}px` : undefined,
                    }}
                  />
                </div>
              </a>
            ))}
          </div>
        </ScrollReveal>

        {/* 3. Silver Tier — Centered 2-Column Grid */}
        <ScrollReveal className={styles.tierSection}>
          <div className={styles.tierHeader}>
            <span className={`${styles.tierBadge} ${styles.tierBadgeSilver}`}>
              🥈 Silver Sponsors
            </span>
            <div className={styles.tierLine} />
          </div>
          <div className={styles.silverGrid}>
            {SILVER_SPONSORS.map((sponsor, idx) => (
              <a
                key={idx}
                href={sponsor.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.sponsorCard} ${styles.silverCard}`}
                title={sponsor.name}
              >
                <span className={styles.linkHint}>↗</span>
                <div className={`${styles.logoWrapper} ${styles.silverLogoFrame}`}>
                  <Image
                    src={sponsor.logo}
                    alt={sponsor.name}
                    width={280}
                    height={120}
                    className={styles.sponsorLogo}
                    style={{
                      width: "auto",
                      height: "auto",
                      transform: sponsor.scale ? `scale(${sponsor.scale})` : undefined,
                      maxHeight: sponsor.maxHeight ? `${sponsor.maxHeight}px` : undefined,
                      maxWidth: sponsor.maxWidth ? `${sponsor.maxWidth}px` : undefined,
                    }}
                  />
                </div>
              </a>
            ))}
          </div>
        </ScrollReveal>

        {/* 4. Bottom Callout Banner */}
        <ScrollReveal className={styles.partnerBanner}>
          <div className={styles.partnerBannerContent}>
            <span className={styles.partnerTagline}>Partner With Us</span>
            <h3 className={styles.partnerBannerTitle}>Elevate your brand at AWS Community Day Surat</h3>
            <p className={styles.partnerBannerDesc}>
              Showcase your company to 500+ cloud engineers, architects, DevOps leaders, and tech founders across Gujarat.
            </p>
          </div>
          <div className={styles.partnerBannerActions}>
            <a
              href={partnerLink}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.prospectusBtn}
            >
              <span>VIEW PROSPECTUS</span>
              <span>&gt;</span>
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

