import * as React from "react";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { FixedSizeList } from "react-window";

function renderRow(props, suggestions) {
  const { index, style } = props;
  const pokemon = suggestions[index];

  return (
    <ListItem style={style} key={index} component="div" disablePadding>
      <ListItemButton>
        <ListItemAvatar>
          <Avatar alt={pokemon.name} src={pokemon.spriteurl} />
        </ListItemAvatar>
        <ListItemText primary={pokemon.name} />
      </ListItemButton>
    </ListItem>
  );
}

export default function PokemonList({ suggestions }) {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        maxWidth: 360,
        maxHeight: 400,
        bgcolor: "background.paper",
      }}
    >
      <FixedSizeList
        height={360}
        width={360}
        itemSize={46}
        itemCount={suggestions.length}
        overscanCount={5}
        children={(props) => renderRow(props, suggestions)}
      />
    </Box>
  );
}
