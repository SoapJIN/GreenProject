import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Pagination from "../pagenation/Pagination";
import { CANCEL, ORDER } from "./order_constants";

const OrderHistory = () => {
  const location = useLocation(); //"user_name:", location.state.user_name
  const [orders, setOrders] = useState([]);
  const [limit, setLimit] = useState(5); //페이지당 order개수
  const [page, setPage] = useState(1); //현재 페이지 번호
  const offset = (page - 1) * limit; //첫 게시물의 위치

  //item 데이터 가져오기!!
  useEffect(() => {
    const fetchData = async () => {
      //"orderHistory:",response
      const response = await axios.get(`/orders`).catch(function (error) {
        console.log(error);
        console.log(error.response.data);
      });
      setOrders(response.data.content);
    };
    fetchData();
  }, []);
  const handlecancel = (e) => {
    let orderId = e.target.value;
    const fetchData = async () => {
      var url = `/order/${orderId}/cancel`;
      const response = await axios.post(url).catch(function (error) {
        console.log(error);
        console.log(error.response.data);
        if (error.response.status === 500) {
          alert("실패 ! 로그인 해주세요!");
        }
      });
      if (response) alert("주문 취소 완료!");
      setOrders(response.data.content);
    };
    fetchData();
  };

  const orderItems = (order, index) => {
    return (
      <div key={index}>
        <div className="content-mg">
          <div className="d-flex mb-3 mr-64 align-self-center">
            <h3 className="mt-10">{order.orderDate} 주문</h3>
            <div className="ml-3">
              {order.orderStatus === ORDER && (
                <div>
                  <button
                    onClick={(orderId) => handlecancel(orderId)}
                    type="button"
                    className="btn btn-outline-dark mt-10"
                    value={order.orderId}
                  >
                    주문취소
                  </button>
                </div>
              )}
              {order.orderStatus === CANCEL && (
                <div>
                  <h3 className="mt-10">(취소완료)</h3>
                </div>
              )}
            </div>
          </div>
          <div className="card d-flex">
            {order.orderItemDTOList.map((orderItem, index) => (
              <div key={index} className="d-flex mb-3">
                <div className="repImgDiv">
                  <img
                    className="rounded repImg p-2 h-28 w-28"
                    src={orderItem.imgUrl}
                    alt={orderItem.itemNm}
                  ></img>
                </div>
                <div className="align-self-center w-75">
                  <span className="fs24 font-semibold">
                    {orderItem.itemName}
                  </span>
                  <div className="fs18 font-normal">
                    <span>{orderItem.orderPrice}원</span>
                    <span> {orderItem.count}개</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <div className="checkout">
        <div className="checkout_left">
          <div>
            <h2 className="checkout_title text-3xl">
              {" "}
              {location.state.user_name}님의 주문내역{" "}
            </h2>
          </div>
        </div>
      </div>
      <div className="container">
        <label className="-ml-10 mt-2">
          number of posts:&nbsp;
          <select
            type="number"
            value={limit}
            onChange={({ target: { value } }) => setLimit(Number(value))}
          >
            <option value="5">5</option>
            <option value="10">10</option>
          </select>
        </label>
        <div className="row justify-content-center">
          <div className="lead fw-bold mb-3 w-auto">
            {orders.length !== 0 &&
              orders
                .slice(offset, offset + limit)
                .map((i, index) => orderItems(i, index))}
          </div>
        </div>
      </div>
      <div>
        <Pagination
          total={orders.length}
          limit={limit}
          page={page}
          setPage={setPage}
        />
      </div>
    </div>
  );
};

export default OrderHistory;
