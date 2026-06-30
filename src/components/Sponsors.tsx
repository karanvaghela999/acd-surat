import ScrollReveal from "./ScrollReveal";
import styles from "./Sponsors.module.css";

const DIAMOND_SPONSOR = { name: "Diamond Sponsor", tier: "Diamond Tier" };
const GOLD_SPONSORS = [
  { name: "Gold Sponsor #1", tier: "Gold Tier" },
  { name: "Gold Sponsor #2", tier: "Gold Tier" },
];
const SILVER_SPONSORS = [
  { name: "Silver Sponsor #1", tier: "Silver Tier" },
  { name: "Silver Sponsor #2", tier: "Silver Tier" },
  { name: "Silver Sponsor #3", tier: "Silver Tier" },
  { name: "Silver Sponsor #4", tier: "Silver Tier" },
];

export default function Sponsors() {
  const partnerLink = "https://drive.google.com/file/d/1f0L8FCD_wxc7Z67H8CJUHhx2p7VRjLJp/view?usp=sharing";

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

        {/* 1. Diamond Tier Slot */}
        <ScrollReveal className={styles.sponsorBlock}>
          <h3 className={styles.blockTitle}>Diamond Sponsor</h3>
          <div className={styles.bentoGrid}>
            <a
              href={partnerLink}
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.bentoCell} ${styles.cellFull} ${styles.placeholderCell}`}
            >
              <div className={styles.cellContent}>
                <span className={styles.plusIcon}>+</span>
                <span className={styles.placeholderLabel}>Diamond Sponsor Slot Open</span>
                <span className={styles.partnerCall}>Click to Partner with us</span>
              </div>
            </a>
          </div>
        </ScrollReveal>

        {/* 2. Gold Tier Slots */}
        <ScrollReveal className={`${styles.sponsorBlock} ${styles.prevBlock}`}>
          <h3 className={styles.blockTitle}>Gold Sponsors</h3>
          <div className={styles.bentoGrid}>
            {GOLD_SPONSORS.map((sponsor, idx) => (
              <a
                key={idx}
                href={partnerLink}
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.bentoCell} ${styles.cellHalf} ${styles.placeholderCell}`}
              >
                <div className={styles.cellContent}>
                  <span className={styles.plusIcon}>+</span>
                  <span className={styles.placeholderLabel}>Gold Sponsor Slot Open</span>
                  <span className={styles.partnerCall}>Click to Partner with us</span>
                </div>
              </a>
            ))}
          </div>
        </ScrollReveal>

        {/* 3. Silver Tier Slots */}
        <ScrollReveal className={`${styles.sponsorBlock} ${styles.prevBlock}`}>
          <h3 className={styles.blockTitle}>Silver Sponsors</h3>
          <div className={styles.bentoGrid}>
            {SILVER_SPONSORS.map((sponsor, idx) => (
              <a
                key={idx}
                href={partnerLink}
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.bentoCell} ${styles.cellQuarter} ${styles.placeholderCell}`}
              >
                <div className={styles.cellContent}>
                  <span className={styles.plusIcon}>+</span>
                  <span className={styles.placeholderLabel}>Silver Sponsor Open</span>
                  <span className={styles.partnerCall}>Click to Partner</span>
                </div>
              </a>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
