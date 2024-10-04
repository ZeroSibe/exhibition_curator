import React from "react";
import styles from "./Header.module.css";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header>
      <nav>
        <Link to="/">
          <img
            src="/logo.svg"
            width={100}
            height={100}
            alt="Exhibition Curator"
          />
        </Link>

        <menu>
          <Link to="/collections">Collections</Link>
          <Link to="/my-collection"> My Collection</Link>
          <Link to="/login">Login</Link>
        </menu>
      </nav>
    </header>
  );
}
