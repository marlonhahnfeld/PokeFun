import * as React from "react";
import "../styles/GuessThePokemon_BoxesCard.css";
import arrowUpIcon from "../resources/arrowUp.png";
import arrowDownIcon from "../resources/arrowDown.png";
import { capitalizeFirstLetter } from "../utils/HigherLowerUtil";

// TODO implement logic to display correct arrowIcon by comparing pokemon characteristics
// TODO Datenbank aufsetzen mit allen Pokemon dann von submitButton pokemon haben
// TODO eventuell Gen-locken
// TODO Hyper Visualisierung im BIOS aktivieren

const GuessThePokemon_BoxesCard = ({ pokemon, solutionPokemon }) => {
  const [solutionPokemonGrowthRate, setSolutionPokemonGrowthRate] =
    React.useState(null);
  const [solutionPokemonCaptureRate, setSolutionPokemonCaptureRate] =
    React.useState(null);

  React.useEffect(() => {
    fetch(solutionPokemon.species.url)
      .then((response) => response.json())
      .then((data) => {
        setSolutionPokemonGrowthRate(data.growth_rate.name);
        setSolutionPokemonCaptureRate(data.capture_rate);
      });
  }, [solutionPokemon]);

  console.log(solutionPokemon);

  return (
    <div className="boxes_GTP">
      <div className="box_GTP">
        <h4 className="topText"> Pokemon </h4>
        <img
          className="bottomText"
          src={solutionPokemon.sprites.front_default}
          alt="Pokemon"
          title={solutionPokemon.name}
        />
      </div>
      <div className="box_GTP">
        <h4 className="topText"> Typ </h4>
        <p className="bottomText">
          {" "}
          {capitalizeFirstLetter(solutionPokemon.types[0].type.name) +
            (solutionPokemon.types[1]
              ? "-" + capitalizeFirstLetter(solutionPokemon.types[1].type.name)
              : "")}
        </p>
      </div>
      <div
        className="box_GTP"
        style={{ backgroundImage: `url(${arrowUpIcon})` }}
      >
        <h4 className="topText"> Height </h4>
        <p className="bottomText"> {solutionPokemon.height + "cm"} </p>
      </div>
      <div
        className="box_GTP"
        style={{ backgroundImage: `url(${arrowUpIcon})` }}
      >
        <h4 className="topText"> weight </h4>
        <p className="bottomText"> {solutionPokemon.weight + "kg"}</p>
      </div>
      <div
        className="box_GTP"
        style={{ backgroundImage: `url(${arrowUpIcon})` }}
      >
        <h4 className="topText"> Total Stats </h4>
        <p className="bottomText">
          {" "}
          {solutionPokemon.stats[0].base_stat +
            solutionPokemon.stats[1].base_stat +
            solutionPokemon.stats[2].base_stat +
            solutionPokemon.stats[3].base_stat +
            solutionPokemon.stats[4].base_stat +
            solutionPokemon.stats[5].base_stat}
        </p>
      </div>
      <div className="box_GTP">
        <h4 className="topText"> Growth_Rate </h4>
        <p className="bottomText">
          {" "}
          {capitalizeFirstLetter(solutionPokemonGrowthRate)}
        </p>
      </div>
      <div
        className="box_GTP"
        style={{ backgroundImage: `url(${arrowUpIcon})` }}
      >
        <h4 className="topText"> Capture_rate </h4>
        <p className="bottomText"> {solutionPokemonCaptureRate}</p>
      </div>{" "}
    </div>
  );
};

export default GuessThePokemon_BoxesCard;
