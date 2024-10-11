import React, { useState, useContext, useEffect } from "react";
import { CollectionContext } from "../contexts/Collection";
import { Link } from "react-router-dom";
import { getFullImage } from "@/utils/utils";
import ImageSlider from "./ImageSlider";
import { getArtworkOneById } from "@/utils/api";
import { Separator } from "./ui/separator";
import "./ArtCollection.css";

export default function ArtCollectionOneCard(props) {
  const artwork_id = props.artwork.systemNumber;
  const [artwork, setArtwork] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);
  const { collection, setCollection } = useContext(CollectionContext);

  const isInCollection = collection.some(
    (item) => item.artwork.systemNumber === artwork_id
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
      collection.filter((item) => item.artwork.systemNumber !== artwork_id)
    );
    //   //toast:
    console.log("Artwork removed from your collection!");
  };

  useEffect(() => {
    setError(null);
    setIsLoading(true);
    setImageUrls([]);
    getArtworkOneById(artwork_id)
      .then(({ data }) => {
        const artwork = data.record;
        setArtwork(artwork);
        const imageUrls = getFullImage(artwork);
        setImageUrls(imageUrls);
        setIsLoading(false);
      })
      .catch((error) => {
        if (error.response) {
          const msg =
            error.response.status === 404
              ? "Artwork not found"
              : error.response.status === 500
              ? "Server error, please try again later."
              : "Could not load artwork";
          setError(msg);
        } else if (error.request) {
          setError(
            "Connection Error, please check your connection and try again."
          );
        } else {
          setError("Something went wrong...please try again later.");
        }

        setIsLoading(false);
      });
  }, [artwork_id]);

  const title =
    artwork.titles && artwork.titles[0]
      ? artwork.titles[0].title
      : artwork.objectType || "Unknown Art Object";

  const dateCreated =
    artwork.productionDates && artwork.productionDates[0]
      ? `${artwork.productionDates[0].date.text}`
      : "Date made not known";

  const creators = artwork.artistMakerPerson
    ? artwork.artistMakerPerson[0]?.name.text
    : "Unknown Artist";

  if (isLoading) return <div>Loading...</div>;

  if (error) {
    return (
      <div>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="card">
      <Link to={`/collections/victoria-and-albert-museum/${artwork_id}`}>
        <img
          src={imageUrls.length > 0 ? imageUrls[0] : null}
          alt={`Artwork of ${artwork.objectType}`}
          className="card__img"
        />
      </Link>
      <div className="card__body">
        <h3 className="card__title">
          {title}, {dateCreated}
        </h3>
        <p className="card__description">{creators}</p>
        {isInCollection ? (
          <button onClick={removeFromCollection} className="card__btn">
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
