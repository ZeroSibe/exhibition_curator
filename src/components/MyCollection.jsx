import React, { useContext, useEffect, useState } from "react";
import ArtCollectionTwoCard from "./ArtCollectionTwoCard";
import { CollectionContext } from "../contexts/Collection";

export default function MyCollection() {
  const { collection } = useContext(CollectionContext);

  if (collection.length === 0) {
    return <div>No artworks in your collection...</div>;
  }
  return (
    <div>
      <h1>My Collection</h1>
      <ul>
        {collection.map(({ artwork }) => {
          return (
            <li key={artwork.id}>
              <ArtCollectionTwoCard artwork={artwork} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
