import React from "react";
import "../styles/LandingPage.css";
import LPCard from "../components/LPCard";
//import Typography from "@mui/material/Typography";
//import Grow from "@mui/material/Grow";
import { Link } from "react-router-dom";
import TopNav from "../components/LPHeader";
import landingPage_GTP from "../resources/landingPage_GTP.jpg";
import logo1 from "../resources/landingPage_HL.jpg";
import logo2 from "../resources/landingPage_MSG.jpg";

const LandingPage = () => {
  return (
    <div className="page_lp">
      <div className="right-container_lp">
        <div className="top-container_lp">
          <TopNav></TopNav>{" "}
        </div>
        <div className="mid-container_lp">
          <Link to="/higherorlower">
            <LPCard
              title="Higher Lower"
              description="2 Pokemons are shown, guess which one has higher total stats!"
              image={logo1}
            />
          </Link>
          <Link to="/movesetgame">
            <LPCard
              title="Moveset Game"
              description="Guess which of 3 Pokemons is using a specific move! Maybe even all 3 know it."
              image={logo2}
            />
          </Link>
          <Link to="/guessthepokemon">
            <LPCard
              title="Guess the Pokemon"
              description="Guess the Pokemon and find similarities! The fewer guesses, the better."
              image={landingPage_GTP}
            />
          </Link>
          {/* <Link to="/">
            <LPCard
              title="Pokemon Lookup (soon)"
              description="Lookup any Pokemon and find out stuff you never knew."
              image="https://unsplash.it/450/400"
            />
          </Link> */}
        </div>
        <div className="bottom-container_lp">
          <p> &copy; Pokefun 2024 </p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
