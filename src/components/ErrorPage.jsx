import React from "react";
import { Link } from "react-router-dom";
import "./ErrorPage.css";

export default function ErrorPage() {
  return (
    <div className="error_container">
      <h2 className="error_title">Page Not Found</h2>
      <p className="error_text">
        Sorry, we couldn't find this page. But don't worry, you can find plenty
        of other things in our
        <Link to={`/`} className="error_link">
          {" "}
          homepage.
        </Link>
      </p>
    </div>
  );
}
