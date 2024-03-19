import React, { useState, useEffect } from "react";
import usePokemonFetchWithMoveset from "../hooks/usePokemonFetchWithMoveset";
import { Score } from "../components/Score";
import PokemonCard from "../components/PokemonCard";
import "../styles/MoveSetGamePage.css";
import MoveCard from "../components/MoveCard";
import Sidenavigation from "../components/Sidenavigation"; // eslint-disable-next-line
import Grow from "@mui/material/Grow";
import Fade from "@mui/material/Fade";
import { saveScoreMovesetGame } from "../server/dbutils";
import Highscore from "../components/Highscore";
import { getHighscoreForMovesetGame } from "../server/dbutils";

const MoveSetGamePage = () => {
  // eslint-disable-next-line
  const [score, setScore] = useState(0); // eslint-disable-next-line
  const [roundDone, setRoundDone] = useState(true);
  const [isClickable, setIsClickable] = useState(true);
  const [lastFetchTime, setLastFetchTime] = useState(0);
  const {
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
  } = usePokemonFetchWithMoveset(roundDone, 3);
  const [isMarked1, setIsMarked1] = useState(false);
  const [isMarked2, setIsMarked2] = useState(false);
  const [isMarked3, setIsMarked3] = useState(false);

  const [highscore, setHighscore] = useState(null);
  const [scoreSaved, setScoreSaved] = useState(false);

  useEffect(() => {
    getHighscoreForMovesetGame()
      .then((highscore) => {
        setHighscore(highscore);
        setScoreSaved(false); // Set scoreSaved to false after the highscore is fetched
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [scoreSaved]); // Add scoreSaved as a dependency

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
    const pokemonCardContainers = document.querySelectorAll(".container_MSG");
    pokemonCardContainers.forEach((container_MSG, index) => {
      const canPokeLearnMove = {
        1: canPoke1LearnMove,
        2: canPoke2LearnMove,
        3: canPoke3LearnMove,
      }[index + 1];
      container_MSG.classList.add(canPokeLearnMove ? "green-mark" : "red-mark");
    });
  };

  const resetGame = () => {
    setRoundDone((prev) => !prev);
    setIsClickable(true);
    setIsMarked1(false);
    setIsMarked2(false);
    setIsMarked3(false);
    const pokemonCardContainers = document.querySelectorAll(".container_MSG");
    pokemonCardContainers.forEach((container_MSG) => {
      container_MSG.classList.remove("green-mark", "red-mark");
    });
  };

  const handleCorrectAnswer = () => {
    setScore((prev) => prev + 1);
    setTimeout(resetGame, 2000);
  };

  const handleIncorrectAnswer = () => {
    saveScoreMovesetGame(score);
    setScoreSaved(true); // Set scoreSaved to true after the score is saved
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

  console.log(
    canPoke1LearnMove,
    canPoke2LearnMove,
    canPoke3LearnMove,
    moveAccuracy,
    moveDamageClass,
    moveName,
    movePower,
    movePP,
    movePriority,
    moveType
  );

  return (
    <div className="page_MSG">
      <div className="side-navigationpage_MSG">
        <Sidenavigation className="side-navigationpage_MSG" />
      </div>
      <div className="right-container_HL">
        <div className="top-container_MSG">
          <div className="score_MSG">
            <Score score={score} />
            <Highscore highscore={highscore} />
          </div>
        </div>

        <div className="mid-container_MSG">
          {pokemons.length > 0 && (
            <Fade in={true} timeout={2000} key={pokemons[0].name}>
              <div className={`container_MSG ${isMarked1 ? "marked" : ""}`}>
                <PokemonCard
                  pokemon={pokemons[0]}
                  id="1"
                  onClick={() => {
                    setIsMarked1(!isMarked1);
                  }}
                />
              </div>
            </Fade>
          )}
          {pokemons.length > 1 && (
            <Fade in={true} timeout={2000} key={pokemons[1].name}>
              <div className={`container_MSG ${isMarked2 ? "marked" : ""}`}>
                <PokemonCard
                  pokemon={pokemons[1]}
                  id="2"
                  onClick={() => {
                    setIsMarked2(!isMarked2);
                  }}
                />
              </div>
            </Fade>
          )}
          {pokemons.length > 2 && (
            <Fade in={true} timeout={2000} key={pokemons[2].name}>
              <div className={`container_MSG ${isMarked3 ? "marked" : ""}`}>
                <PokemonCard
                  pokemon={pokemons[2]}
                  id="3"
                  onClick={() => {
                    setIsMarked3(!isMarked3);
                  }}
                />
              </div>
            </Fade>
          )}
        </div>
        <div className="bottom-Container_MSG">
          <Fade in={true} timeout={2000} key={moveName}>
            <div
              className="answerContainer_MSG"
              onClick={() =>
                clickHandlerReadResults(document.querySelectorAll(".container"))
              }
              draggable={false}
              isClickable={isClickable ? "true" : "false"}
            >
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
          </Fade>
        </div>
      </div>
    </div>
  );
};
export default MoveSetGamePage;
