import React from "react";
import "../styles/PokemonCard.css";
import { capitalizeFirstLetter } from "../utils/HigherLowerUtil";

const PokemonCard = ({ pokemon, onClick }) => {
  return (
    <div className="pokemon-container" onClick={onClick}>
      <div className="pokemon-name">
        <h2>{capitalizeFirstLetter(pokemon.name)}</h2>
      </div>
      <div className="pokemon-image">
        {pokemon.sprites && (
          <img
            src={pokemon.sprites["other"]["official-artwork"]["front_default"]}
            alt="sprite"
            draggable="false"
          />
        )}
      </div>
    </div>
  );
};

export default PokemonCard;
