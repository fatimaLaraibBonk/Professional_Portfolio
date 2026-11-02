import { useState } from "react";
import { SKILLS } from "./data.js";
import { Modal } from "./Win.jsx";

export default function Skills() {
  const [open, setOpen] = useState(null);
  return (
    <section id="skills" className="section">
      <h2>skills</h2>
      <div className="cds row">
        {SKILLS.map((g, i) => (
          <button key={g.label} className="cd-btn" onClick={() => setOpen(g)}>
            <span className="cd" style={{ filter: `hue-rotate(${i * 45}deg)` }} aria-hidden="true" />
            <span>{g.label}</span>
          </button>
        ))}
      </div>
      {open && (
        <Modal title={`skills › ${open.label}`} onClose={() => setOpen(null)} className="skills-win">
          <div className="skill-grid">
            {open.skills.map((s) => (
              <div className="skill" key={s}>{s}</div>
            ))}
          </div>
        </Modal>
      )}
    </section>
  );
}
