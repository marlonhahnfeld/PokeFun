import React from "react";
import "./HigherLowerPageCSS.css";
import { useState } from "react";
import usePokemonFetch from "../hooks/usePokemonFetch";
import { sumBaseStats } from "../utils/HigherLowerUtil";
import PokemonCard from "../components/PokemonCard";

const HigherLowerGamePage = () => {
  const [score, setScore] = useState(0);
  const [roundDone, setRoundDone] = useState(false);
  const [isClickable, setIsClickable] = useState(true);
  const { pokemons, totalStats, setTotalStats } = usePokemonFetch(roundDone, 2);

  const handleClickCard = (cardNumber) => {
    // Check if the card is clickable
    if (!isClickable) {
      return;
    }
    // Set the card to not be clickable
    setIsClickable(false);
    const totalStatsForPokemon1 = sumBaseStats(pokemons[0]);
    const totalStatsForPokemon2 = sumBaseStats(pokemons[1]);
    // Show the total stats
    setTotalStats([totalStatsForPokemon1, totalStatsForPokemon2]);

    // Compare the stats and increase the score
    if (
      (cardNumber === 1 && totalStatsForPokemon1 >= totalStatsForPokemon2) ||
      (cardNumber === 2 && totalStatsForPokemon1 <= totalStatsForPokemon2)
    ) {
      setScore(score + 1);
    } else {
      setScore(0);
    }

    const timeoutId = setTimeout(() => {
      setRoundDone((prev) => !prev);
      // Clear timeout if component unmounts or new round starts
      clearTimeout(timeoutId);

      // Set the card to be clickable again after 1 second
      setIsClickable(true);
    }, 500);
  };

  return (
    <div className="title">
      <h4 className="score">Score: {score}</h4>
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
