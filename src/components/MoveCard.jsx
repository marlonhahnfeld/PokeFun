import React from "react";
import "../styles/MoveCard.css"
import physical_move from '../resources/physical_move.png';
import special_move from '../resources/special_move.png';
import bugIcon from '../resources/bug.svg';
import darkIcon from '../resources/dark.svg';
import dragonIcon from '../resources/dragon.svg';
import electricIcon from '../resources/electric.svg';
import fairyIcon from '../resources/fairy.svg';
import fightingIcon from '../resources/fighting.svg';
import fireIcon from '../resources/fire.svg';
import flyingIcon from '../resources/flying.svg';
import ghostIcon from '../resources/ghost.svg';
import grassIcon from '../resources/grass.svg';
import groundIcon from '../resources/ground.svg';
import iceIcon from '../resources/ice.svg';
import normalIcon from '../resources/normal.svg';
import poisonIcon from '../resources/poison.svg';
import psychicIcon from '../resources/psychic.svg';
import rockIcon from '../resources/rock.svg';
import steelIcon from '../resources/steel.svg';
import waterIcon from '../resources/water.svg';
// Importieren Sie die restlichen Icons hier...

const MoveCard = ({ 
  moveAccuracy,
  moveDamageClass,
  moveName,
  movePower,
  movePP,
  movePriority,
  moveType }) => {
  
  let damageClassImage;
  if (moveDamageClass) {
    damageClassImage = moveDamageClass === 'physical' ? physical_move : special_move;
  }

  let typeIcon;
  switch (moveType) {
    case 'bug':
      typeIcon = bugIcon;
      break;
    case 'dark':
      typeIcon = darkIcon;
      break;
    case 'dragon':
      typeIcon = dragonIcon;
      break;
      case 'electric':
      typeIcon = electricIcon;
      break;
      case 'fairy':
      typeIcon = fairyIcon;
      break;
      case 'fighting':
      typeIcon = fightingIcon;
      break;
      case 'fire':
      typeIcon = fireIcon;
      break;
      case 'flying':
      typeIcon = flyingIcon;
      break;
      case 'ghost':
      typeIcon = ghostIcon;
      break;
      case 'grass':
      typeIcon = grassIcon;
      break;
      case 'ground':
      typeIcon = groundIcon;
      break;
      case 'ice':
      typeIcon = iceIcon;
      break;
      case 'normal':
      typeIcon = normalIcon;
      break;
      case 'poison':
      typeIcon = poisonIcon;
      break;
      case 'psychic':
      typeIcon = psychicIcon;
      break;
      case 'rock':
      typeIcon = rockIcon;
      break;
      case 'steel':
      typeIcon = steelIcon;
      break;
      case 'water':
      typeIcon = waterIcon;
      break;
    // Fügen Sie die restlichen Fälle hier hinzu...
    default:
      typeIcon = null;
  }

  return (
    <div className="moveCard-container">
      <div className="moveCard">
        <h3 className="moveName">{moveName}</h3>
        <div className={`icon ${moveType} moveType`}>
        <img src={typeIcon} alt={`${moveType} icon`} />
        </div>
        <h5 className="movePower">{"Power: " + (movePower !== null ? movePower : "--")}</h5>
        <h5 className="movePP">{"PP: " + movePP}</h5>
        <h5 className="movePriority">{"Prio: " + movePriority}</h5>
        {moveDamageClass && <img className="moveDamageClass" src={damageClassImage} alt={moveDamageClass} />}
        <h5 className="moveAccuracy">{"Accuracy: " + (moveAccuracy !== null ? moveAccuracy : "--")}</h5>
      </div>
    </div>
  );
};

export default MoveCard;