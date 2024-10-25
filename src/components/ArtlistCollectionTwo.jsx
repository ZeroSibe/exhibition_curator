import React, { useEffect, useState } from "react";
import { collectionTwoAPI } from "../utils/api";
import { useNavigate, useSearchParams } from "react-router-dom";
import Search from "./Search";
import ArtCollectionTwoCard from "./ArtCollectionTwoCard";
import PageControl from "./PageControl";
import "./ArtCollection.css";
import LoadingSpinner from "./LoadingSpinner";
import { AlertDestructive } from "./AlertDestructive";
import { IoIosArrowBack } from "react-icons/io";
import { Button } from "@/components/ui/button";

export default function ArtlistCollectionTwo() {
  const [artLists, setArtLists] = useState([]);
  const [records, setRecords] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [msg, setMsg] = useState("");
  const [pageTotal, setPageTotal] = useState(1);
  let [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get("query") || "";
  const page = Number(searchParams.get("page")) || 1;
  const itemsPerPage = 15;

  useEffect(() => {
    setMsg("");
    setError(null);
    setIsLoading(true);
    collectionTwoAPI
      .get(
        `/?q=${query}&limit=${itemsPerPage}&has_image=1&skip=${
          (page - 1) * itemsPerPage
        }`
      )
      .then(({ data }) => {
        const totalArtwork = data.info.total;
        const artworks = data.data;
        if (totalArtwork === 0) {
          setArtLists([]);
          setMsg("No Results Found");
          setPageTotal(0);
          setRecords(0);
        } else {
          setArtLists(artworks);
          setPageTotal(Math.ceil(totalArtwork / itemsPerPage));
          setRecords(totalArtwork);
          setMsg("");
        }
        setIsLoading(false);
      })
      .catch((err) => {
        if (err.response) {
          setError(
            "Failed to load the Cleveland Museum of Art collections. Please try again later."
          );
        } else if (err.request) {
          setError("Please check your connection and try again.");
        } else {
          setError("Something went wrong...please try again later.");
        }
        setIsLoading(false);
      });
  }, [searchParams]);

  return (
    <div>
      <div className="mt-2">
        <Button
          onClick={() => navigate("/collections")}
          variant="link"
          aria-label="go to Collections"
        >
          <IoIosArrowBack aria-hidden />
          Back to Collections
        </Button>
      </div>
      <h2 className="text-[30px] font-bold py-20 px-10">
        The Cleveland Museum of Art Collections
      </h2>
      {isLoading ? (
        <div className="spinner-container">
          <LoadingSpinner />
        </div>
      ) : (
        <div>
          <Search setSearchParams={setSearchParams} query={query} />

          {error ? (
            <div className="mt-4">
              <AlertDestructive msg={error} />
            </div>
          ) : (
            <div>
              {msg ? (
                <div className="artlist_msg">
                  <h3>{msg}</h3>
                </div>
              ) : (
                query && (
                  <p className="font-bold py-10 px-2">
                    {records > 1
                      ? `${records} matches for ${query}`
                      : `${records} match for ${query}`}
                  </p>
                )
              )}

              <ul className="wrapper">
                {artLists.map((artwork) => {
                  return (
                    <li key={artwork.id}>
                      <ArtCollectionTwoCard artwork={artwork} />
                    </li>
                  );
                })}
              </ul>

              {pageTotal > 0 && (
                <PageControl
                  page={page}
                  setSearchParams={setSearchParams}
                  pageTotal={pageTotal}
                />
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
