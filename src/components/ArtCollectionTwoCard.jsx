import React, { useEffect, useState, useContext } from "react";
import { CollectionContext } from "../contexts/Collection";
import { Link } from "react-router-dom";
import "./ArtCollection.css";

export default function ArtCollectionTwoCard({ artwork }) {
  const { collection, setCollection } = useContext(CollectionContext);

  const isInCollection = collection.some(
    (item) => item.artwork.id === artwork.id
  );

  const saveToCollection = () => {
    if (!isInCollection) {
      setCollection([...collection, { artwork, collection_type: "two" }]);
      //   //toast: Artwork added to your temp collection
      console.log("Artwork added to you temporary collection");
    }
  };

  const removeFromCollection = () => {
    setCollection(collection.filter((item) => item.artwork.id !== artwork.id));
    //   //toast:
    console.log("Artwork removed from your collection!");
  };

  const creatorDescription =
    artwork.creators && artwork.creators[0]
      ? artwork.creators[0].description
      : "Unknown Artist";

  return (
    <div className="card">
      <Link to={`/collections/cleveland-museum-of-art/${artwork.id}`}>
        <img
          src={artwork.images.web.url}
          alt={`Artwork of ${artwork.title} in the style ${artwork.technique}`}
          className="card__img"
        />
      </Link>
      <div className="card__body">
        <h3 className="card__title">
          {artwork.title},{" "}
          {artwork.creation_date ? artwork.creation_date : null}
        </h3>
        <p className="card__description">{creatorDescription}</p>

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
