import React, { useEffect, useState } from "react";
import "../App2.css";
import PokemonCard from "../components/PokemonCard";
import GameModeMenu from "../components/GameModeMenu";


const MoveSet = () => {
    const [pokemon1, setPokemon1] = useState("");
    const [pokemon2, setPokemon2] = useState("");
    const [pokemon3, setPokemon3] = useState("");
    const [score, setScore] = useState(0);
    const [pokemon1TotalStats, setPokemon1TotalStats] = useState("?");
    const [pokemon2TotalStats, setPokemon2TotalStats] = useState("?");
    const [pokemon3TotalStats, setPokemon3TotalStats] = useState("?");
    const [isMarked1, setIsMarked1] = useState(false);
    const [isMarked2, setIsMarked2] = useState(false);
    const [isMarked3, setIsMarked3] = useState(false);
  
    //!PokemonCard loading--------------------------------------------- 
    const randomPokemonId = () => {
      const randomNumber = Math.floor(Math.random() * 1025);
      return randomNumber + 1;
    };

    useEffect(() => {
      const randomNumber = randomPokemonId();
      const url = `https://pokeapi.co/api/v2/pokemon/${randomNumber}/`;
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          console.log(data); // <-- Hier wird data geprinted
          setPokemon1(data);
        });
    }, []);
  
    useEffect(() => {
      const randomNumber = randomPokemonId();
      const url = `https://pokeapi.co/api/v2/pokemon/${randomNumber}/`;
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          console.log(data); // <-- Hier wird data geprinted
          setPokemon2(data);
        });
    }, []);

    useEffect(() => {
      const randomNumber = randomPokemonId();
      const url = `https://pokeapi.co/api/v2/pokemon/${randomNumber}/`;
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          console.log(data); // <-- Hier wird data geprinted
          setPokemon3(data);
          setIsLoading(false);
        });
    }, []);
  
