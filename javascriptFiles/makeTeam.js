const API_URL = "https://pokeapi.co/api/v2/pokemon";

async function getRandomPokemon() {
  // Get a list of all pokemon
  const response = await fetch(API_URL);
  const data = await response.json();
  const pokemonList = data.results;

  // Pick a random pokemon from the list
  const randomIndex = Math.floor(Math.random() * pokemonList.length);
  const randomPokemon = pokemonList[randomIndex];

  // Get the details for the random pokemon
  const pokemonResponse = await fetch(randomPokemon.url);
  const pokemonData = await pokemonResponse.json();
  return pokemonData;
}


