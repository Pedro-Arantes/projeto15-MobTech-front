import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from 'react';
import { DataContext } from "../context/Auth";
import { MainStyled, CartStyled, BalanceStyled, CartItemStyled, CartDescription,CounterDiv,CartContent } from "../assets/styles/CartStyle"

import {FiTrash2} from  'react-icons/fi'

export default function CartPage() {

    const [total, setTotal] = useState("")

    return (
        <MainStyled>
            <CartStyled>
                <h1>Olá, fulano bem vindo ao seu carrinho!</h1>
                <CartItemStyled>
                    <CartContent>
                        <img alt="vazio" src="http://cdn.shopify.com/s/files/1/0413/8896/6039/products/celular-samsung-galaxy-a71-128gb-6gb-ram-dual-tela-67-4g-4-cameras-preto_1.jpg?v=1601306627"></img>

                        <CartDescription>
                            <p>Sansung Galaxy A71</p>
                            <p>$64,95</p>
                            <CounterDiv>
                                <button>-</button>
                                <p>1</p>
                                <button>+</button>
                            </CounterDiv>
                            
                        </CartDescription>
                    </CartContent>

                    <FiTrash2/>
                </CartItemStyled>
                <CartItemStyled>
                    <CartContent>
                        <img alt="vazio" src="http://cdn.shopify.com/s/files/1/0413/8896/6039/products/celular-samsung-galaxy-a71-128gb-6gb-ram-dual-tela-67-4g-4-cameras-preto_1.jpg?v=1601306627"></img>

                        <CartDescription>
                            <p>Sansung Galaxy A71</p>
                            <p>$64,95</p>
                            <CounterDiv>
                                <button>-</button>
                                <p>1</p>
                                <button>+</button>
                            </CounterDiv>
                            
                        </CartDescription>
                    </CartContent>

                    <FiTrash2/>
                </CartItemStyled>
            </CartStyled>
            <BalanceStyled>
                <div>
                    <p>Total</p>
                    <p>$1000.00</p>
                </div>
                <button>Comprar</button>
            </BalanceStyled>
        </MainStyled>
    )
}