import React from "react";
import { Link } from "react-router-dom";

const Header = ({ active, setActive }) => {
  return (
    <header>
      <nav className="bg-white w-[1200px] mx-auto shadow-xl rounded-l-xl rounded-r-xl py-5 pl-5 flex items-center justify-between border-t-4 border-cyan-600 mt-3 sticky top-0">
        <h1 className="text-lg font-semibold">Yo-Blog</h1>
        <ul className="flex items-center">
          <Link
            to="/"
            className={`mx-5 ${
              active === "home" ? "text-cyan-500 underline" : ""
            }`}
            onClick={() => setActive("home")}
          >
            Home
          </Link>
          <Link
            to="/create"
            className={`mx-5 ${
              active === "create" ? "text-cyan-500 underline" : ""
            }`}
            onClick={() => setActive("create")}
          >
            Create
          </Link>
          <Link
            to="/about"
            className={`mx-5 ${
              active === "about" ? "text-cyan-500 underline" : ""
            }`}
            onClick={() => setActive("about")}
          >
            About
          </Link>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
