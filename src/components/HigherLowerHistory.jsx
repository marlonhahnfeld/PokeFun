import React, { useState, useEffect } from "react";
import { capitalizeFirstLetter } from "../utils/HigherLowerUtil";
import "../styles/HLHistory.css";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

const HLHistory = ({ history }) => {
  const [pokemonHistory, setPokemonHistory] = useState([]);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    if (Array.isArray(history)) {
      const newPokemons = history.filter(
        (pokemon) => !pokemonHistory.some((p) => p.name === pokemon.name)
      );
      setPokemonHistory((prev) => [...prev, ...newPokemons]);
    } // eslint-disable-next-line
  }, [history]);

  return (
    <div className="history-container">
      <div>
        <Button onClick={handleOpen} className="button">
          Show History
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          className="modal"
        >
          <Box className="box">
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Previous Pokemon
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              {pokemonHistory.slice(0, -2).flatMap((pokemon, index) => [
                <div key={index} className="test2">{`${capitalizeFirstLetter(
                  pokemon.name
                )}`}</div>,
                (index + 1) % 2 === 0 ? (
                  <div key={`blank-${index}`} className="test2">
                    &nbsp;
                  </div>
                ) : null,
              ])}
            </Typography>
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default HLHistory;
