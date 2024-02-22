import React, { useEffect, useState, useCallback } from "react";
import "./App.css";
import PokemonCard from "./components/PokemonCard";
import {
  randomPokemonId,
  sumBaseStats,
  fetchNewPokemon,
} from "./utils/HigherLowerUtil";

const App = () => {
  const [pokemon1, setPokemon1] = useState("");
  const [pokemon2, setPokemon2] = useState("");
  const [score, setScore] = useState(0);
  const [pokemon1TotalStats, setPokemon1TotalStats] = useState("?");
  const [pokemon2TotalStats, setPokemon2TotalStats] = useState("?");
  const [roundDone, setRoundDone] = useState(false);

  //TODO pokemon werden gefetched, nach erster runde auch, aber runde 2 fetched ncht mehr, da setRoundDone sich nicht mehr ändert und useEffect nicht triggert.

  //! INIT FETCHING von 2 Pokemon
  useEffect(() => {
    const randomNumber1 = randomPokemonId();
    const randomNumber2 = randomPokemonId();

    const url1 = `https://pokeapi.co/api/v2/pokemon/${randomNumber1}/`;
    const url2 = `https://pokeapi.co/api/v2/pokemon/${randomNumber2}/`;
    fetch(url1)
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // <-- Hier wird data geprinted
        setPokemon1(data);

        fetch(url2)
          .then((response) => response.json())
          .then((data) => {
            console.log(data); // <-- Hier wird data geprinted
            setPokemon2(data);
          });
      });
  }, [roundDone]);

  const handleClickCard1 = async () => {
    const totalStatsForPokemon1 = sumBaseStats(pokemon1);
    const totalStatsForPokemon2 = sumBaseStats(pokemon2);

    // Zeige die Total-Stats an
    setPokemon1TotalStats(totalStatsForPokemon1);
    setPokemon2TotalStats(totalStatsForPokemon2);

    // Timeout-Variable für verzögerten Fetch
    let timeoutId;

    // Vergleiche die Stats und erhöhe den Score
    if (totalStatsForPokemon1 >= totalStatsForPokemon2) {
      setScore(score + 1);
    } else {
      setScore(0);
    }

    // Setze Timeout für Fetch nach 2 Sekunden
    timeoutId = setTimeout(() => {
      // Neue Pokémon abrufen
      setRoundDone(true);

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

    // Timeout-Variable für verzögerten Fetch
    let timeoutId;

    // Vergleiche die Stats und erhöhe den Score
    if (totalStatsForPokemon1 <= totalStatsForPokemon2) {
      setScore(score + 1);
    } else {
      setScore(0);
    }

    // Setze Timeout für Fetch nach 2 Sekunden
    timeoutId = setTimeout(() => {
      // Neue Pokémon abrufen
      setRoundDone(true);

      // Setze "?" nach dem Fetch
      setPokemon1TotalStats("?");
      setPokemon2TotalStats("?");
    }, 1000);

    // Lösche Timeout, wenn neue Pokémon abgerufen werden
  };

  //-------------------------------------------------------------------------------------------------------------

  return (
    <div className="title">
      <h4 className="score">Score:{score} </h4>
      <div className="app">
        <div className="container">
          <PokemonCard
            pokemon={pokemon1}
            id="1"
            pokemon2={pokemon2}
            totalStats={pokemon1TotalStats}
            onClick={() => {
              handleClickCard1({ pokemon1 }, { pokemon2 });
            }}
          />
        </div>
        <div className="placeholder"></div>
        <div className="container">
          <PokemonCard
            pokemon={pokemon2}
            id="2"
            pokemon2={pokemon1}
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
