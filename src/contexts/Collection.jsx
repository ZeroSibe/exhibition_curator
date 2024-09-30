import { createContext, useEffect, useState, useMemo } from "react";

export const CollectionContext = createContext();

export const CollectionProvider = ({ children }) => {
  const [collection, setCollection] = useState(() => {
    const storedCollection = localStorage.getItem("myCollection");
    return storedCollection ? JSON.parse(storedCollection) : [];
  });

  useEffect(() => {
    localStorage.setItem("myCollection", JSON.stringify(collection));
  }, [collection]);

  const value = useMemo(() => ({ collection, setCollection }), [collection]);

  return (
    <CollectionContext.Provider value={value}>
      {children}
    </CollectionContext.Provider>
  );
};
