import "../styles/GuessThePokemon.css";
import React from "react";
import usePokemonFetchWithMoves from "../hooks/usePokemonFetchWithMoveset";
import { useState } from "react";
import { Score } from "../components/Score";
import ShapeIcon from "../resources/ShapeIcon.png";
import ArtworkIcon from "../resources/ArtworkIcon.png";
import GuessThePokemon_BoxesCard from "../components/GuessThePokemon_BoxesCard";
import { datenbank_add } from "../server/utils";

const GuessThePokemon = () => {
  const [score, setScore] = useState(0); // eslint-disable-next-line
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { pokemons, fetchPokemon } = usePokemonFetchWithMoves(false, 1);

  const datenbank_all = async () => {
    for (let i = 1; i < 1303; i++) {
      const url = `https://pokeapi.co/api/v2/pokemon/${i}/`;
      const response = await fetch(url);
      const pokemonobj = await response.json();
      datenbank_add(
        pokemonobj["sprites"]["other"]["official-artwork"]["front_default"],
        pokemonobj.name
      );
    }
  };

  const handleSubmit = () => {
    // Your submit logic here
    setIsSubmitted(true);
    datenbank_all();
  };
  console.log("hi");

  return (
    <div className="page_GTP">
      <div className="right-container_GTP">
        <div className="top-container_GTP">
          <h4>PokeFun</h4>
        </div>
      </div>
      <div className="mid-container_GTP">
        <div className="hintBox_GTP">
          {" "}
          <h4> Guess The Pokemon! </h4>
          <div className="hintBoxIcons_GTP">
            <div className="hintBoxIcon_GTP">
              <img src={ArtworkIcon} alt={ShapeIcon} />
              <p className="hintBoxIconText_GTP">
                artwork hint in 5 wrong answers
              </p>
            </div>
            <div className="hintBoxIcon_GTP">
              <img src={ShapeIcon} alt={ArtworkIcon} />
              <p className="hintBoxIconText_GTP">
                shape hint in 10 wrong answers
              </p>
            </div>
          </div>
        </div>
        <div className="answerContainer_GTP">
          <input type="text" placeholder="Type Pokemon name..." />
          <button type="submit" onClick={handleSubmit}>
            Go
          </button>
        </div>
        <div className="score">
          <Score score={score} />
        </div>
      </div>
      {isSubmitted && (
        <div className="bottom-Container_GTP">
          <GuessThePokemon_BoxesCard solutionPokemon={pokemons[0]} />
        </div>
      )}
    </div>
  );
};
export default GuessThePokemon;
