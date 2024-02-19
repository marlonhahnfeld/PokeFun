import React from "react";

const PokemonCard = ({ pokemon: { name, id, sprites, stats } }) => {
  return (
    <div className="pokemon">
      <div>
        <h2>{name}</h2>
      </div>

      <div>
        {sprites && <img src={sprites.front_default} alt="sprite"></img>}
      </div>

      <div>
        <span>
          ALL STATS:{" "}
          {stats[0].base_stat +
            stats[1].base_stat +
            stats[2].base_stat +
            stats[3].base_stat +
            stats[4].base_stat +
            stats[5].base_stat}
        </span>
      </div>
    </div>
  );
};

export default PokemonCard;
