import { createBrowserRouter, Navigate } from "react-router-dom";
import RootLayout from "@/layouts/RootLayout";
import Gamification from "@/pages/Gamification";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Navigate to="/gamification" replace /> },
      { path: "gamification", element: <Gamification /> },
      { path: "*", element: <Navigate to="/gamification" replace /> },
    ],
  },
]);
