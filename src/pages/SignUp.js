import styled, { keyframes } from "styled-components";
import axios from "axios"
import { useState } from "react"
import { Link, useNavigate} from 'react-router-dom';
import mob from "../assets/images/mob.png"





export default function SignUpComponent(){

    const [form, setForm] = useState({ name: "", email: "", password: "", passwordConfirm: ""})
    const [boolButton, setBoolButton] = useState(false)
    const navigate = useNavigate();

    function handleForm(e) {
        e.preventDefault();
        const {name, value} = e.target
        setForm({...form, [name]: value})
        
      }

    function fazerCadastro(event) {
        event.preventDefault();
        setBoolButton(true)
        console.log(form.password, form.passwordConfirm, "password e passwordConfirm")
        if (form.password === form.passwordConfirm) {
            const URL = "http://localhost:5000/sign-up"
            
            const body = {
                name: form.name,
                email: form.email,
                password: form.password
            }
            console.log(body, "body que está sendo enviado pelo post /sign-up")
            const promise = axios.post(URL, body)

            promise.then((res) => {
                navigate("/login")
            })

            promise.catch((err) => {
                alert(err)
                console.log(err)
                setBoolButton(false)
            })
        }else{
            window.alert("As senhas não equivalem!")
            setBoolButton(false)
        }

    }


    return (
        <Fundo>
            
            <Titulo>
                MobTech
               
            </Titulo>
            <Form onSubmit={fazerCadastro}>
                <input onChange={handleForm} name="name" required type="text" placeholder="nome"></input>
                <input onChange={handleForm} name="email" required type="email" placeholder="email"></input>
                <input onChange={handleForm} name="password" required type="password" placeholder="senha"></input>
                <input onChange={handleForm} name="passwordConfirm" required type="password" placeholder="confirmar senha"></input>
                <button disabled={boolButton} type="submit" >
                    {(boolButton === false) ? "Cadastrar" : <DotWrapper> <Dot delay="0s" /> <Dot delay=".1s" /> <Dot delay=".2s" /> </DotWrapper>}
                </button>
            </Form>
            <Link to={`/`}> <p>Já tem uma conta? Faça login agora!</p> </Link>
        </Fundo>
    )

}


const Titulo = styled.div`
font-family: 'Audiowide';
font-size: 400%;
font-weight: bold;
color: #DDFF0D;
padding-bottom: 1%;
margin-bottom: 10px;
`
const Chapeu = styled.img`
width: 10px;
height: 10px;
`

const Fundo= styled.div`
    padding-top: 5%;
    width: 100%;
    position: relative;
    z-index: 0;
    border: none;
    display: flex;
    flex-direction: column;
    align-items: center;
    img{
        margin-top: 125px;
        width: 180px;
        height: 178.38px;
    }
    p{
        text-decoration: underline;
        font-family: 'Raleway';
        color: orange;
        font-weight: 600;
    }
    @media (max-width: 800px) {
        padding-top: 30%;
      }
`
const Form = styled.form`
    
    width: 90%;
    margin-right: 1%;
    display: flex;
    flex-direction: column;
    input{
        margin-bottom: 10px;
        padding-left: 3%;
        width: 96%;
        height: 42px;
        font-size: 150%;
        border: 1px solid #D5D5D5;
        border-radius: 30px;
        ::placeholder,
        ::-webkit-input-placeholder {
        color: lightgray;
        font-family: 'Raleway';
        }
    }
    button{
        font-family: 'Raleway';
        width: 100%;
        height: 50px;
        font-size: 150%;
        background: #a59bc6;
        border: none;
        border-radius: 30px;
        color: #ffffff;
        margin: 15px 0 10px 0;
        &:disabled{
            color: #52B6FF;
        }
    
`
const BounceAnimation = keyframes`
  0% { margin-bottom: 0; }
  50% { margin-bottom: 15px }
  100% { margin-bottom: 0 }
`;
const DotWrapper = styled.div`
    
    display: flex;
    align-items: center;
    justify-content: center;
    
`;
const Dot = styled.div`
  background-color: #FFFFFF;
  border-radius: 50%;
  width: 10px;
  height: 10px;
  margin: 0 5px;
  /* Animation */
  animation: ${BounceAnimation} 0.5s linear infinite;
  animation-delay: ${props => props.delay};
`;