const mongoose = require("mongoose");

const GuessThePokemonSchema = new mongoose.Schema({
  Sprite: String,
  Name: String,
});

const GuessThePokemon = mongoose.model(
  "GuessThePokemon",
  GuessThePokemonSchema
);

module.exports = GuessThePokemon;
