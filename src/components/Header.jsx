import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AlignJustify } from "lucide-react";
import { RiCloseLargeFill } from "react-icons/ri";

export default function Header() {
  const [isActive, setIsActive] = useState(false);
  return (
    <header className="bg-blue-500 py-1.5 shadow-sm">
      <nav className="flex justify-between text-white px-6 md:px-20 items-center shadow-sm">
        <Link to="/">
          <img
            src="/logo.svg"
            width={100}
            height={100}
            alt="Exhibition Curator"
            className="cursor-pointer hover:scale-105 transition-all"
            aria-label="click logo to go home"
          />
        </Link>

        <menu className="space-x-4 items-center justify-center hidden md:block ">
          <Link
            className="font-medium hover:scale-105 transition-all cursor-pointer py-1.5 px-4 hover:text-black"
            to="/"
          >
            Home
          </Link>
          <Link
            className="font-medium hover:scale-105 transition-all cursor-pointer py-1.5 px-4 hover:text-black"
            to="/collections"
          >
            Collections
          </Link>
          <Link
            className="font-medium hover:scale-105 transition-all cursor-pointer py-1.5 px-4  hover:text-black"
            to="/my-collection"
          >
            My Collection
          </Link>
          <Link
            className="font-medium hover:scale-105 transition-all cursor-pointer py-1.5 px-4  hover:text-black"
            to="/login"
          >
            Login
          </Link>
        </menu>

        <button
          onClick={() => setIsActive(true)}
          className={`${isActive ? "hidden" : "block"} md:hidden`}
          aria-label="open navigation menu"
        >
          <AlignJustify aria-hidden />
        </button>
        <button
          onClick={() => setIsActive(false)}
          className={`${isActive ? "block" : "hidden"} md:hidden`}
          aria-label="close navigation menu"
        >
          <RiCloseLargeFill aria-hidden />
        </button>
      </nav>
      {isActive && (
        <menu className="md:hidden flex flex-col space-y-4 text-white mt-4">
          <Link
            className="hover:bg-blue-600 py-1.5 px-4 cursor-pointer  hover:text-black"
            to="/"
          >
            Home
          </Link>
          <Link
            className="hover:bg-blue-600 py-1.5 px-4 cursor-pointer  hover:text-black"
            to="/collections"
          >
            Collections
          </Link>
          <Link
            className="hover:bg-blue-600 py-1.5 px-4 cursor-pointer  hover:text-black"
            to="/my-collection"
          >
            My Collection
          </Link>
          <Link
            className="hover:bg-blue-600 py-1.5 px-4 cursor-pointer  hover:text-black"
            to="/login"
          >
            Login
          </Link>
        </menu>
      )}
    </header>
  );
}
