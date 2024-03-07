import React from "react";
import "../styles/LandingPage.css";
import LPCard from "../components/LPCard";
//import Typography from "@mui/material/Typography";
//import Grow from "@mui/material/Grow";
import { Link } from "react-router-dom";
import TopNav from "../components/LPHeader";

const LandingPage = () => {
  return (
    <div className="page_lp">
      <div className="right-container_lp">
        <div className="top-container_lp">
          <TopNav></TopNav>{" "}
        </div>
        <div className="mid-container_lp">
          <Link to="/HigherOrLower">
            <LPCard
              title="Higher Lower"
              description="2 Pokemons are shown, guess which one has higher total stats!"
              image="https://unsplash.it/250/400
            "
            />
          </Link>
          <Link to="/movesetgame">
            <LPCard
              title="Moveset Game"
              description="Guess which of 3 Pokemons is using a specific move! Maybe even all 3 know it."
              image="https://unsplash.it/300/400"
            />
          </Link>
          <Link to="/">
            <LPCard
              title="Guess the Pokemon (soon)"
              description="Guess the Pokemon and find similarities! The fewer guesses, the better."
              image="https://unsplash.it/400/400"
            />
          </Link>
          <Link to="/">
            <LPCard
              title="Pokemon Lookup (soon)"
              description="Lookup any Pokemon and find out stuff you never knew."
              image="https://unsplash.it/450/400"
            />
          </Link>
        </div>
        <div className="bottom-container_lp">
          <p> &copy; Pokefun 2024 </p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
