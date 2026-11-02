import { useEffect, useState } from "react";
import "./spacebar.css";

// Edit these words freely
const HERO_WORDS = ["a data scientist", "a student", "an ML enthusiast", "a problem solver"];

// Spacebar keycap that "presses" and swaps its word every few seconds
export default function Spacebar() {
  const [i, setI] = useState(0);
  const [down, setDown] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let t;
    const id = setInterval(() => {
      setDown(true);
      t = setTimeout(() => {
        setI((n) => (n + 1) % HERO_WORDS.length);
        setDown(false);
      }, reduce ? 0 : 140);
    }, 2600);
    return () => {
      clearInterval(id);
      clearTimeout(t);
    };
  }, []);

  return (
    <div className={`key sun space${down ? " down" : ""}`} aria-hidden="true">
      <span className="base" />
      <span className="top">
        <b>
          <span key={i} className="word">{HERO_WORDS[i]}</span>
        </b>
      </span>
    </div>
  );
}
