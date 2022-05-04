import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";




function Product(props) {

  
  const number = useSelector((state) => state.basket);
  console.log(number,"확인")

  const price = props.price
  let percentOff;
  let offPrice = `${price}원`;
  if (props.percentOff && props.percentOff > 0) {
    percentOff = (
      <div
        className="badge bg-dim py-2 text-white position-absolute"
        style={{ top: "0.5rem", left: "0.5rem" }}
      >
        {props.percentOff}% OFF
      </div>
    );

    offPrice = (
      <>
        <del>{price}원</del> {price - (props.percentOff * price) / 100}원
      </>
    );
  }
  
  const dispatch = useDispatch();

  const onCreate = useCallback((id,title,price,image) => {
    dispatch({
      type: "ADD_TO_BASKET",
      item: { id,title,price,image }
    });
  }, [dispatch]);

  // 위의 함수들은 할인 했을 때에 몇% 할인했는지 그리고 할인한 금액을 나타내기 위한 함수    가격 값들은 props로 받아옴
  return (
    <div className="col">
      <div className="card shadow-sm">
        <Link to="/products/1" href="!#" replace>
          {percentOff}
          <img
            className="card-img-top bg-dark cover"
            height="200"
            alt=""
            src={props.image}
          />
        </Link>
        {/* 이미지 구성  */}
        <div className="card-body">
          <h5 className="card-title text-center text-dark text-truncate">
            {props.title}
          </h5>
          <p className="card-text text-center text-muted mb-0">{offPrice}</p>
          <div className="d-grid d-block">
            <button className="btn btn-outline-dark mt-3" onClick={()=>{onCreate(props.id,props.title,props.price,props.image)}}>
              <FontAwesomeIcon icon={["fas", "cart-plus"]} /> 장바구니에 넣기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
