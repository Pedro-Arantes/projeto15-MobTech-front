import styled from 'styled-components';

export const FormCheckout = styled.form`
width: 100%;
display: flex;
gap: 20px;
flex-direction: column;
align-items: center;
justify-content: flex-start;
height: 50%;

font-size: 28px;
color: #DDFF0D;
input{
    width: 100%;
    height: 50px;

    border-radius: 10px;
    border-style: none;

    ::placeholder{
        font-family: 'Montserrat', sans-serif;
        font-size: 18px;
    }
    
}

div{
    width: 80%;
    display: flex;
    gap: 15px;
    align-items: center;
}


`
export const BtnsDiv = styled.div`

display: flex;
width: 100%;
align-items: center;
justify-content: center;
gap: 20px;

`
export const TotalDiv = styled.div`
width: 100%;
display: flex;
justify-content: space-between;

`
export const BtnCancel = styled.button`
:active {
  background-color: #ff0000;
  box-shadow: 0px 15px 20px rgba(46, 229, 157, 0.4);
 color: black;
  transform: translateY(-2px);
}
:hover {
  background-color: #ff0000;
  box-shadow: 0px 15px 20px rgba(46, 229, 157, 0.4);
 color: black;
  transform: translateY(-2px);
}
`
export const BtnBuy= styled.button`
:active {
  background-color: #2EE59D;
  box-shadow: 0px 15px 20px rgba(46, 229, 157, 0.4);
 color: black;
  transform: translateY(-2px);
}
:hover {
  background-color: #2EE59D;
  box-shadow: 0px 15px 20px rgba(46, 229, 157, 0.4);
 color: black;
  transform: translateY(-2px);
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


button{
    background-color: #6b657f;
    border-style: none;
    border-radius: 50px;

    height: 50px;
    width: 45%;
    color: #DDFF0D;

    font-size: 90%;
    font-weight: 600;
}


`