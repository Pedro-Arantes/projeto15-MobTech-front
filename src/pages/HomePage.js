import { useState, useEffect, useContext } from 'react';
import { TailSpin } from 'react-loader-spinner';
import { FaArrowLeft } from 'react-icons/fa';
import styled from 'styled-components';
import axios from 'axios';
import Swal from 'sweetalert2';

import { PRODUCTS_URL } from '../constants.js';
import { DataContext } from '../context/Auth.js';
import { ProductContext } from '../context/ProductContext.js';
import NavBarComponent from '../components/NavBarComponent.js';
import FeaturedProductsComponent from '../components/FeaturedProductsComponent.js';
import ProductComponent from '../components/ProductComponent.js';

export default function HomePage() {

  const {
    searchQuestion,
    setSearchQuestion,
  } = useContext(ProductContext);

  const [products, setProducts] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
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

  async function alertError() {
    await (Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Ocorreu um erro ao carregar os produtos!',
      confirmButtonText: 'Tentar novamente',
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
              <>
                <StyledBackButton
                  title={'Voltar para página principal'}
                  onClick={() => setSearchQuestion('')}>
                  <FaArrowLeft />
                </StyledBackButton>
                <StyledMessageSearch>
                  {'A sua busca por '}
                  <span>'{searchQuestion}'</span>
                  {' obteve '}
                  <span>{products.length}</span>
                  {' resultados:'}
                </StyledMessageSearch>
              </>
              :
              <FeaturedProductsComponent
                featuredProducts={featuredProducts}
              />
          }
          <StyledProducts>
            {products.map(product =>
              <ProductComponent
                key={product.id}
                product={product}
              />
            )}
          </StyledProducts>
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
  width: 95%;
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

const StyledProducts = styled.section`
  width: 100%;
  margin-bottom: 20px;
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;