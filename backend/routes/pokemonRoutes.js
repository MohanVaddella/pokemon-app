const express = require('express');
const router = express.Router();
const { readData, writeData } = require('../utils/dataHandler');
const { v4: uuidv4 } = require('uuid'); // For generating unique IDs

// GET all pokemons
router.get('/', (req, res) => {
  const data = readData();
  res.json(data.pokemons);
});

// POST a new pokemon
router.post('/', (req, res) => {
  const data = readData();
  const newPokemon = {
    id: req.body.id || uuidv4(),
    name: req.body.name,
    abilities: req.body.abilities || [],
    initialPositionX: req.body.initialPositionX || 0,
    initialPositionY: req.body.initialPositionY || 0,
    speed: req.body.speed || 0,
    direction: req.body.direction || ''
  };
  data.pokemons.push(newPokemon);
  writeData(data);
  res.status(201).json(newPokemon);
});

// PUT to update a pokemon
router.put('/:id', (req, res) => {
  const data = readData();
  const index = data.pokemons.findIndex(pokemon => pokemon.id === req.params.id);
  
  if (index !== -1) {
    const updatedPokemon = {
      id: req.body.id || data.pokemons[index].id,
      name: req.body.name || data.pokemons[index].name,
      abilities: req.body.abilities || data.pokemons[index].abilities,
      initialPositionX: req.body.initialPositionX || data.pokemons[index].initialPositionX,
      initialPositionY: req.body.initialPositionY || data.pokemons[index].initialPositionY,
      speed: req.body.speed || data.pokemons[index].speed,
      direction: req.body.direction || data.pokemons[index].direction
    };
    
    data.pokemons[index] = updatedPokemon;
    writeData(data);
    res.json(updatedPokemon);
  } else {
    res.status(404).json({ message: 'Pokemon not found' });
  }
});



// DELETE a pokemon
router.delete('/:id', (req, res) => {
  const data = readData();
  const initialLength = data.pokemons.length;
  data.pokemons = data.pokemons.filter(pokemon => pokemon.id !== req.params.id);
  
  if (data.pokemons.length < initialLength) {
    writeData(data);
    res.status(204).end();
  } else {
    res.status(404).json({ message: 'Pokemon not found' });
  }
});

module.exports = router;
