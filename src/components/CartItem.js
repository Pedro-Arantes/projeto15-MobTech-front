import { useState, useContext, useEffect } from 'react';

import {  CartItemStyled, CartDescription,CounterDiv,CartContent } from "../assets/styles/CartStyle"
import {FiTrash2} from  'react-icons/fi'

export default function CartItem (){

    

    return(
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
    )
}