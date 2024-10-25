import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase";
import ArtCollectionTwoCard from "./ArtCollectionTwoCard";
import ArtCollectionOneCard from "./ArtCollectionOneCard";
import LoadingSpinner from "./LoadingSpinner";
import "./ArtCollection.css";
import { AlertDestructive } from "./AlertDestructive";

export default function Exhibition() {
  const { exhibitionId } = useParams();
  const [exhibition, setExhibition] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExhibition = async () => {
      try {
        const docRef = doc(db, "Exhibitions", exhibitionId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setExhibition(docSnap.data());
        } else {
          setError(
            "This Exhibition does not exist or it may have been removed."
          );
        }
      } catch (error) {
        setError(
          "Could not retrieve this exhibition, you may need to log in and try again later."
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchExhibition();
  }, [exhibitionId]);

  if (isLoading) {
    return (
      <div className="spinner-container">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <AlertDestructive msg={error} />
      </div>
    );
  }

  const artworks = exhibition?.artworks || null;

  return (
    <div>
      <h1 className="text-[30px] font-bold py-20 px-10 text-center">
        {exhibition?.exhibition_name}
      </h1>
      <ul className="wrapper">
        {artworks?.map(({ artwork, collection_type }) => {
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
