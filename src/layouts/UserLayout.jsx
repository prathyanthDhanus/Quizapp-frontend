import React from "react";
import { Outlet, useLocation } from "react-router-dom";

import UserNavbar from "../components/navbar/UserNavbar";
import UserFooter from "../components/footer/userFooter";

const UserLayout = () => {
  const location = useLocation();
  // Hide navbar and footer for these routes
  const hideNavbarFooter = ["/login", "/register"].includes(location.pathname);

  return (
    <>
      <div className="min-h-screen flex flex-col">
        {!hideNavbarFooter && <UserNavbar />}
        <main className="flex-1">
          <Outlet />
        </main>
        {!hideNavbarFooter && <UserFooter />}
      </div>
    </>
  );
};

export default UserLayout;
