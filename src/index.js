import React from "react";
import HigherLowerGamePage from "./pages/HigherLowerGamePage";
import MoveSetGamePage from "./pages/MoveSetGamePage";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HigherLowerGamePage />,
  },
  {
    path: "/movesetgame",
    element: <MoveSetGamePage />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<RouterProvider router={router} />);