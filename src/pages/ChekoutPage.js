import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from 'react';
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
    const FinishBuy = (stat) =>{

        if (stat === "buy") {

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
                    //console.log(resposta)
                    Swal.fire({
                        icon: "success",
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
        }else{
            Swal.fire({
                icon: "error",
              });
        }
        
    }
    return (
        <MainStyled>
            <NavBarComponent/>
            <FormCheckout>
                <div>
                    <BsTelephone/>
                    <input required placeholder="Tel Contato" value={tell} onChange={e => setTell(e.target.value)}></input>
                </div>
                <div>
                    <HiOutlineMapPin/>
                    <input required placeholder="Endereço" value={adress} onChange={e => setAdress(e.target.value)}></input>
                </div>
                
                
            </FormCheckout>
            <BalanceStyled>
                <TotalDiv>
                    <p>Total</p>
                    <p>{total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                </TotalDiv>
                <BtnsDiv>
                <BtnBuy onClick={() => FinishBuy("buy")}>Finalizar Compra</BtnBuy>
                <BtnCancel onClick={() => FinishBuy("cancel")}>Cancelar Compra</BtnCancel>
                </BtnsDiv>
                
            </BalanceStyled>
        </MainStyled>
    )
}