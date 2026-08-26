import Image from "next/image";
import ScrollReveal from "./ScrollReveal";
import styles from "./CommunityPartners.module.css";

const PARTNERS = [
  { name: "AWS UG Ahmedabad", logo: "/community-partners/ug_ahm.webp", url: "https://www.linkedin.com/company/awsahmedabadcommunity" },
  { name: "AWS UG Vadodara", logo: "/community-partners/ug_vad.webp", url: "https://www.linkedin.com/company/awsugbdq/" },
  { name: "SBG PPSU", logo: "/community-partners/sbg_ppsu.webp", url: "https://www.linkedin.com/company/aws-student-builder-groups/" },
  { name: "SBG Gujarat", logo: "/community-partners/sbg_guj.png", url: "https://www.linkedin.com/company/aws-student-builder-group-gujarat" },
  { name: "eChai", logo: "/community-partners/echai.png", url: "https://echai.ventures/" },
  { name: "SIC", logo: "/community-partners/sic.svg", url: "https://suratitcommunity.com/" },
  { name: "FoF Surat", logo: "/community-partners/fofsurat.png", url: "https://friends.figma.com/surat/" },
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

        <div className={styles.partnersGrid}>
          {PARTNERS.map((partner) => (
            <a
              key={partner.name}
              href={partner.url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.partnerCard}
            >
              <div className={styles.logoWrapper}>
                <Image src={partner.logo} alt={partner.name} fill className={styles.partnerLogo} />
              </div>
              <span className={styles.partnerName}>{partner.name}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

