import { createContext, useState } from 'react';

export const NavBarContext = createContext({})

export default function NavBarProvider({ children }) {
  const [searchQuestion, setSearchQuestion] = useState('');
  const [favorites, setFavorites] = useState([]);
  const [cart, setCart] = useState([]);

  return (
    <NavBarContext.Provider value={
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
    </NavBarContext.Provider>
  );
}