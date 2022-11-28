import axios from "axios";
import {  useNavigate } from "react-router-dom";
import { useState, useContext,useEffect } from 'react';
import { DataContext } from "../context/Auth";
import NavBarComponent from "../components/NavBarComponent";
import { MainStyled } from "../assets/styles/CartStyle"
import { BtnsDiv , BalanceStyled,TotalDiv,BtnCancel,BtnBuy,FormCheckout} from "../assets/styles/ChekoutStyle";
import {BsTelephone} from  'react-icons/bs'
import {HiOutlineMapPin} from  'react-icons/hi2'
import Swal from 'sweetalert2'

import { PURCHASE_URL } from '../constants.js';


export default function CartPage() {
    const { total, token} = useContext(DataContext)
    const [tell,setTell] = useState("")
    const [adress,setAdress] = useState("")
    const navigate = useNavigate();
/*     const token = "540e441c-9227-4749-ba22-9fe8204e7dfc"
 */
    const VerifyToken = () =>{
     if (token === undefined) {
        Swal.fire({
            icon: "warning",
            text: "Acesso Não autorizado!"
          }); 
          setTimeout(()=>{
            navigate("/")
            window.location.reload()
          },2000)
     }
    }
    const FinishBuy = () =>{

        

              const postPurchase = () =>{

                const obj = {
                    adress,
                    tell,
                    total
                }
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
        
                const tratarSucesso = (resposta) => {
                    console.log(resposta)
                    Swal.fire({
                        icon: "success",
                        text: "Entrega sendo preparada para envio!"
                      });  
                    navigate("/")
                }
        
                const tratarErro = (resp) => {
                    console.log(resp.message)
                    const re = resp.message
                    Swal.fire({text: re,})
                    navigate("/compra")
                }
                const requisicao = axios.post(PURCHASE_URL, obj, config);
                requisicao.then(tratarSucesso)
                requisicao.catch(tratarErro)
              }
              postPurchase()
        
        
    }

    const CancelPurchase = () =>{
        
        Swal.fire({
            icon: "error",
            text: "Compra cancelada com Sucesso!"
          });
          navigate("/carrinho")
    }
    const submit = (e) => {
        FinishBuy();
        e.preventDefault();
        //navigate("/home")
    }
    useEffect(()=>{
        VerifyToken()
    },[])
    
    return (
        <MainStyled>
            <NavBarComponent/>
            <FormCheckout id="form"  onSubmit={ submit}>
                <div>
                    <BsTelephone/>
                    <input required placeholder="Tel Contato" value={tell} onChange={e => setTell(e.target.value)} minLength= "11"></input>
                </div>
                <div>
                    <HiOutlineMapPin/>
                    <input required  minLength= "14" maxLength="60" placeholder="Endereço" value={adress} onChange={e => setAdress(e.target.value)}></input>
                </div>
                
                
            </FormCheckout>
            <BalanceStyled>
                <TotalDiv>
                    <p>Total</p>
                    <p>{total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                </TotalDiv>
                <BtnsDiv>
                <BtnBuy  type="submit" form="form" >Finalizar Compra</BtnBuy>
                <BtnCancel  onClick={CancelPurchase}>Cancelar Compra</BtnCancel>
                </BtnsDiv>
                
            </BalanceStyled>
        </MainStyled>
    )
}