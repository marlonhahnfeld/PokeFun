import React from "react";
import "../styles/TotalStats.css";
import Grow from "@mui/material/Grow";

const TotalStats = ({ totalStats }) => {
  return (
    <Grow in={true} timeout={1000} key={totalStats}> 
    <div className="total-stats">
      <h2>Total stats: {totalStats}</h2>
    </div>
    </Grow>
  );
};

export default TotalStats;
