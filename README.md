# Star Wars App

Star Wars App is a web application that consumes the Star Wars API to display information about characters, planets, starships, and species. The app allows users to search, filter and paginate results, as well as view additional details about each item.

## Technologies Used
- **React**: A JavaScript library for building user interfaces.
- **TypeScript**: A superset of JavaScript that adds static typing to the code.
- **Styled-components**: A library for styling React components.
- **Context API**: Used for managing the application's global state.

## Project Structure
### Components
- **`Card.tsx`**: Displays a character's information in a card format.
- **`ContainerCards.tsx`**: Manages the display of character cards, including pagination.
- **`Filter.tsx`**: Provides filtering options for characters by planet, starship, and species.
- **`Loading.tsx`**: Shows a loading image while data is being fetched.
- **`ModalCard.tsx`**: Component that displays a modal with detailed information about each character.
- **`Search.tsx`**: Manages the search functionality for characters.

### Context
- **`Context.tsx`**: Defines the application's global context, including states and functions for data management.

## How to Run the Project
1. Clone the repository:  
  ```git clone https://github.com/seu-usuario/star-wars-app.git```
  
2. It is recommended to use Node version 22.2.0.  
  ```nvm install 22.2.0```  
  ```nvm use 22.2.0```

3. Install dependencies:  
  ```cd star-wars-app```  
  ```npm install```

4. Install dependencies:  
  ```npm run dev```
