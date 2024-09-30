import React, { useState } from "react";

export default function Search({ setSearchParams, query }) {
  const [newSearchQuery, setNewSearchQuery] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    setSearchParams((currSearch) => {
      currSearch.delete("page");
      currSearch.set("query", newSearchQuery);
      return currSearch;
    });
  }

  function clearSearch(e) {
    setSearchParams((currSearch) => {
      currSearch.delete("page");
      currSearch.delete("query");
      return currSearch;
    });
  }

  const showClearQuery = query ? (
    <div>
      <button aria-label="clear search query" onClick={clearSearch}>
        Clear results for {query}
      </button>
    </div>
  ) : null;

  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          id="search"
          aria-label="search box"
          type="text"
          value={newSearchQuery}
          placeholder="search art collections here..."
          onChange={(e) => setNewSearchQuery(e.target.value)}
          required
        ></input>
        <button aria-label="submit search">Search</button>
      </form>
      {showClearQuery}
    </div>
  );
}
