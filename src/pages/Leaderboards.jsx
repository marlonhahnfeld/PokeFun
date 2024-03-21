import React, { useEffect, useState } from "react";
import "../styles/Leaderboards.css";
import Sidenavigation from "../components/Sidenavigation";
import { fetchHighScoreForGame } from "../server/dbutils";
const Leaderboards = () => {
  const [highScores, setHighScores] = useState({ GTP: [], MSG: [], HL: [] });

  useEffect(() => {
    // Fetch high scores for each game
    fetchHighScoreForGame("guessThePokemon").then((data) => {
      setHighScores((prevState) => ({ ...prevState, GTP: data }));
    });

    fetchHighScoreForGame("movesetGame").then((data) => {
      setHighScores((prevState) => ({ ...prevState, MSG: data }));
    });

    fetchHighScoreForGame("higherLower").then((data) => {
      setHighScores((prevState) => ({ ...prevState, HL: data }));
    });
  }, []);

  const gameNames = {
    GTP: "GuessThePokemon",
    MSG: "Moveset Game",
    HL: "Higher or Lower",
  };

  return (
    <div className="page_leaderboards">
      <div className="side-navigation_leaderboards">
        <Sidenavigation className="side-navigation_leaderboards" />
      </div>
      <div className="right-container_leaderboards">
        <div className="top-container_leaderboards">
          <h2 style={{ fontSize: "40px" }}>Leaderboards</h2>
        </div>
        <div className="mid-container_leaderboards">
          {["GTP", "MSG", "HL"].map((game) => (
            <div key={game} className="TopUsers">
              <h2 className="gameTitle">{gameNames[game]}</h2>
              <ol>
                {highScores[game] &&
                  highScores[game].top_users &&
                  highScores[game].top_users.map((user, index) => (
                    <li key={index} className="TopUser">
                      <span className="rank">{index + 1 + "."}</span>{" "}
                      {user.username}: {user.score} {/* Added index + 1 */}
                    </li>
                  ))}
              </ol>
            </div>
          ))}
        </div>
        <div className="bottom-Container_leaderboards"></div>
      </div>
    </div>
  );
};

export default Leaderboards;
