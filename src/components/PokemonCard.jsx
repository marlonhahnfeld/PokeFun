import React from "react";

const PokemonCard = ({ pokemon, totalStats, onClick }) => {
  return (
    <div className="pokemon-container" onClick={onClick}>
      {/* Erste PokemonCard-Komponente */}
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
        <div className="own-total-stats">
          <h2>Total stats: {totalStats}</h2>
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;
