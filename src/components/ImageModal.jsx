import React from "react";
import "./image-modal.css";
import { IoCloseCircleOutline } from "react-icons/io5";

export default function ImageModal({ imageUrl, title, onClose }) {
  if (!imageUrl) return null;
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <img src={imageUrl} alt={title} className="modal-image" />
      </div>
      <button
        onClick={onClose}
        className="close-button"
        aria-label="click to close image"
      >
        <IoCloseCircleOutline size={40} aria-hidden />
      </button>
    </div>
  );
}
