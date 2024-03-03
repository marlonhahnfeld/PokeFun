import React from "react";
import Sidenavigation from "../components/Sidenavigation";
import "../styles/LandingPage.css";
import LPCard from "../components/LPCard";

const LandingPage = () => {
  return (
    <div className="page_lp">
      <div className="side-navigation_lp">
        <Sidenavigation />
      </div>
      <div className="right-container_lp">
        <div className="top-container_lp">
          <p>Placeholder</p>
        </div>
        <div className="mid-container_lp">
          <LPCard
            title="Higher Lower"
            description="2 Pokemons are shown, guess which one has higher total stats!"
            image="../resources/logo1.jpg"
          />
          <LPCard
            title="Moveset Game"
            description="Guess which of 3 Pokemons is using a specific move! Maybe even all 3 know it."
            image="../resources/logo2.jpg"
          />
          <LPCard
            title="Guess the Pokemon"
            description="Guess the Pokemon and find similarities! The fewer guesses, the better."
            image="../resources/logo3.jpg"
          />
          <LPCard
            title="Placeholder"
            description="Placeholder Placeholder Placeholder Placeholder Placeholder Placeholder!"
            image="../resources/logo4.jpg"
          />
        </div>
        <div className="bottom-container_lp">
          <p>Placeholder</p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
