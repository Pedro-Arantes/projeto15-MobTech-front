import { createContext, useState } from 'react';

export const NavBarContext = createContext({})

export default function SearchProvider({ children }) {
  const [searchQuestion, setSearchQuestion] = useState('');
  const [favorites, setFavorites] = useState([]);
  const [cart, setCart] = useState([]);

  return (
    <SearchContext.Provider value={
      {
        searchQuestion,
        setSearchQuestion,
        favorites,
        setFavorites,
        cart,
        setCart
      }
    }>
      {children}
    </SearchContext.Provider>
  );
}