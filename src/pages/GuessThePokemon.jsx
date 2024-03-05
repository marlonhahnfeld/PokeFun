import "../styles/GuessThePokemon.css";
import React from "react";
import { useState } from "react";
import { Score } from "../components/Score";
import ShapeIcon from "../resources/ShapeIcon.png";
import ArtworkIcon from "../resources/ArtworkIcon.png";

const GuessThePokemon = () => {
  const [score, setScore] = useState(0); // eslint-disable-next-line
  console.log("hi");

  return (
    <div className="page_GTP">
      <div className="right-container_GTP">
        <div className="top-container_GTP">
          <h4>PokeFun</h4>
        </div>
      </div>
      <div className="mid-container_GTP">
        <div className="hintBox_GTP">
          {" "}
          <h4> Guess The Pokemon! </h4>
          <div className="hintBoxIcons_GTP">
            <div className="hintBoxIcon_GTP">
              <img src={ArtworkIcon} alt={ShapeIcon} />
              <p className="hintBoxIconText_GTP">
                artwork hint in 5 wrong answers
              </p>
            </div>
            <div className="hintBoxIcon_GTP">
              <img src={ShapeIcon} alt={ArtworkIcon} />
              <p className="hintBoxIconText_GTP">
                shape hint in 10 wrong answers
              </p>
            </div>
          </div>
        </div>
        <div className="answerContainer_GTP">
          <input type="text" placeholder="Type Pokemon name..." />
          <button type="submit">Go</button>
        </div>
        <div className="score">
          <Score score={score} />
        </div>
      </div>
      <div className="bottom-Container_GTP">
        <div className="boxes_GTP">
          <div className="box_GTP">
            <h4 className="topText"> Pokemon </h4>
            <p className="bottomText"> pokemon.sprite </p>
          </div>
          <div className="box_GTP">
            <h4 className="topText"> Typ </h4>
            <p className="bottomText"> typ.sprite </p>
          </div>
          <div className="box_GTP">
            <h4 className="topText"> Height </h4>
            <p className="bottomText"> pokemon.height,hl_sprite </p>
          </div>
          <div className="box_GTP">
            <h4 className="topText"> weight </h4>
            <p className="bottomText"> pokemon.weight,hl_sprite </p>
          </div>
          <div className="box_GTP">
            <h4 className="topText"> Total Stats </h4>
            <p className="bottomText"> pokemon.totalstats,hl_sprite </p>
          </div>
          <div className="box_GTP">
            <h4 className="topText"> Lebensraum </h4>
            <p className="bottomText"> pokemon.habitat </p>
          </div>
          <div className="box_GTP">
            <h4 className="topText"> Growth_Rate </h4>
            <p className="bottomText"> pokemon.growth_rate,hl_sprite </p>
          </div>
          <div className="box_GTP">
            <h4 className="topText"> Capture_rate </h4>
            <p className="bottomText"> pokemon.capture_rate,hl_sprite </p>
          </div>{" "}
        </div>
      </div>
    </div>
  );
};
export default GuessThePokemon;
