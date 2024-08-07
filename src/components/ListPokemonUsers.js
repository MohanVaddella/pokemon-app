import React, { useState, useEffect } from 'react';
import { fetchPokemonUsers, deleteAllPokemonUsers } from '../services/api';
import '@fortawesome/fontawesome-free/css/all.min.css';
const ListPokemonUsers = () => {
  const [pokemonUsers, setPokemonUsers] = useState([]);

  useEffect(() => {
    fetchPokemonUsers().then(response => {
      setPokemonUsers(response.data);
    }).catch(error => {
      console.error("Error fetching Pokemon users:", error);
    });
  }, []);

  const handleDeleteAll = () => {
    if (window.confirm("Are you sure you want to delete all Pokemon users?")) {
      deleteAllPokemonUsers()
        .then(() => {
          setPokemonUsers([]);
          alert("All Pokemon users have been deleted.");
        })
        .catch(error => {
          console.error("Error deleting all Pokemon users:", error);
        });
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>List of Pokemon Users</h2>
        <button onClick={handleDeleteAll} style={{ background: 'red', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '5px' }}>
          <i className="fas fa-trash-alt"></i> Delete All
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Pokemon Owner Name</th>
            <th>Pokemon Name</th>
            <th>Pokemon Ability</th>
            <th>No. of Pokemon</th>
            <th>Add Pokemon</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {pokemonUsers.map(user => (
            user.pokemons.map(pokemon => (
              <tr key={pokemon.id}>
                <td>{user.pokemonOwnerName}</td>
                <td>{pokemon.name}</td>
                <td>{pokemon.ability}</td>
                <td>{user.pokemons.length}</td>
                <td><button><i className="fas fa-plus"></i></button></td>
                <td><button><i className="fas fa-pencil-alt"></i></button></td>
                <td><button><i className="fas fa-trash"></i></button></td>
              </tr>
            ))
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListPokemonUsers;
