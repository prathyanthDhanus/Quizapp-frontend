import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/rb_52818.png";

const UserNavbar = () => {
  const navigate = useNavigate();

  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  const handleNavbarToggle = () => {
    setIsNavbarOpen((prev) => !prev);
  };

  return (
    <nav className="bg-white border-gray-200 dark:bg-[#EBEBEB] dark:border-gray-700 ">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <div
          className="flex items-center space-x-3 rtl:space-x-reverse cursor-pointer "
          onClick={() => navigate("/")}
        >
          <img src={logo} alt="logo" className="w-6" />
          <span className="text-xl poppins-semibold">Quiz App</span>
        </div>

        <button
          onClick={handleNavbarToggle}
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-black rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-expanded={isNavbarOpen}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
            aria-hidden="true"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>

        <div
          className={`${
            isNavbarOpen ? "block" : "hidden"
          } w-full md:block md:w-auto`}
          id="navbar-dropdown"
        >
          <ul className="flex flex-col poppins-light p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-[#EBEBEB] md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-[#EBEBEB]">
            <li>
              <button
                onClick={() => navigate("/")}
                className="block py-2 px-3 text-black rounded md:bg-transparent md:p-0 dark:text-black"
                aria-current="page"
              >
                Home
              </button>
            </li>
            <li>
              <button
                onClick={() => navigate("/")}
                className="block py-2 px-3 text-black rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0 dark:text-black"
              >
                About
              </button>
            </li>
            <li>
              <button
                onClick={() => navigate("/")}
                className="block py-2 px-3 text-black rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0 dark:text-black"
              >
                Services
              </button>
            </li>
            <li>
              <button
                onClick={() => navigate("/")}
                className="block py-2 px-3 text-black rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0 dark:text-black"
              >
                Pricing
              </button>
            </li>
            <li>
              <button
                onClick={() => navigate("/login")}
                className="block py-2 px-3 text-customLightBlue rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0 "
              >
                Login
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default UserNavbar;
