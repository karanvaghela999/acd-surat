import Image from "next/image";
import ScrollReveal from "./ScrollReveal";
import styles from "./Volunteers.module.css";

const VOLUNTEERS = [
  { name: "Tirth Goyani", image: "/volunteer-team/tirth-goyani.webp", linkedin: "https://www.linkedin.com/in/tirth-r-goyani-aa05b4315/" },
  { name: "Pranav", image: "/volunteer-team/pranav.webp", linkedin: "https://www.linkedin.com/in/pranav99t/" },
  { name: "Smeet Vaghela", image: "/volunteer-team/smeet-vaghela.webp", linkedin: "https://www.linkedin.com/in/smeet-vaghela-601a1b287/" },
  { name: "Krisha Nadiyadra", image: "/volunteer-team/krisha-nadiyadra.webp", linkedin: "https://www.linkedin.com/in/krishna-nadiyadra/" },
  { name: "Vraj Suratwala", image: "/volunteer-team/vraj-suratwala.webp", linkedin: "https://www.linkedin.com/in/vraj-suratwala/" },
  { name: "Purva Surani", image: "/volunteer-team/purva-surani.webp", linkedin: "https://www.linkedin.com/in/purvasurani/" },
  { name: "Bansari Vaishnav", image: "/volunteer-team/bansari-vaishnav.webp", linkedin: "https://www.linkedin.com/in/bansari-vaishnav-8575a1318/" },
  { name: "Harsh Savaliya", image: "/volunteer-team/harsh-savaliya-new.webp", linkedin: "https://www.linkedin.com/in/harsh-savaliya-83b96339b/" },
  { name: "Vishava Balar", image: "/volunteer-team/vishava-balar.webp", linkedin: "https://www.linkedin.com/in/vishwa-balar-62378b388/" },
  { name: "Krish Gohariya", image: "/volunteer-team/krish-gohariya.webp", linkedin: "https://www.linkedin.com/in/krish-patel-a53574341/" },
  { name: "Himanshu Rane", image: "/volunteer-team/himanshu-rane.webp", linkedin: "https://www.linkedin.com/in/himanshu-rane-8b5546410/" },
  { name: "Yuval Patel", image: "/volunteer-team/yuval-patel.webp", linkedin: "https://www.linkedin.com/in/yuval-patel-6339382a6/" },
  { name: "Rupawala Mustufa Murtaza", image: "/volunteer-team/rupawala-mustufa-murtaza.webp", linkedin: "https://www.linkedin.com/in/mustufa-m-rupawala/" },
  { name: "Aditya Thakkar", image: "/volunteer-team/aditya-thakkar.webp", linkedin: "https://www.linkedin.com/in/aditya-thakkar-1306b2439/" },
  {
    name: "Chharvvi Batra",
    image: "/volunteer-team/chharvvi-batra.webp",
    linkedin: "https://www.linkedin.com/in/chharvvi-batra-5635182a1/",
  },
  {
    name: "Shritsti Shah",
    image: "/volunteer-team/shritsti-shah.webp",
    linkedin: "https://www.linkedin.com/in/shristishahh/",
  },
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
          {VOLUNTEERS.map((volunteer) => {
            const CardTag = volunteer.linkedin ? "a" : "div";
            return (
            <ScrollReveal key={volunteer.name}>
              <CardTag
                className={styles.card}
                {...(volunteer.linkedin
                  ? {
                      href: volunteer.linkedin,
                      target: "_blank",
                      rel: "noopener noreferrer",
                      "aria-label": `View ${volunteer.name}'s LinkedIn profile`,
                    }
                  : {})}
              >
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
              </CardTag>
            </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
