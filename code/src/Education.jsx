import { useState } from "react";
import { COLLECTIONS } from "./data.js";
import { Modal } from "./Win.jsx";

const CDS = [
  ["certificates", "view certificates"],
  ["honors", "view honors"],
  ["papers", "view research papers"],
];

export default function Education() {
  const [open, setOpen] = useState(null);
  const [item, setItem] = useState(null);
  const collection = open && COLLECTIONS[open];

  return (
    <section id="education" className="section edu">
      <h2>education</h2>
      <div className="edu-grid">
        <div className="win">
          <div className="win-bar">
            <span>bachelors.txt</span>
            <span className="x" aria-hidden="true">✕</span>
          </div>
          <p>
            <strong>bachelor of science in data science</strong>
            <br />
            fast nuces, islamabad · 2024 – 2028
            <br />
            <br />
            my main focus is data analysis, machine learning, deep learning and research work. 
            im also a gold medalist and always winning to learn more. 
          </p>
        </div>
        <div className="cds">
          {CDS.map(([key, label]) => (
            <button key={key} className="cd-btn" onClick={() => setOpen(key)}>
              <span className="cd" aria-hidden="true" />
              <span>{label}</span>
            </button>
          ))}
        </div>
      </div>

      {collection && !item && (
        <Modal title={`my files › ${collection.title}`} onClose={() => setOpen(null)} className="explorer">
          <div className="exp-grid">
            {collection.items.map((it) => (
              <div className="file" key={it.caption}>
                <button className="thumb" onClick={() => setItem(it)} aria-label={`open ${it.caption}`}>
                  <img src={it.image} alt="" />
                </button>
                <button className="cap" onClick={() => setItem(it)}>{it.caption}</button>
              </div>
            ))}
          </div>
        </Modal>
      )}
      {item && (
        <Modal title={item.caption} onClose={() => setItem(null)} className="detail">
          <div className="detail-body">
            <img src={item.image} alt={item.caption} />
            <dl>
              {item.details.map(([k, v]) => (
                <div key={k}><dt>{k}</dt><dd>{v}</dd></div>
              ))}
            </dl>
            <p>{item.description}</p>
          </div>
        </Modal>
      )}
    </section>
  );
}
