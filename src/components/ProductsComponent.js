import { useContext, useEffect } from 'react';
import { BsStarHalf, BsHeartFill, BsHeart, BsCartPlus, BsCartCheckFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

import { DataContext } from '../context/Auth.js';

export default function ProductsComponent({ products, favorites, setFavorites, cart, setCart }) {

  const HOME_URL = 'https://mobtech.onrender.com';
  const { user } = useContext(DataContext);
  const navigate = useNavigate();

  const config = {
    headers: {
      Authorization: `Bearer ${user?.token}`
    }
  };

  useEffect(() => {
    if (user) {
      axios.put(`${HOME_URL}/carrinho/${user.id}`, { cart: cart }, config)
        .then(res => {
        })
        .catch(err => {
        });

      axios.put(`${HOME_URL}/favoritos/${user.id}`, { cart: favorites }, config)
        .then(res => {
        })
        .catch(err => {
        });
    }
  }, [cart, favorites]);

  function favoritesHandle(id) {
    if (!user) {
      navigate('/login')
    } else {
      const newFavorites = favorites.includes(id) ? favorites.filter(i => i !== id) : [...favorites, id];
      setFavorites(newFavorites);
    }
  }

  function cartHandle(id) {
    if (!user) {
      navigate('/login')
    } else {
      const newCart = cart.includes(id) ? cart.filter(i => i !== id) : [...cart, id];
      setCart(newCart);
    }
  }

  return (
    <StyledProducts>
      {products.map(product => {
        return (
          <StyledProduct
            key={product.id}
            title={product.model}
          >
            <StyledTop>
              <StyledReviews>
                <BsStarHalf />
                <span>{product.reviews}</span>
              </StyledReviews>
              <StyledFavorite
                title={favorites.includes(product.id) ? 'remover dos favoritos' : 'adicionar aos favoritos'}
                inFavorite={favorites.includes(product.id)}
                onClick={() => favoritesHandle(product.id)}
              >
                {favorites.includes(product.id) ? <BsHeartFill /> : <BsHeart />}
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
            <StyledAddCart
              title={favorites.includes(product.id) ? 'remover do carrinho' : 'adicionar ao carrinho'}
              inCart={cart.includes(product.id)}
              onClick={() => cartHandle(product.id)}
            >
              {cart.includes(product.id) ? <BsCartCheckFill /> : <BsCartPlus />}
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
  transition: .7s;
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
  transition: .7s;
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
    color: ${props => props.inFavorite ? '#FF4949' : '#FFFFFF'}; 
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
  background-color: ${props => props.inCart ? '#75B038' : '#FFFFFF'};
  border-radius: 20px;
  padding: 3px;
  box-sizing: border-box;
  border: none;
  outline: none;
  transition: .7s;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));

  > svg {
    font-size: 18px;
    color: ${props => props.inCart ? '#FFFFFF' : '#73C800'};
    margin: 0px 5px;
  }

  &:hover {
    transform: scale(1.3);
  }
`;