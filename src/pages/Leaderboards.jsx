import React, { useEffect, useState } from "react";
import "../styles/Leaderboards.css";
import Sidenavigation from "../components/Sidenavigation";
const Leaderboards = () => {
  const [highScores, setHighScores] = useState({ GTP: [], MSG: [], HL: [] });

  useEffect(() => {
    // Fetch high scores for each game
    fetchHighScore4Game("guessThePokemon").then((data) => {
      setHighScores({ GTP: data });
    });

    fetchHighScore4Game("mySecondGame").then((data) => {
      setHighScores({ MSG: data });
    });

    fetchHighScore4Game("myThirdGame").then((data) => {
      setHighScores({ HL: data });
    });
  });

  const fetchHighScore4Game = async (game) => {
    return fetch("https://poke-fun-backend.vercel.app/fetchHighScore4Game", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        game: game,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        return data; // Access the highscore from the data object
      })
      .catch((error) => {
        console.error("Error:", error);
        throw error;
      });
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
            <div key={game}>
              <h3>{game}</h3>
              <ol>
                {highScores[game].map((score, index) => (
                  <li key={index}>{score}</li>
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
