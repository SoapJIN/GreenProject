import React, { useState } from "react";
import axios from "axios";

const ProductForm = () => {
  const [file, setFIle] = useState([]);
  const [itemName, setItemName] = useState("");
  const [price, setPrice] = useState("");
  const [stockNumber, setStockNumber] = useState("");
  const [itemDetail, setItemDetail] = useState("");
  const [itemSellStatus, setItemSellStatus] = useState("SELL");
  const [itemType, setItemType] = useState("outer");

  const onChangeImg = (e) => {
    e.preventDefault();
    if (e.target.files) {
      const uploadFile = e.target.files;
      console.log("uploadFile", uploadFile);
      setFIle(uploadFile);
    }
  };
  const onChangeItemName = (e) => {
    e.preventDefault();
    setItemName(e.target.value);
  };
  const onChangePrice = (e) => {
    e.preventDefault();
    setPrice(e.target.value);
  };
  const onChangeStockNumber = (e) => {
    e.preventDefault();
    setStockNumber(e.target.value);
  };
  const onChangeItemType = (e) => {
    e.preventDefault();
    console.log(e.target.value, "확인");
    setItemType(e.target.value);
  };

  const onChangeItemDetail = (e) => {
    e.preventDefault();
    setItemDetail(e.target.value);
  };

  const onChangeItemSellStatus = (e) => {
    e.preventDefault();
    console.log(e.target.value, "확인");
    setItemSellStatus(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("사진파일", file);
    const formData = new FormData();
    for (let i = 0; i < file.length; i++) {
      formData.append("itemImgFile", file[i]);
    }
    formData.append("itemDetail", itemDetail);
    formData.append("price", price);
    formData.append("itemSellStatus", itemSellStatus);
    formData.append("itemName", itemName);
    formData.append("stockNumber", stockNumber);
    formData.append("itemType", itemType);

    //상품 등록
    await axios
      .post("/item/new", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .catch(function (error) {
        if (error.response && error.status === 400) {
          // 400 에러 코드일 경우
          console.log("상품 등록시 필요한 값이없습니다.");
          alert("상품 등록시 필요한 값이없습니다.");
          // location.reload(); // 새로고침 주는법은 강사님한테 물어보장
        } else if (error.response && error.status === 401) {
          console.log("첫번째 사진이 등록되지 않았습니다.");
          alert("상품 등록시 필요한 값이없습니다.");
          //location.reload(); // 새로고침 주는법은 강사님한테 물어보장
        } else {
          // 오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다.
          console.log("Error", error.message);
          alert("오류 발생");
          //location.reload(); // 새로고침 주는법은 강사님한테 물어보장
        }
        console.log(error.config);
      });
  };

  return (
    <div>
      <div className="checkout">
        <div className="checkout_left">
          <div>
            <h2 className="checkout_title text-3xl">상품 등록</h2>
          </div>
        </div>
      </div>
      <div className="ProductForm">
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div>
            <select
              className="mt-1 ml-1 py-2 px-2"
              id="itemSellStatus"
              onChange={onChangeItemSellStatus}
              value={itemSellStatus}
            >
              <option value="SELL">판매중</option>
              <option value="SOLD_OUT">품절</option>
            </select>
          </div>
          <div>
            <input
              className="mt-1 ml-3 py-2 px-2 w-[310px] shadow-sm sm:text-sm border-gray-300 rounded-md"
              type="text"
              id="itemName"
              autoComplete="off"
              placeholder="상품명"
              required
              onChange={onChangeItemName}
            />
          </div>
          <div>
            <input
              className="mt-1 ml-3 py-2 px-2 w-[310px] shadow-sm sm:text-sm border-gray-300 rounded-md"
              type="number"
              id="price"
              autoComplete="off"
              placeholder="가격"
              required
              onChange={onChangePrice}
            />
          </div>
          <div>
            <input
              className="mt-1 ml-3 py-2 px-2 w-[310px] shadow-sm sm:text-sm border-gray-300 rounded-md"
              type="number"
              id="stockNumber"
              autoComplete="off"
              placeholder="상품의 재고를 입력해주세요"
              required
              onChange={onChangeStockNumber}
            />
          </div>
          <div>
            <textarea
              className="mt-1 ml-3 mb-1 py-2 px-2 w-[310px] shadow-sm sm:text-sm border-gray-300 rounded-md"
              type="text"
              id="itemDetail"
              placeholder="상품 상세 내용"
              required
              onChange={onChangeItemDetail}
            />
          </div>
          <div>
            <select
              className="mt-1 ml-3 py-2 px-2 w-[310px] shadow-sm sm:text-sm border-gray-300 rounded-md"
              id="itemType"
              value={itemType}
              onChange={onChangeItemType}
            >
              <option value="outer" selected>
                outer
              </option>
              <option value="top">top</option>
              <option value="dress">dress</option>
              <option value="skirt">skirt</option>
              <option value="pants">pants</option>
              <option value="shoes&bag">shoes&bag</option>
              <option value="accessory">accessory</option>
            </select>
          </div>
          <div>
            <label htmlFor="profile-upload" />
            <input
              className="mt-1 ml-1 py-2 px-2"
              type="file"
              name="itemImgFile"
              id="itemImgFile"
              multiple="multiple"
              accept="image/*"
              onChange={onChangeImg}
            />
          </div>
          <div>
            <button className="mt-1 mb-4 ml-3 py-2 px-2 w-[80px] shadow-sm sm:text-sm border-gray-300 rounded-md">
              상품 등록
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
