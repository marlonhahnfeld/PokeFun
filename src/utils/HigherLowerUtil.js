// Fetches `count` random Pokemon and sets the state

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

export const isHigherCardClicked = (pokemon1, pokemon2, cardNumber) => {
  const totalStatsForPokemon1 = sumBaseStats(pokemon1);
  const totalStatsForPokemon2 = sumBaseStats(pokemon2);

  if (
    (cardNumber === 1 && totalStatsForPokemon1 >= totalStatsForPokemon2) ||
    (cardNumber === 2 && totalStatsForPokemon1 <= totalStatsForPokemon2)
  ) {
    return true;
    } else {
    return false;
  }
}

