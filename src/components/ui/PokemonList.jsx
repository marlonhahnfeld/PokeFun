import * as React from "react";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { FixedSizeList } from "react-window";
import { capitalizeFirstLetter } from "../../utils/HigherLowerUtil";

function renderRow(props, suggestions, setSelectedPokemon) {
  const { index, style } = props;
  const pokemon = suggestions[index];

  return (
    <ListItem style={style} key={index} component="div" disablePadding>
      <ListItemButton onClick={() => setSelectedPokemon(pokemon)}>
        <ListItemAvatar>
          <Avatar alt={pokemon.name} src={pokemon.spriteurl} />
        </ListItemAvatar>
        <ListItemText primary={capitalizeFirstLetter(pokemon.name)} />
      </ListItemButton>
    </ListItem>
  );
}

export default function PokemonList({ suggestions, onPokemonSelected }) {
  const [selectedPokemon, setSelectedPokemon] = React.useState(null);
  const sortedSuggestions = [...suggestions].sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  React.useEffect(() => {
    if (selectedPokemon) {
      onPokemonSelected(selectedPokemon);
    }
  }, [selectedPokemon, onPokemonSelected]);

  return (
    <Box
      sx={{
        position: "absolute",
        marginTop: "58px",
        marginRight: "60px",
        width: "100%",
        height: "100%",
        maxWidth: 340,
        maxHeight: 180,
        bgcolor: "#747272",
        color: "white", // Set the background color to off white
        zIndex: 1,
      }}
    >
      <FixedSizeList
        height={180}
        width={340}
        itemSize={46}
        itemCount={sortedSuggestions.length}
        overscanCount={5}
        children={(props) =>
          renderRow(props, sortedSuggestions, setSelectedPokemon)
        }
      />
    </Box>
  );
}
