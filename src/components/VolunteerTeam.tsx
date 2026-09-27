import Image from "next/image";
import ScrollReveal from "./ScrollReveal";
import styles from "./Volunteers.module.css";

const VOLUNTEERS = [
  { name: "Tirth Goyani", image: "/volunteer-team/tirth-goyani.webp" },
  { name: "Pranav", image: "/volunteer-team/pranav.webp" },
  { name: "Smeet Vaghela", image: "/volunteer-team/smeet-vaghela.webp" },
  { name: "Krisha Nadiyadra", image: "/volunteer-team/krisha-nadiyadra.webp" },
  { name: "Vraj Suratwala", image: "/volunteer-team/vraj-suratwala.webp" },
  { name: "Purva Surani", image: "/volunteer-team/purva-surani.webp" },
  { name: "Bansari Vaishnav", image: "/volunteer-team/bansari-vaishnav.webp" },
  { name: "Harsh Savaliya", image: "/volunteer-team/harsh-savaliya-new.webp" },
  { name: "Vishava Balar", image: "/volunteer-team/vishava-balar.webp" },
  { name: "Krish Gohariya", image: "/volunteer-team/krish-gohariya.webp" },
  { name: "Himanshu Rane", image: "/volunteer-team/himanshu-rane.webp" },
  { name: "Yuval Patel", image: "/volunteer-team/yuval-patel.webp" },
  { name: "Rupawala Mustufa Murtaza", image: "/volunteer-team/rupawala-mustufa-murtaza.webp" },
  { name: "Aditya Thakkar", image: "/volunteer-team/aditya-thakkar.webp" },
];

export default function VolunteerTeam() {
  return (
    <section id="volunteers" className={`${styles.section} ${styles.volunteerSection}`}>
      <div className="container">
        <ScrollReveal className={styles.headerBlock}>
          <span className="section-label" style={{ color: "#94A3B8" }}>The People Behind the Day</span>
          <h2 className={styles.title}>Meet our volunteers</h2>
          <p className={styles.subtitle}>Meet the people helping bring AWS Community Day Surat 2026 to life.</p>
        </ScrollReveal>
        <div className={styles.grid}>
          {VOLUNTEERS.map((volunteer) => (
            <ScrollReveal key={volunteer.name}>
              <div className={styles.card}>
                <div className={styles.avatarWrapper}>
                  <div className={styles.avatarFallback} aria-hidden="true">
                    <span>{volunteer.name.split(" ").map((part) => part[0]).slice(0, 2).join("")}</span>
                  </div>
                  {volunteer.image && <Image
                    src={volunteer.image}
                    alt={volunteer.name}
                    fill
                    quality={80}
                    className={styles.avatarImage}
                    sizes="(max-width: 640px) 120px, 150px"
                  />}
                  <div className={styles.avatarGlow} />
                </div>
                <div className={styles.info}>
                  <h3 className={styles.name}>{volunteer.name}</h3>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
