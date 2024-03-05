import React from "react";
import HigherLowerGamePage from "./pages/HigherLowerGamePage";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MovesetGamePage from "../src/pages/MoveSetGamePage";
import GuessThePokemon from "../src/pages/GuessThePokemon";

const router = createBrowserRouter([
  {
    path: "/HigherOrLower",
    element: <HigherLowerGamePage />,
  },
  {
    path: "/movesetgame",
    element: <MovesetGamePage />,
  },
  {
    path: "/GuessThePokemon",
    element: <GuessThePokemon />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<RouterProvider router={router} />);
