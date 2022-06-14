import React, {useEffect } from "react";
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
  const [totalPrice,setTotalPrice] = useState(0);
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

  //email에 맞는 cartItemS 가져오기
  useEffect(() => {
    const getCartItems = async () => {
      const response = await axios.get("/cart");
      setCartItemsMore(response.data);
    };
    getCartItems();
  }, []);

  //값 변경시 user value 바뀜
  let name, value;
  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;
    setUser({ ...user, [name]: value });
  };
  const handleInput2 = (e) => {
    value = myAddress + e.target.value;
    setUser({ ...user, address: value });
  };
  console.log("user",user)

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
      window.location.replace("/");
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


  //결제 API
    useEffect(()=>{
      const jquery = document.createElement("script");
      jquery.src="https://code.jquery.com/jquery-1.12.4.min.js";
      const iamport = document.createElement("script");
      iamport.src ="https://cdn.iamport.kr/js/iamport.payment-1.2.0.js";
      document.head.appendChild(jquery);
      document.head.appendChild(iamport);
      return ()=>{
        document.head.removeChild(jquery);
        document.head.removeChild(iamport);
      }
    },[])


    function onClickPayment() {
      /* 1. 가맹점 식별하기 */
      const { IMP } = window;
      IMP.init('imp27499198');
     
      /* 2. 결제 데이터 정의하기 */
      const data = {
        pg: 'kakaopay',                           // PG사
        pay_method: 'card',                           // 결제수단
        merchant_uid:`mid_${new Date().getTime()}`,   // 주문번호
        name: '주문명:결제테스트',                  // 주문명
        amount: totalPrice,                                 // 결제금액
        buyer_name: user.name,                           // 구매자 이름
        buyer_tel: user.phone,                     // 구매자 전화번호
        buyer_email: user.email,               // 구매자 이메일
        buyer_addr: user.address,                    // 구매자 주소
        buyer_postcode : myZipcode
      };
  
      /* 4. 결제 창 호출하기 */
      IMP.request_pay(data, callback);
    }
  
    /* 3. 콜백 함수 정의하기 */
    function callback(response) {
      console.log("결제response",response)
      const {
        success,
        error_msg,
      } = response;
      if (success) {
        handleSubmit(cartItemsMore);
      } else {
        alert(`결제 실패: ${error_msg}`);
      }
    }

  return (
    <div className="Instruction">
      <div className="Instruction-Main">
        <div className="Instruction-Main-left">
          <div className="mb-4">
            <div className="Instruction-Main-left-email-top">
              <div className="flex w-full">
                <h5 className="text-[16px] font-bold">Recipient Info</h5>
                <p className="pl-1 text-[12px]">수령자 정보</p>
              </div>
            </div>
            <div className="mb-1 Instruction-Main-left-email-bottom">
              <label className="mt-3 pl-1 text-[12px] underline underline-offset-2">이메일</label>
              <input
                type="email"
                name="email"
                defaultValue={user.email}
                className="focus:ring-indigo-500 mt-1 mb-1  outline-none focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md border-gray-300 py-2"
                id="exampleFormControlInput1"
                placeholder="이메일"
              />
            </div>
          </div>

          <div className="Instruction-Main-left-form">
            <div className="mt-1 md:mt-0 md:col-span-2 ">
              <div className="flex w-full">
                <div className="col-span-6 sm:col-span-3">
                  <label className="mt-1 pl-1 text-[12px] underline underline-offset-2">이름</label>
                  <input
                    type="text"
                    name="name"
                    defaultValue={user.name}
                    onChange={handleInputs}
                    className="w-[300px] mt-1 px-2 py-2 focus:ring-indigo-500 outline-none focus:border-indigo-500 block shadow-sm sm:text-sm border-gray-300 rounded-md"
                    placeholder="이름"
                    aria-label="name"
                  />
                </div>
              </div>

              <label className="mt-4 pl-1 text-[12px] underline underline-offset-2">지번</label>
              <div className="flex w-full">
                <div>
                  <input
                    defaultValue={myZipcode}
                    placeholder="지번 "
                    className="w-[100px] mt-1 px-2 py-2 focus:ring-indigo-500 outline-none focus:border-indigo-500 block shadow-sm sm:text-sm border-gray-300 rounded-md"
                  ></input>
                </div>
                <div>
                  <button
                    onClick={() => onOpenZipcode()}
                    className="mt-1 ml-2 focus:ring-indigo-500 py-2 px-2 outline-none focus:border-indigo-500 block shadow-sm sm:text-sm border-gray-300 rounded-md"
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
                <label className="mt-1 pl-1 text-[12px] underline underline-offset-2">주소</label>
                <input
                  type="text"
                  name="address"
                  defaultValue={myAddress}
                  className="mt-1 focus:ring-indigo-500 py-2 px-2 outline-none focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  id="inputAddress"
                  placeholder="주소"
                />
              </div>
              <div className="col-12">
                <label className="mt-1 pl-1 text-[12px] underline underline-offset-2">상세주소</label>
                <input
                  type="text"
                  name="address2"
                  defaultValue={user.address}
                  onChange={handleInput2}
                  className="mt-1 focus:ring-indigo-500 py-2 px-2 outline-none focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  id="inputAddress2"
                  placeholder="상세주소"
                />
              </div>
              <div className="col">
              <label className="mt-4 pl-1 text-[12px] underline underline-offset-2">전화번호</label>
                <input
                  type="number"
                  name="phone"
                  defaultValue={user.phone}
                  onChange={handleInputs}
                  className="mt-1 mb-2 focus:ring-indigo-500 outline-none py-2 px-2 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
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
                    onClick={onClickPayment}
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
          <CartItemSummry setTotalPrice={setTotalPrice}  />
        </div>
      </div>
    </div>
  );
};

export default Order;
