import React, { useEffect, useState } from "react";
import axios from "axios";

const ProductModify = () => {
  const [message, setMessage] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("item/1");
      setMessage(response.data);
    };
    fetchData();
  }, []);

  const onChangeItemName = (e) => {
    setMessage({
      ...message,
      itemName: e.target.value,
    });
  };
  const onChangeItemSellStatus = (e) => {
    setMessage({
      ...message,
      itemSellStatus: e.target.value,
    });
  };
  const onChangePrice = (e) => {
    setMessage({
      ...message,
      price: e.target.value,
    });
  };
  const onChangeStockNumber = (e) => {
    setMessage({
      ...message,
      stockNumber: e.target.value,
    });
  };

  const onChangeItemType = (e) => {
    setMessage({
      ...message,
      itemType: e.target.value,
    });
  };

  const onChangeItemDetail = (e) => {
    setMessage({
      ...message,
      itemDetail: e.target.value,
    });
  };

  const [file, setFIle] = useState("");

  const onChangeImg = (e) => {
    e.preventDefault();
    if (e.target.files) {
      const uploadFile = e.target.files;
      setFIle(uploadFile);
    }
    getItemImgDtoListId();
  };
  var itemImgIds = [];
  const getItemImgDtoListId = () => {
    for (let i = 0; i < message["itemImgDtoList"].length; i++) {
      let temp = message["itemImgDtoList"][i]["id"];
      console.log(temp);
      itemImgIds.push(temp);
    }
    console.log("itemImgIds", itemImgIds);
    setMessage({ ...message, itemImgIds });
  };

  useEffect(() => {
    console.log(message);
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("사진파일", file);
    const formData = new FormData();
    for (let i = 0; i < file.length; i++) {
      formData.append("itemImgFile", file[i]);
    }
    formData.append("itemDetail", message.itemDetail);
    formData.append("price", message.price);
    formData.append("itemSellStatus", message.itemSellStatus);
    formData.append("itemName", message.itemName);
    formData.append("stockNumber", message.stockNumber);
    formData.append("id", message.id);
    formData.append("itemImgIds", message.itemImgIds);
    formData.append("itemType", message.itemType);

    console.log("formData", formData);
    //상품 수정
    await axios
      .post("/item/1", formData, {
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
    <div className="ProductForm" encType="multipart/form-data">
      <form encType="multipart/form-data" onSubmit={handleSubmit}>
        <div>
          <input type="hidden" value={message.id} />
          <input type="hidden" value={file.id} />
        </div>

        <div>
          <select
            className="mt-1 ml-1 py-2 px-2"
            id="itemSellStatus"
            value={message.itemSellStatus}
            onChange={onChangeItemSellStatus}
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
            value={message.itemName}
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
            value={message.price}
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
            value={message.stockNumber}
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
            value={message.itemDetail}
            onChange={onChangeItemDetail}
          />
        </div>
        <div>
          <input
            className="mt-1 ml-3 py-2 px-2 w-[310px] shadow-sm sm:text-sm border-gray-300 rounded-md"
            type="text"
            id="itemType"
            placeholder="상품 타입 입력"
            required
            value={message.itemType}
            onChange={onChangeItemType}
          />
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
            상품 수정
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductModify;
