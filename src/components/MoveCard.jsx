import React from "react";
import "../styles/MoveCard.css";
import physical_move from "../resources/physical_move.png";
import special_move from "../resources/special_move.png";
import TypeComponent from "./TypeComponent";

const MoveCard = ({
  moveAccuracy,
  moveDamageClass,
  moveName,
  movePower,
  movePP,
  movePriority,
  moveType,
}) => {
  let damageClassImage;
  if (moveDamageClass) {
    damageClassImage =
      moveDamageClass === "physical" ? physical_move : special_move;
  }

  // TODO Extrahiere Typ-Icons(JSX & CSS) in eine neue typeCard, da das auch für pokemonCard,
  // TODO als auch moveCard nützlich ist.

  return (
    <div className="moveCard-container">
      <div className="moveCard">
        <h3 className="moveName">{moveName}</h3>
        <div className="typeComponent">
          <TypeComponent type={moveType} />
        </div>
        <h5 className="movePower">
          {"Power: " + (movePower !== null ? movePower : "--")}
        </h5>
        <h5 className="movePP">{"PP: " + movePP}</h5>
        <h5 className="movePriority">{"Prio: " + movePriority}</h5>
        {moveDamageClass && (
          <img
            className="moveDamageClass"
            src={damageClassImage}
            alt={moveDamageClass}
          />
        )}
        <h5 className="moveAccuracy">
          {"Accuracy: " + (moveAccuracy !== null ? moveAccuracy : "--")}
        </h5>
      </div>
    </div>
  );
};

export default MoveCard;
