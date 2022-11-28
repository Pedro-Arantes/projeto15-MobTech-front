import { useContext, useState, useEffect } from 'react';
import { BsStarHalf, BsHeartFill, BsCartPlus, BsCartCheckFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { Oval } from 'react-loader-spinner';
import styled from 'styled-components';
import axios from 'axios';
import Swal from 'sweetalert2';

import { DataContext } from '../context/Auth.js';
import { ProductContext } from '../context/ProductContext.js';
import { FAVS_URL, CART_URL } from '../constants.js';

export default function ProductComponent({ product }) {
  const { token } = useContext(DataContext);
  const {
    favorites,
    setFavorites,
    cart,
    setCart,
    setSelectedProduct
  } = useContext(ProductContext);

  const navigate = useNavigate();
  const [loadingFav, setLoadingFav] = useState(false);
  const [loadingCart, setLoadingCart] = useState(false);

  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  useEffect(() => {
    if (token) {
      axios.get(CART_URL, config)
        .then(res => {
          setCart(res.data.cart.map(product => product.productId));
          setLoadingCart(false);
        })
        .catch(err => {
          console.log(err)
          if (err.response.status !== 401) {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: err.data,
              showConfirmButton: false,
              timer: 1500
            });
          }
        });

      axios.get(FAVS_URL, config)
        .then(res => {
          setFavorites(res.data.map(product => product.productId));
          setLoadingFav(false);
        })
        .catch(err => {
          setLoadingFav(false);
          if (err.response.status !== 401) {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: err.response.data.message,
              showConfirmButton: false,
              timer: 1500
            });
          }
        });
    }
  }, []);

  function spinner() {
    return (
      <Oval
        height={13}
        width={13}
        color="#4fa94d"
        ariaLabel='oval-loading'
        secondaryColor="#FFFFFF"
        strokeWidth={10}
        strokeWidthSecondary={10}
      />
    );
  }

  function favoritesHandle(e, product) {
    e.stopPropagation();
    if (!token) {
      navigate('/login');
    } else {
      setLoadingFav(true);
      if (!favorites.includes(product.id)) {
        axios.post(`${FAVS_URL}/${product.id}`, {}, config)
          .then(() => {
            const newFavorites = [...favorites, product.id];
            setFavorites(newFavorites);
            setLoadingFav(false);
          })
          .catch(err => {
            setLoadingFav(false);
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
          .then(() => {
            const newFavorites = favorites.filter(i => i !== product.id);
            setFavorites(newFavorites);
            setLoadingFav(false);
          })
          .catch(err => {
            setLoadingFav(false);
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: err.response.data.message,
              showConfirmButton: false,
              timer: 1500
            });
          });
      }
    }
  }

  function cartHandle(e, product) {
    e.stopPropagation();
    if (!token) {
      navigate('/login');
    } else {
      setLoadingCart(true);
      axios.post(
        CART_URL, {
        model: product.model,
        price: product.price,
        img: product.image_URL,
        amount: 1
      }, config)
        .then(() => {
          const newCart = [...cart, product.id];
          setCart(newCart);
          setLoadingCart(false);
        })
        .catch(err => {
          setLoadingCart(false);
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: err.response.data.message,
            showConfirmButton: false,
            timer: 1500
          });
        });
    }
  }

  return (
    <StyledProduct
      key={product.id}
      title={product.model}
      onClick={() => {
        setSelectedProduct(product);
        navigate('/produto');
      }}
    >
      <StyledTop>
        <StyledReviews>
          <BsStarHalf />
          <span>{product.reviews}</span>
        </StyledReviews>
        <StyledFavorite
          disabled={loadingFav}
          title={favorites.includes(product.id) ? 'remover dos favoritos' : 'adicionar aos favoritos'}
          inFavorite={favorites.includes(product.id)}
          onClick={(e) => favoritesHandle(e, product)}
        >
          {loadingFav ? spinner() : <BsHeartFill />}
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
        title={cart.includes(product.id) ? 'adicionado ao carrinho' : 'adicionar ao carrinho'}
        inCart={cart.includes(product.id)}
        onClick={(e) => cartHandle(e, product)}
      >
        {(loadingCart ?
          spinner() :
          cart.includes(product.id) ? <BsCartCheckFill /> : <BsCartPlus />
        )}
      </StyledAddCart>
    </StyledProduct>
  );
}

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
    cursor: pointer;
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
  display: flex;
  justify-content: center;
  align-items: center;

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
  display: flex;
  justify-content: center;
  align-items: center;

  > svg {
    font-size: 18px;
    color: ${props => props.inCart ? '#FFFFFF' : '#73C800'};
    margin: 0px 5px;
  }

  &:hover {
    transform: scale(1.3);
  }
`;