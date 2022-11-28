import { BsHeartFill, BsCartPlus, BsStarHalf, BsCartCheckFill, BsHeart } from 'react-icons/bs';
import { FaArrowLeft } from 'react-icons/fa';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Oval } from 'react-loader-spinner';
import styled from 'styled-components';
import axios from 'axios';
import Swal from 'sweetalert2';

import { DataContext } from '../context/Auth.js';
import { ProductContext } from '../context/ProductContext.js';
import { FAVS_URL, CART_URL } from '../constants.js';
import NavBarComponent from '../components/NavBarComponent.js';

export default function ProductPage() {

  const { token } = useContext(DataContext);
  const {
    favorites,
    setFavorites,
    cart,
    setCart,
    selectedProduct,
  } = useContext(ProductContext);

  const navigate = useNavigate();
  const [loadingFav, setLoadingFav] = useState(false);
  const [loadingCart, setLoadingCart] = useState(false);

  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  function favoritesHandle(product) {
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
            });
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

  function cartHandle(product) {
    if (!token) {
      navigate('/login');
    } else {
      if (!cart.includes(product.id)) {
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
  }

  async function alertError() {
    await (Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Ocorreu um erro ao carregar este produto',
      showCancelButton: true,
      cancelButtonText: 'Voltar à página principal',
      confirmButtonText: 'Tentar novamente',
    })).then((result) => {
      if (!result.isConfirmed) {
        navigate('/');
      }
    })
  };

  function spinner() {
    return (
      <Oval
        height={13}
        width={13}
        color="#4fa94d"
        ariaLabel='oval-loading'
        secondaryColor="#606060"
        strokeWidth={10}
        strokeWidthSecondary={10}
      />
    );
  }

  if (!selectedProduct) {
    alertError();
    return (
      <StyledProduct>
        <NavBarComponent />
        <StyledContent>
        </StyledContent>
      </StyledProduct>
    );
  }
  return (
    <StyledProduct>
      <NavBarComponent />
      <StyledContent>
        <StyledBackButton
          title={'Voltar para página principal'}
          onClick={() => navigate('/')}>
          <FaArrowLeft />
        </StyledBackButton>
        <StyledImage
          title={selectedProduct.model}
          src={selectedProduct.image_URL}
          alt={`Foto de ${selectedProduct.model}`}
        />
        <StyledContainerDescription>
          <StyledTop>
            <StyledModelPrice>
              <h1>{selectedProduct.model}</h1>
              <h2>{selectedProduct.version}</h2>
              <h3>
                {
                  Number(selectedProduct.price).toLocaleString(
                    'pt-BR',
                    { style: 'currency', currency: 'BRL' }
                  )
                }
              </h3>
            </StyledModelPrice>
            <StyledReviews title={'105 avaliações'}>
              <BsStarHalf />
              {selectedProduct.reviews}
            </StyledReviews>
          </StyledTop>
          {selectedProduct.description}
          <StyledButtons>
            <StyledButtonAddCart
              title={cart.includes(selectedProduct.id) ? 'adicionado ao carrinho' : 'adicionar ao carrinho'}
              inCart={cart.includes(selectedProduct.id)}
              onClick={() => cartHandle(selectedProduct)} 
              disabled={cart.includes(selectedProduct.id)}
            >
              {(loadingCart ? 
                spinner() :
                    <>
                      {cart.includes(selectedProduct.id) ? 'adicionado ao carrinho' : 'adicionar ao carrinho'}
                      {cart.includes(selectedProduct.id) ? <BsCartCheckFill /> : <BsCartPlus />}
                    </>
              )}
            </StyledButtonAddCart>
            <StyledButtonFav
              title={favorites.includes(selectedProduct.id) ? 'remover dos favoritos' : 'adicionar aos favoritos'}
              onClick={() => favoritesHandle(selectedProduct)}
              disabled={loadingFav}
            >
              {(loadingFav ?
                spinner() :
                favorites.includes(selectedProduct.id) ? <BsHeartFill /> : <BsHeart />
              )}
            </StyledButtonFav>
          </StyledButtons>
        </StyledContainerDescription>
      </StyledContent>
    </StyledProduct>
  );
}

const StyledProduct = styled.main`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  font-family: 'Montserrat', sans-serif;
  background-color: #483D8B;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: default;
`;

const StyledContent = styled.section`
  width: 90%;
  max-width: 600px;
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
  justify-content: space-between;
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

const StyledImage = styled.img`
  width: 50%;
  height: 25%;
  margin: auto;
  object-fit: contain;
  overflow: hidden;
`;

const StyledContainerDescription = styled.section`
  width: 100%;
  display: flex;
  padding: 20px 40px;
  flex-direction: column;
  text-align: justify;
  align-items: center;
  justify-content: space-evenly;
  background: #202024;
  opacity: 0.7;
  border-radius: 15px 15px 0px 0px;
`;

const StyledTop = styled.div`
  width: 100%;
  height: 40%;
  display: flex;
`;

const StyledModelPrice = styled.section`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;

  > h1 {
    margin: 6px 0px;
    font-weight: 600;
    font-size: 25px;
    line-height: 27px;
    color: #FFFFFF
  }

  > h2 {
    margin: 6px 0px;
    font-weight: 600;
    font-size: 18px;
    line-height: 20px;
    color: #FFFFFF
  }
  > h3 {
    margin: 6px 0px;
    font-weight: 600;
    font-size: 23px;
    line-height: 25px;
    color: #FFFFFF
  }
`;

const StyledReviews = styled.section`
  display: flex;
  text-align: center;
  font-weight: 600;
  font-size: 20px;
  line-height: 27px;
  color: #FFFFFF;

  > svg {
    font-size: 20px;
    color: #FFC567;
    margin: 0px 5px;
  }
`;

const StyledButtons = styled.div`
  width: 100%;
  min-height: 40px;
  height: -moz-fit-content;
  height: fit-content;
  display: flex;
  margin: 10px 0px;
  justify-content: space-between;
  
`;

const StyledButtonAddCart = styled.button`
  width: 100%;
  background-color: ${props => props.inCart ? '#75B038' : '#FFFFFF'};
  font-family: 'Montserrat', sans-serif;
  color: ${props => props.inCart ? '#FFFFFF' : '#73C800'};
  font-weight: 600;
  font-size: 18px;
  box-shadow: 0px 4px 7px rgba(0, 0, 0, 0.08);
  border-radius: 15px;
  margin: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  outline: none;
  transition: .7s;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));

  > svg {
    width: 18px;
    height: 18px;
    margin: 0px 10px;
    font-size: 18px;
    color: ${props => props.inCart ? '#FFFFFF' : '#73C800'};
  }

  &:hover {
    transform: scale(1.05);
    cursor: pointer;
  }

  &:disabled {
    cursor: default;
    transform: none;
  }
`;

const StyledButtonFav = styled.button`
  width: 50px;
  min-height: 30px;
  background: #FFFFFF;
  font-family: 'Montserrat', sans-serif;
  color: #FF4949;
  font-weight: 600;
  font-size: 15px;
  box-shadow: 0px 4px 7px rgba(0, 0, 0, 0.08);
  border-radius: 25px;
  margin: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  outline: none;
  transition: .7s;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));

  &:hover {
    transform: scale(1.3);
    cursor: pointer;
  }
`;