import React from "react";

const PokemonCard = ({ pokemon, onClick }) => {
  return (
    <div className="pokemon-container" onClick={onClick}>
      <div className="pokemon">
        <h2>{pokemon.name}</h2>
        <div className="sprite">
          {pokemon.sprites && (
            <img
              src={
                pokemon.sprites["other"]["official-artwork"]["front_default"]
              }
              alt="sprite"
              draggable="false"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;
