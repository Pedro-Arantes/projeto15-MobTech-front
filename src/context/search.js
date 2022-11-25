import { createContext, useState } from 'react';

export const SearchContext = createContext({})

export default function SearchProvider({ children }) {
  const [searchQuestion, setSearchQuestion] = useState('');

  return (
    <SearchContext.Provider value={{ searchQuestion, setSearchQuestion }}>
      {children}
    </SearchContext.Provider>
  );
}