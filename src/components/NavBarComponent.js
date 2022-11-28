import { BsHeartFill, BsCart3, BsSearch } from 'react-icons/bs';
import { useNavigate, Link } from 'react-router-dom';
import { useState, useContext } from 'react';
import Swal from 'sweetalert2';
import styled from 'styled-components';

import logo from '../assets/images/borsalino.png';
import person from '../assets/images/person-login-icon.png';
import { ProductContext } from '../context/ProductContext.js';
import { DataContext } from '../context/Auth.js';

export default function NavBarComponent() {

  const { user, token } = useContext(DataContext);
  const { setSearchQuestion, favorites, cart } = useContext(ProductContext);
  const navigate = useNavigate();
  const [form, setForm] = useState('');

  return (
    <StyledNavBarComponent>
      <Link to='/'>
        <Logo title='Página inicial'>
          <img src={logo} alt='MobTech logo' />
          MobTech
        </Logo>
      </Link>
      <Menu>
        <button
          title='Pesquisar'
          onClick={async () => {
            await Swal.fire({
              title: 'Pesquisar seu novo smartphone',
              iconHtml: '<img src="https://images2.imgbox.com/66/f7/NCiVe5di_o.png"',
              input: 'text',
              inputLabel: 'Pode inserir marca, modelo ou versão',
              confirmButtonText: 'pesquisar',
              cancelButtonText: 'cancelar',
              inputValue: form,
              showCancelButton: true,
              inputValidator: (value) => {
                if (!value) {
                  setSearchQuestion('');
                } else {
                  setSearchQuestion(value.trim());
                  setForm('');
                  navigate('/');
                }
              }
            });
          }}
        >
          <BsSearch />
        </button>

        <button
          title='Favoritos'
          onClick={() => {
            token ? navigate('/favoritos') : navigate('/login');
          }}
        >
          <StyleIcon show={(favorites.length > 0)} >
            <BsHeartFill />
            <span>{favorites.length}</span>
          </StyleIcon>
        </button>

        <button
          title='Carrinho'
          onClick={() => {
            token ? navigate('/carrinho') : navigate('/login');
          }}
        >
          <StyleIcon show={(cart.length > 0)} >
            <BsCart3 />
            <span>{cart.length}</span>
          </StyleIcon>
        </button>

        <button
          title={user?.name || 'visitante'}
          onClick={() => {
            token ? navigate('/usuario') : navigate('/login');
          }}
        >
          <StyledProfile>
            <img src={user?.image || person} alt={`Imagem ${user?.name || 'visitante'}`} />
          </StyledProfile>
        </button>
      </Menu>
    </StyledNavBarComponent>
  );
}

const StyledNavBarComponent = styled.nav`
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #342F58;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
  border-radius: 0px 0px 15px 15px;
  padding: 0px 5%;
  box-sizing: border-box;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;

  a {
    text-decoration: none;
  }
`;

const Logo = styled.button`
  width: 60%;
  display: flex;
  align-items: center;
  font-family: 'Audiowide', cursive;
  font-size: 30px;
  color: #73C800;
  background-color: transparent;
  outline: none;
  border: none;
  margin-right: 15px;
  transition: 1s;

  img {
    margin: 0px 2px;
    width: 22%;
  }

  &:hover {
    transform: scale(1.05);
    cursor: pointer;
  }
`;

const Menu = styled.section`
  width: 40%;
  height: 100%;
  display: flex;
  justify-content: flex-end;

  button {
    width: 40px;
    height: 100%;
    background-color: transparent;
    outline: none;
    border: none;
    margin: 0px 2px;
    padding: 0px;
    transition: 1s;
  
    &:hover {
      transform: scale(1.3);
      cursor: pointer;

      svg {
        color: #73C800;
      }
    }
  }

  svg {
    width: 100%;
    max-width: 25px;
    height: 100%;
    max-height: 25px;
    color: #FFFFFF;
  }
`;

const StyleIcon = styled.div`
  position: relative;

  > span {
    visibility: ${props => props.show ? 'visible' : 'hidden'};
    width: 16px;
    border-radius: 8px;
    color: #FFFFFF;
    font-family: 'Montserrat', sans-serif;
    font-weight: 600;
    padding: 2px;
    position: absolute;
    top: 0;
    right: -6px;
    background-color: #FF4949;
    font-size: 10px;
    text-align: center;
  }
`;

const StyledProfile = styled.div`
  width: 100%;
  max-width: 32px;
  aspect-ratio: 1 / 1;
  background-color: #FFFFFF;
  outline: none;
  border: none;
  border-radius: 16px;
  transition: 1s;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 90%;
    border-radius: 13px;
  }

  &:hover {
    transform: scale(1.05);
    background-color: #73C800;
    cursor: pointer;
  }
`;