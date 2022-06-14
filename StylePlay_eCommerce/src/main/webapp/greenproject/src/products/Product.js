import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { ADD_TO_BASKET } from "../redux/cart_constants";

function Product(props) {
  const { price, id, title, image, heading, itemType } = props;

  const dispatch = useDispatch();
  const addCart = useCallback(
    (id, title, price, image) => {
      dispatch({
        type: ADD_TO_BASKET,
        item: { id, title, price, image },
      });
    },
    [dispatch]
  );

  //장바구니 클릭시
  const click = () => {
    const fetchData = async () => {
      var url = `item/cart/${id}`;
      let cartItem = { count: 1, itemId: id };
      const response = await axios.post(url, cartItem).catch(function (error) {
        console.log(error);
        console.log(error.response.data);
        if (error.response.status === 400) {
          alert("실패 ! 상품의 재고가 부족해요!");
        }
        if (error.response.status === 500) {
          alert("실패 ! 로그인 해주세요!");
        }
      });
      if (response) alert("장바구니 추가!");
    };
    fetchData();
    addCart(id, title, price, image);
  };

  // 위의 함수들은 할인 했을 때에 몇% 할인했는지 그리고 할인한 금액을 나타내기 위한 함수    가격 값들은 props로 받아옴
  return (
    <div className="col">
      <div className="card shadow-sm">
        <Link
          to={`/products/${id}`}
          state={{ id, title, price, image, heading, itemType }}
          replace
        >
          <img className="card-img-top bg-dark cover h-96" alt="" src={image} />
        </Link>
        {/* 이미지 구성  */}
        <div className="card-body">
          <h5 className="card-title text-center text-dark text-truncate">
            {title}
          </h5>
          <p className="card-text text-center text-muted mb-0">{price}원</p>
          <div className="d-grid d-block">
            <button className="btn btn-outline-dark mt-3" onClick={click}>
              <FontAwesomeIcon icon={["fas", "cart-plus"]} /> 장바구니에 넣기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
