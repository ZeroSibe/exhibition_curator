import React, { useEffect, useState } from "react";
import { collectionOneAPI } from "../utils/api";
import { useSearchParams } from "react-router-dom";
import Search from "./Search";
import ArtCollectionOneCard from "./ArtCollectionOneCard";
import PageControl from "./PageControl";

export default function ArtlistCollectionOne() {
  const [artLists, setArtLists] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pageTotal, setPageTotal] = useState(1);
  const [msg, setMsg] = useState("");
  let [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const page = Number(searchParams.get("page")) || 1;
  const itemsPerPage = 15;

  //   infor.page 1 of  info.pages 665
  //{info: {…}, records: Array(15), clusters: {…}}

  useEffect(() => {
    setIsLoading(true);
    setMsg("");
    collectionOneAPI
      .get(
        `/objects/search?q=${query}&page_size=${itemsPerPage}&page=${page}&images_exist=1`
      )
      .then(({ data }) => {
        const records = data.records;
        let totalPages = data.info.pages;
        if (records.length === 0) {
          setArtLists([]);
          setMsg("No artwork found for given search query");
          setIsLoading(false);
          setPageTotal(0);
        } else {
          setArtLists(records);
          setPageTotal(totalPages);
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
      <h2>Victoria and Albert Museum</h2>
      {isLoading ? (
        <div>...Loading</div>
      ) : (
        <div>
          <Search setSearchParams={setSearchParams} query={query} />
          <p>
            showing page {page} of {pageTotal}
          </p>
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
