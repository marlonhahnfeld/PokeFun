const { default: mongoose } = require("mongoose");
const monogoose = require("mongoose");

const GuessThePokemon = require("./Schema");

mongoose.connect("mongodb://localhost:27017/Pokemon");

run();
async function run() {
  const user = new GuessThePokemon({
    name: "test",
    sprite: "path/pathchildren/x",
  });

  //   user.save().then(() => console.log("pokemon saved"));

  const allPokemon = await GuessThePokemon.find({ name: /^m/i });
  console.log(allPokemon);
}
