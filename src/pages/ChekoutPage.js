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

export default function CartPage() {
    const { total} = useContext(DataContext)

    const FinishBuy = (stat) =>{

        if (stat === "buy") {
            Swal.fire({
                icon: "success",
              });
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
                    <input placeholder="Tel Contato"></input>
                </div>
                <div>
                    <HiOutlineMapPin/>
                    <input placeholder="Endereço"></input>
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