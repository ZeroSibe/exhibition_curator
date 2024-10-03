import React from "react";
import { Link } from "react-router-dom";

export default function Collections() {
  return (
    <div>
      <h2>Browse By Collection</h2>
      <section>
        <h3>
          <Link to="/collections/victoria-and-albert-museum">
          V&A Dundee
          </Link>
        </h3>
      </section>

      <section>
        <h3>
            <Link to="/collections/cleveland-museum-of-art">
            The Cleveland Museum of Art
            </Link>
            </h3>
      </section>
    </div>
  );
}
