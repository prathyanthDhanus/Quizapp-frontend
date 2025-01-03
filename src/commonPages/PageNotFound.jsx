import React from "react";
import pageNotFoundImage from "../../assets/images/freepik__a-young-woman-with-short-dark-hair-standing-next-t__5392.jpeg";
import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex flex-col items-center justify-center p-4">
      <img
        src={pageNotFoundImage}
        alt="Page Not Found"
        className="max-w-full h-auto mb-4 sm:max-w-xs md:max-w-md lg:max-w-lg"
      />
      <h1 className="text-4xl poppins-bold text-center text-red-600 mb-4">
        Page Not Found
      </h1>
      <p className="text-center text-lg text-gray-700 mb-4 poppins-semibold">
        The page you are looking for might have been moved or no longer exists.
      </p>
      <button
        onClick={() => navigate("/")}
        className="text-center text-blue-500 hover:underline text-xl poppins-regular"
      >
        Go back to the homepage
      </button>
    </div>
  );
};

export default PageNotFound;
