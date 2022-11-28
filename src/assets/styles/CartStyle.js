import styled from 'styled-components';

export const  MainStyled = styled.main `
height: 100%;
width: 100%;
display: flex;
flex-direction: column;
justify-content: center;
color: white;

margin-top: 100px;
font-family: 'Montserrat', sans-serif;

`
export const CartStyled = styled.section`

display: flex;
flex-direction: column;
align-items: center;
gap: 20px;

height: 50%;
margin-bottom: 150px;

h1{
    font-size: 20px;
    font-weight: 600;
}
`

export const BalanceStyled = styled.article `
height: 20%;
width: 100%;
display: flex;
flex-direction: column;
gap: 20px;
justify-content: center;
align-items: center;

margin-top: 50px;
padding: 15px;

font-size: 25px;
font-weight: 600;

position: fixed;
bottom: 0;

background-color: #5a4cae;
box-shadow: 0px 15px 20px rgba(0, 0, 0, 0.3);
opacity: 0.9;
div{
    width: 100%;

    display: flex;
    justify-content: space-between;
}
button{
    background-color: #6b657f;
    border-style: none;
    border-radius: 50px;

    height: 50px;
    width: 80%;
    color: #DDFF0D;

    font-size: 90%;
    font-weight: 600;
}
button:active {
  background-color: #2EE59D;
  box-shadow: 0px 15px 20px rgba(46, 229, 157, 0.4);
 color: black;
  transform: translateY(-2px);
}
`
export const CartItemStyled = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
margin-left: 5px;
margin-right: 5px;

border-style: solid;


height: 50%;
width: 350px;


button{
    height: 30%;
    width: auto;
    color: #DDFF0D;
    background-color: #6b657f;
    

    border-style: none;
}

svg{
    font-size: 30px;

    margin-top: 20px;
    margin-right: 5px;
    color: #DDFF0D;
}

img{
    height: 50%;
    width: 50%;
}
`
export const CartContent = styled.div`
    display: flex;
    gap: 10px;
    width: 70%;
    height: 100%;
    max-height: min-content;
   
`
export const CartDescription = styled.div`

        display: flex;
        gap: 10px;
        flex-direction: column;
        justify-content: center;

        width: 100%;
        height: 100px;

        font-size: 20px;
`

export const CounterDiv = styled.div`

display: flex;
align-items: center;
gap: 18px;
width: 100%;

button{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 70%;
    border-radius: 100%;

    box-shadow: 0px 15px 20px rgba(0, 0, 0, 0.3);
}
button:active {
  background-color: #2EE59D;
  box-shadow: 0px 15px 20px rgba(46, 229, 157, 0.4);
 color: black;
  transform: translateY(-2px);
}
svg{
    font-size: 40px;
    margin-top: 0px;
    margin-right: 0px;
}
`