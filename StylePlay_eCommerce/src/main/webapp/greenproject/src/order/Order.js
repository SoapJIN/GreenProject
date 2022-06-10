import React, { useEffect } from "react";
import { useState } from "react";
import "./StyledComponents/CartItemSummryStyled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./order.css";
import { Link } from "react-router-dom";
import CartItemSummry from "./CartItemSummary";
import { DaumPostcode } from "react-daum-postcode";
import axios from "axios";
import { Modal } from "antd";

const Order = () => {
  const [myZipcode, setMyZipcode] = useState("");
  const [myAddress, setMyAddress] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [cartItemsMore, setCartItemsMore] = useState([]);
  const [user, setUser] = useState({
    name: "",
    email: "",
    address: "",
    addressNumber: "",
    nickname: "",
    phone: "",
  });

  //로그인 데이터 가져옴!!
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("/main2");
      console.log("response_user:", response);
      setUser(response.data);
    };
    fetchData();
  }, []);

  //값 변경시 user value 바뀜
  let name, value;
  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;
    setUser({ ...user, [name]: value });
  };
  const handleInput2 = (e) => {
    value = myZipcode + "_" + myAddress + "_" + e.target.value;
    setUser({ ...user, address: value });
  };

  //email에 맞는 cartItemS 가져오기
  useEffect(() => {
    const getCartItems = async () => {
      const response = await axios.get("/cart");
      setCartItemsMore(response.data);
    };
    getCartItems();
  }, []);

  //주문 넣기!
  var cartOrderDTOList = [];
  var paramData = [];
  const handleSubmit = (cartItems) => {
    var url = "/cart/orders";
    cartItems.forEach((item) => {
      var data = { cartItemId: item.cartItemId };
      cartOrderDTOList.push(data);
    });
    paramData.push({ cartOrderDTOList });
    const fetchData = async () => {
      const response = await axios.post(url, paramData).catch(function (error) {
        console.log(error);
        console.log(error.response.data);
        if (error.response.status === 400) {
          alert("실패 ! 상품의 재고가 부족해요!");
        }
        if (error.response.status === 500) {
          alert("실패 ! 로그인 해주세요!");
        }
      });
      if (response) alert("주문 완료!");
    };
    fetchData();
  };

  //주소찾기
  const handleComplete = (data) => {
    setMyZipcode(data.zonecode);
    setMyAddress(data.address);
    console.log(data.zonecode);
    console.log(data.address);

    setIsOpen(false);
  };

  function onOpenZipcode() {
    setIsOpen(true);
  }

  function onCloseZipcode() {
    setIsOpen(false);
  }

  return (
    <div className="Instruction">
      <div className="Instruction-Main">
        <div className="Instruction-Main-left">
          <div className="Instruction-Main-left-email">
            <div className="Instruction-Main-left-email-top">
              <div className="flex w-full">
                <h5 className="text-[16px] font-bold">Recipient Info</h5>
                <p className="pl-1 text-[12px]">수령자 정보</p>
              </div>
            </div>
            <div className="mb-3 Instruction-Main-left-email-bottom">
              <input
                type="email"
                name="email"
                value={user.email}
                className="focus:ring-indigo-500 mt-2 mb-2  outline-none focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md border-gray-300 py-2"
                id="exampleFormControlInput1"
                placeholder="이메일"
              />
            </div>
          </div>

          <div className="Instruction-Main-left-form">
            <div className="mt-5 md:mt-0 md:col-span-2 ">
              <div className="flex w-full">
                <div className="col-span-6 sm:col-span-3">
                  <input
                    type="text"
                    name="name"
                    value={user.name}
                    onChange={handleInputs}
                    className="w-[300px] mt-1 px-2 py-2 focus:ring-indigo-500 outline-none focus:border-indigo-500 block shadow-sm sm:text-sm border-gray-300 rounded-md"
                    placeholder="이름"
                    aria-label="name"
                  />
                </div>
              </div>

              <div className="flex w-full">
                <div>
                  <input
                    defaultValue={myZipcode}
                    placeholder="지번 "
                    className="w-[100px] mt-4 px-2 py-2 focus:ring-indigo-500 outline-none focus:border-indigo-500 block shadow-sm sm:text-sm border-gray-300 rounded-md"
                  ></input>
                </div>
                <div>
                  <button
                    onClick={() => onOpenZipcode()}
                    className="mt-4 ml-2 focus:ring-indigo-500 py-2 px-2 outline-none focus:border-indigo-500 block shadow-sm sm:text-sm border-gray-300 rounded-md"
                  >
                    주소찾기
                  </button>
                  {isOpen && (
                    <Modal
                      className="absolute px-4 left-80 top-20 bg-gray-200 rounded-md"
                      visible={true}
                      onCancel={onCloseZipcode}
                    >
                      <DaumPostcode onComplete={handleComplete} />
                    </Modal>
                  )}
                </div>
              </div>
              <div className="col-12">
                <input
                  type="text"
                  name="address"
                  defaultValue={myAddress}
                  className="mt-2 focus:ring-indigo-500 py-2 px-2 outline-none focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  id="inputAddress"
                  placeholder="주소"
                />
              </div>
              <div className="col-12">
                <input
                  type="text"
                  name="address2"
                  defaultValue={user.address}
                  onChange={handleInput2}
                  className="mt-2 focus:ring-indigo-500 py-2 px-2 outline-none focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  id="inputAddress2"
                  placeholder="상세주소"
                />
              </div>
              <div className="col">
                <input
                  type="number"
                  name="phone"
                  value={user.phone}
                  onChange={handleInputs}
                  className="mt-4 mb-2 focus:ring-indigo-500 outline-none py-2 px-2 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  placeholder="전화번호"
                />
              </div>
              <div className="col-12 mt-4 flex justify-between">
                <div>
                  <Link to="/shoppingbasket">
                    <i className="fa-solid fa-angle-left">
                      <FontAwesomeIcon icon="fas fa-angle-left" />
                    </i>{" "}
                    Return to cart
                  </Link>
                </div>
                <div>
                  <button
                    onClick={() => handleSubmit(cartItemsMore)}
                    type="button"
                    className="bg-black px-4 py-2 text-white"
                  >
                    결제하기
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="Instruction-Main-right">
          <CartItemSummry />
        </div>
      </div>
    </div>
  );
};

export default Order;
