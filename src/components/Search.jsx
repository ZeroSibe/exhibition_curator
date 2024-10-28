import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { IoCloseSharp } from "react-icons/io5";


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
    <div className="text-center mt-2  bg-zinc-200 rounded-full p-3  text-zinc-950  hover:bg-zinc-300 cursor-pointer hover:scale-105 transition-all">
      <button
        aria-label="clear search query"
        onClick={clearSearch}
        className="flex gap-1"
      >
        <IoCloseSharp aria-hidden className="mt-1" />
        Clear results for {query}
      </button>
    </div>
  ) : null;

  return (
    <div className="mx-auto flex flex-col w-full justify-center items-center">
      <form
        className="bg-[#eef0fc] flex flex-row text-black items-center shadow-sm gap-1 rounded-full p-2 w-full max-w-md"
        onSubmit={(e) => handleSubmit(e)}
      >
        <input
          className="outline-none md:border-none w-full shadow-none text-lg bg-[#eef0fc] px-4"
          id="search"
          aria-label="search box"
          type="text"
          value={newSearchQuery}
          placeholder="search artworks by name, description..."
          onChange={(e) => setNewSearchQuery(e.target.value)}
          required
        ></input>
        <button aria-label="submit search">
          <CiSearch
            aria-hidden
            className="text-[50px] bg-primary rounded-full p-3 text-white hover:text-black cursor-pointer hover:scale-105 transition-all"
          />
        </button>
      </form>
      {showClearQuery}
    </div>
  );
}
