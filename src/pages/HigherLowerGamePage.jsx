import React, { useEffect } from "react";
import "../styles/HigherLowerPageCSS.css";
import { useState } from "react";
import usePokemonFetchWithTotalStats from "../hooks/usePokemonFetchWithTotalStats";
import { sumBaseStats } from "../utils/HigherLowerUtil";
import PokemonCard from "../components/PokemonCard";
import Score from "../components/Score";
import { isHigherCardClicked } from "../utils/HigherLowerUtil";
import TotalStats from "../components/TotalStats";
import Typography from "@mui/material/Typography";
import Grow from "@mui/material/Grow";
import Sidenavigation from "../components/Sidenavigation";
// import HLHistory from "../components/HigherLowerHistory";
import { saveScoreHigherLower } from "../server/dbutils";
import Highscore from "../components/Highscore";
import { getHighscoreForHigherLower } from "../server/dbutils";

const HigherLowerGamePage = () => {
  const [score, setScore] = useState(0);
  const [roundDone, setRoundDone] = useState(false);
  const [isClickable, setIsClickable] = useState(true);
  const [lastFetchTime, setLastFetchTime] = useState(0);
  const { pokemons, totalStats, setTotalStats } = usePokemonFetchWithTotalStats(
    roundDone,
    2
  );
  const [highscore, setHighscore] = useState(null);
  const [scoreSaved, setScoreSaved] = useState(false);

  useEffect(() => {
    getHighscoreForHigherLower()
      .then((highscore) => {
        setHighscore(highscore);
        setScoreSaved(false); // Set scoreSaved to false after the highscore is fetched
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [scoreSaved]); // Add scoreSaved as a dependency

  const handleClickCard = (cardNumber) => {
    const currentTime = new Date().getTime();
    // Check if the card is clickable and if 1 second has passed since the last fetch
    if (!isClickable || currentTime - lastFetchTime < 1000) {
      return;
    }
    // Set the last fetch time to the current time
    setLastFetchTime(currentTime);
    setIsClickable(false);
    const totalStatsForPokemon1 = sumBaseStats(pokemons[0]);
    const totalStatsForPokemon2 = sumBaseStats(pokemons[1]);
    // Show the total stats
    setTotalStats([totalStatsForPokemon1, totalStatsForPokemon2]);

    if (isHigherCardClicked(pokemons[0], pokemons[1], cardNumber)) {
      setScore((prev) => prev + 1);
    } else {
      saveScoreHigherLower(score);
      setScoreSaved(true); // Set scoreSaved to true after the score is saved
      setScore(0);
    }

    setTimeout(() => {
      setRoundDone((prev) => !prev);
      setIsClickable(true);
    }, 1000);
  };

  return (
    <>
      <div className="page_HL">
        <div className="side-navigation_hl">
          <Sidenavigation className="side-navigation_hl" />
        </div>
        <div className="right-container_HL">
          <div className="top-container_HL">
            <Grow in={true} timeout={1000} className="higherlowertitle">
              <Typography variant="h2" title="">
                Higher or Lower
              </Typography>
            </Grow>
          </div>
          <div className="mid-container_HL">
            <div
              className="card_HL"
              onClick={() => {
                handleClickCard(1);
              }}
            >
              <PokemonCard pokemon={pokemons[0]} id="1" />
              <TotalStats totalStats={totalStats[0]} />
            </div>

            <div className="score_HL">
              <Highscore highscore={highscore} />
              <Score score={score} />
              {/* <HLHistory history={[pokemons[0], pokemons[1]]} /> */}
            </div>
            <div
              className="card_HL"
              onClick={() => {
                handleClickCard(2);
              }}
            >
              <PokemonCard pokemon={pokemons[1]} id="2" />
              <TotalStats totalStats={totalStats[1]} />
            </div>
          </div>

          <div className="bottom-container_HL"></div>
        </div>
      </div>
    </>
  );
};

export default HigherLowerGamePage;
