import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";

import PrivateRoute from "./PrivateRoute";
import UnauthorizedPage from "../../pages/commonPages/Unauthorized";
import PageNotFound from "../../pages/commonPages/PageNotFound";
import CommonLoader from "../../components/Loader/CommonLoader";
import UserLayout from "../../layouts/UserLayout";

//Lazy loaded pages
const LandingPage = lazy(() => import("../../pages/userPages/LandingPage"));
const UserLoginPage = lazy(() => import("../../pages/userPages/UserLoginPage"));
const UserRegisterPage = lazy(() =>
  import("../../pages/userPages/UserRegisterPage")
);
const HomePage = lazy(() => import("../../pages/userPages/HomePage"));
const QuizPage = lazy(() => import("../../pages/userPages/QuizPage"));

export const userRouter = createBrowserRouter([
  {
    element: <UserLayout />,
    children: [
      {
        path: "/unauthorized",
        element: <UnauthorizedPage />,
      },
      {
        path: "*", // Wildcard for unmatched routes
        element: <PageNotFound />,
      },
      {
        path: "/",
        element: (
          <Suspense fallback={<CommonLoader />}>
            <LandingPage />
          </Suspense>
        ),
      },
      {
        path: "/login",
        element: (
          <Suspense fallback={<CommonLoader />}>
            <UserLoginPage />
          </Suspense>
        ),
      },
      {
        path: "/register",
        element: (
          <Suspense fallback={<CommonLoader />}>
            <UserRegisterPage />
          </Suspense>
        ),
      },
      {
        path: "/home",
        element: (
          <Suspense fallback={<CommonLoader />}>
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          </Suspense>
        ),
      },
      {
        path: "/quiz/:quizId",
        element: (
          <Suspense fallback={<CommonLoader />}>
            <PrivateRoute>
              <QuizPage />
            </PrivateRoute>
          </Suspense>
        ),
      },
    ],
  },
]);
