import React from "react";
import { Link } from "react-router-dom";
import "./collections.css";

export default function Collections() {
  return (
    <div>
      <h1 className="text-[30px] font-bold py-20 px-10">
        Browse By Collection
      </h1>
      <div className="collections__wrapper">
        <Link to="/collections/victoria-and-albert-museum">
          <section className="collection__card">
            <img
              className="collection__card__img"
              src="./V&ADundee.png"
              alt="A view of the V&A Dundee museum."
            />
            <h2 className="collection_card__title">V&A Dundee Collection</h2>
          </section>
        </Link>

        <Link to="/collections/cleveland-museum-of-art">
          <section className="collection__card">
            <img
              className="collection__card__img"
              src="./Cleveland_Museum_of_Art.jpg"
              alt="A view of The Cleveland Museum of Art."
            />
            <h2 className="collection_card__title">
              The Cleveland Museum of Art Collection
            </h2>
          </section>
        </Link>
      </div>
    </div>
  );
}
