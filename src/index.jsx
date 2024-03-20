import React from "react";
import HigherLowerGamePage from "./pages/HigherLowerGamePage";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MovesetGamePage from "./pages/MoveSetGamePage";
import GuessThePokemonPage from "./pages/GuessThePokemonPage";
import LandingPage from "./pages/LandingPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import Leaderboards from "./pages/Leaderboards";

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
  {
    path: "/leaderboards",
    element: <Leaderboards />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<RouterProvider router={router} />);
