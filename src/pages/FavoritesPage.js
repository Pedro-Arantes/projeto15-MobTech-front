import { useState, useEffect, useContext } from 'react';
import { TailSpin } from 'react-loader-spinner';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import Swal from 'sweetalert2';

import { FAVS_URL } from '../constants.js';
import { DataContext } from '../context/Auth.js';
import { ProductContext } from '../context/ProductContext.js';
import NavBarComponent from '../components/NavBarComponent.js';
import ProductComponent from '../components/ProductComponent.js';

export default function FavoritesPage() {

  const { user, token } = useContext(DataContext);
  const { favorites } = useContext(ProductContext);

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
        <StyledBackButton 
          title={'Voltar para página principal'}
          onClick={() => navigate('/')}>
          <FaArrowLeft />
        </StyledBackButton>
          <StyledMessage>
            <span>{user.name}</span>
            {', você tem '}
            <span>{favorites.length}</span>
            {' produtos favoritos: '}
          </StyledMessage>
          <StyledProducts>
            {favProducts.map(product =>
              <ProductComponent
                product={product}
              />
            )}
          </StyledProducts>
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
  align-items: center;
  justify-content: ${props => props.loadingProp ? 'center' : 'default'};
  position: relative;
`;

const StyledBackButton = styled.button`
  position: absolute;
  top: 100px;
  left: 0;
  width: 38px;
  height: 33px;
  background: linear-gradient(180deg, #6F7580 -53%, rgba(31, 34, 37, 0) 200%);
  border: 0.7px solid rgba(55, 73, 87, 0.2);
  filter: drop-shadow(0px 12px 27px rgba(0, 0, 0, 0.25));
  border-radius: 6px;
  transition: 1s;

  > svg {
    color: #73C800;
    font-size: 15px;
  }

  &:hover {
    background: linear-gradient(180deg, #8c96a5 -53%, rgba(31, 34, 37, 0) 200%);
    transform: scale(1.1);
  }

`;

const StyledMessage = styled.span`
  width: 80%;
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

const StyledProducts = styled.section`
  width: 100%;
  margin-bottom: 20px;
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;
