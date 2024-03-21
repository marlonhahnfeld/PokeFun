import React from "react";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import "../styles/Sidenavigation.css";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import GamepadIcon from "@mui/icons-material/Gamepad";
import SettingsIcon from "@mui/icons-material/Settings";
import InfoIcon from "@mui/icons-material/Info";
import Typography from "@mui/material/Typography";
import Grow from "@mui/material/Grow";

const NavigationItem = ({ to, children }) => (
  <li className="navigation">
    <Link to={to}>
      <Button className="navigation-button">
        {/* <Icon className="navigation-icon" /> */}
        <h5>{children}</h5>
      </Button>
    </Link>
  </li>
);

const Sidenavigation = () => {
  return (
    <>
      <div className="side-navigation" draggable="false">
        <div className="header">
          <Link to="/">
            <Grow in={true} timeout={1000} className="higherlowertitle">
              <Typography variant="h4" title="">
                PokeFun
              </Typography>
            </Grow>
          </Link>
        </div>
        <ul className="games">
          <NavigationItem to="/higherorlower">Higher or Lower</NavigationItem>
          <NavigationItem to="/movesetgame">Moveset Game</NavigationItem>
          <NavigationItem to="/guessthepokemon">
            Guess the Pokemon
          </NavigationItem>
        </ul>
        <ul className="other">
          <NavigationItem to="/leaderboards">Leaderboards</NavigationItem>
          <NavigationItem to="/about">About</NavigationItem>
          <NavigationItem to="/settings">Settings</NavigationItem>
        </ul>
      </div>
    </>
  );
};

export default Sidenavigation;
