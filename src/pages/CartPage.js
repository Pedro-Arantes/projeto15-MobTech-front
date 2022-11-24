import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from 'react';
import { DataContext } from "../context/Auth";
import { MainStyled, CartStyled, BalanceStyled } from "../assets/styles/CartStyle"
import CartItem from "../components/CartItem";
import NavBarComponent from "../components/NavBarComponent";

export default function CartPage() {

    const [total, setTotal] = useState("")
    const [update,setUpdate] = useState("")
    const { setCart,cartArray} = useContext(DataContext)
    const array = [1,2,3,4,5,6,7]
    const navigate = useNavigate();
    const token = "540e441c-9227-4749-ba22-9fe8204e7dfc"
    const NextPage = ()=>{
        //verificar se o carrinho está vazio
        navigate("/compra")
    }

    useEffect(()=>{
        const getCart = ()=>{

            const URL = 'http://localhost:5000/cart'
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
            const tratarSucesso = (resp) => {
               
                const dataArray = resp.data.cart
                
                setCart(dataArray)
            }

            const tratarErro = (resp) => {
                console.log(resp)
                alert(resp.response.data)
                navigate("/")
                window.location.reload()
            }

            const req = axios.get(URL, config);
            req.then(tratarSucesso)
            req.catch(tratarErro)
        }
        getCart()
    },[update])

    return (
        <MainStyled>
            <NavBarComponent/>
            <CartStyled>
                <h1>Bem vindo ao seu carrinho!</h1>
                {cartArray?.map((item,id)=><CartItem navigate={navigate} setUpdate={setUpdate} objt={item} token={token}key={id}/>)}
                
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