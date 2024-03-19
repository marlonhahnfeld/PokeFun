import React from "react";
import { Link } from "react-router-dom";
import "../styles/LPHeader.css";
import Logo from "./Logo.jsx";

const TopNav = () => {
  return (
    <div className="header_tn">
      <div className="header-left"></div>
      <Logo text="PokeFun" />
      <div className="header-right">
        <Link to="/login">
          <button className="header-button">Login</button>
        </Link>
      </div>
    </div>
  );
};

export default TopNav;
