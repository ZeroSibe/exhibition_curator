import React, { useContext, useEffect, useState } from "react";
import ArtCollectionTwoCard from "./ArtCollectionTwoCard";
import { CollectionContext } from "../contexts/Collection";
import ArtCollectionOneCard from "./ArtCollectionOneCard";

export default function MyCollection() {
  const { collection } = useContext(CollectionContext);

  console.log(collection);

  if (collection.length === 0) {
    return <div>No artworks in your collection...</div>;
  }
  return (
    <div>
      <h1>My Collection</h1>
      <ul>
        {collection.map(({ artwork, collection_type }) => {
          return collection_type === "two" ? (
            <li key={artwork.id}>
              <ArtCollectionTwoCard artwork={artwork} />
            </li>
          ) : (
            <li key={artwork.systemNumber}>
              <ArtCollectionOneCard artwork={artwork} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
