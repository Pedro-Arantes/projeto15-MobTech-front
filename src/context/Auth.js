import { createContext, useState } from 'react';

export const DataContext = createContext({});

export default function DataProvider({ children }) {

  const [total, setTotal] = useState('');
  const [user, setUser] = useState();
  const [token, setToken] = useState();
  const [cartArray, setCart] = useState([]);

  return (
    <DataContext.Provider value={{ cartArray, setCart, setUser, user, token, setToken, total, setTotal }}>
      {children}
    </DataContext.Provider>
  );
}
