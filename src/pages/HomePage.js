import { useState } from 'react';
import { TailSpin } from 'react-loader-spinner';
import { BsStarHalf } from 'react-icons/bs';
import styled from 'styled-components';
import InfiniteScroll from 'react-infinite-scroll-component';

import NavBarComponent from '../components/NavBarComponent.js';

export default function HomePage() {

  const response = [];

  const [products, setProducts] = useState(response);
  const [featuredProducts, setFeaturedProducts] = useState(response.filter(product => product.featuredProduct))

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

  return (
    <StyledHome>
      <NavBarComponent />
      <StyledContent>
        <InfiniteScroll
          dataLength={products.length}
          next={fetchMoreData}
          hasMore={true}
          loader={messageLoader()}
        >
          <StyledfeaturedProducts>
            {featuredProducts.map((product, index) => {
              return (
                <StyledfeaturedProduct key={index}>
                  <div>
                    <div>
                      <h1>{product.model}</h1>
                      <h2>{product.version}</h2>
                    </div>
                    <button>Ver detalhes</button>
                  </div>
                  <img
                    src={product.image_URL}
                    alt={`Foto ${product.model} ${product.version}`}
                  />
                </StyledfeaturedProduct>
              );
            })}
          </StyledfeaturedProducts>
          <StyledProducts>
            {products.map((product, index) => {
              return (
                <StyledProduct key={index}>
                  <StyledReviews>
                    <BsStarHalf />
                    <span>{product.reviews}</span>
                  </StyledReviews>
                  <img
                    src={product.image_URL}
                    alt={`Foto ${product.model} ${product.version}`}
                  />
                  <StyledModelPrice>
                    <h1>{product.model}</h1>
                    <h2>{Number(product.price)
                      .toLocaleString(
                        'pt-BR',
                        { style: 'currency', currency: 'BRL' }
                      )}
                    </h2>
                  </StyledModelPrice>
                </StyledProduct>
              );
            })}
          </StyledProducts>
        </InfiniteScroll>
      </StyledContent>
    </StyledHome>
  );
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
`;

const StyledfeaturedProducts = styled.section`
  width: 100%;
  margin: 20px 0px;
  display: flex;
  overflow-x: auto;

  &::-webkit-scrollbar {     
    height: 9px;
  }

  &::-webkit-scrollbar-track {
    background-color: #75B038;
    border-radius: 20px;
    width: 90%;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #646464;
    border-radius: 20px;  
    border: 2px solid #75B038;
  }
`;

const StyledfeaturedProduct = styled.div`
  width: 296px;
  height: 200px;
  min-width: 296px;
  min-height: 200px;
  background: linear-gradient(90deg, rgba(40, 40, 40, 0.4) 0%, rgba(83, 83, 83, 0.4) 100%);
  border-radius: 15px;
  border: none;
  outline: none;
  display: flex;
  align-items: center;
  margin: 10px;
  padding: 10px;

  > div {
    width: 50%;
    height: 80%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;

    > button {
      height: 35px;
      font-family: 'Montserrat', sans-serif;
      font-weight: 600;
      font-size: 13px;
      line-height: 15px;
      color: #FFFFFF;
      background-color: #6D5982;
      box-shadow: 0px 3px 7px rgba(0, 0, 0, 0.08);
      border-radius: 15px;
      border: none;
      outline: none;
    }

    > div > h1 {
      font-weight: 700;
      font-size: 18px;
      line-height: 23px;
      color: #FFFFFF;
    }

    > div > h2 {
      font-weight: 600;
      font-size: 18px;
      line-height: 23px;
      color: #FFFFFF;
    }
  }

  > img {
    width: 50%;
    height: 100%;
    object-fit: contain;
    overflow: hidden;
  }
`;

const StyledProducts = styled.section`
  width: 100%;
  margin-bottom: 20px;
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  background-color: cha;
`;

const StyledProduct = styled.button`
  width: 185px;
  height: 230px;
  background: linear-gradient(180deg, rgba(115, 115, 115, .5) 0%, rgba(60, 60, 60, .2) 100%);
  border-radius: 14px;
  outline: none;
  border: none;
  margin: 12px;
  box-sizing: border-box;

  > img {
    width: 70px;
    height: 130px;
    object-fit: contain;
    overflow: hidden;
    margin: 8px 0px;
  }
`;

const StyledReviews = styled.section`
  display: flex;
  padding: 3px 7px; 

  > span {
    font-weight: 600;
    font-size: 16px;
    line-height: 13px;
    color: #FFFFFF
  }

  > svg {
    font-size: 15px;
    color: #FFC567;
    margin: 0px 5px;
  }
`;

const StyledModelPrice = styled.section`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 3px 7px; 

  > h1 {
    font-weight: 600;
    font-size: 15px;
    line-height: 17px;
    color: #FFFFFF
  }

  > h2 {
    font-weight: 600;
    font-size: 15px;
    line-height: 17px;
    color: #FFFFFF
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