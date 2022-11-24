import styled, { keyframes } from "styled-components";
import axios from "axios"
import { useContext, useState } from "react"
import { Link, useNavigate} from 'react-router-dom';
import { DataContext } from "../context/Auth";




export default function Login(){

    const { setToken } = useContext(DataContext);
    const [boolButton, setBoolButton] = useState(false)
    const [form, setForm] = useState({ email: "", password: "" })
    const navigate = useNavigate();

    function handleForm(e) {
        const { name, value } = e.target
        setForm({ ...form, [name]: value })
        
    }

    function fazerLogin(event) {
        event.preventDefault();
        setBoolButton(true)
        
            const URL = "http://localhost:5000/login"
            
            const body = form;
            console.log(body, "body que está sendo enviado pelo post /login")
            const promise = axios.post(URL, body)

            promise.then((res) => {
                setToken(res.data[0].token)
                navigate("/login")
            })

            promise.catch((err) => {
                window.alert('Usuário não encontrado ou já está logado')
                console.log(err)
                setBoolButton(false)
            })
    }

    

    return (
        <Fundo>
            <Titulo>MobTech</Titulo>
            <Form onSubmit={fazerLogin} >
                <input disabled={boolButton} onChange={handleForm} name="email" required type="email" placeholder="email"></input>
                <input disabled={boolButton} onChange={handleForm} name="password" required type="password" placeholder="senha"></input>
                <button disabled={boolButton} type="submit" >
                    {(boolButton === false) ? "Logar" : <DotWrapper> <Dot delay="0s" /> <Dot delay=".1s" /> <Dot delay=".2s" /> </DotWrapper>}
                </button>
            </Form>
            <Link to={`/cadastro`}> <p>Ainda não tem uma conta? Cadastre-se!</p> </Link>
        </Fundo>
    )

}

const Titulo = styled.div`
font-family: 'Audiowide';
font-size: 400%;
font-weight: bold;
color: #DDFF0D;
padding-bottom: 1%;
margin-bottom: 15px;
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