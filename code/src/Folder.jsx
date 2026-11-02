export default function Folder({ label, onClick }) {
  return (
    <button className="folder" onClick={onClick}>
      <svg viewBox="0 0 100 80" aria-hidden="true">
        <path d="M8 16a7 7 0 0 1 7-7h24l9 9h37a7 7 0 0 1 7 7v42a7 7 0 0 1-7 7H15a7 7 0 0 1-7-7z" fill="#f4b6ca" stroke="#111" strokeWidth="4" strokeLinejoin="round" />
        <path d="M8 31h84v31a7 7 0 0 1-7 7H15a7 7 0 0 1-7-7z" fill="#fbd3e0" stroke="#111" strokeWidth="4" strokeLinejoin="round" />
      </svg>
      <span>{label}</span>
    </button>
  );
}
