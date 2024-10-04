import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getArtworkOneById } from "@/utils/api";
import { getFullImage } from "@/utils/utils";
import ImageSlider from "./ImageSlider";
import { CollectionContext } from "../contexts/Collection";

export default function SingleArtworkOne() {
  const { artwork_id } = useParams();
  const [artwork, setArtwork] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [imageUrls, setImageUrls] = useState([]);
  const { collection, setCollection } = useContext(CollectionContext);

  console.log(collection);

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

        console.dir(data);
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

  const subHeading =
    artwork.titles && artwork.titles[0] ? <h3>{artwork.objectType}</h3> : null;

  const dateCreated =
    artwork.productionDates && artwork.productionDates[0]
      ? `${artwork.productionDates[0].date.text}`
      : "Date made not known";

  const creators = artwork.artistMakerPerson ? (
    <p>
      {artwork.artistMakerPerson
        .map((person) => {
          const name = person.name?.text || "Unknown Artist";
          const association = person.association?.text
            ? `(${person.association.text})`
            : "";
          return `${name} ${association}`;
        })
        .join(", ")}
    </p>
  ) : (
    <p>Unknown Artist</p>
  );

  const summaryDescription = artwork.summaryDescription ? (
    <div>
      <h3>Summary Description</h3>
      <p>
        {artwork.summaryDescription.split("<br>").map((text, index) => (
          <React.Fragment key={index}>
            {text.split("<b>").map((para, i) => (
              <React.Fragment key={i}>{para}</React.Fragment>
            ))}
            <br />
          </React.Fragment>
        ))}
      </p>
    </div>
  ) : null;

  const artworkMeasurements =
    artwork.dimensions && artwork.dimensions.length > 0 ? (
      <p>
        {"Measurements: "}
        {artwork.dimensions
          .map((dim) => `${dim.dimension}: ${dim.value} ${dim.unit}`)
          .join(" x ")}
      </p>
    ) : null;

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
          margin: "50px auto",
        }}
      >
        <ImageSlider
          imageUrls={imageUrls}
          alt={
            artwork.physicalDescription
              ? artwork.physicalDescription
              : artwork.objectType
          }
        />
      </div>
      <div>
        <h2>{title}</h2>
        {subHeading}
        <p>{dateCreated}</p>
        {creators}
        {artwork.materialsAndTechniques ? (
          <p>
            {"Materials and Technique: "}
            {artwork.materialsAndTechniques}
          </p>
        ) : null}

        {artwork.galleryLabels && artwork.galleryLabels[0] ? (
          <div>
            <h3>Gallery Label</h3>
            <p>{artwork.galleryLabels[0].text}</p>
          </div>
        ) : null}

        {artwork.briefDescription ? (
          <div>
            <h3>Description</h3>
            <p>{artwork.briefDescription}</p>
          </div>
        ) : null}

        {artworkMeasurements}

        {artwork.galleryLocations ? (
          <p>
            Location:{" "}
            {artwork.galleryLocations[0]?.current.text === "VADunScotDesGal"
              ? "On display at V&A Dundee, in the Scottish Design Galleries, 1 Riverside Esplanade, Dundee, DD1 4EZ, Scotland"
              : artwork.galleryLocations[0]?.current.text}
            .
            <Link
              to={`http://collections.vam.ac.uk/item/${artwork.systemNumber}`}
              target="_blank"
            >
              {" "}
              View more details at vam.ac.uk
            </Link>
          </p>
        ) : (
          <p>
            V&A Dundee 1 Riverside Esplanade, Dundee, DD1 4EZ, Scotland
            <Link
              to={`http://collections.vam.ac.uk/item/${artwork.systemNumber}`}
              target="_blank"
            >
              {" "}
              View more details at vam.ac.uk
            </Link>
          </p>
        )}
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
