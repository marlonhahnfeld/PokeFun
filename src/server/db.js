const mongoose = require("mongoose");

const GuessThePokemon = require("./Schemes/GuessThePokemon_Schema");

db = mongoose.connect("mongodb://localhost:27017/GuessThePokemon");

db.on("error", console.error.bind(console, "MongoDB Verbindungsfehler:"));

db.once("open", () => {
  console.log("MongoDB Verbindung erfolgreich!");
});

module.exports = db;
