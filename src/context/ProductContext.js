import { createContext, useState } from 'react';

export const ProductContext = createContext({})

export default function ProductProvider({ children }) {
  const [searchQuestion, setSearchQuestion] = useState('');
  const [favorites, setFavorites] = useState([]);
  const [cart, setCart] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState();

  return (
    <ProductContext.Provider value={
      {
        searchQuestion,
        setSearchQuestion,
        favorites,
        setFavorites,
        cart,
        setCart,
        selectedProduct,
        setSelectedProduct
      }
    }>
      {children}
    </ProductContext.Provider>
  );
}