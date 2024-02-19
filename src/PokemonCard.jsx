import React from "react";

const PokemonCard = ({
  pokemon: { name, id, sprites, stats },
  opponentPokemon: {
    name: opponentPokemonName,
    id: opponentPokemonId,
    sprites: opponentPokemonSprites,
    stats: opponentPokemonStats,
  },
}) => {
  const sumBaseStats = (stats) => {
    return stats.reduce((total, stat) => total + stat.base_stat, 0);
  };

  const handleClick = () => {
    const totalStats = sumBaseStats(stats);
    const opponentTotalStats = sumBaseStats(opponentPokemonStats);

    const outputMessage =
      totalStats >= opponentTotalStats ? "RICHTIG" : "FALSCH";

    // Update total-stats element with computed total and message
    const totalStatsElement = document.querySelector(".total-stats");
    totalStatsElement.textContent = `Gesamtsumme der Stats: ${totalStats} (${outputMessage})`;

    // Update opponent-total-stats element
    const opponentTotalStatsElement = document.querySelector(
      ".opponent-total-stats"
    );
    opponentTotalStatsElement.textContent = `Gesamtsumme gegnerische Stats: ${opponentTotalStats}`;
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <div className="pokemon" onClick={handleClick}>
      <div>
        <h2>{capitalizeFirstLetter(name)}</h2>
      </div>

      <div className="sprite">
        {sprites && (
          <img
            src={sprites["other"]["official-artwork"]["front_default"]}
            alt="sprite"
            draggable="false"
          ></img>
        )}
      </div>

      <div>{sprites && <img src={sprites.front_default} alt="sprite" />}</div>

      <div className="total-stats"></div>

      <div className="opponent-total-stats"></div>
    </div>
  );
};

export default PokemonCard;
