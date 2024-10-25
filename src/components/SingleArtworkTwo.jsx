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
            "Connection Error, please check your connection and try again later."
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
      <div className="mt-2">
        <Button
          onClick={() => navigate(-1)}
          variant="link"
          aria-label="back to previous page"
        >
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

          <section style={{ flex: "1 1 50%" }}>
            <h1 className="singleArtwork_largeHeading">{artwork.title}</h1>

            {artwork.culture[0] && (
              <p className="singleArtwork_subHeading">{artwork.culture[0]}</p>
            )}

            {artwork.creators && artwork.creators[0] ? (
              <section className="singleArtwork_margins">
                <h2 className="singleArtwork_medHeading">Artist</h2>
                <p>
                  {artwork.creators
                    .map((creator) => creator.description)
                    .join(", ")}
                </p>
              </section>
            ) : (
              <section className="singleArtwork_margins">
                <h2 className="singleArtwork_medHeading">Artist</h2>
                <p>Unknown Artist</p>
              </section>
            )}

            {artwork.creation_date && (
              <section className="singleArtwork_margins">
                <h2 className="singleArtwork_medHeading">Date</h2>
                <p>{artwork.creation_date}</p>
              </section>
            )}

            {artwork.technique && (
              <section className="singleArtwork_margins">
                <h2 className="singleArtwork_medHeading">
                  Materials and Techniques
                </h2>
                <p>{artwork.technique}</p>
              </section>
            )}

            {artwork.measurements && (
              <section className="singleArtwork_margins">
                <h2 className="singleArtwork_medHeading">Dimensions</h2>
                <p>{artwork.measurements}</p>
              </section>
            )}

            {artwork.collection && (
              <section className="singleArtwork_margins">
                <h2 className="singleArtwork_medHeading"> Collection</h2>
                <p> {artwork.collection}</p>
              </section>
            )}

            {artwork.description && (
              <section className="singleArtwork_margins">
                <h2 className="singleArtwork_medHeading">Description</h2>
                <p dangerouslySetInnerHTML={{ __html: artwork.description }} />
              </section>
            )}

            {artwork.did_you_know && (
              <div className="singleArtwork_margins">
                <Collapsible className="w-[350px] space-y-2">
                  <CollapsibleTrigger className="flex items-center justify-between hover:text-[#3b82f6]">
                    <h3 className="text-sm font-semibold">View More Details</h3>
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
              <section className="singleArtwork_margins">
                <h2 className="singleArtwork_medHeading">Location</h2>
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
              </section>
            ) : (
              <section className="singleArtwork_margins">
                <h2 className="singleArtwork_medHeading">Location</h2>
                <p>No Longer on Display. </p>
                <p>
                  View more details at
                  <Link to={artwork.url} target="_blank">
                    <Button aria-hidden variant="link">
                      clevelandart.org
                    </Button>
                  </Link>
                </p>
              </section>
            )}

            {isInCollection ? (
              <button
                onClick={removeFromCollection}
                className="singleArtwork_btn"
                aria-label="remove artwork from My Collection"
              >
                Remove from My Collection
              </button>
            ) : (
              <button
                onClick={saveToCollection}
                className="singleArtwork_btn"
                aria-label="add artwork to My Collection"
              >
                Save to My Collection
              </button>
            )}
          </section>
        </div>
      )}
    </div>
  );
}
