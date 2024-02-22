import React from "react";
import "./App.css";
import { useState, useEffect } from "react";
import { randomPokemonId, sumBaseStats } from "./utils/HigherLowerUtil";
import PokemonCard from "./components/PokemonCard";

const App = () => {
  const [pokemon1, setPokemon1] = useState("");
  const [pokemon2, setPokemon2] = useState("");
  const [score, setScore] = useState(0);
  const [pokemon1TotalStats, setPokemon1TotalStats] = useState("?");
  const [pokemon2TotalStats, setPokemon2TotalStats] = useState("?");
  const [roundDone, setRoundDone] = useState(false);

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
    const totalStatsForPokemon1 = sumBaseStats(pokemon1);
    const totalStatsForPokemon2 = sumBaseStats(pokemon2);

    // Zeige die Total-Stats an
    setPokemon1TotalStats(totalStatsForPokemon1);
    setPokemon2TotalStats(totalStatsForPokemon2);

    // Vergleiche die Stats und erhöhe den Score
    if (totalStatsForPokemon1 >= totalStatsForPokemon2) {
      setScore(score + 1);
    } else {
      setScore(0);
    }

    let timeoutId = setTimeout(() => {
      // Neue Pokémon abrufen
      setRoundDone((prev) => !prev);
      // Setze "?" nach dem Fetch
      setPokemon1TotalStats("?");
      setPokemon2TotalStats("?");
    }, 1000);

    // Lösche Timeout, wenn neue Pokémon abgerufen werden
  };

  const handleClickCard2 = async () => {
    const totalStatsForPokemon1 = sumBaseStats(pokemon1);
    const totalStatsForPokemon2 = sumBaseStats(pokemon2);

    // Zeige die Total-Stats an
    setPokemon1TotalStats(totalStatsForPokemon1);
    setPokemon2TotalStats(totalStatsForPokemon2);

    // Vergleiche die Stats und erhöhe den Score
    if (totalStatsForPokemon1 <= totalStatsForPokemon2) {
      setScore(score + 1);
    } else {
      setScore(0);
    }

    let timeoutId = setTimeout(() => {
      // Neue Pokémon abrufen
      setRoundDone((prev) => !prev);

      // Setze "?" nach dem Fetch
      setPokemon1TotalStats("?");
      setPokemon2TotalStats("?");
    }, 1000);

    // Lösche Timeout, wenn neue Pokémon abgerufen werden
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

export default App;
