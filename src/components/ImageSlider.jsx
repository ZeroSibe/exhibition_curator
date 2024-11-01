import React, { useState } from "react";
import { ArrowBigLeft, ArrowBigRight, Circle, CircleDot } from "lucide-react";
import "./image-slider.css";
import ImageModal from "./ImageModal";

export default function ImageSlider({ imageUrls, alt }) {
  const [imageIndex, setImageIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);

  const openModal = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  function showNextImage() {
    setImageIndex((index) => {
      if (index === imageUrls.length - 1) return 0;
      return index + 1;
    });
  }

  function showPrevImage() {
    setImageIndex((index) => {
      if (index === 0) return imageUrls.length - 1;
      return index - 1;
    });
  }

  return (
    <figure
      aria-label="Image Slider"
      style={{ width: "100%", height: "100%", position: "relative" }}
    >
      <a href="#end-of-image" className="skip-link">
        Skip Image
      </a>

      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          overflow: "hidden",
        }}
      >
        {imageUrls.map((url, index) => (
          <img
            key={url}
            src={url}
            alt={`${alt} artwork ${index + 1}`}
            aria-hidden={imageIndex !== index}
            className="img-slider-img"
            style={{ translate: `${-100 * imageIndex}%` }}
            onClick={() => openModal(imageUrls[imageIndex])}
            aria-label="click to view full image"
          />
        ))}
      </div>
      <button
        onClick={showPrevImage}
        className="img-slider-btn"
        style={{ left: 0 }}
        aria-label="View Previous Image"
      >
        <ArrowBigLeft aria-hidden />
      </button>
      <button
        onClick={showNextImage}
        className="img-slider-btn"
        style={{ right: 0 }}
        aria-label="View Next Image"
      >
        <ArrowBigRight aria-hidden />
      </button>
      <div
        style={{
          position: "absolute",
          bottom: ".5rem",
          left: "50%",
          translate: "-50%",
          display: "flex",
          gap: ".25rem",
        }}
      >
        {imageUrls.map((_, index) => (
          <button
            key={index}
            className="img-slider-dot-btn"
            onClick={() => setImageIndex(index)}
            aria-label={`View Image ${index + 1}`}
          >
            {index === imageIndex ? (
              <CircleDot aria-hidden />
            ) : (
              <Circle aria-hidden />
            )}
          </button>
        ))}
      </div>

      {selectedImage && (
        <ImageModal
          imageUrl={selectedImage}
          title="Artwork"
          onClose={closeModal}
        />
      )}

      <div id="end-of-image"></div>
    </figure>
  );
}
