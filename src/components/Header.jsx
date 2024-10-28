import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AlignJustify } from "lucide-react";
import { RiCloseLargeFill } from "react-icons/ri";
import { useAuth } from "@/contexts/AuthContext";

export default function Header() {
  const [isActive, setIsActive] = useState(false);
  const { userLoggedIn } = useAuth();

  return (
    <header className="bg-zinc-200 py-1.5 shadow-sm">
      <nav className="flex justify-between text-zinc-950 px-6 md:px-20 items-center shadow-sm">
        <Link to="/">
          <img
            src="/logo.svg"
            width={100}
            height={100}
            alt="Exhibition Curator Logo"
            className="cursor-pointer hover:scale-105 transition-all"
            aria-label="go home"
          />
        </Link>

        <menu className="list-none space-x-4 items-center justify-center hidden md:flex ">
          <li>
            <Link
              className="font-medium hover:scale-105 transition-all cursor-pointer py-1.5 px-4 hover:text-black inline-block"
              to="/"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              className="font-medium hover:scale-105 transition-all cursor-pointer py-1.5 px-4 hover:text-black inline-block"
              to="/collections"
            >
              Collections
            </Link>
          </li>
          <li>
            <Link
              className="font-medium hover:scale-105 transition-all cursor-pointer py-1.5 px-4  hover:text-black inline-block"
              to="/my-collection"
            >
              My Collection
            </Link>
          </li>
          {userLoggedIn ? (
            <>
              <li>
                <Link
                  className="font-medium hover:scale-105 transition-all cursor-pointer py-1.5 px-4  hover:text-black inline-block"
                  to="/my-profile"
                >
                  Profile
                </Link>
              </li>

              <li>
                <Link
                  className="font-medium hover:scale-105 transition-all cursor-pointer py-1.5 px-4  hover:text-black inline-block"
                  to="/curated-exhibition"
                >
                  Curated Exhibition
                </Link>
              </li>
            </>
          ) : (
            <li>
              <Link
                className="font-medium hover:scale-105 transition-all cursor-pointer py-1.5 px-4  hover:text-black inline-block"
                to="/login"
              >
                Login
              </Link>
            </li>
          )}
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
        <menu className="md:hidden flex flex-col list-none space-y-4 text-black mt-4">
          <Link
            to="/"
            className="hover:bg-gray-100 py-1.5 px-4 cursor-pointer hover:text-black inline-block transition-all"
          >
            <li>Home</li>
          </Link>
          <Link
            to="/collections"
            className="hover:bg-gray-100 py-1.5 px-4 cursor-pointer hover:text-black inline-block transition-all"
          >
            <li>Collections</li>
          </Link>

          <Link
            to="/my-collection"
            className="hover:bg-gray-100 py-1.5 px-4 cursor-pointer hover:text-black inline-block transition-all"
          >
            <li>My Collection</li>
          </Link>
          {userLoggedIn ? (
            <>
              <Link
                to="/my-profile"
                className="hover:bg-gray-100 py-1.5 px-4 cursor-pointer hover:text-black inline-block transition-all"
              >
                <li>Profile</li>
              </Link>

              <Link
                to="/curated-exhibition"
                className="hover:bg-gray-100 py-1.5 px-4 cursor-pointer hover:text-black inline-block transition-all"
              >
                <li>Curated Exhibition</li>
              </Link>
            </>
          ) : (
            <Link
              to="/login"
              className="hover:bg-gray-100 py-1.5 px-4 cursor-pointer hover:text-black inline-block transition-all"
            >
              <li>Login</li>
            </Link>
          )}
        </menu>
      )}
    </header>
  );
}
