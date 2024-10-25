import React, { useEffect, useState } from "react";
import { collectionOneAPI } from "../utils/api";
import { useNavigate, useSearchParams } from "react-router-dom";
import Search from "./Search";
import ArtCollectionOneCard from "./ArtCollectionOneCard";
import PageControl from "./PageControl";
import "./ArtCollection.css";
import LoadingSpinner from "./LoadingSpinner";
import { AlertDestructive } from "./AlertDestructive";
import { Button } from "@/components/ui/button";
import { IoIosArrowBack } from "react-icons/io";

export default function ArtlistCollectionOne() {
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
          setMsg("No Results Found");
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
          setError(
            "Failed to load the V&A Dundee collections. Please try again later."
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

      <h1 className="text-[30px] font-bold py-20 px-10">
        V&A Dundee Collections
      </h1>
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
                    <li key={artwork.systemNumber}>
                      <ArtCollectionOneCard artwork={artwork} />
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
