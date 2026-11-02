import { useState } from "react";
import { EXPERIENCE } from "./data.js";
import Folder from "./Folder.jsx";
import { Modal } from "./Win.jsx";

export default function Experience() {
  const [item, setItem] = useState(null);
  return (
    <section id="experience" className="section">
      <h2>experience</h2>
      <div className="folders left">
        {EXPERIENCE.map((p) => (
          <Folder key={p.label} label={p.label} onClick={() => setItem(p)} />
        ))}
      </div>
      {item && (
        <Modal title={item.label} onClose={() => setItem(null)} className="detail">
          <div className="detail-body">
            <img src={item.image} alt={item.label} />
            <dl>
              <div><dt>role</dt><dd>{item.role}</dd></div>
              <div><dt>company</dt><dd>{item.company}</dd></div>
              <div><dt>dates</dt><dd>{item.dates}</dd></div>
            </dl>
            <p>{item.description}</p>
          </div>
        </Modal>
      )}
    </section>
  );
}
