import { useState } from "react";
import { CONTACT } from "./data.js";

// Sends straight from the browser to Web3Forms. The key comes from an environment variable,
// so it stays out of GitHub (it is still visible in the built site, which Web3Forms allows).
const KEY = import.meta.env.VITE_WEB3FORMS_KEY;

const LINKS = [
  { label: "email me", glyph: "", color: "#f4b6ca", href: `mailto:${CONTACT.email}` },
  { label: "download cv", glyph: "", color: "#c3dcf4", href: CONTACT.cv, download: "Fatima-Laraib-CV.pdf" },
  { label: "github", glyph: "", color: "#c4ecdd", href: CONTACT.github, external: true },
  { label: "linkedin", glyph: "", color: "#ffe88a", href: CONTACT.linkedin, external: true },
];

const Envelope = ({ color, glyph }) => (
  <svg viewBox="0 0 100 74" aria-hidden="true">
    <rect x="4" y="6" width="92" height="62" rx="9" fill={color} stroke="#111" strokeWidth="4" />
    <path d="M6 14l44 29 44-29" fill="none" stroke="#111" strokeWidth="4" strokeLinejoin="round" strokeLinecap="round" />
    <text x="50" y="62" textAnchor="middle" fontSize="16" fontWeight="700" fill="#111" fontFamily="DM Sans, Arial, sans-serif">{glyph}</text>
  </svg>
);

export default function Contact() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [trap, setTrap] = useState(""); // hidden spam trap
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error | mailto

  const send = async (e) => {
    e.preventDefault();
    if (trap) return setStatus("sent");
    if (!KEY) {
      const body = `${message}\n\nfrom: ${email}`;
      window.location.href = `mailto:${CONTACT.email}?subject=${encodeURIComponent("message from your portfolio")}&body=${encodeURIComponent(body)}`;
      return setStatus("mailto");
    }
    setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ access_key: KEY, subject: "message from your portfolio", email, message }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.success !== false) {
        setStatus("sent");
        setEmail("");
        setMessage("");
      } else setStatus("error");
    } catch {
      setStatus("error");
    }
  };

  const note = {
    sent: "sent! thank you, i'll get back to you soon.",
    error: `something went wrong. please email me directly at ${CONTACT.email}.`,
    mailto: "your email app should open with the message ready to send.",
  }[status];

  return (
    <section id="contact" className="section">
      <h2>contact</h2>
      <div className="contact-grid">
        <form className="win" onSubmit={send}>
          <div className="win-bar">
            <span>drop me an email</span>
            <span className="x" aria-hidden="true">✕</span>
          </div>
          <div className="form-body">
            <label>
              your email
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
            </label>
            <label>
              message
              <textarea required rows="5" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="hi fatima, …" />
            </label>
            <input className="trap" tabIndex="-1" autoComplete="off" aria-hidden="true" value={trap} onChange={(e) => setTrap(e.target.value)} />
            <div className="form-foot">
              <button className="send-btn" type="submit" disabled={status === "sending"}>
                {status === "sending" ? "sending…" : "send"}
              </button>
              <span className="note" role="status">{note}</span>
            </div>
          </div>
        </form>

        <div className="mails">
          {LINKS.map((l) => (
            <a key={l.label} className="mail" href={l.href} download={l.download} {...(l.external ? { target: "_blank", rel: "noreferrer" } : {})}>
              <Envelope color={l.color} glyph={l.glyph} />
              <span>{l.label}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}