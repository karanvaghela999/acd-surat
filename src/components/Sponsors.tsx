import Image from "next/image";
import ScrollReveal from "./ScrollReveal";
import styles from "./Sponsors.module.css";

const DIAMOND_SPONSOR = {
  name: "Yanolja",
  tier: "Diamond Tier",
  logo: "/sponsors/yanolja.png",
  url: "https://www.yanolja.com/",
};
const GOLD_SPONSORS = [
  { name: "AppGambit", tier: "Gold Tier", logo: "/sponsors/appgambit.png", url: "https://www.appgambit.com/" },
];
const SILVER_SPONSORS = [
  { name: "Narola Infotech", tier: "Silver Tier", logo: "/sponsors/narola.png", url: "https://www.narolainfotech.com/" },
  { name: "Red & White", tier: "Silver Tier", logo: "/sponsors/redandwhite.webp", url: "https://www.rwskill.edu.in/" },
];

export default function Sponsors() {
  const partnerLink = "https://drive.google.com/file/d/1mWPlF9lcDQdOX65H0hTVR2oqsKPIj55G/view?usp=sharing";

  return (
    <section id="sponsors" className={`section ${styles.sponsors}`}>
      <div className="container">
        {/* Section Header Row */}
        <div className={styles.headerRow}>
          <div className={styles.headerText}>
            <h2 className="section-title">Sponsors</h2>
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

        {/* 1. Diamond Tier — Highlighted */}
        <ScrollReveal className={styles.sponsorBlock}>
          <h3 className={styles.blockTitle}>💎 Diamond Sponsor</h3>
          <div className={styles.bentoGrid}>
            <a
              href={DIAMOND_SPONSOR.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.bentoCell} ${styles.cellFull} ${styles.filledCell} ${styles.diamondCell}`}
            >
              <div className={styles.cellContent}>
                <Image
                  src={DIAMOND_SPONSOR.logo}
                  alt={DIAMOND_SPONSOR.name}
                  width={260}
                  height={120}
                  className={styles.sponsorLogo}
                />
              </div>
            </a>
          </div>
        </ScrollReveal>

        {/* 2. Gold Tier */}
        <ScrollReveal className={`${styles.sponsorBlock} ${styles.prevBlock}`}>
          <h3 className={styles.blockTitle}>Gold Sponsors</h3>
          <div className={styles.bentoGrid}>
            {GOLD_SPONSORS.map((sponsor, idx) => (
              <a
                key={idx}
                href={sponsor.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.bentoCell} ${styles.cellFull} ${styles.filledCell}`}
              >
                <div className={styles.cellContent}>
                  <Image
                    src={sponsor.logo}
                    alt={sponsor.name}
                    width={320}
                    height={140}
                    className={styles.sponsorLogo}
                  />
                </div>
              </a>
            ))}
          </div>
        </ScrollReveal>

        {/* 3. Silver Tier */}
        <ScrollReveal className={`${styles.sponsorBlock} ${styles.prevBlock}`}>
          <h3 className={styles.blockTitle}>Silver Sponsors</h3>
          <div className={styles.bentoGrid}>
            {SILVER_SPONSORS.map((sponsor, idx) => (
              <a
                key={idx}
                href={sponsor.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.bentoCell} ${styles.cellHalf} ${styles.filledCell}`}
              >
                <div className={styles.cellContent}>
                  <Image
                    src={sponsor.logo}
                    alt={sponsor.name}
                    width={220}
                    height={100}
                    className={styles.sponsorLogo}
                  />
                </div>
              </a>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

