import { BsHeartFill, BsCart3, BsPersonCircle, BsSearch } from 'react-icons/bs';
import { useState, useContext } from 'react';
import Swal from 'sweetalert2';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import logo from '../assets/images/borsalino.png';
import { SearchContext } from '../context/search';

export default function NavBarComponent() {

  const navigate = useNavigate();
  const { searchQuestion, setSearchQuestion } = useContext(SearchContext);

  return (
    <StyledNavBarComponent>
      <Logo>
        <img src={logo} alt='MobTech logo' />
        MobTech
      </Logo>
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
              inputValue: searchQuestion,
              showCancelButton: true,
              inputValidator: (value) => {
                if (!value) {
                  return 'Você precisa inserir algo para pesquisar!';
                } else {
                  setSearchQuestion(value);
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
            navigate('/favoritos');
          }}
        >
          <BsHeartFill />
        </button>

        <button
          title='Carrinho'
          onClick={() => {
            navigate('/carrinho');
          }}
        >
          <BsCart3 />
        </button>

        <button
          title='Usuário'
          onClick={() => {
            navigate('/usuario');
          }}
        >
          <BsPersonCircle />
        </button>
      </Menu>
    </StyledNavBarComponent>
  );
}

const StyledNavBarComponent = styled.nav`
  width: 100%;
  min-width: 360px;
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

  img {
    margin: 0px 2px;
    width: 50px;
  }
`;

const Menu = styled.section`
  width: 40%;
  height: 100%;
  display: flex;
  justify-content: flex-end;

  button {
    background-color: transparent;
    outline: none;
    border: none;
    margin: 0px 2px;
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