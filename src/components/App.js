import GlobalStyle from '../assets/styles/GlobalStyle.js';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage'
import CartPage from '../pages/CartPage'
import ChekoutPage from '../pages/ChekoutPage'
import DataProvider from '../context/Auth';
import Login from '../components/Login'
import Cadastro from '../components/Cadastro'
import SearchProvider from '../context/search.js';

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <DataProvider>
        <SearchProvider>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/cadastro' element={<Cadastro />} />
            <Route path='/login' element={<Login />} />
            <Route path='/carrinho' element={<CartPage />} />
            <Route path='/compra' element={<ChekoutPage />} />
          </Routes>
        </SearchProvider>
      </DataProvider>
    </BrowserRouter >
  );
}

export default App;