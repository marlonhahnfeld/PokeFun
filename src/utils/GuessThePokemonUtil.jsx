export const fetchPokemonStartingWithInput_FromMongo = async (input) => {
  try {
    const response = await fetch(
      `https://poke-fun-backend.vercel.app/get_pokemon_starting_with/${input}`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
};
