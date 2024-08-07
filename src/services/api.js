import axios from 'axios';

// Base URL for your backend API
const BACKEND_API_URL = 'http://localhost:5000/api';

// Base URL for the Pokemon API
const POKEMON_API_URL = 'https://pokeapi.co/api/v2/pokemon-species/';


// Add a Pokemon to a specific user
export const addPokemonToUser = (userId, pokemon) => {
  return axios.post(`${BACKEND_API_URL}/users/${userId}/pokemons`, pokemon);
};

// Fetch all Pokemon data from your backend API
export const fetchPokemons = () => {
  return axios.get(`${BACKEND_API_URL}/pokemons`);
};

// Fetch a Pokemon by ID from your backend API
export const fetchPokemonById = (id) => {
  return axios.get(`${BACKEND_API_URL}/pokemons/${id}`);
};

// Add a new Pokemon to your backend API
export const addPokemon = (pokemon) => {
  return axios.post(`${BACKEND_API_URL}/pokemons`, pokemon);
};

// Update a Pokemon by ID in your backend API
export const updatePokemon = (id, pokemon) => {
  return axios.put(`${BACKEND_API_URL}/pokemons/${id}`, pokemon);
};

// Delete a Pokemon by ID from your backend API
export const deletePokemon = (id) => {
  return axios.delete(`${BACKEND_API_URL}/pokemons/${id}`);
};

// Fetch all users from your backend API
export const fetchUsers = () => {
  return axios.get(`${BACKEND_API_URL}/users`);
};

// Fetch a user by ID from your backend API
export const fetchUserById = (id) => {
  return axios.get(`${BACKEND_API_URL}/users/${id}`);
};

// Add a new user to your backend API
export const addUser = (user) => {
  return axios.post(`${BACKEND_API_URL}/users`, user);
};

// Update a user by ID in your backend API
export const updateUser = (id, user) => {
  return axios.put(`${BACKEND_API_URL}/users/${id}`, user);
};

// Delete a user by ID from your backend API
export const deleteUser = (id) => {
  return axios.delete(`${BACKEND_API_URL}/users/${id}`);
};

// Fetch Pokemon details from the external Pokemon API
export const fetchPokemonDetails = async (pokemonId) => {
  try {
    const response = await axios.get(`${POKEMON_API_URL}${pokemonId}/`);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching Pokemon data from external API');
  }
};

// Fetch Pokemon users along with their Pokemon
export const fetchPokemonUsers = () => {
  return axios.get(`${BACKEND_API_URL}/users`);
};

export const deleteAllPokemonUsers = () => {
  return axios.delete('/api/pokemon-users');
};