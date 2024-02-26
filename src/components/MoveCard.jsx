import React from "react";

const MoveCard = ({ 
  moveAccuracy,
  moveDamageClass,
  moveName,
  movePower,
  movePP,
  movePriority,
  moveType }) => {
  return (
    <div className="moveCard-container">
      <div className="moveCard">
        <h3 className="moveName">{moveName}</h3>
        <h4 className="moveType">{moveType}</h4>
        <h5 className="movePower">{"Power: " + movePower}</h5>
        <h5 className="movePP">{"PP: " + movePP}</h5>
        <h5 className="movePriority">{"Prio: " + movePriority}</h5>
        <h5 className="moveDamageClass">{moveDamageClass}</h5>
        <h5 className="moveAccuracy">{"Accuracy: " + moveAccuracy}</h5>
      </div>
    </div>
  );
};

export default MoveCard;