import React from "react";
import "../styles/TypeComponent.css";
import bugIcon from "../resources/bug.svg";
import darkIcon from "../resources/dark.svg";
import dragonIcon from "../resources/dragon.svg";
import electricIcon from "../resources/electric.svg";
import fairyIcon from "../resources/fairy.svg";
import fightingIcon from "../resources/fighting.svg";
import fireIcon from "../resources/fire.svg";
import flyingIcon from "../resources/flying.svg";
import ghostIcon from "../resources/ghost.svg";
import grassIcon from "../resources/grass.svg";
import groundIcon from "../resources/ground.svg";
import iceIcon from "../resources/ice.svg";
import normalIcon from "../resources/normal.svg";
import poisonIcon from "../resources/poison.svg";
import psychicIcon from "../resources/psychic.svg";
import rockIcon from "../resources/rock.svg";
import steelIcon from "../resources/steel.svg";
import waterIcon from "../resources/water.svg";

const TypeComponent = ({ type }) => {
  let typeIcon;
  switch (type) {
    case "bug":
      typeIcon = bugIcon;
      break;
    case "dark":
      typeIcon = darkIcon;
      break;
    case "dragon":
      typeIcon = dragonIcon;
      break;
    case "electric":
      typeIcon = electricIcon;
      break;
    case "fairy":
      typeIcon = fairyIcon;
      break;
    case "fighting":
      typeIcon = fightingIcon;
      break;
    case "fire":
      typeIcon = fireIcon;
      break;
    case "flying":
      typeIcon = flyingIcon;
      break;
    case "ghost":
      typeIcon = ghostIcon;
      break;
    case "grass":
      typeIcon = grassIcon;
      break;
    case "ground":
      typeIcon = groundIcon;
      break;
    case "ice":
      typeIcon = iceIcon;
      break;
    case "normal":
      typeIcon = normalIcon;
      break;
    case "poison":
      typeIcon = poisonIcon;
      break;
    case "psychic":
      typeIcon = psychicIcon;
      break;
    case "rock":
      typeIcon = rockIcon;
      break;
    case "steel":
      typeIcon = steelIcon;
      break;
    case "water":
      typeIcon = waterIcon;
      break;
    // Fügen Sie die restlichen Fälle hier hinzu...
    default:
      typeIcon = null;
  }

  return (
    <div className={`icon ${type} type`}>
      <img src={typeIcon} alt={`${type} icon`} />
    </div>
  );
};

export default TypeComponent;
