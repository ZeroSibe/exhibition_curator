import React from "react";
import { Link } from "react-router-dom";
import "./collections.css";

export default function Collections() {
  return (
    <div>
      <h2>Browse By Collection</h2>
      <div className="collections__wrapper">
        <Link to="/collections/victoria-and-albert-museum">
          <section className="collection__card">
            <img
              className="collection__card__img"
              src="./V&ADundee.png"
              alt="A view of the V&A Dundee museum looking like the ribbed carcass of a beached whale in the night sky."
            />
            <h3 className="collection_card__title">V&A Dundee Collection</h3>
          </section>
        </Link>

        <Link to="/collections/cleveland-museum-of-art">
          <section className="collection__card">
            <img
              className="collection__card__img"
              src="./Cleveland_Museum_of_Art.jpg"
              alt="View of The Cleveland Museum of Art from the steps of the Euclid Avenue entrance to Wade Park, overlooking the Lagoon."
            />
            <h3 className="collection_card__title">
              The Cleveland Museum of Art Collection
            </h3>
          </section>
        </Link>
      </div>
    </div>
  );
}
