import Image from "next/image";
import ScrollReveal from "./ScrollReveal";
import styles from "./Volunteers.module.css";

const VOLUNTEERS = [
  {
    name: "Volunteer 1",
    role: "Event Coordinator",
    image: "/volunteers/volunteer-1.png",
    initials: "V1",
  },
  {
    name: "Volunteer 2",
    role: "Tech Lead",
    image: "/volunteers/volunteer-2.png",
    initials: "V2",
  },
  {
    name: "Volunteer 3",
    role: "Marketing Lead",
    image: "/volunteers/volunteer-3.png",
    initials: "V3",
  },
  {
    name: "Volunteer 4",
    role: "Design Lead",
    image: "/volunteers/volunteer-4.png",
    initials: "V4",
  },
  {
    name: "Volunteer 5",
    role: "Logistics Lead",
    image: "/volunteers/volunteer-5.png",
    initials: "V5",
  },
  {
    name: "Volunteer 6",
    role: "Community Manager",
    image: "/volunteers/volunteer-6.png",
    initials: "V6",
  },
  {
    name: "Volunteer 7",
    role: "Content Lead",
    image: "/volunteers/volunteer-7.png",
    initials: "V7",
  },
  {
    name: "Volunteer 8",
    role: "Social Media Lead",
    image: "/volunteers/volunteer-8.png",
    initials: "V8",
  },
];

export default function Volunteers() {
  return (
    <section id="volunteers" className={styles.section}>
      <div className="container">
        <ScrollReveal className={styles.headerBlock}>
          <span className="section-label">The Team</span>
          <h2 className={styles.title}>Meet our volunteers</h2>
          <p className={styles.subtitle}>
            The passionate builders behind the scenes making AWS Community Day
            Surat 2026 possible.
          </p>
        </ScrollReveal>

        <div className={styles.grid}>
          {VOLUNTEERS.map((volunteer, i) => (
            <ScrollReveal key={volunteer.name} className={styles.card}>
              <div className={styles.avatarWrapper}>
                <div className={styles.avatarFallback}>
                  <span>{volunteer.initials}</span>
                </div>
                {/* Uncomment below and add real images to /public/volunteers/ */}
                {/* <Image
                  src={volunteer.image}
                  alt={volunteer.name}
                  fill
                  quality={80}
                  className={styles.avatarImage}
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 200px"
                /> */}
                <div className={styles.avatarGlow} />
              </div>
              <div className={styles.info}>
                <h3 className={styles.name}>{volunteer.name}</h3>
                <p className={styles.role}>{volunteer.role}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
