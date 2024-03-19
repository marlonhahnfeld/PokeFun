import React from "react";
import Typography from "@mui/material/Typography";
import Grow from "@mui/material/Grow";
import "../styles/Logo.css";

const Logo = ({ text }) => {
  return (
    <div className="logo">
      <Grow in={true} timeout={1000}>
        <Typography variant="h4" title="">
          {text}
        </Typography>
      </Grow>
    </div>
  );
};

export default Logo;
