import React, { useEffect, useState } from "react";
import { collectionTwoAPI } from "../utils/api";
import { useSearchParams } from "react-router-dom";
import Search from "./Search";
import ArtCollectionTwoCard from "./ArtCollectionTwoCard";
import PageControl from "./PageControl";

export default function ArtlistCollectionTwo() {
  const [artLists, setArtLists] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pageTotal, setPageTotal] = useState(1);
  const [msg, setMsg] = useState("");
  let [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const page = Number(searchParams.get("page")) || 1;
  const itemsPerPage = 15;

  //   image filtered
  //{info: {…}, records: Array(15), clusters: {…}}
  //showing page 1 of 10 pageTotal

  useEffect(() => {
    setError("");
    setIsLoading(true);
    setMsg("");
    collectionTwoAPI
      .get(
        `/?q=${query}&limit=${itemsPerPage}&has_image=1&skip=${
          (page - 1) * itemsPerPage
        }`
      )
      .then(({ data }) => {
        console.log(data);
        const totalArtwork = data.info.total;
        const artworks = data.data;

        if (totalArtwork === 0) {
          setArtLists([]);
          setMsg("No artwork found for given search query");
          setIsLoading(false);
          setPageTotal(0);
        } else {
          setArtLists(artworks);
          setPageTotal(Math.ceil(totalArtwork / itemsPerPage));
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
      <h2>The Cleveland Museum of Art Collections</h2>
      {isLoading ? (
        <div>Loading... </div>
      ) : (
        <div>
          <Search setSearchParams={setSearchParams} query={query} />
          <p>
            showing page {page} of {pageTotal}
          </p>

          <ul>
            {artLists.map((artwork) => {
              return (
                <li key={artwork.id}>
                  <ArtCollectionTwoCard artwork={artwork} />
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
