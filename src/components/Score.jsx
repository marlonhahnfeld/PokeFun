import React from "react";
import "../styles/Score.css";

export const Score = ({ score }) => {
  return (
    <h4 className="score" title="">
      Score: {score}
    </h4>
  );
};

export default Score;
