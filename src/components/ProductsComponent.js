import { useContext, useState, useEffect } from 'react';
import { BsStarHalf, BsHeartFill, BsHeart, BsCartPlus, BsCartCheckFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import Swal from 'sweetalert2';

import { DataContext } from '../context/Auth.js';
import { FAVS_URL, CART_URL } from '../constants.js';

export default function ProductsComponent({ products, favorites, setFavorites, cart, setCart }) {

  const { token } = useContext(DataContext);

  const navigate = useNavigate();
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    if (token) {
      axios.get(CART_URL, config)
        .then(res => {
          setCart(res.data.cart.map(item => item._id));
        })
        .catch(err => {
          if (err.response.status !== 401) {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: err.data,
              showConfirmButton: false,
              timer: 1500
            })
          }
        });

      axios.get(FAVS_URL, config)
        .then(res => {
          setFavorites(res.data.map(product => product.productId));
        })
        .catch(err => {
          if (err.response.status !== 401) {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: err.response.data.message,
              showConfirmButton: false,
              timer: 1500
            })
          }
        });
    }
  }, [refresh]);


  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  function favoritesHandle(product) {
    if (!token) {
      navigate('/login')
    } else {
      if (!favorites.includes(product.id)) {
        axios.post(`${FAVS_URL}/${product.id}`, {}, config)
          .then(() => setRefresh(Math.random()))
          .catch(err => {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: err.response.data.message,
              showConfirmButton: false,
              timer: 1500
            })
          });
      } else {
        axios.delete(`${FAVS_URL}/${product.id}`, config)
          .then(() => setRefresh(Math.random()))
          .catch(err => {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: err.response.data.message,
              showConfirmButton: false,
              timer: 1500
            })
          });
      }
    }
  }

  function cartHandle(product) {
    if (!token) {
      navigate('/login')
    } else {
      if (!cart.includes(product.id)) {
        const newCart = [...cart, product.id];
        setCart(newCart);
        axios.post(
          CART_URL, {
          model: product.model,
          price: product.price,
          img: product.image_URL,
          amount: 1
        }, config)
          .then()
          .catch(err => {
            console.log(err.response.data);
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: err.response.data.message,
              showConfirmButton: false,
              timer: 1500
            })
          });
      }
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
                onClick={() => favoritesHandle(product)}
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
              title={cart.includes(product.id) ? 'remover do carrinho' : 'adicionar ao carrinho'}
              inCart={cart.includes(product.id)}
              onClick={() => cartHandle(product)}
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