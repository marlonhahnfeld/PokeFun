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
 
  console.log(canPoke1LearnMove);
  console.log(canPoke2LearnMove);
  console.log(canPoke3LearnMove);
  console.log(moveAccuracy, moveDamageClass,
    moveName,
    movePower,
    movePP,
    movePriority,
    moveType);

    const ReadResults = () => {
      const currentTime = new Date().getTime();

    // Check if the card is clickable and if 1 second has passed since the last fetch
    if (!isClickable || currentTime - lastFetchTime < 1000) {
      return;
    }
    setLastFetchTime(currentTime);
    setIsClickable(false);


      if ((!canPoke1LearnMove && !isMarked1) || (canPoke1LearnMove && isMarked1)){
        if ((!canPoke2LearnMove && !isMarked2) || (canPoke2LearnMove && isMarked2)) {
          if ((!canPoke3LearnMove && !isMarked3) || (canPoke3LearnMove && isMarked3)) {
            setScore(score+1);
            setTimeout(() => {
              setRoundDone((prev) => !prev);
              setIsClickable(true);
            }, 2000);
            setIsMarked1(false);
            setIsMarked2(false);
            setIsMarked3(false);
            return;
          }
        }
      }
      setTimeout(() => {
        setRoundDone((prev) => !prev);
        setIsClickable(true);
      }, 2000);
      setIsMarked1(false);
      setIsMarked2(false);
      setIsMarked3(false);
            setScore(0);
    }

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
      <div className ="answerContainer" onClick={ReadResults} draggable={false} isClickable={isClickable ? "true" : "false"} >
        <MoveCard moveName={moveName} moveType={moveType}></MoveCard>
        </div>
    </>
  );
};
export default MoveSetGamePage;
