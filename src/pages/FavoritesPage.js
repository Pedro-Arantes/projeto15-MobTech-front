import { useState, useEffect, useContext } from 'react';
import { TailSpin } from 'react-loader-spinner';
import { BsArrowLeftCircleFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import Swal from 'sweetalert2';

import { FAVS_URL } from '../constants.js';
import { DataContext } from '../context/Auth.js';
import { NavBarContext } from '../context/NavBarContext.js';
import NavBarComponent from '../components/NavBarComponent.js';
import ProductsComponent from '../components/ProductsComponent.js';

export default function FavoritesPage() {

  const { user, token } = useContext(DataContext);
  const {
    favorites,
    setFavorites,
    cart,
    setCart
  } = useContext(NavBarContext);

  const navigate = useNavigate();
  const [favProducts, setFavProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [refresh, setRefresh] = useState(0);

  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  useEffect(() => {
    setLoading(true);
    axios.get(FAVS_URL, config)
      .then(res => {
        setFavProducts(res.data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        setError(true);
      });
  }, [refresh]);

  async function alertError() {
    await (Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Ocorreu um erro ao carregar os seus favoritos',
      showCancelButton: true,
      cancelButtonText: 'Voltar à página principal',
      confirmButtonText: 'Tentar novamente',
    })).then((result) => {
      if (result.isConfirmed) {
        setRefresh(Math.random());
      } else {
        navigate('/')
      }
      setError(false);
    })
  };

  if (loading) {
    return (
      <StyledFavorites>
        <NavBarComponent />
        <StyledContent loadingProp={loading}>
          <StyledLoader>
            Um momento, por favor...
            <TailSpin
              height='40'
              width='40'
              color='#73C800'
            />
          </StyledLoader>
        </StyledContent>
      </StyledFavorites>
    );
  } else if (error) {
    alertError();
    return (
      <StyledFavorites>
        <NavBarComponent />
        <StyledContent loadingProp={loading}>
        </StyledContent>
      </StyledFavorites>
    );
  } else {
    return (
      <StyledFavorites>
        <NavBarComponent />
        <StyledContent loadingProp={loading}>
          <StyledMessage>
            <span>{user.name}</span>
            {', você tem '}
            <span>{favorites.length}</span>
            {' produtos favoritos: '}
          </StyledMessage>
          <ProductsComponent
            products={favProducts}
            favorites={favorites}
            setFavorites={setFavorites}
            cart={cart}
            setCart={setCart}
          />

          <ButtonReset onClick={() => navigate('/')}>
            <BsArrowLeftCircleFill />
            Voltar
          </ButtonReset>
        </StyledContent>
      </StyledFavorites>
    );
  }
}

const StyledFavorites = styled.main`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  font-family: 'Montserrat', sans-serif;
  background-color: #483D8B;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledContent = styled.section`
  width: 90%;
  height: 100%;
  min-height: 100vh;
  padding-top: 80px;
  font-weight: 600;
  font-size: 15px;
  line-height: 17px;
  color: #FFFFFF;
  display: flex;
  flex-direction: column;
  align-items: ${props => props.loadingProp ? 'center' : 'default'};
  justify-content: ${props => props.loadingProp ? 'center' : 'default'};
`;

const StyledMessage = styled.span`
  width: 100%;
  height: 70px;
  padding: 25px 0px;
  font-size: 18px;
  text-align: center;
  box-sizing: border-box;

  > span {
    color: #73C800;
  }
`;

const StyledLoader = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-weight: 600;
  font-size: 15px;
  line-height: 17px;
  color: #FFFFFF;

  > svg {
    margin: 20px;
  }
`;

const ButtonReset = styled.button`
  height: 40px;
  width: 150px;
  margin-bottom: 150px;
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  background-color: rgba(115, 200, 0, .4);
  color: #FFFFFF;
  border: none;
  outline: none;
  border-radius: 15px;
  padding: 5px;
  transition: .7s;

  > svg {
    margin: 10px
  }

  &:hover {
    background-color: rgba(115, 200, 0, .9);
    transform: scale(1.1);
  }
`;