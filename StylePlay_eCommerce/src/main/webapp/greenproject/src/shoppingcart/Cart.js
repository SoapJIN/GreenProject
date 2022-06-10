import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./cart.css";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import {
  updateCart_ADD,
  updateCart_DECREASE,
  updateCart_MODIFY,
  updateCart_REMOVE,
} from ".";
import { addCart, decCart, deleteCart, modifyCart } from "./action/action";

const Cart = (email) => {
  const location = useLocation(); //"user_name:", location.state.user_name
  const items = useSelector((state) => state.basket.basket);
  const [Login_cartData, setLogin_cartData] = useState([]);
  
  //email에 맞는 cartItemS 가져오기
  useEffect(() => {
    const getCartItems = async () => {
      const response = await axios.get("/cart"); //"Login_cartData", response.data
      setLogin_cartData(response.data);
    };
    getCartItems();
  }, []);

  const dispatch = useDispatch();

  //버튼(+,-) 눌렀을때 작용함!
  const handleAdd = (item) => {
    var result=Login_cartData.filter((x)=>x.itemId === item.id);
    dispatch(addCart(item.id));
    updateCart_ADD(item, result[0].cartItemId);
  };
  const handleDec = (item) => {
    var result=Login_cartData.filter((x)=>x.itemId === item.id);
    dispatch(decCart(item.id));
    updateCart_DECREASE(item, result[0].cartItemId);
  };

  //input 태그 안에 숫자 변경시 작용함!
  const handleChange = (item, count) => {
    var result=Login_cartData.filter((x)=>x.itemId === item.id);
    dispatch(modifyCart(item.id, count));
    updateCart_MODIFY(result[0].cartItemId, count);
  };

  //삭제하기 버튼 눌렀을때 작용함!
  const handleRemove = (item) => {
    var result=Login_cartData.filter((x)=>x.itemId === item.id);
    dispatch(deleteCart(item.id));
    updateCart_REMOVE(result[0].cartItemId);
  };

  const emptyCart = () => {
    return (
      <div className="px-4 my-5 bg-light rounded-3 py-5">
        <div className="container py-4">
          <div className="row">
            <h3>장바구니가 비었어요! :'c </h3>
          </div>
        </div>
      </div>
    );
  };

  var sum = 0;
  const cartItems = (cartItem,index) => {
    var productPrice = cartItem.count * cartItem.price;
    sum += productPrice;
    return (
      <div key={index}>
        <div className="d-flex flex-column bg-white">
          <div className="px-4 bg-light rounded-3 py-5">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-md-4 ">
                  <img
                    src={cartItem.image}
                    alt={cartItem.title}
                    style={{ height: "200px", width: "180px" }}
                  />
                </div>
                <div className="col-md-4">
                  <h3 className="text-2xl">
                    {cartItem.title}
                    <button
                      className="mt-1 mb-4 ml-3 py-2 px-2 w-[50px] shadow-sm sm:text-sm border-gray-300 rounded-md"
                      onClick={() => handleRemove(cartItem)}
                    >
                      삭제
                    </button>
                  </h3>
                  <div className="lead fw-bold" style={{ paddingLeft: "0px" }}>
                    {cartItem.price.toLocaleString("ko-KR")}원
                    <input
                      type="text"
                      className="mt-1 ml-3 py-2 px-2 w-[310px] shadow-sm sm:text-sm border-gray-300 rounded-md"
                      style={{
                        width: "65px",
                        textAlign: "center",
                        border: "1px",
                        borderColor: "green",
                      }}
                      value={cartItem.count}
                      onChange={(count) =>
                        handleChange(cartItem, parseInt(count.nativeEvent.data))
                      }
                    />
                    <button
                      className="btn btn-outline-dark me-4"
                      style={{ marginLeft: "10px" }}
                      onClick={() => handleDec(cartItem)}
                    >
                      <FontAwesomeIcon icon={["fas", "minus"]} />
                    </button>
                    <button
                      className="btn btn-outline-dark"
                      style={{ marginLeft: "-10px" }}
                      onClick={() => handleAdd(cartItem)}
                    >
                      <FontAwesomeIcon icon={["fas", "plus"]} />
                    </button>
                  </div>

                  <br />
                  <div className="lead fw-bold">
                    총 금액{" "}
                    {(cartItem.count * cartItem.price).toLocaleString("ko-KR")}
                    원
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  // 장바구니에 item있으면 결제하기 버튼 뜸!
  const buttons = () => {
    return (
      <>
        <div className="row">
          <Link
            to="/order"
            className="btn btn-outline-dark mb-5 w-auto mx-auto"
          >
            결제하기
          </Link>
        </div>
      </>
    );
  };

  return (
    <div>
      <div className="checkout">
        <div className="checkout_left">
          <div>
            <h2 className="checkout_title text-3xl"> {location.state.user_name}님의 장바구니 </h2>
          </div>
        </div>
      </div>
      {items.length === 0 && emptyCart()}
      {items.length !== 0 && items.map((i,index) => cartItems(i,index))}
      <div className="container">
        <div className="row justify-content-center">
          <p className="lead fw-bold mb-3 w-auto">
            총 주문 금액 : {sum.toLocaleString("ko-KR")} 원
          </p>
        </div>
      </div>

      {items.length !== 0 && buttons()}
    </div>
  );
};

export default Cart;
