import React, { useEffect, useState } from "react";
import { collectionOneAPI } from "../utils/api";
import { useSearchParams } from "react-router-dom";
import Search from "./Search";
import ArtCollectionOneCard from "./ArtCollectionOneCard";
import PageControl from "./PageControl";
import "./ArtCollection.css";

export default function ArtlistCollectionOne() {
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
    collectionOneAPI
      .get(
        `/objects/search?q=${query}&page_size=${itemsPerPage}&page=${page}&images_exist=1&on_display_at=dundee`
      )
      .then(({ data }) => {
        const artworks = data.records;
        let totalPages = data.info.pages;
        const artworkCount = data.info.record_count;

        if (artworks.length === 0) {
          setArtLists([]);
          setMsg("No artwork found for given search query");
          setPageTotal(0);
        } else {
          setArtLists(artworks);
          setPageTotal(totalPages);
          setRecords(artworkCount);
          setMsg("");
        }
        setIsLoading(false);
      })
      .catch((err) => {
        if (err.response) {
          setError("Failed to load the V&A Dundee collections. Please try again later.");
        } else if (err.request) {
          setError(
            "Connection Error, please check your connection and try again."
          );
        } else {
          setError("Something went wrong...please try again later.");
        }
        setIsLoading(false);
      });
  }, [searchParams]);

  return (
    <div>
      <h2>V&A Dundee Collections</h2>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <Search setSearchParams={setSearchParams} query={query} />

          {error ? (
            <div>
              <p>{error}</p>
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
                    <div>
                      <li key={artwork.systemNumber}>
                        <ArtCollectionOneCard artwork={artwork} />
                      </li>
                    </div>
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
