import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import HomePage from './components/HomePage';
import AddPokemon from './components/AddPokemon';
import AddPokemonUser from './components/AddPokemonUser';
import ListPokemonUsers from './components/ListPokemonUsers';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <nav>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/add-pokemon">Add Pokemon</Link></li>
              <li><Link to="/add-pokemon-user">Add Pokemon to User</Link></li>
              <li><Link to="/list-pokemon-users">List Pokemon Users</Link></li>
            </ul>
          </nav>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/add-pokemon" element={<AddPokemon />} />
            <Route path="/add-pokemon-user" element={<AddPokemonUser />} />
            <Route path="/list-pokemon-users" element={<ListPokemonUsers />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
