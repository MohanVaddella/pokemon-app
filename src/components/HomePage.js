import React, { useState, useEffect } from 'react';
import { fetchPokemonUsers, fetchUsers } from '../services/api';

const HomePage = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [pokemonDetails, setPokemonDetails] = useState([]);
  const [pokemonStates, setPokemonStates] = useState({}); 
  const containerWidth = 600; 
  const containerHeight = 300; 

  useEffect(() => {
    // Fetch users
    fetchUsers().then(response => {
      setUsers(response.data);
    }).catch(error => {
      console.error("Error fetching users:", error);
    });
  }, []);

  useEffect(() => {
    if (selectedUser) {
      // Fetch Pokemon details for selected user
      fetchPokemonUsers().then(response => {
        const userDetails = response.data.find(user => user.id === selectedUser);
        if (userDetails) {
          setPokemonDetails(userDetails.pokemons);
          setPokemonStates(userDetails.pokemons.reduce((acc, pokemon) => ({
            ...acc,
            [pokemon.id]: {
              visible: true,
              frozen: false,
              x: pokemon.initialPositionX,
              y: pokemon.initialPositionY,
              speed: pokemon.speed,
              direction: pokemon.direction
            }
          }), {}));
        }
      }).catch(error => {
        console.error("Error fetching Pokémon details:", error);
      });
    }
  }, [selectedUser]);

  useEffect(() => {
    // Function to move Pokemon
    const movePokemons = () => {
      setPokemonStates(prevStates => {
        const updatedStates = { ...prevStates };

        Object.keys(updatedStates).forEach(id => {
          const pokemon = pokemonDetails.find(p => p.id === id);
          if (pokemon && updatedStates[id].visible && !updatedStates[id].frozen) {
            const state = updatedStates[id];
            const { speed, direction } = state;

            // Update position based on direction and speed
            if (direction === 'right') {
              state.x += speed;
            } else if (direction === 'left') {
              state.x -= speed;
            } else if (direction === 'down') {
              state.y += speed;
            } else if (direction === 'up') {
              state.y -= speed;
            }

            // Check if the Pokemon is out of bounds
            if (state.x < 0 || state.x > containerWidth || state.y < 0 || state.y > containerHeight) {
              state.visible = false;
            }
          }
        });

        return updatedStates;
      });
    };

    // Move Pokemon every 100 milliseconds
    const intervalId = setInterval(movePokemons, 100);

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, [pokemonDetails]);

  const handleUserChange = (e) => {
    setSelectedUser(e.target.value);
  };

  const handlePokemonGo = () => {
    // Functionality for Pokemon Go is already handled in the useEffect hook
  };

  const handlePokemonFlee = () => {
    setPokemonStates(prevStates => {
      const updatedStates = { ...prevStates };
      Object.keys(updatedStates).forEach(id => {
        updatedStates[id].visible = !updatedStates[id].visible; // Toggle visibility
      });
      return updatedStates;
    });
  };

  const handlePokemonCease = () => {
    setPokemonStates(prevStates => {
      const updatedStates = { ...prevStates };
      Object.keys(updatedStates).forEach(id => {
        updatedStates[id].frozen = true; 
      });
      return updatedStates;
    });
  };

  return (
    <div>
      <h2>Home Page</h2>
      <label>
        List of Pokemon Owner 
        <select value={selectedUser} onChange={handleUserChange}>
          <option value="">Select Owner</option>
          {users.map(user => (
            <option key={user.id} value={user.id}>{user.pokemonOwnerName}</option>
          ))}
        </select>
      </label>
      {selectedUser && (
        <>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Name of Pokemon</th>
                <th>Ability of Pokemon</th>
                <th>Number of Pokemon</th>
              </tr>
            </thead>
            <tbody>
              {pokemonDetails.map(pokemon => (
                <tr key={pokemon.id}>
                  <td>{pokemon.name}</td>
                  <td>{pokemon.ability}</td>
                  <td>{pokemonDetails.length}</td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </>
      )}
    

<div style={{ margin: '20px 0' }}>
      <button onClick={handlePokemonGo} style={{ margin: '0 10px', padding: '10px 20px', fontSize: '16px' }}>Pokemon Go</button>
      <button onClick={handlePokemonFlee} style={{ margin: '0 10px', padding: '10px 20px', fontSize: '16px' }}>Pokemon Flee</button>
      <button onClick={handlePokemonCease} style={{ margin: '0 10px', padding: '10px 20px', fontSize: '16px' }}>Pokemon Cease</button>
    </div>

      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
        <div style={{ position: 'relative', width: `${containerWidth}px`, height: `${containerHeight}px`, border: '2px solid black' }}>
          {pokemonDetails.map(pokemon => (
            <div
              key={pokemon.id}
              style={{
                position: 'absolute',
                left: `${pokemonStates[pokemon.id]?.x}px`,
                top: `${pokemonStates[pokemon.id]?.y}px`,
                visibility: pokemonStates[pokemon.id]?.visible ? 'visible' : 'hidden',
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                backgroundColor: 'yellow'
              }}
            >
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
