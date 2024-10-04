import React, { useState, useContext, useEffect } from "react";
import { CollectionContext } from "../contexts/Collection";
import { Link } from "react-router-dom";
import { getFullImage } from "@/utils/utils";
import ImageSlider from "./ImageSlider";
import { getArtworkOneById } from "@/utils/api";

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
    setError("");
    setIsLoading(true);
    getArtworkOneById(artwork_id)
      .then(({ data }) => {
        const artwork = data.record;
        setArtwork(artwork);
        const imageUrls = getFullImage(artwork);
        setImageUrls(imageUrls);
        setIsLoading(false);
        console.log(artwork);
      })
      .catch(({ response }) => {
        if (response.status === 404) {
          setError(response.data.detail || "Artwork not found");
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

  return (
    <div>
      <Link to={`/collections/victoria-and-albert-museum/${artwork_id}`}>
        <img
          src={imageUrls.length > 0 ? imageUrls[0] : null}
          alt={`Artwork of ${artwork.objectType}`}
          style={{ width: "200px" }}
        />
        <h3>
          {title}, {dateCreated}
        </h3>
        <p>{creators}</p>
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
