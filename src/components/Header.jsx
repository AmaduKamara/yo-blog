import React from "react";
import { Link } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";

const Header = ({ active, setActive, user, handleLogOut }) => {
  const userId = user?.uid;
  const userName = user?.displayName.split(" ");

  return (
    <header>
      <nav className="bg-white w-[1200px] mx-auto shadow-xl rounded-l-xl rounded-r-xl py-5 pl-5 flex items-center justify-between border-t-4 border-cyan-600 mt-3 sticky top-0">
        <h1 className="text-lg font-semibold">Yo-Blog</h1>
        <ul className="flex items-center">
          <li>
            <Link
              to="/"
              className={`mx-5 ${
                active === "home" ? "text-cyan-500 underline" : ""
              }`}
              onClick={() => setActive("home")}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/create"
              className={`mx-5 ${
                active === "create" ? "text-cyan-500 underline" : ""
              }`}
              onClick={() => setActive("create")}
            >
              Create
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className={`mx-5 ${
                active === "about" ? "text-cyan-500 underline" : ""
              }`}
              onClick={() => setActive("about")}
            >
              About
            </Link>
          </li>
          <ul className="flex items-center mx-5">
            {userId ? (
              <>
                <li className="flex items-center mr-6">
                  <span className="border rounded-full p-3 mr-3">
                    <FaUserAlt className="text-gray-600" />
                  </span>
                  <span className="font-semibold">{userName[0]}</span>
                </li>
                <li onClick={handleLogOut} className="cursor-pointer">
                  Logout
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    to="/auth"
                    className={`${
                      active === "signin" ? "text-cyan-500 underline" : ""
                    }`}
                    onClick={() => setActive("signin")}
                  >
                    Signin
                  </Link>
                </li>
              </>
            )}
          </ul>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
