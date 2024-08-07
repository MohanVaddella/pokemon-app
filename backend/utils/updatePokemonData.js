const axios = require('axios');
const fs = require('fs');
const path = require('path');

// Base URL for the Pokémon API
const POKEMON_API_URL = 'https://pokeapi.co/api/v2/pokemon-species/';

// Path to your JSON data file
const DATA_FILE_PATH = path.join(__dirname, '../pokemonData.json');

// Function to fetch Pokémon details from the API
const fetchPokemonDetailsFromApi = async (pokemonId) => {
    try {
        const response = await axios.get(`${POKEMON_API_URL}${pokemonId}/`);
        return response.data;
    } catch (error) {
        throw new Error('Error fetching Pokémon data from external API');
    }
};

// Function to read the existing data from pokemonData.json
const readData = () => {
    if (!fs.existsSync(DATA_FILE_PATH)) {
        throw new Error('Data file does not exist');
    }
    const data = fs.readFileSync(DATA_FILE_PATH, 'utf8');
    return JSON.parse(data);
};

// Function to write data to pokemonData.json
const writeData = (data) => {
    fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(data, null, 2));
};

// Function to update Pokémon details in pokemonData.json
const updatePokemonData = async (pokemonId) => {
    try {
        const pokemonDetails = await fetchPokemonDetailsFromApi(pokemonId);

        // Extract relevant information from the API response
        const abilities = pokemonDetails.abilities.map(ability => ability.ability.name);

        // Read existing data
        const data = readData();

        // Update or add Pokémon details
        const existingPokemonIndex = data.pokemons.findIndex(pokemon => pokemon.id === pokemonId);
        if (existingPokemonIndex !== -1) {
            data.pokemons[existingPokemonIndex] = {
                ...data.pokemons[existingPokemonIndex],
                abilities
            };
        } else {
            data.pokemons.push({
                id: pokemonId,
                name: pokemonDetails.name,
                abilities
            });
        }

        // Write updated data back to the file
        writeData(data);

        console.log(`Pokémon data for ID ${pokemonId} updated successfully.`);
    } catch (error) {
        console.error(error.message);
    }
};

module.exports = updatePokemonData;
