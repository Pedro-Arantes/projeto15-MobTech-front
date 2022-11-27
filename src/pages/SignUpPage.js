import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ThreeDots } from 'react-loader-spinner';
import Swal from 'sweetalert2';
import styled from 'styled-components';
import axios from 'axios';

import { SIGN_UP_URL } from '../constants.js';
import logo from '../assets/images/borsalino.png';

export default function SignUpPage() {

  const navigate = useNavigate();
  const [formEnabled, setFormEnabled] = useState(true);
  const [form, SetForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  function handleForm(e) {
    const { name, value } = e.target;
    SetForm({ ...form, [name]: value });
  }

  function spinner() {
    return (
      <ThreeDots
        height='50'
        width='50'
        radius='4'
        color='#73C800'
      />
    );
  }

  function confirmPassword() {
    if (form.password !== form.confirmPassword) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'O campo "confirme a senha" deve conter o mesmo valor do campo "senha"!'
      })
      SetForm({
        ...form,
        password: '',
        confirmPassword: ''
      });
      setFormEnabled(true);
    } else {
      return ({
        name: form.name,
        email: form.email,
        password: form.password
      });
    }
  }

  function signUp(e) {
    e.preventDefault();
    setFormEnabled(false);

    const user = confirmPassword();

    if (user) {
      axios.post(SIGN_UP_URL, user)
        .then((res) => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: res.data.message,
            showConfirmButton: false,
            timer: 1500
          })
          navigate('/login');
        })
        .catch(err => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err.response.data.message
          })
          setFormEnabled(true);
        });
    }
  }

  return (
    <PageContainer>
      <Link to='/'>
        <Logo
          title={formEnabled ? 'Página inicial' : 'aguarde...'}
          disabled={!formEnabled}
        >
          <img src={logo} alt='MobTech logo' />
          <span>MobTech</span>
        </Logo>
      </Link>
      <Form onSubmit={signUp}>
        <Input
          type='text'
          placeholder='Nome'
          name='name'
          value={form.name}
          onChange={handleForm}
          disabled={!formEnabled}
          required
        />

        <Input
          type='email'
          placeholder='E-mail'
          name='email'
          value={form.email}
          onChange={handleForm}
          disabled={!formEnabled}
          required
        />

        <Input
          type='password'
          placeholder='Senha'
          name='password'
          value={form.password}
          onChange={handleForm}
          disabled={!formEnabled}
          required
        />

        <Input
          type='password'
          placeholder='Confirme a senha'
          name='confirmPassword'
          value={form.confirmPassword}
          onChange={handleForm}
          disabled={!formEnabled}
          required
        />

        <Button
          type='submit'
          title={formEnabled ? 'Criar conta' : 'aguarde...'}
          disabled={!formEnabled}
        >
          {formEnabled ? 'Cadastrar' : spinner()}
        </Button>
      </Form>
      <Link to='/login'>
        <ButtonSwap
          title={formEnabled ? 'Fazer login' : 'aguarde...'}
          disabled={!formEnabled}
        >
          Já tem uma conta? Entre agora!
        </ButtonSwap>
      </Link>
    </PageContainer>
  );
}

const PageContainer = styled.main`
  width: 100%;
  height: 100vh;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
	font-family: 'Montserrat', sans-serif;
  background-color: #483D8B;
  padding: 25px;
  box-sizing: border-box;

  a {
    text-decoration: none;
  }

  &:hover {
    cursor: default;
  }
`;

const Logo = styled.button`
  font-family: 'Audiowide', cursive;
  font-weight: 400;
  font-size: 40px;
  line-height: 50px;
  color: #73C800;
  transition: 1s;
  border: none;
  outline: none;
  background-color: transparent;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  
  > span {
    width: 70%;
  }

  > img { 
    width: 30%;
    margin: 10px;
  }

  &:hover {
    transform: scale(1.05);
    cursor: pointer;
  }
  
  &:disabled {
    transform: none;
    cursor: default;
  }
`;

const Form = styled.form`
  max-width: 330px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 30px 0px;
`;

const Input = styled.input`
  width: 100%;
  height: 58px;
  font-family: 'Montserrat', sans-serif;
  font-size: 20px;
  line-height: 23px;
  color: #000000;
  background-color: #FFFFFF;
  border-radius: 5px;
  border: none;
  outline: none;
  padding: 0px 15px;
  margin-bottom: 13px;
  box-sizing: border-box;
  
  &::placeholder {
    font-family: 'Montserrat', sans-serif;
    font-size: 20px;
    line-height: 23px;
    color: #909090;
  }
  &:focus {
    outline: none;
  }
  &:disabled {
    color: #AFAFAF;
    background-color: #F2F2F2;
    -webkit-text-fill-color: #AFAFAF;
    -webkit-box-shadow: 0 0 0px 45px #F2F2F2 inset;
    box-shadow: 0 0 0px 45px #F2F2F2 inset;
  }
`;

const Button = styled.button`
  width: 100%;
  height: 46px;
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  font-size: 20px;
  line-height: 23px;
  color: #FFFFFF;
  background-color: rgba(255, 255, 255, .15);
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 3px;
  border: none;
  outline: none;
  transition: 1s;

  &:hover {
    background-color: rgba(255, 255, 255, .30);
    transform: scale(1.05);
    cursor: pointer;
  }

  &:disabled {
    transform: none;
    background-color: rgba(255, 255, 255, .15);
    cursor: default;
  }
`;

const ButtonSwap = styled.button`
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  font-size: 15px;
  line-height: 18px;
  box-sizing: border-box;
  background-color: transparent;
  color: rgba(255, 255, 255, .80);
  border: none;
  outline: none;
  transition: 1s;

  &:hover {
    color: rgba(255, 255, 255, 1);
    transform: scale(1.1);
    cursor: pointer;
  }

  &:disabled {
    transform: none;
    color: rgba(255, 255, 255, .80);
    cursor: default;
  }
`;