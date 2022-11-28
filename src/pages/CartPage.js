import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from 'react';
import { DataContext } from "../context/Auth";
import { MainStyled, CartStyled, BalanceStyled } from "../assets/styles/CartStyle"
import CartItem from "../components/CartItem";
import NavBarComponent from "../components/NavBarComponent";
import Swal from 'sweetalert2'
import { CART_URL } from '../constants.js';

export default function CartPage() {

    
    const [update,setUpdate] = useState("")
    const[test,setTeste]=useState("")
    const { setCart,cartArray,total,setTotal,token} = useContext(DataContext)

    const navigate = useNavigate();

    const NextPage = ()=>{
        //verificar se o carrinho está vazio
        if (cartArray.length<1) {
            navigate("/")
        }else{
            navigate("/compra")
        }
        
    }
    const calcTotal = (array) =>{
        const arr= array?.map((item)=> item.price )
        const arrAmount= array?.map((item)=> item.amount )
        
        let tot = 0;
        for (let i = 0; i < arr.length; i++) {
            const num = Number(arr[i]) * Number(arrAmount[i]);
            
            tot = tot + Number(num)
        }
        
        setTotal(tot)
    }
    
    
    useEffect(()=>{
        const getCart = ()=>{
          
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
            const tratarSucesso = (resp) => {
               
                const dataArray = resp.data.cart
                calcTotal(dataArray)
                setCart(dataArray)
               
            }

            const tratarErro = (resp) => {
                //console.log(resp)
                Swal.fire({
                    icon: "warning",
                    text: "Acesso Não autorizado!"
                  }); 
                  setTimeout(()=>{
                    navigate("/")
                    window.location.reload()
                  },2000)
            }

            const req = axios.get(CART_URL, config);
            req.then(tratarSucesso)
            req.catch(tratarErro)
        }
        getCart()
    },[update,test])
    console.log(update)
    
    useEffect(() => {
        const interval = setInterval(() => calcTotal(cartArray), 1000);
        return  clearInterval(interval);
      }, []);

    return (
        <MainStyled>
            <NavBarComponent/>
            <CartStyled>
                <h1>Bem vindo ao seu carrinho!</h1>
                {cartArray?.map((item,id)=><CartItem navigate={navigate} setUpdate={setUpdate} setTeste={setTeste} teste={test} objt={item} token={token}key={id}/>)}
                
            </CartStyled>
            <BalanceStyled>
                <div>
                    <p>Total</p>
                    <p>{total.toLocaleString('pt-BR',{style: 'currency', currency: 'BRL'})}</p>
                </div>
                
                <button onClick={NextPage}>Comprar</button>
            </BalanceStyled>
        </MainStyled>
    )
}