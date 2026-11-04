import { useEffect, useRef, useState } from "react";
import { PROJECTS, CHAT, SMALL_TALK } from "./data.js";
import { Modal } from "./Win.jsx";
import Featured from "./Featured.jsx";

const byRecent = (a, b) => (b.date || "").localeCompare(a.date || "");
const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const plural = (n) => `${n} project${n === 1 ? "" : "s"}`;

// Everyday words that should never count as a search term
const STOP = new Set(("a an the is are was were am be been to of in on at for and or with about me my you your u i it its " +
  "this that these those do does did can could would should will what whats which who how why when where show tell give " +
  "see find view any some please fatima her she he his him they them we us our there here have has had get got just " +
  "really very also project projects work s t m re ve ll d").split(" "));

// short terms (like "ml") must match a whole word; longer ones match the start of a word
function termRegex(t) {
  return new RegExp(t.length <= 2 ? `(^|[^a-z0-9])${esc(t)}([^a-z0-9]|$)` : `(^|[^a-z0-9])${esc(t)}`, "i");
}
function score(p, t) {
  const re = termRegex(t);
  return (p.keywords.some((k) => re.test(k)) ? 3 : 0) + (re.test(p.name) ? 2 : 0);
}
// Only keywords and project names are searched, and sentences must be mostly made of real keywords.
function search(q) {
  const terms = [...new Set(
    q.toLowerCase().split(/[^a-z0-9+#.]+/).map((t) => t.replace(/^\.+|\.+$/g, "")).filter((t) => t && !STOP.has(t))
  )];
  const hits = terms.filter((t) => PROJECTS.some((p) => score(p, t) > 0));
  if (!terms.length || hits.length * 2 < terms.length) return [];
  return PROJECTS.map((p) => [p, hits.reduce((s, t) => s + score(p, t), 0)])
    .filter(([, s]) => s > 0)
    .sort((a, b) => b[1] - a[1] || byRecent(a[0], b[0]))
    .map(([p]) => p);
}
function smallTalk(q) {
  const s = q.toLowerCase().replace(/[^a-z0-9\s']/g, " ").replace(/\s+/g, " ").trim();
  for (const { patterns, reply } of SMALL_TALK) {
    if (patterns.some((t) => new RegExp(`(^| )${esc(t)}( |$)`).test(s))) {
      return reply
        .replace("{time}", new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }))
        .replace("{date}", new Date().toLocaleDateString([], { weekday: "long", month: "long", day: "numeric" }));
    }
  }
  return null;
}
const topKeywords = () => {
  const count = {};
  PROJECTS.forEach((p) => p.keywords.forEach((k) => (count[k] = (count[k] || 0) + 1)));
  return Object.keys(count).sort((a, b) => count[b] - count[a]).slice(0, CHAT.keywordChips);
};

const Star = () => (
  <svg viewBox="0 0 50 50" aria-hidden="true">
    <polygon points="25,3 31,18 47,19 35,30 39,46 25,37 11,46 15,30 3,19 19,18" fill="#ffd84d" stroke="#111" strokeWidth="3" strokeLinejoin="round" />
  </svg>
);

export default function Projects() {
  const nextId = useRef(1);
  const greeting = () => ({ id: 0, from: "fatima", text: CHAT.greeting });
  const [messages, setMessages] = useState([greeting()]);
  const [typing, setTyping] = useState(false);
  const [text, setText] = useState("");
  const [open, setOpen] = useState(null);
  const body = useRef(null);
  const chipsRef = useRef(null);
  const timer = useRef(null);
  const atStart = messages.length === 1 && !typing;
  const reduce = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    const el = body.current;
    el.scrollTo({ top: el.scrollHeight, behavior: reduce() ? "auto" : "smooth" });
  }, [messages, typing]);
  useEffect(() => () => clearTimeout(timer.current), []);

  const ask = (label, reply) => {
    clearTimeout(timer.current);
    setMessages((m) => [...m, { id: nextId.current++, from: "you", text: label }]);
    setTyping(true);
    timer.current = setTimeout(() => {
      setTyping(false);
      setMessages((m) => [...m, { id: nextId.current++, from: "fatima", ...reply }]);
    }, reduce() ? 0 : 550);
  };
  const reset = () => {
    clearTimeout(timer.current);
    setTyping(false);
    setMessages([greeting()]);
  };
  const recent = () =>
    ask("recent projects", {
      text: "here's what i'm working on lately:",
      projects: [...PROJECTS].sort(byRecent).slice(0, CHAT.recentCount),
    });
  const all = () =>
    ask("all projects", { text: `here are all ${plural(PROJECTS.length)}:`, projects: [...PROJECTS].sort(byRecent) });
  const find = (q) => {
    const found = search(q);
    if (!found.length) {
      const talk = smallTalk(q);
      if (talk) return ask(q, { text: talk });
    }
    const tips = topKeywords().slice(0, 2).join(" or ");
    ask(q, found.length
      ? { text: `found ${plural(found.length)} for "${q}":`, projects: found }
      : { text: `i couldn't find a project for "${q}". try a keyword${tips ? ` like ${tips}` : ""}, or tap one of the buttons below.` });
  };
  const submit = (e) => {
    e.preventDefault();
    const q = text.trim();
    if (!q) return;
    setText("");
    find(q);
  };

  const last = messages[messages.length - 1].id;
  return (
    <section id="projects" className="section">
      <h2>projects</h2>
      <Featured />
      <p className="more">looking for something specific? ask the chat:</p>
      <div className="win chat">
        <div className="win-bar chat-head">
          <span className="who">
            <span className="avatar">{CHAT.name[0]}</span>
            <span>
              {CHAT.name}
              <small>{CHAT.status}</small>
            </span>
          </span>
          {!atStart && <button className="back-btn" onClick={reset}>← back</button>}
        </div>

        <div className="chat-body" ref={body} tabIndex={0} aria-label="chat" aria-live="polite">
          {messages.map((m) => (
            <div className={`msg ${m.from}`} key={m.id}>
              <div className="bubble">
                {m.text}
                {m.projects && (
                  <div className="stickers">
                    {m.projects.map((p, i) => (
                      <button
                        key={p.name}
                        className="sticker"
                        style={{ "--r": i % 2 ? "1.2deg" : "-1.2deg", animationDelay: `${i * 90}ms` }}
                        onClick={() => setOpen(p)}
                      >
                        <Star />
                        <span className="st-text">
                          <strong>{p.name}</strong>
                          <span>{p.summary}</span>
                          <small>keywords: {p.keywords.join(", ")}</small>
                          {p.status && <small>status: {p.status}</small>}
                          <em>click {p.name} for details</em>
                        </span>
                      </button>
                    ))}
                  </div>
                )}
                {m.id === last && m.id !== 0 && (
                  <button className="chip inline" onClick={reset}>← back</button>
                )}
              </div>
            </div>
          ))}
          {typing && (
            <div className="msg fatima">
              <div className="bubble dots" aria-label="typing"><i /><i /><i /></div>
            </div>
          )}
        </div>

        <div className="chips-wrap">
          <button className="arrow" aria-label="scroll shortcuts left" onClick={() => chipsRef.current.scrollBy({ left: -160, behavior: "smooth" })}>‹</button>
          <div className="chips" ref={chipsRef}>
            {!atStart && <button className="chip" onClick={reset}>← back</button>}
            <button className="chip" onClick={recent}>recent projects</button>
            <button className="chip" onClick={all}>all projects</button>
            {topKeywords().map((k) => (
              <button className="chip" key={k} onClick={() => find(k)}>{k}</button>
            ))}
          </div>
          <button className="arrow" aria-label="scroll shortcuts right" onClick={() => chipsRef.current.scrollBy({ left: 160, behavior: "smooth" })}>›</button>
        </div>
        <form className="chat-input" onSubmit={submit}>
          <input value={text} onChange={(e) => setText(e.target.value)} placeholder="type a keyword, e.g. ml" aria-label="search projects by keyword" />
          <button className="send" type="submit" aria-label="send">➤</button>
        </form>
      </div>

      {open && (
        <Modal title={open.name} onClose={() => setOpen(null)} className="detail">
          <div className="detail-body">
            {open.image && <img src={open.image} alt={open.name} />}
            <dl>
              <div><dt>keywords</dt><dd>{open.keywords.join(", ")}</dd></div>
              {open.status && <div><dt>status</dt><dd>{open.status}</dd></div>}
              {open.date && <div><dt>updated</dt><dd>{open.date}</dd></div>}
            </dl>
            <p>{open.description}</p>
            {open.link && <p><a href={open.link} target="_blank" rel="noreferrer">view project</a></p>}
          </div>
        </Modal>
      )}
    </section>
  );
}