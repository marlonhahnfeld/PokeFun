const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  sprite: String,
});

//model gibt an, wie die collection heißt und welches schema verwendet wird
module.exports = mongoose.model("GuessThePokemon", userSchema);
