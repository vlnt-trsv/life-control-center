import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../App";
import { SignIn } from "@/pages/signIn/ui/SignIn";
import { SignUp } from "@/pages/signUp/ui/SignUp";
import { Main } from "@/pages/main/ui/Main";
import { ProtectedRoute } from "./ProtectedRoute";
import { PublicRoute } from "./PublicRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Navigate to="/main" replace />,
      },
      {
        element: <PublicRoute />,
        children: [
          { path: "signin", element: <SignIn /> },
          { path: "signup", element: <SignUp /> },
        ],
      },
      {
        element: <ProtectedRoute />,
        children: [{ path: "main", element: <Main /> }],
      },
    ],
  },
]);
