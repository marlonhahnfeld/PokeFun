import React from "react";
import "../styles/TotalStats.css";

const TotalStats = ({ totalStats }) => {
  return (
    <div className="total-stats">
      <h2>Total stats: {totalStats}</h2>
    </div>
  );
};

export default TotalStats;
