import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from 'react';
import { DataContext } from "../context/Auth";
import { MainStyled, CartStyled, BalanceStyled } from "../assets/styles/CartStyle"
import CartItem from "../components/CartItem";
import NavBarComponent from "../components/NavBarComponent";

export default function CartPage() {

    const [total, setTotal] = useState("")
    const { setCart} = useContext(DataContext)
    const array = [1,2,3,4,5,6,7]
    const navigate = useNavigate();

    const NextPage = ()=>{
        //verificar se o carrinho está vazio
        navigate("/compra")
    }
    return (
        <MainStyled>
            <NavBarComponent/>
            <CartStyled>
                <h1>Bem vindo ao seu carrinho!</h1>
                {array.map((item,id)=><CartItem key={id}/>)}
                
            </CartStyled>
            <BalanceStyled>
                <div>
                    <p>Total</p>
                    <p>$1000.00</p>
                </div>
                
                <button onClick={NextPage}>Comprar</button>
            </BalanceStyled>
        </MainStyled>
    )
}