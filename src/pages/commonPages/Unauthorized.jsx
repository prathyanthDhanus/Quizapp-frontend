import React from "react";
import unAuthImage from "../../assets/images/rb_19591.png";

const UnauthorizedPage = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center p-4">
      <img
        src={unAuthImage}
        alt="Unauthorized"
        className="max-w-full h-auto mb-4 sm:max-w-xs md:max-w-md lg:max-w-lg"
      />
      <h1 className="text-3xl poppins-bold text-center text-red-600 mb-4">
        Unauthorized
      </h1>
      <p className="text-center text-lg text-gray-700 poppins-semibold">
        You are not authorized to access this page.
      </p>
    </div>
  );
};

export default UnauthorizedPage;
