import React, { useState, useEffect } from 'react';
import { fetchPokemons, addPokemon } from '../services/api';

const AddPokemon = () => {
  const [pokemonName, setPokemonName] = useState('');
  const [pokemonAbility, setPokemonAbility] = useState('');
  const [pokemonList, setPokemonList] = useState([]);
  const [ownerName, setOwnerName] = useState('');
  const [direction, setDirection] = useState('');
  const [initialPositionX, setInitialPositionX] = useState('');
  const [initialPositionY, setInitialPositionY] = useState('');
  const [speed, setSpeed] = useState('');
  const [abilities, setAbilities] = useState([]);

  useEffect(() => {
    // Fetch Pokémon data from the API or backend
    fetchPokemons().then(response => {
      setPokemonList(response.data);
    }).catch(error => {
      console.error("Error fetching Pokemon data:", error);
    });
  }, []);

  useEffect(() => {
    // Fetch abilities when pokemonName changes
    if (pokemonName) {
      const selectedPokemon = pokemonList.find(p => p.name === pokemonName);
      if (selectedPokemon) {
        setAbilities(selectedPokemon.abilities);
        if (selectedPokemon.abilities.length === 1) {
          setPokemonAbility(selectedPokemon.abilities[0]);
        }
      }
    }
  }, [pokemonName, pokemonList]);

  const handleAddPokemon = (e) => {
    e.preventDefault(); 
    // Logic to add Pokémon to the backend
    addPokemon({
      pokemonName,
      pokemonAbility,
      ownerName,
      direction,
      initialPositionX,
      initialPositionY,
      speed
    }).then(response => {
    
      console.log("Pokemon added successfully:", response.data);
      
      setPokemonName('');
      setPokemonAbility('');
      setOwnerName('');
      setDirection('');
      setInitialPositionX('');
      setInitialPositionY('');
      setSpeed('');
      setAbilities([]);
    })
    .catch(error => {
      
      console.error("Error adding Pokemon:", error);
    });
  };


  return (
    <div>
      <h2>Create Pokemon User</h2>
      <form onSubmit={handleAddPokemon}>
      <div className="input-row">
        <input
          type="text"
          value={ownerName}
          onChange={(e) => setOwnerName(e.target.value)}
          placeholder="Pokemon Owner Name"
          required
        />
        <input
          type="text"
          value={pokemonName}
          onChange={(e) => setPokemonName(e.target.value)}
          placeholder="Pokemon Name"
          required
        />
        {abilities.length > 1 ? (
          <select
            value={pokemonAbility}
            onChange={(e) => setPokemonAbility(e.target.value)}
            required
          >
            <option value="">Select Pokemon Ability</option>
            {abilities.map((ability, index) => (
              <option key={index} value={ability}>
                {ability}
              </option>
            ))}
          </select>
        ) : (
          <input
            type="text"
            value={pokemonAbility}
            onChange={(e) => setPokemonAbility(e.target.value)}
            placeholder="Pokemon Ability"
            required
            disabled={abilities.length === 1}
          />
        )}
        <input
          type="number"
          value={initialPositionX}
          onChange={(e) => setInitialPositionX(e.target.value)}
          placeholder="Initial Position X"
          required
        />
        </div>
        <div className="input-row">
        <input
          type="number"
          value={initialPositionY}
          onChange={(e) => setInitialPositionY(e.target.value)}
          placeholder="Initial Position Y"
          required
        />
        
        <input
          type="number"
          value={speed}
          onChange={(e) => setSpeed(e.target.value)}
          placeholder="Speed"
          required
        />
        <input
          type="text"
          value={direction}
          onChange={(e) => setDirection(e.target.value)}
          placeholder="Direction"
          required
        />
        </div>
        <button type="submit">Add Pokemon</button>
      </form>
    </div>
  );
};

export default AddPokemon;