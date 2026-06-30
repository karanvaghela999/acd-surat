import ScrollReveal from "./ScrollReveal";
import styles from "./CommunityPartners.module.css";

const PARTNERS = [
  { name: "GDG Surat", initials: "GDG" },
  { name: "Flutter Surat", initials: "FS" },
  { name: "DevOps Surat", initials: "DO" },
  { name: "Cloud Native Surat", initials: "CN" },
  { name: "Women Techmakers", initials: "WT" },
  { name: "Tech Community India", initials: "TCI" },
  { name: "Startup Grind Surat", initials: "SG" },
  { name: "GDSC Gujarat", initials: "GSC" },
];

export default function CommunityPartners() {
  return (
    <section id="community-partners" className={styles.section}>
      <div className="container">
        <ScrollReveal className={styles.headerBlock}>
          <span className="section-label">Community</span>
          <h2 className={styles.title}>Community Partners</h2>
          <p className={styles.subtitle}>
            Backed by communities who share our passion for knowledge sharing,
            open source, and empowering developers across India.
          </p>
        </ScrollReveal>

        <div className={styles.marqueeWrapper}>
          <div className={styles.marqueeTrack}>
            {/* Duplicate the list for seamless infinite scroll */}
            {[...PARTNERS, ...PARTNERS].map((partner, i) => (
              <div key={`${partner.name}-${i}`} className={styles.partnerCard}>
                <div className={styles.logoPlaceholder}>
                  <span>{partner.initials}</span>
                </div>
                <span className={styles.partnerName}>{partner.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Static grid fallback for no-motion preference */}
        <div className={styles.staticGrid}>
          {PARTNERS.map((partner) => (
            <div key={partner.name} className={styles.partnerCard}>
              <div className={styles.logoPlaceholder}>
                <span>{partner.initials}</span>
              </div>
              <span className={styles.partnerName}>{partner.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
