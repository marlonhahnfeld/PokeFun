import React, { useEffect, useState } from "react";
import "./App.css";
import PokemonCard from "./PokemonCard";

const App = () => {
  const [pokemon1, setPokemon1] = useState("");
  const [pokemon2, setPokemon2] = useState("");
  const [score, setScore] = useState(0);
  const [pokemon1TotalStats, setPokemon1TotalStats] = useState("?");
  const [pokemon2TotalStats, setPokemon2TotalStats] = useState("?");

  //!PokemonCard loading---------------------------------------------
  useEffect(() => {
    const randomNumber = randomPokemonId();
    const url = `https://pokeapi.co/api/v2/pokemon/${randomNumber}/`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // <-- Hier wird data geprinted
        setPokemon1(data);
      });
  }, []);

  useEffect(() => {
    const randomNumber = randomPokemonId();
    const url = `https://pokeapi.co/api/v2/pokemon/${randomNumber}/`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // <-- Hier wird data geprinted
        setPokemon2(data);
      });
  }, []);

  const randomPokemonId = () => {
    const randomNumber = Math.floor(Math.random() * 1025);
    return randomNumber + 1;
  };

  if (!pokemon1 || !pokemon2) return <div>Loading...</div>;

  //!PokemonCard loading---------------------------------------------

  const sumBaseStats = (pokemon) => {
    return pokemon.stats.reduce((total, stat, index) => {
      // Berücksichtige nur die ersten 6 Statistiken (Index 0 bis 5)
      if (index <= 5) {
        return total + stat.base_stat;
      }
      return total;
    }, 0);
  };

  const handleClickCard1 = () => {
    const totalStatsForPokemon1 = sumBaseStats(pokemon1);
    const totalStatsForPokemon2 = sumBaseStats(pokemon2);
    setPokemon1TotalStats(totalStatsForPokemon1);
    setPokemon2TotalStats(totalStatsForPokemon2);

    if (totalStatsForPokemon1 >= totalStatsForPokemon2) {
      setScore(score + 1);
    } else {
      setScore(0);
    }
  };

  const handleClickCard2 = () => {
    const totalStatsForPokemon1 = sumBaseStats(pokemon1);
    const totalStatsForPokemon2 = sumBaseStats(pokemon2);
    setPokemon1TotalStats(totalStatsForPokemon1);
    setPokemon2TotalStats(totalStatsForPokemon2);

    if (totalStatsForPokemon1 <= totalStatsForPokemon2) {
      setScore(score + 1);
    } else {
      setScore(0);
    }
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
              handleClickCard1();
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
