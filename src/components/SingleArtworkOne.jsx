import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getArtworkOneById } from "@/utils/api";
import { getFullImage } from "@/utils/utils";
import ImageSlider from "./ImageSlider";
import { CollectionContext } from "../contexts/Collection";
import { useToast } from "@/hooks/use-toast";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { HiMiniChevronUpDown } from "react-icons/hi2";
import { Button } from "@/components/ui/button";
import { IoIosArrowBack } from "react-icons/io";

import "./SingleArtwork.css";
import { AlertDestructive } from "./AlertDestructive";
import LoadingSpinner from "./LoadingSpinner";

export default function SingleArtworkOne() {
  const { artwork_id } = useParams();
  const [artwork, setArtwork] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [imageUrls, setImageUrls] = useState([]);
  const { collection, setCollection } = useContext(CollectionContext);
  const { toast } = useToast();

  const isInCollection = collection.some(
    (item) => item.artwork.systemNumber === artwork_id
  );

  const saveToCollection = () => {
    if (!isInCollection) {
      setCollection([...collection, { artwork, collection_type: "one" }]);
      toast({
        title: "Added to My Collection",
        description: `${
          artwork.titles[0]?.title || "This Artwork"
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
        artwork.titles[0]?.title || "This Artwork"
      } has been removed from your temporary collection`,
    });
  };

  useEffect(() => {
    setError(null);
    setIsLoading(true);
    setImageUrls([]);
    setArtwork({});
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

  const subHeading =
    artwork.titles && artwork.titles[0] ? (
      <p className="singleArtwork_subHeading">{artwork.objectType}</p>
    ) : null;

  const dateCreated =
    artwork.productionDates && artwork.productionDates[0]
      ? `${artwork.productionDates[0].date.text}`
      : "Date made not known";

  const creators =
    artwork.artistMakerPerson && artwork.artistMakerPerson.length > 0 ? (
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

  const artworkMeasurements =
    artwork.dimensions && artwork.dimensions.length > 0 ? (
      <p>
        {artwork.dimensions
          .filter((dim) => dim.dimension && dim.value && dim.unit)
          .map((dim) => `${dim.dimension}: ${dim.value} ${dim.unit}`)
          .join(" x ")}{" "}
      </p>
    ) : null;

  if (isLoading)
    return (
      <div className="spinner-container">
        <LoadingSpinner />
      </div>
    );

  return (
    <div>
      <div>
        <Button onClick={() => navigate(-1)} variant="link">
          <IoIosArrowBack aria-hidden />
          Go Back
        </Button>
      </div>

      {error ? (
        <div className="mt-4">
          <AlertDestructive msg={error} />
        </div>
      ) : (
        <div className="singleArtwork_wrapper">
          <div className="singleArtwork_image">
            <ImageSlider
              imageUrls={imageUrls}
              alt={
                artwork.physicalDescription
                  ? artwork.physicalDescription
                  : artwork.objectType
              }
            />
          </div>

          <div className="singleArtwork_content">
            <h2 className="singleArtwork_largeHeading">{title}</h2>

            {subHeading}

            <div className="singleArtwork_margins">
              <h3 className="singleArtwork_medHeading">Artist</h3>
              {creators}
            </div>

            <div className="singleArtwork_margins">
              <h3 className="singleArtwork_medHeading">Date</h3>
              <p>{dateCreated}</p>
            </div>

            {artwork.materialsAndTechniques && (
              <div className="singleArtwork_margins">
                <h3 className="singleArtwork_medHeading">
                  Materials and Techniques
                </h3>
                <p>{artwork.materialsAndTechniques}</p>
              </div>
            )}

            {artworkMeasurements && (
              <div className="singleArtwork_margins">
                <h3 className="singleArtwork_medHeading">Dimensions</h3>
                {artworkMeasurements}
              </div>
            )}

            {artwork.galleryLabels && artwork.galleryLabels[0] && (
              <div className="singleArtwork_margins">
                <h3 className="singleArtwork_medHeading">Gallery Label</h3>
                <p>{artwork.galleryLabels[0].text}</p>
              </div>
            )}

            {artwork.briefDescription && (
              <div className="singleArtwork_margins">
                <h3 className="singleArtwork_medHeading">Description</h3>
                <p>{artwork.briefDescription}</p>
              </div>
            )}

            {artwork.summaryDescription && (
              <div className="singleArtwork_margins">
                <Collapsible className="w-[350px] space-y-2">
                  <CollapsibleTrigger className="flex items-center justify-between hover:text-[#3b82f6]">
                    <h4 className="text-sm font-semibold">View More Details</h4>
                    <HiMiniChevronUpDown className="w-5 h-5" />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="space-y-2">
                    <p
                      dangerouslySetInnerHTML={{
                        __html: artwork.summaryDescription,
                      }}
                    />
                  </CollapsibleContent>
                </Collapsible>
              </div>
            )}

            {artwork.galleryLocations ? (
              <div className="singleArtwork_margins">
                <h3 className="singleArtwork_medHeading">Location</h3>
                <p>
                  {artwork.galleryLocations[0]?.current.text ===
                  "VADunScotDesGal"
                    ? "On display at V&A Dundee, in the Scottish Design Galleries, Dundee, Scotland."
                    : artwork.galleryLocations[0]?.current.text}
                </p>
                <p>
                  View more details at
                  <Link
                    to={`http://collections.vam.ac.uk/item/${artwork.systemNumber}`}
                    target="_blank"
                  >
                    <Button variant="link"> vam.ac.uk</Button>
                  </Link>
                </p>
              </div>
            ) : (
              <div className="singleArtwork_margins">
                <h3 className="singleArtwork_medHeading">Location</h3>
                <p>
                  No Longer on Display. View more details at
                  <Link
                    to={`http://collections.vam.ac.uk/item/${artwork.systemNumber}`}
                    target="_blank"
                  >
                    <Button variant="link"> vam.ac.uk</Button>
                  </Link>
                </p>
              </div>
            )}

            {isInCollection ? (
              <button
                onClick={removeFromCollection}
                className="singleArtwork_btn"
              >
                Remove from My Collection
              </button>
            ) : (
              <button onClick={saveToCollection} className="singleArtwork_btn">
                Save to My Collection
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
