const express = require('express');
const router = express.Router();
const axios = require('axios');
const { readData, writeData } = require('../utils/dataHandler');

// Base URL for Pokémon API
const POKEMON_API_URL = 'https://pokeapi.co/api/v2/pokemon-species/';

const fetchPokemonDataFromApi = async (pokemonId) => {
    try {
        const response = await axios.get(`${POKEMON_API_URL}${pokemonId}/`);
        return response.data;
    } catch (error) {
        throw new Error('Error fetching Pokémon data from API');
    }
};

// GET all users
router.get('/', (req, res) => {
    try {
        const data = readData();
        res.json(data.users || []);
    } catch (error) {
        res.status(500).json({ message: 'Error reading data' });
    }
});

// GET a user by ID
router.get('/:id', (req, res) => {
    try {
        const data = readData();
        const user = data.users.find(user => user.id === req.params.id);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error reading data' });
    }
});

// POST a new user
router.post('/', (req, res) => {
    try {
        const data = readData();
        const newUser = req.body;

        // Validate the user data
        if (!newUser.pokemonOwnerName) {
            return res.status(400).json({ message: 'PokemonOwnerName is required' });
        }

        newUser.id = Date.now().toString(); 
        newUser.pokemons = []; 

        data.users.push(newUser);
        writeData(data);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: 'Error saving data' });
    }
});

// PUT to update a user
router.put('/:id', async (req, res) => {
    try {
        const data = readData();
        const index = data.users.findIndex(user => user.id === req.params.id);
        if (index !== -1) {
            const updatedUser = { ...data.users[index], ...req.body };
            data.users[index] = updatedUser;
            writeData(data);
            res.json(updatedUser);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error updating data' });
    }
});

// DELETE a user
router.delete('/:id', (req, res) => {
    try {
        const data = readData();
        const filteredUsers = data.users.filter(user => user.id !== req.params.id);
        if (data.users.length !== filteredUsers.length) {
            data.users = filteredUsers;
            writeData(data);
            res.status(204).end();
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error deleting data' });
    }
});

module.exports = router;