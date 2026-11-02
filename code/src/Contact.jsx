import { CONTACT } from "./data.js";

const LINKS = [
  { label: "email me", glyph: "@", color: "#f4b6ca", href: `mailto:${CONTACT.email}` },
  { label: "download cv", glyph: "↓", color: "#c3dcf4", href: CONTACT.cv, download: "Fatima-Laraib-CV.pdf" },
  { label: "github", glyph: "{ }", color: "#c4ecdd", href: CONTACT.github, external: true },
  { label: "linkedin", glyph: "in", color: "#ffe88a", href: CONTACT.linkedin, external: true },
];

const Envelope = ({ color, glyph }) => (
  <svg viewBox="0 0 100 74" aria-hidden="true">
    <rect x="4" y="6" width="92" height="62" rx="9" fill={color} stroke="#111" strokeWidth="4" />
    <path d="M6 14l44 29 44-29" fill="none" stroke="#111" strokeWidth="4" strokeLinejoin="round" strokeLinecap="round" />
    <text x="50" y="62" textAnchor="middle" fontSize="16" fontWeight="700" fill="#111" fontFamily="DM Sans, Arial, sans-serif">{glyph}</text>
  </svg>
);

export default function Contact() {
  return (
    <section id="contact" className="section">
      <h2>contact</h2>
      <div className="mails wide">
        {LINKS.map((l) => (
          <a
            key={l.label}
            className="mail"
            href={l.href}
            download={l.download}
            {...(l.external ? { target: "_blank", rel: "noreferrer" } : {})}
          >
            <Envelope color={l.color} glyph={l.glyph} />
            <span>{l.label}</span>
          </a>
        ))}
      </div>
    </section>
  );
}