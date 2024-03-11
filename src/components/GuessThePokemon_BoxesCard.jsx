import * as React from "react";
import "../styles/GuessThePokemon_BoxesCard.css";
import arrowUpIcon from "../resources/arrowUp.png";
import arrowDownIcon from "../resources/arrowDown.png";
import { capitalizeFirstLetter } from "../utils/HigherLowerUtil";
import { sumBaseStats } from "../utils/HigherLowerUtil";

// TODO implement logic to display correct arrowIcon by comparing pokemon characteristics
// TODO Datenbank aufsetzen mit allen Pokemon dann von submitButton pokemon haben
// TODO eventuell Gen-locken
// // TODO Hyper Visualisierung im BIOS aktivieren

const GuessThePokemon_BoxesCard = ({
  selectedPokemon,
  solutionPokemon,
  increaseScore,
  resetSelectedPokemon,
  score,
  resetSelectedPokemons,
  fetchNewSolutionPokemon,
}) => {
  const [selectedPokemonGrowthRate, setSelectedPokemonGrowthRate] =
    React.useState(null);
  const [selectedPokemonCaptureRate, setSelectedPokemonCaptureRate] =
    React.useState(null);
  const [solutionPokemonGrowthRate, setSolutionPokemonGrowthRate] =
    React.useState(null);
  const [solutionPokemonCaptureRate, setSolutionPokemonCaptureRate] =
    React.useState(null);

  React.useEffect(() => {
    if (
      selectedPokemon &&
      solutionPokemon &&
      selectedPokemon.name === solutionPokemon.name
    ) {
      increaseScore();
      alert("You won! The score is now " + (score + 1));
      setTimeout(() => {
        resetSelectedPokemon();
        resetSelectedPokemons();
        fetchNewSolutionPokemon();
      }, 5000);
    }
  }, [selectedPokemon, solutionPokemon]);

  React.useEffect(() => {
    // Fetch data for selectedPokemon
    fetch(selectedPokemon.species.url)
      .then((response) => response.json())
      .then((data) => {
        setSelectedPokemonGrowthRate(data.growth_rate.name);
        setSelectedPokemonCaptureRate(data.capture_rate);
      });

    // Fetch data for solutionPokemon
    fetch(solutionPokemon.species.url)
      .then((response) => response.json())
      .then((data) => {
        setSolutionPokemonGrowthRate(data.growth_rate.name);
        setSolutionPokemonCaptureRate(data.capture_rate);
      });
  }, [selectedPokemon, solutionPokemon]);

  console.log(selectedPokemon, solutionPokemon);

  const heightArrowIcon =
    selectedPokemon.height < solutionPokemon.height
      ? arrowUpIcon
      : selectedPokemon.height > solutionPokemon.height
      ? arrowDownIcon
      : null;
  const heightBackgroundColor =
    selectedPokemon.height !== solutionPokemon.height ? "orange" : "green";

  const weightArrowIcon =
    selectedPokemon.weight < solutionPokemon.weight
      ? arrowUpIcon
      : selectedPokemon.weight > solutionPokemon.weight
      ? arrowDownIcon
      : null;
  const weightBackgroundColor =
    selectedPokemon.weight !== solutionPokemon.weight ? "orange" : "green";

  const totalStatsArrowIcon =
    sumBaseStats(selectedPokemon) < sumBaseStats(solutionPokemon)
      ? arrowUpIcon
      : sumBaseStats(selectedPokemon) > sumBaseStats(solutionPokemon)
      ? arrowDownIcon
      : null;
  const totalStatsBackgroundColor =
    sumBaseStats(selectedPokemon) !== sumBaseStats(solutionPokemon)
      ? "orange"
      : "green";

  const captureRateArrowIcon =
    selectedPokemonCaptureRate < solutionPokemonCaptureRate
      ? arrowUpIcon
      : selectedPokemonCaptureRate > solutionPokemonCaptureRate
      ? arrowDownIcon
      : null;
  const captureRateBackgroundColor =
    selectedPokemonCaptureRate !== solutionPokemonCaptureRate
      ? "orange"
      : "green";

  const growthRateBackgroundColor =
    selectedPokemonGrowthRate === solutionPokemonGrowthRate ? "green" : "red";

  const selectedTypes = selectedPokemon.types.map((type) => type.type.name);
  const solutionTypes = solutionPokemon.types.map((type) => type.type.name);

  let typeBackgroundColor = "red";
  if (selectedTypes.sort().join("-") === solutionTypes.sort().join("-")) {
    typeBackgroundColor = "green";
  } else if (selectedTypes.some((type) => solutionTypes.includes(type))) {
    typeBackgroundColor = "orange";
  }

  return (
    <div className="boxes_GTP">
      <div className="box_GTP">
        <h4 className="topText"> Pokemon </h4>
        <img
          className="bottomText"
          src={selectedPokemon.sprites.front_default}
          alt="Pokemon"
          title={selectedPokemon.name}
        />
      </div>
      <div
        className="box_GTP"
        style={{
          backgroundColor: typeBackgroundColor,
        }}
      >
        <h4 className="topText"> Typ </h4>
        <p className="bottomText">
          {capitalizeFirstLetter(selectedPokemon.types[0].type.name) +
            (selectedPokemon.types[1]
              ? "-" + capitalizeFirstLetter(selectedPokemon.types[1].type.name)
              : "")}
        </p>
      </div>
      <div
        className="box_GTP"
        style={{
          backgroundImage: `url(${heightArrowIcon})`,
          backgroundColor: heightBackgroundColor,
        }}
      >
        <h4 className="topText"> Height </h4>
        <p className="bottomText"> {selectedPokemon.height * 10 + "cm"} </p>
      </div>
      <div
        className="box_GTP"
        style={{
          backgroundColor: weightBackgroundColor,
          backgroundImage: weightArrowIcon ? `url(${weightArrowIcon})` : null,
        }}
      >
        <h4 className="topText"> Weight </h4>
        <p className="bottomText"> {selectedPokemon.weight / 10 + "kg"} </p>
      </div>
      <div
        className="box_GTP"
        style={{
          backgroundColor: totalStatsBackgroundColor,
          backgroundImage: totalStatsArrowIcon
            ? `url(${totalStatsArrowIcon})`
            : null,
        }}
      >
        <h4 className="topText"> Total Stats </h4>
        <p className="bottomText">{sumBaseStats(selectedPokemon)}</p>
      </div>
      <div
        className="box_GTP"
        style={{
          backgroundColor: growthRateBackgroundColor,
        }}
      >
        <h4 className="topText"> Growth_Rate </h4>
        <p className="bottomText">
          {" "}
          {capitalizeFirstLetter(selectedPokemonGrowthRate)}{" "}
        </p>
      </div>
      <div
        className="box_GTP"
        style={{
          backgroundColor: captureRateBackgroundColor,
          backgroundImage: captureRateArrowIcon
            ? `url(${captureRateArrowIcon})`
            : null,
        }}
      >
        <h4 className="topText"> Capture_rate </h4>
        <p className="bottomText"> {selectedPokemonCaptureRate}</p>
      </div>{" "}
    </div>
  );
};

export default GuessThePokemon_BoxesCard;
