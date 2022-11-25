import styled from 'styled-components';

export default function FeaturedProductsComponent({ featuredProducts }) {

  return (
    <StyledfeaturedProducts>
      {featuredProducts.map((product, index) => {
        return (
          <StyledfeaturedProduct key={index}>
            <div>
              <div>
                <h1>{product.model}</h1>
                <h2>{product.version}</h2>
              </div>
              <button>Ver detalhes</button>
            </div>
            <img
              src={product.image_URL}
              alt={`Foto ${product.model} ${product.version}`}
            />
          </StyledfeaturedProduct>
        );
      })}
    </StyledfeaturedProducts>
  );
}

const StyledfeaturedProducts = styled.section`
  width: 100%;
  margin: 20px 0px;
  display: flex;
  overflow-x: auto;

  &::-webkit-scrollbar {     
    height: 9px;
  }

  &::-webkit-scrollbar-track {
    background-color: #75B038;
    border-radius: 20px;
    width: 90%;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #646464;
    border-radius: 20px;  
    border: 2px solid #75B038;
  }
`;

const StyledfeaturedProduct = styled.div`
  width: 296px;
  height: 200px;
  min-width: 296px;
  min-height: 200px;
  background: linear-gradient(90deg, rgba(40, 40, 40, 0.4) 0%, rgba(83, 83, 83, 0.4) 100%);
  border-radius: 15px;
  border: none;
  outline: none;
  display: flex;
  align-items: center;
  margin: 10px;
  padding: 10px;

  > div {
    width: 50%;
    height: 80%;
    display: flex;
    padding: 5px;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;

    > button {
      height: 35px;
      font-family: 'Montserrat', sans-serif;
      font-weight: 600;
      font-size: 13px;
      line-height: 15px;
      color: #FFFFFF;
      background-color: #6D5982;
      box-shadow: 0px 3px 7px rgba(0, 0, 0, 0.08);
      border-radius: 15px;
      border: none;
      outline: none;
      transition: .7s;

      &:hover {
        transform: scale(1.1);
      }
    }

    > div > h1 {
      font-weight: 700;
      font-size: 18px;
      line-height: 23px;
      color: #FFFFFF;
    }

    > div > h2 {
      font-weight: 600;
      font-size: 18px;
      line-height: 23px;
      color: #FFFFFF;
    }
  }

  > img {
    width: 50%;
    height: 100%;
    object-fit: contain;
    overflow: hidden;
  }
`;