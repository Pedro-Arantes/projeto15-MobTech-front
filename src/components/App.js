import GlobalStyle from '../assets/styles/GlobalStyle.js';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage'
import CartPage from '../pages/CartPage'
import ChekoutPage from '../pages/ChekoutPage'
import DataProvider from '../context/Auth';
import SignInPage from '../pages/SignInPage'
import SignUpPage from '../pages/SignUpPage'
import SearchProvider from '../context/search.js';

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <DataProvider>
        <SearchProvider>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/cadastro' element={<SignUpPage />} />
            <Route path='/login' element={<SignInPage />} />
            <Route path='/carrinho' element={<CartPage />} />
            <Route path='/compra' element={<ChekoutPage />} />
          </Routes>
        </SearchProvider>
      </DataProvider>
    </BrowserRouter >
  );
}

export default App;