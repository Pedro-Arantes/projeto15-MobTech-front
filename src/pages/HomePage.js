import { useState, useEffect, useContext } from 'react';
import { TailSpin } from 'react-loader-spinner';
import { BsArrowLeftCircleFill } from 'react-icons/bs';
import styled from 'styled-components';
import axios from 'axios';
import Swal from 'sweetalert2';
import InfiniteScroll from 'react-infinite-scroll-component';

import { PRODUCTS_URL } from '../constants.js';
import NavBarComponent from '../components/NavBarComponent.js';
import { NavBarContext } from '../context/NavBarContext.js';
import FeaturedProductsComponent from '../components/FeaturedProductsComponent.js';
import ProductsComponent from '../components/ProductsComponent.js';

export default function HomePage() {

  const {
    searchQuestion,
    setSearchQuestion,
    favorites,
    setFavorites,
    cart,
    setCart
  } = useContext(NavBarContext);

  const [products, setProducts] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([])
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    setLoading(true);
    axios.get(`${PRODUCTS_URL}/?search=${searchQuestion}`)
      .then(res => {
        setProducts(res.data);
        setFeaturedProducts(res.data.filter(product => product.featuredProduct === 'true'));
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        setError(true);
      });
  }, [refresh, searchQuestion]);

  function fetchMoreData() {

  };

  function messageLoader() {
    return (
      <StyledLoader>
        Carregando mais ofertas...
        <TailSpin
          height='40'
          width='40'
          color='#73C800'
        />
      </StyledLoader>
    );
  }

  async function alertError() {
    await (Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Ocorreu um erro ao carregar os produtos!',
      confirmButtonText: 'TENTAR NOVAMENTE',
    })).then(() => {
      setRefresh(Math.random());
      setError(false);
    })
  };

  if (loading) {
    return (
      <StyledHome>
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
      </StyledHome>
    );
  } else if (error) {
    alertError();
    return (
      <StyledHome>
        <NavBarComponent />
        <StyledContent loadingProp={loading}>
        </StyledContent>
      </StyledHome>
    );
  } else {
    return (
      <StyledHome>
        <NavBarComponent />
        <StyledContent loadingProp={loading}>
          {
            searchQuestion.length > 0 ?
              <StyledMessageSearch>
                {'A sua busca por '}
                <span>'{searchQuestion}'</span>
                {' obteve '}
                <span>{products.length}</span>
                {' resultados:'}
              </StyledMessageSearch>
              :
              <FeaturedProductsComponent
                featuredProducts={featuredProducts}
              />
          }
          <InfiniteScroll
            dataLength={products.length}
            next={fetchMoreData}
            hasMore={false}
            loader={messageLoader()}
          >
            <ProductsComponent
              products={products}
              favorites={favorites}
              setFavorites={setFavorites}
              cart={cart}
              setCart={setCart}
            />
          </InfiniteScroll>
          {
            searchQuestion.length > 0 ?
              <ButtonReset onClick={() => setSearchQuestion('')}>
                <BsArrowLeftCircleFill />
                Voltar
              </ButtonReset>
              :
              ''
          }
        </StyledContent>
      </StyledHome>
    );
  }
}

const StyledHome = styled.main`
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

const StyledMessageSearch = styled.span`
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