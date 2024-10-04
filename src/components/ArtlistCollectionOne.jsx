import React, { useEffect, useState } from "react";
import { collectionOneAPI } from "../utils/api";
import { useSearchParams } from "react-router-dom";
import Search from "./Search";
import ArtCollectionOneCard from "./ArtCollectionOneCard";
import PageControl from "./PageControl";

export default function ArtlistCollectionOne() {
  const [artLists, setArtLists] = useState([]);
  const [records, setRecords] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pageTotal, setPageTotal] = useState(1);
  const [msg, setMsg] = useState("");
  let [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const page = Number(searchParams.get("page")) || 1;
  const itemsPerPage = 15;

  useEffect(() => {
    setError("");
    setIsLoading(true);
    setMsg("");
    collectionOneAPI
      .get(
        `/objects/search?q=${query}&page_size=${itemsPerPage}&page=${page}&images_exist=1&on_display_at=dundee`
      )
      .then(({ data }) => {
        console.log(data);
        const artworks = data.records;
        let totalPages = data.info.pages;
        const artworkCount = data.info.record_count;
        if (artworks.length === 0) {
          setArtLists([]);
          setMsg("No artwork found for given search query");
          setIsLoading(false);
          setRecords(artworkCount);
          setPageTotal(0);
        } else {
          setArtLists(artworks);
          setPageTotal(totalPages);
          setRecords(artworkCount);
          setMsg("");
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
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
          {query ? (
            <p>
              {records} matches for {query}
            </p>
          ) : null}
          <ul>
            {artLists.map((artwork) => {
              return (
                <li key={artwork.systemNumber}>
                  <ArtCollectionOneCard artwork={artwork} />
                </li>
              );
            })}
          </ul>
          {pageTotal > 0 ? (
            <PageControl
              page={page}
              setSearchParams={setSearchParams}
              pageTotal={pageTotal}
            />
          ) : (
            <p>{msg}</p>
          )}
        </div>
      )}
    </div>
  );
}
