import Image from "next/image";
import ScrollReveal from "./ScrollReveal";
import styles from "./Volunteers.module.css";

const VOLUNTEERS = [
  {
    name: "Dhaval Nagar",
    role: "Founder @ AppGambit & AWS UG Surat Lead",
    image: "/volunteers/img1.jpeg",
    initials: "V1",
    linkedin: "https://www.linkedin.com/in/dhavaln/",
  },
  {
    name: "Nirmal Chhodvadiya",
    role: "Sr. Data Engineer (Ex-AWS) & AWS UG Surat Lead",
    image: "/volunteers/img2.jpeg",
    initials: "V2",
    linkedin: "https://www.linkedin.com/in/nirmalpatel008",
  },
  {
    name: "Nirav Pancholi",
    role: "Founder @ CirOps Consulting",
    image: "/volunteers/img3.jpeg",
    initials: "V3",
    linkedin: "https://linkedin.com/in/niravpancholi",
  },
  {
    name: "Abhishek Monpara",
    role: "AWS Cloud Architect @ CloudGate",
    image: "/volunteers/img4.jpeg",
    initials: "V4",
    linkedin: "https://www.linkedin.com/in/itsabhishekm/",
  },
  {
    name: "Mitul Sarvaiya",
    role: "Director of AI @ Sarwaswa AI Labs",
    image: "/volunteers/img5.jpeg",
    initials: "V5",
    linkedin: "https://www.linkedin.com/in/mitulsrv/",
  },
  {
    name: "Vishal Kotecha",
    role: "Sr. Engineering Manager @ Empower",
    image: "/volunteers/img6.jpeg",
    initials: "V6",
    linkedin: "https://www.linkedin.com/in/vkotecha",
  },
  {
    name: "Rahul Ladumor",
    role: "Senior Solutions Architect @ ASTM International",
    image: "/volunteers/img7.jpeg",
    initials: "V7",
    linkedin: "https://www.linkedin.com/in/rahulladumor",
  },
  {
    name: "Karan Vaghela",
    role: "Founder @ Korneza Solutions",
    image: "/volunteers/img8.jpeg",
    initials: "V8",
    linkedin: "https://www.linkedin.com/in/karanvaghela999/",
  },
  {
    name: "Kirtan Goswami",
    role: "Associate AI Engineer @ Ciphernutz IT Services",
    image: "/volunteers/img9.jpeg",
    initials: "V9",
    linkedin: "https://www.linkedin.com/in/kirtan-goswami",
  },
  {
    name: "Arpit Rai",
    role: "Graphics Designer @ AWS SBG PPSU",
    image: "/volunteers/img10.jpeg",
    initials: "V10",
    linkedin: "https://www.linkedin.com/in/arpitrai21/",
  }
];

export default function Volunteers() {
  return (
    <section id="volunteers" className={styles.section}>
      <div className="container">
        <ScrollReveal className={styles.headerBlock}>
          <span className="section-label" style={{ color: "#94A3B8" }}>The Team</span>
          <h2 className={styles.title}>Meet our volunteers</h2>
          <p className={styles.subtitle}>
            The passionate builders behind the scenes making AWS Community Day
            Surat 2026 possible.
          </p>
        </ScrollReveal>

        <div className={styles.grid}>
          {VOLUNTEERS.map((volunteer, i) => (
            <ScrollReveal key={volunteer.name}>
              <a
                href={volunteer.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.card}
                style={{ textDecoration: "none" }}
              >
                <div className={styles.avatarWrapper}>
                  <div className={styles.avatarFallback}>
                    <span>{volunteer.initials}</span>
                  </div>
                  <Image
                    src={volunteer.image}
                    alt={volunteer.name}
                    fill
                    quality={80}
                    className={styles.avatarImage}
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 200px"
                  />
                  <div className={styles.avatarGlow} />
                </div>
                <div className={styles.info}>
                  <h3 className={styles.name}>{volunteer.name}</h3>
                  <p className={styles.role}>{volunteer.role}</p>
                </div>
              </a>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
