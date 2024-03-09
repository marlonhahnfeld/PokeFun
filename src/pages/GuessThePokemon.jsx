import "../styles/GuessThePokemon.css";
import React from "react";
import usePokemonFetchWithMoves from "../hooks/usePokemonFetchWithMoveset";
import { useState } from "react";
import { Score } from "../components/Score";
import ShapeIcon from "../resources/ShapeIcon.png";
import ArtworkIcon from "../resources/ArtworkIcon.png";
import GuessThePokemon_BoxesCard from "../components/GuessThePokemon_BoxesCard";
import { datenbank_add } from "../server/utils";
import { fetchPokemonStartingWithInput_FromMongo } from "../utils/GuessThePokemonUtil";
import PokemonList from "../components/ui/PokemonList";

const GuessThePokemon = () => {
  const [score, setScore] = useState(0); // eslint-disable-next-line
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { pokemons, fetchPokemon } = usePokemonFetchWithMoves(false, 1);
  const [suggestions, setSuggestions] = useState();
  const [showSuggestions, setShowSuggestions] = useState(false);

  // const datenbank_all = async () => {
  //   for (let i = 1; i < 1303; i++) {
  //     const url = `https://pokeapi.co/api/v2/pokemon/${i}/`;
  //     const response = await fetch(url);
  //     const pokemonobj = await response.json();
  //     datenbank_add(
  //       pokemonobj["sprites"]["other"]["official-artwork"]["front_default"],
  //       pokemonobj.name
  //     );
  //   }
  // };

  // TODO 1. CSS fixen box knockt topcontainer weg + answerContainer_GTP überlappt nun damit
  // TODO 2. Css von PokemonList anpassen
  // TODO 3. PokemonList onClick Logik einbauen
  // TODO 3. Pokemon von PokemonList in SubmitBox einfügen, dann anhand dem Namen das richtige Objekt
  // TODO 3. aus der API zocken und das dann bei GuessThePokemon_BoxesCard neben solutionPokemon als Pokemon übergeben
  // TODO 4. PokemonList capitalizeFirstLetter & sortieren nach Alphabet

  const handleInputChange = async (event) => {
    const input = event.target.value;
    if (input.length > 0) {
      const fetchedPokemon = await fetchPokemonStartingWithInput_FromMongo(
        input
      );
      setSuggestions(fetchedPokemon);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleSubmit = () => {
    // Your submit logic here
    setIsSubmitted(true);
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
          <input
            type="text"
            placeholder="Type Pokemon name..."
            onChange={handleInputChange}
          />
          <button type="submit" onClick={handleSubmit}>
            Go
          </button>
        </div>
        {showSuggestions && suggestions && (
          <PokemonList suggestions={suggestions} />
        )}
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
