import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getArtworkTwoById } from "../utils/api";
import ImageSlider from "./ImageSlider";
import { getImageUrls } from "../utils/utils";
import { CollectionContext } from "../contexts/Collection";
import { useToast } from "@/hooks/use-toast";
import { AlertDestructive } from "./AlertDestructive";
import LoadingSpinner from "./LoadingSpinner";
import { Button } from "@/components/ui/button";
import { IoIosArrowBack } from "react-icons/io";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { HiMiniChevronUpDown } from "react-icons/hi2";

import "./SingleArtwork.css";

export default function SingleArtworkTwo() {
  const { artwork_id } = useParams();
  const [artwork, setArtwork] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [imageUrls, setImageUrls] = useState([]);
  const { collection, setCollection } = useContext(CollectionContext);
  const { toast } = useToast();

  const isInCollection = collection.some(
    (item) => Number(item.artwork.id) === Number(artwork_id)
  );

  const saveToCollection = () => {
    if (!isInCollection) {
      setCollection([...collection, { artwork, collection_type: "two" }]);
      toast({
        title: "Added to My Collection",
        description: `${
          artwork?.title || "This Artwork"
        } has been added to your temporary collection`,
      });
    }
  };

  const removeFromCollection = () => {
    setCollection(
      collection.filter(
        (item) => Number(item.artwork.id) !== Number(artwork_id)
      )
    );
    toast({
      title: "Removed from My Collection",
      description: `${
        artwork?.title || "This Artwork"
      } has been removed from your temporary collection`,
    });
  };

  useEffect(() => {
    setError(null);
    setIsLoading(true);
    setImageUrls([]);
    setArtwork({});
    getArtworkTwoById(artwork_id)
      .then(({ data }) => {
        const artwork = data.data;
        setArtwork(artwork);
        const imageUrls = getImageUrls(artwork);
        setImageUrls(imageUrls);
        setIsLoading(false);
      })
      .catch((err) => {
        if (err.response) {
          if (err.response.status === 404) {
            setError("Artwork not found");
          } else if (error.response.status === 500) {
            setError("Server error, please try again later.");
          } else {
            setError("Could not load artwork, please try again");
          }
        } else if (err.request) {
          setError(
            "Connection Error, please check your connection and try again."
          );
        } else {
          setError("Something went wrong...please try again later.");
        }
        setIsLoading(false);
      });
  }, [artwork_id]);

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
          <div
            style={{
              flex: "1 1 50%",
              maxWidth: "600px",
            }}
          >
            <ImageSlider imageUrls={imageUrls} alt={artwork.title} />
          </div>

          <div style={{ flex: "1 1 50%" }}>
            <h2 className="singleArtwork_largeHeading">{artwork.title}</h2>

            {artwork.culture[0] && (
              <p className="singleArtwork_subHeading">{artwork.culture[0]}</p>
            )}

            {artwork.creators && artwork.creators[0] ? (
              <div className="singleArtwork_margins">
                <h3 className="singleArtwork_medHeading">Artist</h3>
                <p>
                  {artwork.creators
                    .map((creator) => creator.description)
                    .join(", ")}
                </p>
              </div>
            ) : (
              <div className="singleArtwork_margins">
                <h3 className="singleArtwork_medHeading">Artist</h3>
                <p>Unknown Artist</p>
              </div>
            )}

            {artwork.creation_date && (
              <div className="singleArtwork_margins">
                <h3 className="singleArtwork_medHeading">Date</h3>
                <p>{artwork.creation_date}</p>
              </div>
            )}

            {artwork.technique && (
              <div className="singleArtwork_margins">
                <h3 className="singleArtwork_medHeading">
                  Materials and Techniques
                </h3>
                <p>{artwork.technique}</p>
              </div>
            )}

            {artwork.measurements && (
              <div className="singleArtwork_margins">
                <h3 className="singleArtwork_medHeading">Dimensions</h3>
                <p>{artwork.measurements}</p>
              </div>
            )}

            {artwork.collection && (
              <div className="singleArtwork_margins">
                <h3 className="singleArtwork_medHeading"> Collection</h3>
                <p> {artwork.collection}</p>
              </div>
            )}

            {artwork.description && (
              <div className="singleArtwork_margins">
                <h3 className="singleArtwork_medHeading">Description</h3>
                <p dangerouslySetInnerHTML={{ __html: artwork.description }} />
              </div>
            )}

            {artwork.did_you_know && (
              <div className="singleArtwork_margins">
                <Collapsible className="w-[350px] space-y-2">
                  <CollapsibleTrigger className="flex items-center justify-between hover:text-[#3b82f6]">
                    <h4 className="text-sm font-semibold">View More Details</h4>
                    <HiMiniChevronUpDown className="w-5 h-5" />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="space-y-2">
                    <p
                      dangerouslySetInnerHTML={{
                        __html: artwork.did_you_know,
                      }}
                    />
                  </CollapsibleContent>
                </Collapsible>
              </div>
            )}

            {artwork.current_location ? (
              <div className="singleArtwork_margins">
                <h3 className="singleArtwork_medHeading">Location</h3>
                <p>
                  On display at {artwork.current_location}, 11150 East Blvd,
                  Cleveland, OH 44106, United States.{" "}
                </p>
                <p>
                  View more details at
                  <Link to={artwork.url} target="_blank">
                    <Button variant="link">clevelandart.org</Button>
                  </Link>
                </p>
              </div>
            ) : (
              <div className="singleArtwork_margins">
                <h3 className="singleArtwork_medHeading">Location</h3>
                <p>No Longer on Display. </p>
                <p>
                  View more details at
                  <Link to={artwork.url} target="_blank">
                    <Button variant="link">clevelandart.org</Button>
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
