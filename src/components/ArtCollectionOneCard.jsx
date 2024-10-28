import React, { useContext, useState } from "react";
import { CollectionContext } from "../contexts/Collection";
import { Link } from "react-router-dom";
import { getFullImage, truncateTitle } from "@/utils/utils";
import { useToast } from "@/hooks/use-toast";
import placeholderImage from "../assets/placeholder.png";

import "./ArtCollection.css";
import LoadingSpinner from "./LoadingSpinner";

export default function ArtCollectionOneCard({ artwork }) {
  const artwork_id = artwork.systemNumber;
  const { collection, setCollection } = useContext(CollectionContext);
  const { toast } = useToast();

  const [imageLoaded, setImageLoaded] = useState(false);

  const isInCollection = collection.some(
    (item) => item.artwork.systemNumber === artwork_id
  );

  const saveToCollection = () => {
    if (!isInCollection) {
      setCollection([...collection, { artwork, collection_type: "one" }]);
      toast({
        title: "Added to My Collection",
        description: `${
          artwork._primaryTitle || "This Artwork"
        } has been added to your temporary collection`,
      });
    }
  };

  const removeFromCollection = () => {
    setCollection(
      collection.filter((item) => item.artwork.systemNumber !== artwork_id)
    );
    toast({
      title: "Removed from My Collection",
      description: `${
        artwork._primaryTitle || "This Artwork"
      } has been removed from your temporary collection`,
    });
  };

  const title = artwork._primaryTitle
    ? truncateTitle(artwork._primaryTitle, 35)
    : artwork.titles && artwork.titles[0]
    ? truncateTitle(artwork.titles[0].title, 35)
    : artwork.objectType || "Unknown Art Object";

  const dateCreated = artwork._primaryDate
    ? `${artwork._primaryDate}`
    : artwork.productionDates && artwork.productionDates[0]
    ? `${artwork.productionDates[0].date.text}`
    : "Date made not known";

  const imageUrl = artwork._primaryImageId
    ? `https://framemark.vam.ac.uk/collections/${artwork._primaryImageId}/full/full/0/default.jpg`
    : getFullImage(artwork)[0];

  return (
    <div className="card">
      <Link to={`/collections/victoria-and-albert-museum/${artwork_id}`}>
        <img
          src={imageUrl}
          alt={`Artwork ${artwork.systemNumber} of ${artwork.objectType}`}
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
        <h2 className="card__title">
          {title}, {dateCreated}
        </h2>

        {isInCollection ? (
          <button
            onClick={removeFromCollection}
            className="card__btn"
            aria-label="remove artwork from My Collection"
          >
            Remove from My Collection
          </button>
        ) : (
          <button
            className="card__btn"
            onClick={saveToCollection}
            aria-label="add artwork to My Collection"
          >
            Save to My Collection
          </button>
        )}
      </div>
    </div>
  );
}
