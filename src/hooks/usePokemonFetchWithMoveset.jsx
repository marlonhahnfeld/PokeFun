import { useState, useEffect } from "react";
import { randomPokemonId } from "../utils/HigherLowerUtil";

const usePokemonFetchWithMoves = (roundDone, numPokemons) => {
  const [pokemons, setPokemons] = useState(Array(numPokemons).fill(""));
  const [moveName, setMoveName] = useState(null);
  const [canPoke1LearnMove, setCanPoke1LearnMove] = useState(null);
  const [canPoke2LearnMove, setCanPoke2LearnMove] = useState(null);
  const [canPoke3LearnMove, setCanPoke3LearnMove] = useState(null);
  const [moveAccuracy, setMoveAccuracy] = useState(null);
  const [moveDamageClass, setMoveDamageClass] = useState(null);
  const [moveType, setMoveType] = useState(null);
  const [movePower, setMovePower] = useState(null);
  const [movePP, setMovePP] = useState(null);
  const [movePriority, setMovePriority] = useState(null);

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
      console.log(getMoveInfo(data[0], data[1], data[2]));
      // Set the moves to an empty array after the new Pokemon data is fetched
    } catch (error) {
      console.error("Error fetching Pokemon:", error);
    }
  };

  const getRandomMoveNumber = (pokemon) => {
    const numberOfMoves = pokemon.moves.length;
    const randomMoveNumber = Math.floor(Math.random() * numberOfMoves);
    return randomMoveNumber;
  };

  const getIndexIfMoveIsLevelUpOrEggMove = (pokemon, moveId) => {
    const versionGroupDetails = pokemon.moves[moveId].version_group_details;

    for (let i = 0; i < versionGroupDetails.length; i++) {
      if (
        versionGroupDetails[i].move_learn_method.name === "level-up" ||
        versionGroupDetails[i].move_learn_method.name === "egg"
      ) {
        return i; // Return the index if the condition is met
      }
    }

    return -1; // Return -1 if the condition is not met
  };

  const randomMoveFromSetAndLearningMethod = (pokemon) => {
    let moveId = getRandomMoveNumber(pokemon);
    let learningMethodIndex = getIndexIfMoveIsLevelUpOrEggMove(pokemon, moveId);
    while (learningMethodIndex === -1) {
      moveId = getRandomMoveNumber(pokemon);
      learningMethodIndex = getIndexIfMoveIsLevelUpOrEggMove(pokemon, moveId);
    }
    const move = pokemon.moves[moveId].move;
    const learningMethod =
      pokemon.moves[moveId].version_group_details[learningMethodIndex]
        .move_learn_method.name;
    return { move, learningMethod };
  };

  const checkIfPokemonHasMoveByLearningMethodLevelUpOrEgg = (pokemon, move) => {
    const result = {};

    for (const poke of pokemon) {
      result[poke.name] = false;

      for (const moveDetails of poke.moves) {
        const moveName = moveDetails.move.name;
        const versionGroupDetails = moveDetails.version_group_details;

        for (const details of versionGroupDetails) {
          const currentLearningMethod = details.move_learn_method.name;

          if (
            moveName === move &&
            (currentLearningMethod === "level-up" ||
              currentLearningMethod === "egg")
          ) {
            result[poke.name] = true; // The move was found with the correct learning method
          }
        }
      }
    }

    return result;
  };

  const getRandomPokemon = (pokemon1, pokemon2, pokemon3) => {
    const randomValue = Math.random();
    if (randomValue < 1 / 3) {
      return pokemon1;
    } else if (randomValue < 2 / 3) {
      return pokemon2;
    } else {
      return pokemon3;
    }
  };

  const getMoveInfo = (pokemon1, pokemon2, pokemon3) => {
    const randomPoke = getRandomPokemon(pokemon1, pokemon2, pokemon3);
    const moveInfo = randomMoveFromSetAndLearningMethod(randomPoke);

    // Check if the move is in each pokemon separately
    const pokemonListForMove = [pokemon1, pokemon2, pokemon3];
    const moveStatus = checkIfPokemonHasMoveByLearningMethodLevelUpOrEgg(
      pokemonListForMove,
      moveInfo.move.name
    );

    setCanPoke1LearnMove(moveStatus[pokemon1.name]);
    setCanPoke2LearnMove(moveStatus[pokemon2.name]);
    setCanPoke3LearnMove(moveStatus[pokemon3.name]);

    fetch(moveInfo.move.url)
      .then((response) => response.json())
      .then((moveData) => {
        // Jetzt kannst du auf das `accuracy`-Attribut zugreifen
        setMoveAccuracy(moveData.accuracy);
        setMoveDamageClass(moveData["damage_class"]["name"]);
        setMoveName(moveInfo.move.name);
        setMovePP(moveData.pp);
        setMovePriority(moveData.priority);
        setMovePower(moveData.power);
        setMoveType(moveData.type.name);
      })
      .catch((error) => {
        console.error("Error fetching move data:", error);
      });

    return { moveInfo, moveStatus };
  };

  useEffect(() => {
    fetchPokemon().then(); // eslint-disable-next-line
  }, [roundDone]);

  return {
    pokemons,
    canPoke1LearnMove,
    canPoke2LearnMove,
    canPoke3LearnMove,
    moveAccuracy,
    moveDamageClass,
    moveName,
    movePower,
    movePP,
    movePriority,
    moveType,
  };
};

export default usePokemonFetchWithMoves;
