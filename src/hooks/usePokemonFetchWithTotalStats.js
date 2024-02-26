import { useState, useEffect } from "react";
import { randomPokemonId } from "../utils/HigherLowerUtil";

const usePokemonFetchWithTotalStats = (roundDone, numPokemons) => {
  const [pokemons, setPokemons] = useState(Array(numPokemons).fill(""));
  const [totalStats, setTotalStats] = useState(Array(numPokemons).fill("?"));

  const fetchPokemon = async () => {
    const urls = Array.from({ length: numPokemons }, () => {
      const randomNumber = randomPokemonId();
      return `https://pokeapi.co/api/v2/pokemon/${randomNumber}/`;
    });

    try {
      const data = await Promise.all(
        urls.map((url) => fetch(url).then((response) => response.json()))
      );

      setPokemons(data);
      // Set the total stats to "?" after the new Pokemon data is fetched
      setTotalStats(Array(numPokemons).fill("?"));
    } catch (error) {
      console.error("Error fetching Pokemon:", error);
    }
  };

  useEffect(() => {
    fetchPokemon(); // eslint-disable-next-line
  }, [roundDone]);

  return {
    pokemons,
    totalStats,
    fetchPokemon,
    setTotalStats,
  };
};

export default usePokemonFetchWithTotalStats;
