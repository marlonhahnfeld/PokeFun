import React from "react";
import Typography from "@mui/material/Typography";
import Grow from "@mui/material/Grow";
import "../styles/HLHighscore.css";

const Highscore = ({ highscore }) => {
  return (
    <>
      <div className="highscore-component">
        <Grow in={true} timeout={1000} className="highscore-component">
          <Typography variant="h2" title="" className="highscore-text">
            Highscore: {highscore}
          </Typography>
        </Grow>
      </div>
    </>
  );
};

export default Highscore;
