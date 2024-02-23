import React from "react";
//import "./HigherLowerGamePage.css";
import "./HigherLowerPageCSS.css";
import { useState, useEffect } from "react";
import { randomPokemonId, sumBaseStats } from "../utils/HigherLowerUtil";
import PokemonCard from "../components/PokemonCard";

const HigherLowerGamePage = () => {
  const [pokemon1, setPokemon1] = useState("");
  const [pokemon2, setPokemon2] = useState("");
  const [score, setScore] = useState(0);
  const [pokemon1TotalStats, setPokemon1TotalStats] = useState("?");
  const [pokemon2TotalStats, setPokemon2TotalStats] = useState("?");
  const [roundDone, setRoundDone] = useState(false);
  const [isClickable, setIsClickable] = useState(true);

  // FETCHING von 2 Pokemon
  useEffect(() => {
    const fetchPokemon = async () => {
      const randomNumber1 = randomPokemonId();
      const randomNumber2 = randomPokemonId();

      const url1 = `https://pokeapi.co/api/v2/pokemon/${randomNumber1}/`;
      const url2 = `https://pokeapi.co/api/v2/pokemon/${randomNumber2}/`;

      try {
        const response1 = await fetch(url1);
        const data1 = await response1.json();
        setPokemon1(data1);

        const response2 = await fetch(url2);
        const data2 = await response2.json();
        setPokemon2(data2);

        console.log(data1.name);
        console.log(data2.name);
      } catch (error) {
        console.error("Error fetching Pokemon:", error);
      }
    };

    fetchPokemon();
  }, [roundDone]);

  const handleClickCard1 = async () => {
    // Check if the card is clickable
    if (!isClickable) {
      return;
    }

    // Set the card to not be clickable
    setIsClickable(false);

    const totalStatsForPokemon1 = sumBaseStats(pokemon1);
    const totalStatsForPokemon2 = sumBaseStats(pokemon2);

    // Show the total stats
    setPokemon1TotalStats(totalStatsForPokemon1);
    setPokemon2TotalStats(totalStatsForPokemon2);

    // Compare the stats and increase the score
    if (totalStatsForPokemon1 >= totalStatsForPokemon2) {
      setScore(score + 1);
    } else {
      setScore(0);
    }

    const timeoutId = setTimeout(() => {
      setRoundDone((prev) => !prev);

      setPokemon1TotalStats("?");
      setPokemon2TotalStats("?");

      // Clear timeout if component unmounts or new round starts
      clearTimeout(timeoutId);

      // Set the card to be clickable again after 1 second
      setIsClickable(true);
    }, 1000);
  };

  const handleClickCard2 = async () => {
    // Check if the card is clickable
    if (!isClickable) {
      return;
    }

    // Set the card to not be clickable
    setIsClickable(false);

    const totalStatsForPokemon1 = sumBaseStats(pokemon1);
    const totalStatsForPokemon2 = sumBaseStats(pokemon2);

    // Show the total stats
    setPokemon1TotalStats(totalStatsForPokemon1);
    setPokemon2TotalStats(totalStatsForPokemon2);

    // Compare the stats and increase the score
    if (totalStatsForPokemon1 <= totalStatsForPokemon2) {
      setScore(score + 1);
    } else {
      setScore(0);
    }

    const timeoutId = setTimeout(() => {
      setRoundDone((prev) => !prev);

      setPokemon1TotalStats("?");
      setPokemon2TotalStats("?");

      // Clear timeout if component unmounts or new round starts
      clearTimeout(timeoutId);

      // Set the card to be clickable again after 1 second
      setIsClickable(true);
    }, 1000);
  };

  return (
    <div className="title">
      <h4 className="score">Score:{score} </h4>
      <div className="app">
        <div className="container">
          <PokemonCard
            pokemon={pokemon1}
            id="1"
            totalStats={pokemon1TotalStats}
            onClick={() => {
              handleClickCard1();
            }}
          />
        </div>
        <div className="placeholder"></div>
        <div className="container">
          <PokemonCard
            pokemon={pokemon2}
            id="2"
            totalStats={pokemon2TotalStats}
            onClick={() => {
              handleClickCard2();
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default HigherLowerGamePage;
