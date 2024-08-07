# Pokemon App

Welcome to the Pokemon App! This application allows you to manage Pokemon users, add Pokemon to users, and view a list of Pokemon users.

## Features

1. **Home Page**

   - Displays information about the application and navigation to other sections.

<img width="949" alt="home-page" src="https://github.com/user-attachments/assets/5e1f8042-c443-45f7-8776-d70160cbd5ad">
   

2. **Create Pokemon User**

   - Allows users to create new Pokemon users by entering details like Pokemon owner name, Pokemon name, ability, initial position, and speed.
   
<img width="958" alt="add-pokemon" src="https://github.com/user-attachments/assets/7caf38cd-77c1-4c00-a4eb-6c9a7a8c7b1a">


3. **Add Pokemon**

   - Allows users to add Pokemon to a selected user from a dropdown list. Users can specify Pokemon details and the number to be added.
   
<img width="958" alt="add-pokemon-user" src="https://github.com/user-attachments/assets/9a4679f0-6f29-4b1b-935e-ae975c1db3d3">


4. **List of Pokemon Users**
   
   - Lists all Pokemon users with details of the Pokemon they own. Includes functionality to add, edit, or delete individual Pokemon and delete all Pokemon users.
   
<img width="959" alt="list-pokemon-users" src="https://github.com/user-attachments/assets/6d19bb2c-ecb2-46db-bbb2-fe303e316a56">


## Installation

To install the application, follow these steps:

**Clone the Repository:**

   ```bash
   git clone https://github.com/MohanVaddella/pokemon-app.git
   ```

**Backend**

The backend server is a Node.js application running on PORT 5000. To set up and start the backend server:

1. Navigate to the backend directory:

   ```bash
   cd pokemon-app/backend
   ```

2. Install the required dependencies:

   ```bash
   npm install express cors axios body-parser uuid
   ```

3. Start the server:

   ```bash
   npm start
   ```

- The backend server will now be running on `http://localhost:5000`.

**Frontend**

The frontend is a React application running on PORT 3000. To set up and start the frontend server:

1. Navigate to the frontend directory:

   ```bash
   cd pokemon-app
   ```

2. Install the required dependencies:

   ```bash
   npm install @fortawesome/fontawesome-free axios react-dom react-router-dom
   ```

3. Start the server:

   ```bash
   npm start
   ```

   - The frontend server will now be running on `http://localhost:3000`.


## Detailed Explanation

**Project Structure**

- `pokemon-app/backend/`: Contains the backend server code. This includes Express.js server configuration, API routes, and database interactions.

- `pokemon-app/`: Contains the frontend React application. This includes components, routes, and styling.

**Backend**

****Dependencies:****

- `express`: Web framework for Node.js.

- `cors`: Middleware for enabling Cross-Origin Resource Sharing.

- `axios`: Promise-based HTTP client for making API requests.

- `body-parser`: Middleware for parsing request bodies.

- `uuid`: Library for generating unique IDs.

****API Endpoints:****

- `/api/pokemon-users`: GET request to fetch Pokémon users.

- `/api/add-pokemon`: POST request to add a Pokémon to a user.

- `/api/delete-all-pokemon-users`: DELETE request to delete all Pokémon users.

**Frontend**

****Dependencies:****

- `@fortawesome/fontawesome-free`: Font Awesome icons for UI.

- `axios`: Promise-based HTTP client for making API requests.

- `react-dom`: React library for rendering.

- `react-router-dom`: Library for routing in React applications.

****Components:****

- `HomePage`: Main landing page with links to other features.

- `CreatePokemonUser`: Form for creating a new Pokemon User.

- `AddPokemonUser`: Form for adding Pokémon to a user.

- `ListPokemonUsers`: Table displaying the list of Pokémon users with options for managing them.
   
