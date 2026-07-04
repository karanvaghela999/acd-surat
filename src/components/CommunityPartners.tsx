import Image from "next/image";
import ScrollReveal from "./ScrollReveal";
import styles from "./CommunityPartners.module.css";

const PARTNERS = [
  { name: "SBG PPSU", logo: "/community-partners/sbg_ppsu.png" },
  { name: "AWS UG Ahmedabad", logo: "/community-partners/ug_ahm.png" },
  { name: "AWS UG Vadodara", logo: "/community-partners/ug_vad.png" },
];

// Repeat to ensure the track is wide enough for large screens, then duplicate for infinite scroll
const REPEATED_PARTNERS = [...PARTNERS, ...PARTNERS, ...PARTNERS];

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
            {[...REPEATED_PARTNERS, ...REPEATED_PARTNERS].map((partner, i) => (
              <div key={`${partner.name}-${i}`} className={styles.partnerCard}>
                <div className={styles.logoWrapper}>
                  <Image src={partner.logo} alt={partner.name} fill className={styles.partnerLogo} />
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
              <div className={styles.logoWrapper}>
                <Image src={partner.logo} alt={partner.name} fill className={styles.partnerLogo} />
              </div>
              <span className={styles.partnerName}>{partner.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
