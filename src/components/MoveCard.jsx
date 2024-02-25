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
        <h2>{moveName}</h2>
        <h3>{moveType}</h3>
      </div>
    </div>
  );
};

export default MoveCard;