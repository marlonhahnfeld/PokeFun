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
 
  console.log(moveAccuracy, moveDamageClass,
    moveName,
    movePower,
    movePP,
    movePriority,
    moveType);

    const clickHandlerReadResults = () => {
      const currentTime = new Date().getTime();
    
      // Check if the card is clickable and if 1 second has passed since the last fetch
      if (!isClickable || currentTime - lastFetchTime < 1000) {
        return;
      }
      setLastFetchTime(currentTime);
      setIsClickable(false);
    
      let markingColorClass = ''; // Variable für die CSS-Klasse
      const pokemonCardContainers = document.querySelectorAll('.container');
      pokemonCardContainers.forEach((container, index) => {
        const canPokeLearnMove = eval(`canPoke${index + 1}LearnMove`); // Dynamically access variable
        container.classList.add(canPokeLearnMove ? 'green-mark' : 'red-mark'); // Apply color
      });
      if ((!canPoke1LearnMove && !isMarked1) || (canPoke1LearnMove && isMarked1)) {
        markingColorClass = canPoke1LearnMove ? 'green-mark' : 'red-mark';
        if ((!canPoke2LearnMove && !isMarked2) || (canPoke2LearnMove && isMarked2)) {
          if ((!canPoke3LearnMove && !isMarked3) || (canPoke3LearnMove && isMarked3)) {
            setScore(score + 1);
            setTimeout(() => {
              setRoundDone((prev) => !prev);
              setIsClickable(true);
              setIsMarked1(false);
              setIsMarked2(false);
              setIsMarked3(false);
              pokemonCardContainers.forEach((container) => {
                container.classList.remove('green-mark', 'red-mark');}) 
            }, 2000);
            
            return;
          }
        }
      }
    
      setTimeout(() => {
        // Hier die alte CSS-Klasse wieder zuweisen
        markingColorClass = '';
        setRoundDone((prev) => !prev);
        setIsClickable(true);
        setIsMarked1(false);
        setIsMarked2(false);
        setIsMarked3(false);
        pokemonCardContainers.forEach((container) => {
          container.classList.remove('green-mark', 'red-mark');}) 
      }, 2000);
      setScore(0);
    };


  return (
    <>
      <div className="top-container">
        <Score score={score} />
        <SideMenu />
      </div>

      <div className="app">
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
      <div className="answerContainer" onClick={() => clickHandlerReadResults(document.querySelectorAll('.container'))} draggable={false} isClickable={isClickable ? "true" : "false"} >
        <MoveCard moveName={moveName} moveType={moveType}></MoveCard>
        </div>
    </>
  );
};
export default MoveSetGamePage;
