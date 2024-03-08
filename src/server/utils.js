const GuessThePokemon = require("../server/models.js");

const datenbank_add = async (sprite, name) => {
  const pokemon = new GuessThePokemon({
    Sprite: sprite,
    Name: name,
  });
  pokemon.save();
};

module.exports = { datenbank_add };
