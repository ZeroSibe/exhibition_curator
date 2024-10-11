import React from "react";
import "./image-modal.css";

export default function ImageModal({ imageUrl, title, onClose }) {
  if (!imageUrl) return null;
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <img src={imageUrl} alt={title} className="modal-image" />
      </div>
      <button onClick={onClose} className="close-button">
        Close
      </button>
    </div>
  );
}
