import { BsHeartFill, BsCart3, BsPersonCircle, BsSearch } from 'react-icons/bs';
import styled from 'styled-components';

import logo from '../assets/images/borsalino.png';

export default function NavBarComponent() {

  return (
    <StyledNavBarComponent>
      <Logo>
        <img src={logo} alt='MobTech logo' />
        MobTech
      </Logo>
      <Menu>
        <button><BsSearch /></button>
        <button><BsHeartFill /></button>
        <button><BsCart3 /></button>
        <button><BsPersonCircle /></button>
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
  display: flex;
  align-items: center;
  font-family: 'Audiowide', cursive;
  font-size: 40px;
  color: #73C800;
  background-color: transparent;
  outline: none;
  border: none;

  img {
    width: 50px;
  }
`;

const Menu = styled.section`
  button {
    background-color: transparent;
    outline: none;
    border: none;
    margin: 0px 3px;
  }

  svg {
    font-size: 20px;
    color: #FFFFFF;
  }
`;