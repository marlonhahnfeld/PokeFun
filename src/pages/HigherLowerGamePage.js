import React from "react";
import "./HigherLowerPageCSS.css";
import { useState } from "react";
import usePokemonFetch from "../hooks/usePokemonFetch";
import { sumBaseStats } from "../utils/HigherLowerUtil";
import PokemonCard from "../components/PokemonCard";
import Score from "../components/Score";
import { isHigherCardClicked } from "../utils/HigherLowerUtil";

const HigherLowerGamePage = () => {
  const [score, setScore] = useState(0);
  const [roundDone, setRoundDone] = useState(false);
  const [isClickable, setIsClickable] = useState(true);
  const { pokemons, totalStats, setTotalStats } = usePokemonFetch(roundDone, 2);
  const [lastFetchTime, setLastFetchTime] = useState(0);

  const handleClickCard = (cardNumber) => {
    const currentTime = new Date().getTime();

    // Check if the card is clickable and if 1 second has passed since the last fetch
    if (!isClickable || currentTime - lastFetchTime < 1000) {
      return;
    }

    // Set the last fetch time to the current time
    setLastFetchTime(currentTime);
    setIsClickable(false);
    const totalStatsForPokemon1 = sumBaseStats(pokemons[0]);
    const totalStatsForPokemon2 = sumBaseStats(pokemons[1]);
    // Show the total stats
    setTotalStats([totalStatsForPokemon1, totalStatsForPokemon2]);
    
      if (isHigherCardClicked(pokemons[0], pokemons[1], cardNumber)) {
        setScore((prev) => prev + 1);
      } else {
        setScore(0);
      }

      setTimeout(() => {
        setRoundDone((prev) => !prev);
        setIsClickable(true);
      }, 1000);
     
 
    };
  

  return (
    <div className="title">
      <Score score={score} />
      <div className="app">
        <div className="container">
          <PokemonCard
            pokemon={pokemons[0]}
            id="1"
            totalStats={totalStats[0]}
            onClick={() => {
              handleClickCard(1);
            }}
          />
        </div>
        <div className="placeholder"></div>
        <div className="container">
          <PokemonCard
            pokemon={pokemons[1]}
            id="2"
            totalStats={totalStats[1]}
            onClick={() => {
              handleClickCard(2);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default HigherLowerGamePage;
