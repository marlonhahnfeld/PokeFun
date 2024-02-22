// Fetches `count` random Pokemon and sets the state

import { useState } from "react";

export const randomPokemonId = () => {
  const randomNumber = Math.floor(Math.random() * 1025);
  return randomNumber + 1;
};

export const sumBaseStats = (pokemon) => {
  return pokemon.stats.reduce((total, stat, index) => {
    // Berücksichtige nur die ersten 6 Statistiken (Index 0 bis 5)
    if (index <= 5) {
      return total + stat.base_stat;
    }
    return total;
  }, 0);
};
export const fetchNewPokemon = async () => {
  const [newPokemon1, newPokemon2] = await Promise.all([
    fetch(`https://pokeapi.co/api/v2/pokemon/${randomPokemonId()}/`).then(
      (res) => res.json()
    ),
    fetch(`https://pokeapi.co/api/v2/pokemon/${randomPokemonId()}/`).then(
      (res) => res.json()
    ),
  ]);

  return [newPokemon1, newPokemon2];
};
