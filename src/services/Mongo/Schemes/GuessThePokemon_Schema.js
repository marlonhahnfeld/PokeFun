const mongoose = require("mongoose");

const GuessThePokemonSchema = new mongoose.Schema({
  Sprite: String,
  Name: String,
});

module.exports = mongoose.model("GuessThePokemon", GuessThePokemonSchema);
