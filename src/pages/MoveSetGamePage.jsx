import React from "react";
import SideMenu from "../components/SideMenu";
import usePokemonFetchWithMoveset from "../hooks/usePokemonFetchWithMoveset";
import { useState } from "react";
import { Score } from "../components/Score";
import PokemonCard from "../components/PokemonCard";
import "../styles/HigherLowerPageCSS.css";

const MoveSetGamePage = () => {
  const [score, setScore] = useState(0);
  const [roundDone, setRoundDone] = useState(true);
  const { pokemons } = usePokemonFetchWithMoveset(roundDone, 3);

  return (
    <>
      <div className="top-container">
        <Score score={score} />
        <SideMenu />
      </div>

      <div className="app">
        <div className="container">
          <PokemonCard pokemon={pokemons[0]} id="1" />
        </div>
        <div className="placeholder"></div>
        <div className="container">
          <PokemonCard pokemon={pokemons[1]} id="2" />
        </div>
        <div className="container">
          <PokemonCard pokemon={pokemons[2]} id="3" />
        </div>
      </div>
    </>
  );
};
export default MoveSetGamePage;
