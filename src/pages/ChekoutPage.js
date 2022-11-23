import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from 'react';
import { DataContext } from "../context/Auth";
import { MainStyled, CartStyled, BalanceStyled } from "../assets/styles/CartStyle"

export default function CartPage() {


    return (
        <MainStyled>
            <CartStyled>
                <h1>Olá, fulano bem vindo ao seu carrinho!</h1>
            </CartStyled>
            <BalanceStyled>

            </BalanceStyled>
        </MainStyled>
    )
}