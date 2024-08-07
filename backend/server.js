const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');
const pokemonRoutes = require('./routes/pokemonRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = 5000;

// Base URL for the Pokémon API
const POKEMON_API_URL = 'https://pokeapi.co/api/v2/pokemon-species/';

app.use(cors());
app.use(bodyParser.json());

app.use('/api/pokemons', pokemonRoutes);
app.use('/api/users', userRoutes);

// Route to fetch Pokémon data
app.get('/api/pokemons', async (req, res) => {
  try {
    const response = await axios.get(`${POKEMON_API_URL}1/`);
    const data = response.data;
    
    res.json({
      id: data.id,
      name: data.name,
      abilities: data.abilities.map(a => a.ability.name)
    });
  } catch (error) {
    console.error('Error fetching Pokémon data from external API:', error);
    res.status(500).json({ message: 'Error fetching Pokémon data' });
  }
});


app.post('/update-pokemon/:id', async (req, res) => {
    const pokemonId = req.params.id;

    try {
        await updatePokemonData(pokemonId);
        res.status(200).json({ message: 'Pokémon data updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating Pokémon data' });
    }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
