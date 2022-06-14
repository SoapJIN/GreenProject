import {  useSelector } from "react-redux";
//import { getCartItems } from "../redux/action";
import {
  RightInnerBox,
  PriceBox,
  TotalBox,
  ProdSummryBox,
  RightBox,
  ProductDiv,
  ProdImgData,
  ProdImg,
  ProdDetails,
  ProdPrice,
} from "./StyledComponents/CartItemSummryStyled";

const CartItemSummry = ({setTotalPrice}) => {

  const basket = useSelector((state) => state.basket.basket);
  console.log("basket",basket);



  let sum=0;
  return (
    <RightBox>
      <RightInnerBox>
        <ProdSummryBox>
          {basket.map((prod,index) => {
            sum=sum + prod.price * prod.count
            setTotalPrice(sum)
            return (
              <ProductDiv key={index}>
                <ProdImgData>
                  <ProdImg>
                    <img src={prod.image} alt="" />
                  </ProdImg>
                  <ProdDetails>
                    <p style={{ fontSize: "14px" }}>{prod.title}</p>
                    <p style={{ fontSize: "12px" }}>
                      {prod.price.toLocaleString("ko-KR")}원
                    </p>
                    <p style={{ fontSize: "12px" }}>Quantity :{prod.count}</p>
                  </ProdDetails>
                </ProdImgData>
                <ProdPrice>
                  {(prod.price * prod.count).toLocaleString("ko-KR")}원
                </ProdPrice>
              </ProductDiv>
            );
          })}
        </ProdSummryBox>
        <PriceBox>
          <div>
            <p>Subtotal</p>
            <p>
              <span>{sum.toLocaleString("ko-KR")}</span>원
            </p>
          </div>
          <div>
            <p>배송비</p>
            <p>Free</p>
          </div>
        </PriceBox>
        <TotalBox>
          <p style={{ fontSize: "16px", fontWeight: "bold" }}>Total</p>
          <div>
            <p style={{ fontSize: "24px", color: "#323232" }}>
              <span>{sum.toLocaleString("ko-KR")}</span>원
            </p>
          </div>
        </TotalBox>
      </RightInnerBox>
    </RightBox>
  );
};

export default CartItemSummry;
