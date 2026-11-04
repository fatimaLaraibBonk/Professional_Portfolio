import { useEffect, useRef, useState } from "react";
import { PROJECTS } from "./data.js";
import "./featured.css";

const byRecent = (a, b) => (b.date || "").localeCompare(a.date || "");
const AUTO_MS = 7000; // time between automatic slides

// Shows projects marked `featured: true` in data.js (or the 3 most recent if none are marked)
export default function Featured() {
  const flagged = PROJECTS.filter((p) => p.featured);
  const items = flagged.length ? flagged : [...PROJECTS].sort(byRecent).slice(0, 3);
  const n = items.length;

  const [i, setI] = useState(0);
  const [hover, setHover] = useState(false);
  const [paused, setPaused] = useState(false);
  const [reduce] = useState(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  const touchX = useRef(null);

  const go = (k) => setI(((k % n) + n) % n);

  // auto-advance; restarts after every manual change, pauses on hover/focus or when paused
  useEffect(() => {
    if (n < 2 || paused || hover || reduce) return;
    const t = setTimeout(() => setI((x) => (x + 1) % n), AUTO_MS);
    return () => clearTimeout(t);
  }, [i, paused, hover, n, reduce]);

  if (!n) return null;
  return (
    <div
      className="win feat"
      role="region"
      aria-roledescription="carousel"
      aria-label="featured projects"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onFocus={() => setHover(true)}
      onBlur={() => setHover(false)}
    >
      <div className="win-bar">
        <span>featured projects</span>
        <span className="x" aria-hidden="true">✕</span>
      </div>

      <div
        className="feat-viewport"
        onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
        onTouchEnd={(e) => {
          if (touchX.current == null) return;
          const dx = e.changedTouches[0].clientX - touchX.current;
          if (Math.abs(dx) > 40) go(i + (dx < 0 ? 1 : -1));
          touchX.current = null;
        }}
      >
        <div className="feat-track" style={{ transform: `translateX(-${i * 100}%)` }}>
          {items.map((p, idx) => (
            <div className="feat-slide" key={p.name} role="group" aria-label={`${idx + 1} of ${n}`} aria-hidden={idx !== i}>
              {p.image && <img className="feat-img" src={p.image} alt={p.name} />}
              <div className="feat-text">
                <h3>{p.name}</h3>
                <p className="feat-kw">{p.keywords.join(", ")}</p>
                <p>{p.description || p.summary}</p>
                {p.link && (
                  <a className="feat-link" href={p.link} target="_blank" rel="noreferrer" tabIndex={idx === i ? 0 : -1}>
                    view project ↗
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {n > 1 && (
        <div className="feat-nav">
          <button className="arrow" onClick={() => go(i - 1)} aria-label="previous project">‹</button>
          <div className="feat-dots">
            {items.map((p, idx) => (
              <button key={p.name} className={idx === i ? "dot on" : "dot"} onClick={() => go(idx)} aria-label={`show ${p.name}`} />
            ))}
          </div>
          <button className="chip" onClick={() => setPaused((v) => !v)} aria-label={paused ? "play slideshow" : "pause slideshow"}>
            {paused ? "▶ play" : "❚❚ pause"}
          </button>
          <button className="arrow" onClick={() => go(i + 1)} aria-label="next project">›</button>
        </div>
      )}
    </div>
  );
}