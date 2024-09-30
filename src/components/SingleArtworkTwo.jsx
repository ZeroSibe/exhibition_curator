import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getArtworkTwoById } from "../utils/api";
import ImageSlider from "./ImageSlider";
import { getImageUrls } from "../utils/utils";
import { CollectionContext } from "../contexts/Collection";

export default function SingleArtworkTwo() {
  const { artwork_id } = useParams();
  const [artwork, setArtwork] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [imageUrls, setImageUrls] = useState([]);
  const { collection, setCollection } = useContext(CollectionContext);

  const isInCollection = collection.some(
    (item) => Number(item.artwork.id) === Number(artwork_id)
  );

  const saveToCollection = () => {
    if (!isInCollection) {
      setCollection([...collection, { artwork, collection_type: "two" }]);
      //   //toast: Artwork added to your temp collection
      console.log("Artwork added to you temporary collection");
    }
  };

  const removeFromCollection = () => {
    setCollection(
      collection.filter(
        (item) => Number(item.artwork.id) !== Number(artwork_id)
      )
    );
    //   //toast:
    console.log("Artwork removed from your collection!");
  };


  useEffect(() => {
    setError("");
    setIsLoading(true);
    getArtworkTwoById(artwork_id)
      .then(({ data }) => {
        const artwork = data.data;
        setArtwork(artwork);
        const imageUrls = getImageUrls(artwork);
        setImageUrls(imageUrls);
        setIsLoading(false);
      })
      .catch(({ response }) => {
        if (response.status === 404) {
          setError(response.data.detail || "Artwork not found");
        }
        setIsLoading(false);
      });
  }, [artwork_id]);

  if (isLoading) return <div>Loading...</div>;

  if (error) {
    return (
      <div>
        <p>{error}</p>
        <button onClick={() => navigate(-1)}>Go Back</button>
      </div>
    );
  }

  return (
    <div>
      <div>
        <button onClick={() => navigate(-1)}>Go Back</button>
      </div>
      <div
        style={{
          maxWidth: "1200px",
          width: "100%",
          aspectRatio: "10/6",
          margin: "0 auto",
        }}
      >
        <ImageSlider imageUrls={imageUrls} alt={artwork.title} />
      </div>
      <div>
        <h2>{artwork.title}</h2>
        {artwork.creation_date ? <p>{artwork.creation_date}</p> : null}

        {artwork.creators[0] ? (
          <p>
            {artwork.creators.map((creator) => creator.description).join(", ")}
          </p>
        ) : (
          "Unknown Artist"
        )}

        {artwork.culture[0] ? <p>{artwork.culture[0]}</p> : null}

        {artwork.technique ? <p> {artwork.technique}</p> : null}

        {artwork.collection ? <p> {artwork.collection}</p> : null}

        {artwork.description ? (
          <div>
            <h3>Description</h3>
            <p>{artwork.description}</p>
          </div>
        ) : null}

        {artwork.did_you_know ? (
          <div>
            <h3>Trivia</h3> <p>{artwork.did_you_know}</p>
          </div>
        ) : null}

        {artwork.current_location ? (
          <p>
            Location: {artwork.current_location}{" "}
            <Link to={artwork.url}>View more details</Link>
          </p>
        ) : null}
        {artwork.measurements ? <p>{artwork.measurements}</p> : null}
      </div>

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
