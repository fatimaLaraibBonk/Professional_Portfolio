import { Analytics } from "@vercel/analytics/react";
import { useEffect, useState } from "react";
import Education from "./Education.jsx";
import Experience from "./Experience.jsx";
import Projects from "./Projects.jsx";
import Skills from "./Skills.jsx";
import Contact from "./Contact.jsx";
import Folder from "./Folder.jsx";

const goTo = (id) => {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  document.getElementById(id)?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
};

const NAV = ["About", "Education", "Experience", "Projects", "Skills", "Contact"];
const ROW_1 = "FATIMA".split("");
const ROW_2 = "LARAIB".split("");

function Key({ label, tone, down, className = "", ...rest }) {
  return (
    <div className={`key ${tone}${down ? " down" : ""} ${className}`} {...rest}>
      <span className="base" />
      <span className="top">
        <b>{label}</b>
      </span>
    </div>
  );
}

export default function App() {
  const [downKey, setDownKey] = useState(null);
  const [enterDown, setEnterDown] = useState(false);

  const goIn = () => {
    setEnterDown(true);
    setTimeout(() => {
      setEnterDown(false);
      goTo("about");
    }, 180);
  };

  // Typing on a real keyboard presses the matching keycap
  useEffect(() => {
    const onDown = (e) => {
      // ignore typing in inputs, buttons, links etc., and only run while the hero is on screen
      if (e.target.closest?.("input, textarea, select, button, a, [role='button'], [contenteditable]")) return;
      if (window.scrollY > window.innerHeight * 0.5) return;
      if (e.key === "Enter") goIn();
      else if (e.key.length === 1) setDownKey(e.key.toUpperCase());
    };
    const onUp = () => setDownKey(null);
    window.addEventListener("keydown", onDown);
    window.addEventListener("keyup", onUp);
    return () => {
      window.removeEventListener("keydown", onDown);
      window.removeEventListener("keyup", onUp);
    };
  }, []);

  return (
    <>
      <Analytics />
      <nav className="nav" aria-label="Main"></nav>
      <nav className="nav" aria-label="Main">
        {NAV.map((n) => (
          <a key={n} href={`#${n.toLowerCase()}`}>
            {n}
          </a>
        ))}
      </nav>

      <header className="hero">
        <h1 className="sr">Hey, I'm Fatima Laraib</h1>
        <p className="hey" aria-hidden="true">
          Hey, I'm<span className="caret" />
        </p>

        <div className="keys">
          <div className="letters">
            <div className="row">
              {ROW_1.map((c, i) => (
                <Key key={i} label={c} tone={i % 2 ? "blue" : "pink"} down={downKey === c} />
              ))}
            </div>
            <div className="row">
              {ROW_2.map((c, i) => (
                <Key key={i} label={c} tone={i % 2 ? "pink" : "blue"} down={downKey === c} />
              ))}
            </div>
          </div>
          <Key
            label="Enter ↵"
            tone="mint"
            className="enter"
            down={enterDown}
            role="button"
            tabIndex={0}
            onClick={goIn}
            onKeyDown={(e) => {
              if (e.key === " " || e.key === "Enter") {
                e.preventDefault();
                goIn();
              }
            }}
          />
        </div>
        <button className="sr" onClick={goIn}>Enter site</button>
      </header>

      <main>
        <section id="about" className="section about">
          <h2>about</h2>
          <div className="about-grid">
            <div className="win">
              <div className="win-bar">
                <span>about.txt</span>
                <span className="x" aria-hidden="true">✕</span>
              </div>
              <p>
                hi, im fatima. a data science student at fast nuces, islamabad. i have expereince 
                in machine learning, deep learning, ai and backend development, and im always winning to learn more. 
                please feel free to explore the portfolio and contact me if needed.
              </p>
            </div>
            <div className="folders">
              <Folder label="view my experience" onClick={() => goTo("experience")} />
              <Folder label="view my education" onClick={() => goTo("education")} />
              <Folder label="view my skills" onClick={() => goTo("skills")} />
            </div>
          </div>
        </section>
        <Education />
        <Experience />
        <Projects />
        <Skills />
        <Contact />
      </main>
    </>
  );
}
