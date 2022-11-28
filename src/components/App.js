
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import GlobalStyle from '../assets/styles/GlobalStyle.js';
import HomePage from '../pages/HomePage.js'
import CartPage from '../pages/CartPage.js'
import ChekoutPage from '../pages/ChekoutPage.js'
import DataProvider from '../context/Auth.js';
import SignInPage from '../pages/SignInPage.js'
import SignUpPage from '../pages/SignUpPage.js'
import ProductProvider from '../context/ProductContext.js';
import FavoritesPage from '../pages/FavoritesPage.js';
import ProductPage from '../pages/ProductPage.js';

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <DataProvider>
        <ProductProvider>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/cadastro' element={<SignUpPage />} />
            <Route path='/login' element={<SignInPage />} />
            <Route path='/carrinho' element={<CartPage />} />
            <Route path='/compra' element={<ChekoutPage />} />
            <Route path='/favoritos' element={<FavoritesPage />} />
            <Route path='/produto' element={<ProductPage />} />
          </Routes>
        </ProductProvider>
      </DataProvider>
    </BrowserRouter >
  );
}

export default App;