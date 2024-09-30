import React from "react";
import ReactDOM from "react-dom/client";
import { StrictMode } from "react";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { CollectionProvider } from "./contexts/Collection.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <CollectionProvider>
        <App />
      </CollectionProvider>
    </BrowserRouter>
  </StrictMode>
);
