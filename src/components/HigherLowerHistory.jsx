import React, { useState, useEffect } from "react";
import { capitalizeFirstLetter } from "../utils/HigherLowerUtil";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";

const HLHistory = ({ history }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [pokemonHistory, setPokemonHistory] = useState([]);

  const toggleHistory = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    if (Array.isArray(history)) {
      const newPokemons = history.filter(
        (pokemon) => !pokemonHistory.some((p) => p.name === pokemon.name)
      );
      setPokemonHistory((prev) => [...prev, ...newPokemons]);
    }// eslint-disable-next-line
  }, [history]);

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={toggleHistory}>
        Show History
      </Button>
      <Dialog open={isOpen} onClose={toggleHistory} scroll="paper">
        <DialogTitle>Pokemon History</DialogTitle>
        {pokemonHistory.slice(0, -2).map((pokemon, index) => (
          <div key={index}>{`${capitalizeFirstLetter(pokemon.name)}`}</div>
        ))}
      </Dialog>
    </div>
  );
};

export default HLHistory;
