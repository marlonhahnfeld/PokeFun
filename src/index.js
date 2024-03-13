import React from "react";
import HigherLowerGamePage from "./pages/HigherLowerGamePage";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MovesetGamePage from "../src/pages/MoveSetGamePage";
import GuessThePokemonPage from "../src/pages/GuessThePokemonPage";
import LandingPage from "./pages/LandingPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";

const router = createBrowserRouter([
  {
    path: "/higherorlower",
    element: <HigherLowerGamePage />,
  },
  {
    path: "/movesetgame",
    element: <MovesetGamePage />,
  },
  {
    path: "/guessthepokemon",
    element: <GuessThePokemonPage />,
  },
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<RouterProvider router={router} />);
