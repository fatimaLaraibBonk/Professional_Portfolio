import { useEffect, useRef } from "react";

const stack = [];

export function Win({ title, onClose, className = "", children }) {
  return (
    <div className={`win ${className}`} role="dialog" aria-modal="true" aria-label={title}>
      <div className="win-bar">
        <span>{title}</span>
        <button className="x" onClick={onClose} aria-label="close">✕</button>
      </div>
      {children}
    </div>
  );
}

// Popup window over a blurred backdrop. Esc / backdrop click / ✕ close it (top-most first).
export function Modal({ title, onClose, className = "", top = false, children }) {
  const closeRef = useRef(onClose);
  closeRef.current = onClose;
  useEffect(() => {
    const id = {};
    stack.push(id);
    document.body.style.overflow = "hidden";
    const onKey = (e) => {
      if (e.key === "Escape" && stack[stack.length - 1] === id) closeRef.current();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      stack.splice(stack.indexOf(id), 1);
      if (!stack.length) document.body.style.overflow = "";
    };
  }, []);
  return (
    <div className={`overlay${top ? " top" : ""}`} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <Win title={title} onClose={onClose} className={className}>
        {children}
      </Win>
    </div>
  );
}