if (!pokemon1 || !pokemon2 || !pokemon3) return <div>Loading...</div>;
  
    const fetchNewPokemon = async () => {
      const [newPokemon1, newPokemon2, newPokemon3] = await Promise.all([
        fetch(`https://pokeapi.co/api/v2/pokemon/${randomPokemonId()}/`).then(
          (res) => res.json()
        ),
        fetch(`https://pokeapi.co/api/v2/pokemon/${randomPokemonId()}/`).then(
          (res) => res.json()
        ),
        fetch(`https://pokeapi.co/api/v2/pokemon/${randomPokemonId()}/`).then(
          (res) => res.json()
        ),
      ]);
  
      setPokemon1(newPokemon1);
      setPokemon2(newPokemon2);
      setPokemon3(newPokemon3);
      
    };
    //!PokemonCard loading---------------------------------------------
  
    {/* randomMoveLearningMethod kann als erste Stelle machine haben aber später
        level-up learningMethod enthalten kann.
        Lösung: In version_group_details rein und das array for-each durchgehen und nach
        move-learn-method/name: level-up/Egg-Move suchen
        If(Level-up/Egg-Move found) -> aktzeptiere Move; else lade neuen Move und wiederhole
        Komplextität: Theoretisch unendlich
        Logikfehler: randomMoveFromSetOrLearningMethod(pokemon1).move -> pokemon1 muss randomized
        Fortsetzung: Schauen ob anderes Pokemon besagten Move besitzt 
        und 3 Antwortmöglichkeiten richtig auslesen,
        ---------------- Fertig
        auswerten und mit "Lock In Answer" verbinden
        Weiterhin: Result ausgeben und neue pokemon & move fetchen (Markierungen resetten -> setscore(score+1) auch isMarked1,2,3 false setzen SCHON DRINNE)
        Außerdem Stats von allen vornerein anzeigen bzw unhiden
        */}

    const getRandomMoveNumber = (pokemon) => {
        const numberOfMoves = pokemon.moves.length;
        const randomMoveNumber = Math.floor(Math.random() * numberOfMoves);
        return randomMoveNumber;
    }

    const getIndexIfMoveIsLevelUpOrEggMove = (pokemon, moveId) => {
      const versionGroupDetails = pokemon.moves[moveId].version_group_details;
    
      for (let i = 0; i < versionGroupDetails.length; i++) {
        if (versionGroupDetails[i].move_learn_method.name === "level-up" || versionGroupDetails[i].move_learn_method.name === "egg") {
          return i; // Return the index if the condition is met
        }
      }
    
      return -1; // Return -1 if the condition is not met
    };
    

    {/* randomMoveFromSetOrLearningMethod.move || randomMoveFromSetOrLearningMethod.learningMethod */}
    const randomMoveFromSetOrLearningMethod = (pokemon) => {
        let moveId = getRandomMoveNumber(pokemon);
        let learningMethodIndex = getIndexIfMoveIsLevelUpOrEggMove(pokemon, moveId);
        while (learningMethodIndex == -1) {
          moveId = getRandomMoveNumber(pokemon);
          learningMethodIndex = getIndexIfMoveIsLevelUpOrEggMove(pokemon, moveId);
        }
        const move = pokemon.moves[moveId].move.name;
        const learningMethod = pokemon.moves[(moveId)].version_group_details[learningMethodIndex].move_learn_method.name;
       return { move, learningMethod };
    }

    const checkIfPokemonHasMoveByLearningMethodLevelUpOrEgg = (pokemon, move) => {
      const result = {};
      
      for (const poke of pokemon) {
        result[poke.name] = false;
    
        for (const moveDetails of poke.moves) {
          const moveName = moveDetails.move.name;
          const versionGroupDetails = moveDetails.version_group_details;
    
          for (const details of versionGroupDetails) {
            const currentLearningMethod = details.move_learn_method.name;
    
            if (moveName === move && (currentLearningMethod === "level-up" || currentLearningMethod === "egg" )) {
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
      const moveInfo = randomMoveFromSetOrLearningMethod(randomPoke);
    
      // Check if the move is in each pokemon separately
      const pokemonListForMove = [pokemon1, pokemon2, pokemon3];
      const moveStatus = checkIfPokemonHasMoveByLearningMethodLevelUpOrEgg(
        pokemonListForMove,
        moveInfo.move
      );
    
      return {moveInfo,moveStatus};
    };

    const moveInfos = getMoveInfo(pokemon1, pokemon2, pokemon3);
      console.log(moveInfos);

    {/**useEffect(() => {
      const moveInfos = getMoveInfo(pokemon1, pokemon2, pokemon3);
      console.log(moveInfos);   
    }, [isLoading]);*/}

   {/* const LoadNewPoke = (totalStatsForPokemon1,totalStatsForPokemon2) => {
      // Timeout-Variable für verzögerten Fetch
    let timeoutId;
      // Setze Timeout für Fetch nach 2 Sekunden
     timeoutId = setTimeout(() => {
      // Neue Pokémon abrufen
      fetchNewPokemon();

      // Setze "?" nach dem Fetch
      setPokemon1TotalStats("?");
      setPokemon2TotalStats("?");
    }, 2750);
    }

    const handleClickCard1 = async () => { 
      const totalStatsForPokemon1 = sumBaseStats(pokemon1);
    const totalStatsForPokemon2 = sumBaseStats(pokemon2);

    // Zeige die Total-Stats an
    setPokemon1TotalStats(totalStatsForPokemon1);
    setPokemon2TotalStats(totalStatsForPokemon2);
      if (checkIfPokemonHasMoveByLearningMethodLevelUpOrEgg(pokemon1) && !checkIfPokemonHasMoveByLearningMethodLevelUpOrEgg(pokemon2))
        setScore(score+1);
        setIsMarked1(!isMarked1);
        setIsMarked2(!isMarked2);
        setIsMarked3(!isMarked3);
      else
        setScore(0);
      LoadNewPoke(totalStatsForPokemon1,totalStatsForPokemon2);
  };*/}

   
    //-------------------------------------------------------------------------------------------------------------
  
    return (
      <div className="title">
        <GameModeMenu></GameModeMenu>
        <h4 className="score">Score:{score} </h4>
        <div className="app">
          <div className={`container ${isMarked1 ? 'marked' : ''}`}>
            <PokemonCard
              pokemon={pokemon1}
              id="1"
              totalStats={pokemon1TotalStats}
              onClick={() => {
                setIsMarked1(!isMarked1);
              }}
            />
          </div>
          <div className={`container ${isMarked3 ? 'marked' : ''}`}>
          <PokemonCard
              pokemon={pokemon3}
              id="3"
              totalStats={pokemon3TotalStats}
              onClick={() => {
                setIsMarked3(!isMarked3);
              }}
            />
          </div>
          <div className={`container ${isMarked2 ? 'marked' : ''}`}>
            <PokemonCard
              pokemon={pokemon2}
              id="2"
              totalStats={pokemon2TotalStats}
              onClick={() => {
                setIsMarked2(!isMarked2);
              }}
            />
          </div>
          
        </div>
          <div className="answerContainer">
            Lock In Answer
          </div>
      </div>
    );
  }    
  
  export default MoveSet;
  