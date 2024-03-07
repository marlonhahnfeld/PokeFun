import React from "react";
import { Link } from "react-router-dom";
import "../styles/LPHeader.css";
import Typography from "@mui/material/Typography";
import Grow from "@mui/material/Grow";

const TopNav = () => {
  return (
    <div className="header_tn">
      <div className="header-left"></div>
      <div className="title_lp">
        <Grow in={true} timeout={1000} className="higherlowertitle">
          <Typography variant="h4" title="">
            PokeFun
          </Typography>
        </Grow>
      </div>
      <div className="header-right">
        <Link to="/login">
          <button className="header-button">Login</button>
        </Link>
      </div>
    </div>
  );
};

export default TopNav;
