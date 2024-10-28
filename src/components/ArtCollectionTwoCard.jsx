import React, { useContext, useState } from "react";
import { CollectionContext } from "../contexts/Collection";
import { Link } from "react-router-dom";
import "./ArtCollection.css";
import { useToast } from "@/hooks/use-toast";
import placeholderImage from "../assets/placeholder.png";
import LoadingSpinner from "./LoadingSpinner";

export default function ArtCollectionTwoCard({ artwork }) {
  const { collection, setCollection } = useContext(CollectionContext);
  const { toast } = useToast();
  const [imageLoaded, setImageLoaded] = useState(false);

  const isInCollection = collection.some(
    (item) => item.artwork.id === artwork.id
  );

  const saveToCollection = () => {
    if (!isInCollection) {
      setCollection([...collection, { artwork, collection_type: "two" }]);
      toast({
        title: "Added to My Collection",
        description: `${
          artwork?.title || "This Artwork"
        } has been added to your temporary collection`,
      });
    }
  };

  const removeFromCollection = () => {
    setCollection(collection.filter((item) => item.artwork.id !== artwork.id));
    toast({
      title: "Removed from My Collection",
      description: `${
        artwork?.title || "This Artwork"
      } has been removed from your temporary collection`,
    });
  };

  return (
    <div className="card">
      <Link to={`/collections/cleveland-museum-of-art/${artwork.id}`}>
        <img
          src={artwork.images.web.url}
          alt={`Artwork of ${artwork.title} in the style ${artwork.technique}`}
          className="card__img"
          onLoad={() => setImageLoaded(true)}
          onError={(e) => {
            e.target.src = placeholderImage;
          }}
          style={{ display: imageLoaded ? "block" : "none" }}
        />

        {!imageLoaded && (
          <div className="image-placeholder" aria-label="loading artwork image">
            <LoadingSpinner />
          </div>
        )}
      </Link>
      <div className="card__body">
        <h3 className="card__title">
          {artwork.title},{" "}
          {artwork.creation_date ? artwork.creation_date : null}
        </h3>

        {isInCollection ? (
          <button className="card__btn" onClick={removeFromCollection}>
            Remove from My Collection
          </button>
        ) : (
          <button className="card__btn" onClick={saveToCollection}>
            Save to My Collection
          </button>
        )}
      </div>
    </div>
  );
}
