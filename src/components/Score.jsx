import React from "react";
import Typography from "@mui/material/Typography";
import Grow from "@mui/material/Grow";
import "../styles/Score.css";

export const Score = ({ score }) => {
  return (
    <Grow in={true} timeout={1000} key={score}>
      <Typography variant="h2" className="score" title="">
        Score: {score}
      </Typography>
    </Grow>
  );
};

export default Score;
