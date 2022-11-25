
import styled from 'styled-components';
import { BsStarHalf, BsHeartFill, BsHeart, BsCartPlus, BsCartCheckFill } from 'react-icons/bs';

export default function ProductsComponent({ products, favorites, setFavorites, cart, setCart }) {

  return (
    <StyledProducts>
      {products.map(product => {
        return (
          <StyledProduct 
            key={product._id}
            title={product.model}  
          >
            <StyledTop>
              <StyledReviews>
                <BsStarHalf />
                <span>{product.reviews}</span>
              </StyledReviews>
              <StyledFavorite title={'adicionar aos favoritos'}>
                <BsHeart />
              </StyledFavorite>
            </StyledTop>
            <img
              src={product.image_URL}
              alt={`Foto ${product.model} ${product.version}`}
            />
            <StyledModelPrice>
              <h1>{product.model}</h1>
              <h2>
                {
                  Number(product.price).toLocaleString(
                    'pt-BR',
                    { style: 'currency', currency: 'BRL' }
                  )
                }
              </h2>
            </StyledModelPrice>
            <StyledAddCart>
              <BsCartPlus title={'adicionar ao carrinho'} />
            </StyledAddCart>
          </StyledProduct>
        );
      })}
    </StyledProducts>
  );
}

const StyledProducts = styled.section`
  width: 100%;
  margin-bottom: 20px;
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const StyledProduct = styled.div`
  width: 185px;
  height: 230px;
  background: linear-gradient(180deg, rgba(115, 115, 115, .5) 0%, rgba(60, 60, 60, .2) 100%);
  border-radius: 14px;
  padding: 5px;
  margin: 12px;
  box-sizing: border-box;
  transition: 1s;
  position: relative;

  > img {
    width: 100%;
    height: 60%;
    object-fit: contain;
    overflow: hidden;
    margin: 8px 0px;
  }

  &:hover {
    transform: scale(1.1);
  }
`;

const StyledTop = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 3px 7px; 
`;

const StyledReviews = styled.div`
  > span {
    text-align: center;
    font-weight: 600;
    font-size: 13px;
    line-height: 13px;
    color: #FFFFFF
  }

  > svg {
    font-size: 15px;
    color: #FFC567;
    margin: 0px 5px;
  }
`;

const StyledFavorite = styled.button`
  height: 100%;
  background-color: transparent;
  outline: none;
  border: none;
  padding: 0;
  transition: 1s;
  text-align: center;

  > span {
    text-align: center;
    font-weight: 600;
    font-size: 13px;
    line-height: 13px;
    color: #FFFFFF
  }

  > svg {
    font-size: 15px;
    font-weight: 700;
    color: #FFFFFF;
    margin: 0px 5px;
  }

  &:hover {
    transform: scale(1.3);
  }
`;

const StyledModelPrice = styled.section`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 3px 7px;

  > h1 {
    font-weight: 600;
    font-size: 13px;
    line-height: 17px;
    color: #FFFFFF
  }

  > h2 {
    font-weight: 600;
    font-size: 12px;
    line-height: 17px;
    color: #FFFFFF
  }
`;

const StyledAddCart = styled.button`
  width: 35px;
  height: 35px;
  position: absolute;
  bottom: 0;
  right: 0;
  background-color: #73C800;
  border-radius: 20px;
  padding: 3px;
  box-sizing: border-box;
  border: none;
  outline: none;
  transition: 1s;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));

  > svg {
    font-size: 18px;
    font-weight: 700;
    color: #FFFFFF;
    margin: 0px 5px;
  }

  &:hover {
    transform: scale(1.3);
  }
`;