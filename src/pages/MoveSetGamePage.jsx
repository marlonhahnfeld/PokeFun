import React from "react";
import SideMenu from "../components/SideMenu";
import usePokemonFetchWithMoveset from "../hooks/usePokemonFetchWithMoveset";
import { useState } from "react";
import { Score } from "../components/Score";
import PokemonCard from "../components/PokemonCard";
import "../styles/MoveSetGamePage.css";
import MoveCard from "../components/MoveCard";

const MoveSetGamePage = () => {
  const [score, setScore] = useState(0);
  const [roundDone, setRoundDone] = useState(true);
  const [isClickable, setIsClickable] = useState(true);
  const [lastFetchTime, setLastFetchTime] = useState(0);
  const { pokemons,
    canPoke1LearnMove,
    canPoke2LearnMove,
    canPoke3LearnMove,
    moveAccuracy,
    moveDamageClass,
    moveName,
    movePower,
    movePP,
    movePriority,
    moveType } = usePokemonFetchWithMoveset(roundDone, 3);
    const [isMarked1, setIsMarked1] = useState(false);
    const [isMarked2, setIsMarked2] = useState(false);
    const [isMarked3, setIsMarked3] = useState(false);
 
    const checkClickEligibility = () => {
      const currentTime = new Date().getTime();
      if (!isClickable || currentTime - lastFetchTime < 1000) {
        return false;
      }
      setLastFetchTime(currentTime);
      setIsClickable(false);
      return true;
    };
    
    const applyColorToCards = () => {
      const pokemonCardContainers = document.querySelectorAll('.container');
      pokemonCardContainers.forEach((container, index) => {
        const canPokeLearnMove = {
          1: canPoke1LearnMove,
          2: canPoke2LearnMove,
          3: canPoke3LearnMove
        }[index + 1];
        container.classList.add(canPokeLearnMove ? 'green-mark' : 'red-mark');
      });
    };
    
    const resetGame = () => {
      setRoundDone((prev) => !prev);
      setIsClickable(true);
      setIsMarked1(false);
      setIsMarked2(false);
      setIsMarked3(false);
      const pokemonCardContainers = document.querySelectorAll('.container');
      pokemonCardContainers.forEach((container) => {
        container.classList.remove('green-mark', 'red-mark');
      });
    };
  
    const handleCorrectAnswer = () => {
      setScore((prev) => prev + 1);
      setTimeout(resetGame, 2000);
    };
  
    const handleIncorrectAnswer = () => {
      setScore(0);
      setTimeout(resetGame, 2000);
    };

    const clickHandlerReadResults = () => {
      if (!checkClickEligibility()) return;
    
      applyColorToCards();
    
      if (
        (canPoke1LearnMove && !isMarked1) ||
        (canPoke2LearnMove && !isMarked2) ||
        (canPoke3LearnMove && !isMarked3)
      ) {
        handleIncorrectAnswer();
        return;
      }
    
      if (
        (!canPoke1LearnMove && isMarked1) ||
        (!canPoke2LearnMove && isMarked2) ||
        (!canPoke3LearnMove && isMarked3)
      ) {
        handleIncorrectAnswer();
        return;
      }
    
      handleCorrectAnswer();
    };

console.log(canPoke1LearnMove,
  canPoke2LearnMove,
  canPoke3LearnMove,
  moveAccuracy,
  moveDamageClass,
  moveName,
  movePower,
  movePP,
  movePriority,
  moveType)
  return (
    <>
      <div className="top-container">
        <Score score={score} />
        <SideMenu />
      </div>

      <div className="mid-container">
      <div className={`container ${isMarked1 ? 'marked' : ''}`}>
          <PokemonCard
              pokemon={pokemons[0]}
              id="1"
              onClick={() => {
                setIsMarked1(!isMarked1);
              }}
            />
          </div>
          <div className={`container ${isMarked2 ? 'marked' : ''}`}>
          <PokemonCard
              pokemon={pokemons[1]}
              id="2"
              onClick={() => {
                setIsMarked2(!isMarked2);
              }}
            />
          </div>
          <div className={`container ${isMarked3 ? 'marked' : ''}`}>
          <PokemonCard
              pokemon={pokemons[2]}
              id="3"
              onClick={() => {
                setIsMarked3(!isMarked3);
              }}
            />
          </div>
      </div>

      <div className="bottomContainer">
      <div className="answerContainer" onClick={() => clickHandlerReadResults(document.querySelectorAll('.container'))} draggable={false} isClickable={isClickable ? "true" : "false"} >
        <MoveCard
          moveName={moveName}
          moveType={moveType}
          moveAccuracy={moveAccuracy}
          moveDamageClass={moveDamageClass}
          movePower={movePower}
          movePP={movePP}
          movePriority={movePriority}
        ></MoveCard>
        </div>
        </div>
    </>
  );
};
export default MoveSetGamePage;
