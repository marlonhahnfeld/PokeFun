import React, { useState, useEffect, useRef } from "react";

const PokemonCard = ({ pokemon, pokemon2 }) => {
  const [pokemonTotalStats, setPokemonTotalStats] = useState();
  const [pokemon2TotalStats, setPokemon2TotalStats] = useState();

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const sumBaseStats = (pokemon) => {
    return pokemon.stats.reduce((total, stat, index) => {
      // Berücksichtige nur die ersten 6 Statistiken (Index 0 bis 5)
      if (index <= 5) {
        return total + stat.base_stat;
      }
      return total;
    }, 0);
  };

  const handleClick = () => {
    //console.log(sumBaseStats(pokemon));
    //console.log(sumBaseStats(pokemon2));
    setPokemonTotalStats(sumBaseStats(pokemon));
  };

  return (
    <div className="pokemon-container">
      {/* Erste PokemonCard-Komponente */}
      <div className="pokemon" onClick={handleClick}>
        <h2>{capitalizeFirstLetter(pokemon.name)}</h2>
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
          <h2>Gesamtstats: {pokemonTotalStats}</h2>
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;
