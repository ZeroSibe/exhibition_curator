import React, { useEffect, useState } from "react";
import { collectionTwoAPI } from "../utils/api";
import { useSearchParams } from "react-router-dom";
import Search from "./Search";
import ArtCollectionTwoCard from "./ArtCollectionTwoCard";
import PageControl from "./PageControl";
import "./ArtCollection.css";
import LoadingSpinner from "./LoadingSpinner";
import { AlertDestructive } from "./AlertDestructive";

export default function ArtlistCollectionTwo() {
  const [artLists, setArtLists] = useState([]);
  const [records, setRecords] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [msg, setMsg] = useState("");
  const [pageTotal, setPageTotal] = useState(1);
  let [searchParams, setSearchParams] = useSearchParams();
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
          setMsg("No artwork found for given search query");
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
      <h2>The Cleveland Museum of Art Collections</h2>
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
                <p>{msg}</p>
              ) : (
                query && (
                  <p>
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
