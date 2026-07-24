"use client";

import { useState } from "react";
import ScrollReveal from "./ScrollReveal";
import styles from "./Tickets.module.css";

const TICKETS = [
  {
    name: "Super Early Bird",
    price: "₹399",
    tag: "POPULAR",
    href: "https://konfhub.com/acdsurat26",
    highlight: true,
    perks: [
      "Access to the conference on 3rd October 2026",
      "Welcome Swag & Goodies",
      "Morning breakfast",
      "Afternoon lunch",
      "Evening hi-tea",
      "All sessions (subject to seat availability)",
      "Booth visits",
      "Networking with other peers on the event day",
    ],
  },
  {
    name: "Early Bird",
    price: "₹XXX",
    tag: "LIMITED",
    href: "#",
    highlight: false,
    perks: [
      "Access to the conference on 3rd October 2026",
      "Welcome Swag & Goodies",
      "Morning breakfast",
      "Afternoon lunch",
      "Evening hi-tea",
      "All sessions (subject to seat availability)",
      "Booth visits",
      "Networking with other peers on the event day",
    ],
  },
  {
    name: "Regular",
    price: "₹XXX",
    tag: null,
    href: "#",
    highlight: false,
    perks: [
      "Access to the conference on 3rd October 2026",
      "Welcome Swag & Goodies",
      "Morning breakfast",
      "Afternoon lunch",
      "Evening hi-tea",
      "All sessions (subject to seat availability)",
      "Booth visits",
      "Networking with other peers on the event day",
    ],
  },
  {
    name: "Diamond",
    price: "₹XXX",
    tag: "VIP",
    href: "#",
    highlight: false,
    perks: [
      "Access to the conference on 3rd October 2026",
      "Special Swag & Goodies",
      "Morning breakfast",
      "Afternoon lunch",
      "Evening hi-tea",
      "All sessions (subject to seat availability)",
      "Booth visits",
      "Networking with other peers on the event day",
      "Front-row reserved seating",
    ],
  },
];

const PATRON_PERKS = [
  "Community Patron Recognition",
  "Social Media Shoutout",
  "Exclusive Goodie Bag",
  "Additional Community Perks",
  "Support a Bigger Mission",
];

const CheckIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 256 256" className={className}>
    <path d="M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z" />
  </svg>
);

export default function Tickets() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section id="tickets" className={styles.section}>
      {/* Ticket Comparison Area */}
      <div className={styles.ticketZone}>
        <div className="container">
          <ScrollReveal className={styles.headerBlock}>
            <span className="section-label" style={{ color: "#94A3B8" }}>Tickets</span>
            <h2 className={styles.title}>Choose your pass</h2>
            <p className={styles.subtitle}>
              Every ticket includes full-day access to talks, workshops, meals,
              and community networking at AWS Community Day Surat 2026.
            </p>
          </ScrollReveal>

          {/* Boarding Pass Style Cards */}
          <div className={styles.cardTrack}>
            {TICKETS.map((ticket, i) => (
              <div
                key={ticket.name}
                className={`${styles.boardingPass} ${ticket.highlight ? styles.highlighted : ""} ${hoveredIdx === i ? styles.hovered : ""}`}
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx(null)}
              >
                {/* Tag ribbon */}
                {ticket.tag && (
                  <span className={`${styles.tag} ${ticket.highlight ? styles.tagHighlight : ""}`}>
                    {ticket.tag}
                  </span>
                )}

                {/* Top: Ticket stub */}
                <div className={styles.stub}>
                  <div className={styles.stubInfo}>
                    <span className={styles.stubLabel}>AWS Community Day</span>
                    <h3 className={styles.passName}>{ticket.name}</h3>
                  </div>
                  <div className={styles.priceBlock}>
                    <span className={styles.priceCurrency}>₹</span>
                    <span className={styles.priceValue}>{ticket.price.replace("₹", "")}</span>
                  </div>
                </div>

                {/* Perforated divider */}
                <div className={styles.perforation}>
                  <div className={styles.perfCircleLeft} />
                  <div className={styles.perfLine} />
                  <div className={styles.perfCircleRight} />
                </div>

                {/* Bottom: Perks */}
                <div className={styles.passBody}>
                  <ul className={styles.perksList}>
                    {ticket.perks.map((perk, j) => (
                      <li key={j} className={styles.perkItem}>
                        <CheckIcon className={styles.checkIcon} />
                        <span>{perk}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA */}
                {ticket.highlight ? (
                  <a
                    href={ticket.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${styles.passBtn} ${styles.passBtnHighlight}`}
                  >
                    Get {ticket.name}
                    <span className={styles.arrow}>→</span>
                  </a>
                ) : (
                  <button
                    disabled
                    className={`${styles.passBtn} ${styles.passBtnDisabled}`}
                  >
                    Get {ticket.name}
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Community Patron Section */}
      <div className={styles.patronZone}>
        <div className="container">
          <div className={styles.patronGrid}>
            <ScrollReveal className={styles.patronTextCol}>
              <span className="section-label" style={{ color: "#3D5A3A" }}>Community Patron</span>
              <h2 className={styles.patronTitle}>Help power the community</h2>
              <p className={styles.patronDesc}>
                AWS Community Day Surat is built by the community, for the
                community. Your contribution directly supports better
                experiences, travel grants for speakers, and accessible
                tickets for students.
              </p>
            </ScrollReveal>

            <div className={styles.patronCard}>
              <div className={styles.patronCardHeader}>
                <span className={styles.patronBadge}>🤝 PATRON</span>
                <p className={styles.patronPrice}>₹5,000 — ₹1,00,000</p>
              </div>
              <ul className={styles.patronPerks}>
                {PATRON_PERKS.map((perk) => (
                  <li key={perk}>
                    <CheckIcon className={styles.patronCheck} />
                    <span>{perk}</span>
                  </li>
                ))}
              </ul>
              <a
                href="#"
                className={styles.patronBtn}
              >
                Support the Community
                <span className={styles.arrow}>→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
