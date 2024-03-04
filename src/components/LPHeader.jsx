import React from "react";
import { Link } from "react-router-dom";
import "../styles/LPHeader.css";
import Typography from "@mui/material/Typography";
import Grow from "@mui/material/Grow";

const TopNav = () => {
  return (
    <div className="header_tn">
      <div className="header-left">
        <Link to="#" className="header-link">
          Settings
        </Link>
        <Link to="#" className="header-link">
          About
        </Link>
      </div>
      <div className="title_lp">
        <Grow in={true} timeout={1000} className="higherlowertitle">
          <Typography variant="h4" title="">
            PokeFun
          </Typography>
        </Grow>
      </div>
      <div className="header-right">
        <button className="header-button">Sign In</button>
      </div>
    </div>
  );
};

export default TopNav;
