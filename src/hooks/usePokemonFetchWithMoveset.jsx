import { useState, useEffect } from "react";
import { randomPokemonId } from "../utils/HigherLowerUtil";

const usePokemonFetchWithMoves = (roundDone, numPokemons) => {
  const [pokemons, setPokemons] = useState(Array(numPokemons).fill(""));
  const [moves, setMoves] = useState(Array(numPokemons).fill([]));

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

      console.log(data.map((pokemon) => pokemon.name));

      // Set the moves to an empty array after the new Pokemon data is fetched
      setMoves(data.map((pokemon) => pokemon.moves));
    } catch (error) {
      console.error("Error fetching Pokemon:", error);
    }
  };

  useEffect(() => {
    fetchPokemon(); // eslint-disable-next-line
  }, [roundDone]);

  return {
    pokemons,
    moves,
    fetchPokemon,
    setMoves,
  };
};

export default usePokemonFetchWithMoves;
