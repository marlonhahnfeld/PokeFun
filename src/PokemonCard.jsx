import React from "react";

const PokemonCard = ({ pokemon: { name, id, sprites, stats } }) => {
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  return (
    <div className="pokemon">
      <div>
        <h2>{capitalizeFirstLetter(name)}</h2>
      </div>

      <div className="sprite">
        {sprites && <img src={sprites['other']['official-artwork']['front_default']} alt="sprite" draggable="false"></img>}
      </div>

      <div>
        <h3>
         {/* ALL STATS:{" "} 
          {stats[0].base_stat +
            stats[1].base_stat +
            stats[2].base_stat +
            stats[3].base_stat +
            stats[4].base_stat +
          stats[5].base_stat} */}
        </h3>
      </div>
    </div>
  );
};

export default PokemonCard;
