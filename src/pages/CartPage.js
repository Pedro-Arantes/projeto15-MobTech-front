import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from 'react';
import { DataContext } from "../context/Auth";
import { MainStyled, CartStyled, BalanceStyled, CartItemStyled, CartDescription,CounterDiv,CartContent } from "../assets/styles/CartStyle"
import CartItem from "../components/CartItem";

export default function CartPage() {

    const [total, setTotal] = useState("")
    const array = [1,2,3,4,5,6,7]
    return (
        <MainStyled>
            <CartStyled>
                <h1>Bem vindo ao seu carrinho!</h1>
                {array.map((item,id)=><CartItem key={id}/>)}
                
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