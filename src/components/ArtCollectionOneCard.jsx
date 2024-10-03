import React, { useState, useContext } from "react";
import { CollectionContext } from "../contexts/Collection";
import { Link } from "react-router-dom";
import { getFullImage } from "@/utils/utils";

export default function ArtCollectionOneCard({ artwork }) {
  const { collection, setCollection } = useContext(CollectionContext);

  console.log(collection);

  const isInCollection = collection.some(
    (item) => item.artwork.systemNumber === artwork.systemNumber
  );

  const saveToCollection = () => {
    if (!isInCollection) {
      setCollection([...collection, { artwork, collection_type: "one" }]);
      //   //toast: Artwork added to your temp collection
      console.log("Artwork added to you temporary collection");
    }
  };

  const removeFromCollection = () => {
    setCollection(
      [...collection].filter(
        (item) => item.artwork.systemNumber !== artwork.systemNumber
      )
    );
    //   //toast:
    console.log("Artwork removed from your collection!");
  };

  // const creatorDescription =
  //   artwork._primaryMaker && artwork._primaryMaker.name
  //     ? artwork._primaryMaker.name
  //     : "Unknown Artist";

  const imageUrl = artwork._images
    ? artwork._images._primary_thumbnail
    : getFullImage(artwork);

  return (
    <div>
      <Link
        to={`/collections/victoria-and-albert-museum/${artwork.systemNumber}`}
      >
        <img src={imageUrl} alt={`Artwork of ${artwork.objectType}`} />
        <h3>
          {artwork.objectType},{" "}
          {artwork._primaryDate
            ? artwork._primaryDate
            : artwork.productionDates && artwork.productionDates[0]
            ? `${artwork.productionDates[0].date.text}`
            : null}
        </h3>
        {/* <p>{creatorDescription}</p> */}
      </Link>

      {isInCollection ? (
        <button onClick={removeFromCollection}>
          Remove from My Collection
        </button>
      ) : (
        <button onClick={saveToCollection}>Save to My Collection</button>
      )}
    </div>
  );
}
