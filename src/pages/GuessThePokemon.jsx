import "../styles/GuessThePokemon.css";
import React from "react";
import usePokemonFetchWithMoves from "../hooks/usePokemonFetchWithMoveset";
import { useState } from "react";
import { Score } from "../components/Score";
import GuessThePokemonBoxesCard from "../components/GuessThePokemonBoxesCard";
import { fetchPokemonStartingWithInput_FromMongo } from "../utils/GuessThePokemonUtil";
import PokemonList from "../components/ui/PokemonList";

const GuessThePokemon = () => {
  const [score, setScore] = useState(0); // eslint-disable-next-line
  const [roundDone, setRoundDone] = useState(false);
  // da war nach pokemons noch ein , fetchPokemon welches ich in 63 ersetzt habe um richtig fetchen zu können
  // pokemons == soltuionPokemonArray
  const { pokemons } = usePokemonFetchWithMoves(roundDone, 1);
  const [suggestions, setSuggestions] = useState();
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [selectedPokemons, setSelectedPokemons] = useState([]);
  const lastSelectedPokemonRef = React.useRef();
  const fetchNewSolutionPokemon = () => {
    setRoundDone(true);
  };

  const resetSelectedPokemons = () => {
    // Reset the selectedPokemons here
    // This will depend on how you're handling the selectedPokemons
    // But it could be as simple as setting the state back to an empty array:
    setSelectedPokemons([]);
  };
  // // TODO 1. CSS fixen box knockt topcontainer weg + answerContainer_GTP überlappt nun damit
  // // TODO 2. Css von PokemonList anpassen
  // // TODO 3. PokemonList onClick Logik einbauen
  // // TODO 3. Pokemon von PokemonList in SubmitBox einfügen, dann anhand dem Namen das richtige Objekt
  // // TODO 3. aus der API zocken und das dann bei GuessThePokemon_BoxesCard neben solutionPokemon als Pokemon übergeben
  //  // TODO 4. PokemonList capitalizeFirstLetter & sortieren nach Alphabet
  // // TODO 5. SelectedPokemon mit SolutionPokemon vergleichen und dann die richtigen Icons anzeigen sowie CSS anpassen
  // ? TODO 6. Bereits versuchtes Pokemon aus PokemonListe entfernen für den Run
  // // TODO 7. Score implementieren
  // // TODO 8. HandleCorrectAnswer implementieren
  // // TODO 9. Neu fetchen von Pokemon wenn richtig geraten sowie das entfernen alter selectedPokemons
  // ? TODO 8. Css anpassen für Hintergrundfarbe der Boxen harmloseres Orange mit Glaseffekt oder anderes
  // ? TODO 9. CSS anpassen für eingesetzte Pokemon innerhalb Suchleiste statt Text noch kleines Image daneben maybe

  // auto-scroll zum letzten hinzugefügten Pokemon
  React.useEffect(() => {
    if (lastSelectedPokemonRef.current) {
      lastSelectedPokemonRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [selectedPokemons]);

  React.useEffect(() => {
    if (selectedPokemon) {
      setInputValue(selectedPokemon.name);
    }
  }, [selectedPokemon]);

  const resetSelectedPokemon = () => {
    setSelectedPokemon(null);
  };

  const handleInputChange = async (event) => {
    setInputValue(event.target.value);
    if (event.target.value.length > 0) {
      const fetchedPokemon = await fetchPokemonStartingWithInput_FromMongo(
        event.target.value
      );
      setSuggestions(fetchedPokemon);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const fetchPokemon = async (pokemonName) => {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
    );
    const pokemonData = await response.json();
    return pokemonData;
  };

  const handleSubmit = async () => {
    if (selectedPokemon) {
      const pokemonData = await fetchPokemon(selectedPokemon.name);
      setSelectedPokemons([...selectedPokemons, pokemonData]);
      setSelectedPokemon(null);
      setInputValue("");
    }
  };

  return (
    <div className="page_GTP">
      <div className="right-container_GTP">
        <div className="top-container_GTP">
          <h4>PokeFun</h4>
        </div>
      </div>
      <div className="mid-container_GTP">
        {/* <div className="hintBox_GTP">
          {" "}
          <h4> Guess The Pokemon! </h4>
          <div className="hintBoxIcons_GTP">
            <div className="hintBoxIcon_GTP">
              <img src={ArtworkIcon} alt={ShapeIcon} />
              <p className="hintBoxIconText_GTP">
                artwork hint in 5 wrong answers
              </p>
            </div>
            <div className="hintBoxIcon_GTP">
              <img src={ShapeIcon} alt={ArtworkIcon} />
              <p className="hintBoxIconText_GTP">
                shape hint in 10 wrong answers
              </p>
            </div>
          </div>
        </div> */}
        <div className="answerContainer_GTP">
          <input
            type="text"
            placeholder="Type Pokemon name..."
            value={inputValue}
            onChange={handleInputChange}
          />
          <button type="submit" onClick={handleSubmit}>
            Go
          </button>
        </div>
        {showSuggestions && suggestions && (
          <PokemonList
            suggestions={suggestions}
            onPokemonSelected={(pokemon) => {
              setSelectedPokemon(pokemon);
              setInputValue(pokemon.name);
              setShowSuggestions(false);
            }}
          />
        )}
        <div className="score">
          <Score score={score} />
        </div>
        <div className="pokemon-container_GTP">
          {selectedPokemons.map((pokemon, index) => (
            <div
              ref={
                index === selectedPokemons.length - 1
                  ? lastSelectedPokemonRef
                  : null
              }
              className="bottom-Container_GTP"
              key={index}
            >
              <GuessThePokemonBoxesCard
                selectedPokemon={pokemon}
                solutionPokemon={pokemons[0]}
                increaseScore={() => setScore(score + 1)}
                resetSelectedPokemon={resetSelectedPokemon}
                score={score}
                fetchNewSolutionPokemon={fetchNewSolutionPokemon}
                resetSelectedPokemons={resetSelectedPokemons}
                setRoundDone={setRoundDone}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default GuessThePokemon;
