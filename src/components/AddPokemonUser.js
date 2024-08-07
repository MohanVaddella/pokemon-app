import React, { useState, useEffect } from 'react';
import {fetchUsers, addPokemonToUser } from '../services/api';

const AddPokemonUser = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [pokemonName, setPokemonName] = useState('');
  const [pokemonAbility, setPokemonAbility] = useState('');
  const [numberOfPokemon, setNumberOfPokemon] = useState('');

  useEffect(() => {
    // Fetch users from the API or backend
    fetchUsers().then(response => {
      setUsers(response.data);
      console.log(response.data);
    }).catch(error => {
      console.error('Error fetching users:', error);
    });
  }, []);

  const handleAddPokemonToUser = (e) => {
    e.preventDefault();
    addPokemonToUser(selectedUser, {
      pokemonName,
      pokemonAbility,
      numberOfPokemon,
    }).then(response => {
      
      console.log('Pokemon added to user successfully:', response.data);
      setPokemonName('');
      setPokemonAbility('');
      setNumberOfPokemon('');
    }).catch(error => {
      
      console.error('Error adding Pokémon to user:', error);
    });
  };

  return (
    <div>
      <h2>Add Pokemon</h2>
      <form onSubmit={handleAddPokemonToUser}>
      <div className="input-row">
        <select
          value={selectedUser}
          onChange={(e) => setSelectedUser(e.target.value)}
        >
          <option value="">Select a user</option>
          {users.map(user => (
            <option key={user.id} value={user.id}>
              {user.pokemonOwnerName}
            </option>
          ))}
        </select>
        <input
          type="text"
          value={pokemonName}
          onChange={(e) => setPokemonName(e.target.value)}
          placeholder="Pokemon Name"
          required
        />
        <input
          type="text"
          value={pokemonAbility}
          onChange={(e) => setPokemonAbility(e.target.value)}
          placeholder="Pokemon Ability"
          required
        />
        <input
          type="number"
          value={numberOfPokemon}
          onChange={(e) => setNumberOfPokemon(e.target.value)}
          placeholder="Number to Pokemon"
          required
        />
        </div>
          <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default AddPokemonUser;

