import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router";
import { useNavigate } from "react-router-dom";

const ProductModify = () => {
  const [message, setMessage] = useState({
    itemImgDtoList: [
      {
        imgUrl: "",
      },
    ],
  });
  const [itemImgIds, setItemImgIds] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  console.log(location);
  useEffect(() => {
    // const fetchData = async () => {
    //   const response = await axios.get(`item/${location.state.id}`)
    //   setMessage(response.data);
    //   console.log(location.state.id,"ID확인");
    // };
    const fetchData = async () => {
      try {
        const response = await axios.get(`item/${location.state.id}`);
        setMessage(response.data);
        console.log(location.state.id, "ID확인");
      } catch (e) {
        window.location.assign("/ProductSellerList");
      }
    };

    fetchData();
  }, [location]);

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
    console.log("바뀌냐????????????????????");
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

  const [file, setFIle] = useState([]);
  const [dummy, setDummy] = useState(0);

  const onChangeImg = (e) => {
    e.preventDefault();
    if (e.target.files) {
      const uploadFile = e.target.files;
      setFIle([...file, uploadFile]);
      console.log(uploadFile);
    }
    getItemImgDtoListId();
    if (dummy < 3) setDummy(dummy + 1);
    if (dummy > 3) setDummy(0);
  };
  const getItemImgDtoListId = () => {
    let temp = message["itemImgDtoList"][0]["id"] + dummy;
    console.log(temp);
    setItemImgIds([...itemImgIds, temp]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("사진파일", file);
    const formData = new FormData();
    for (let i = 0; i < file.length; i++) {
      formData.append("itemImgFile", file[i][0]);
    }
    formData.append("itemDetail", message.itemDetail);
    formData.append("price", message.price);
    formData.append("itemSellStatus", message.itemSellStatus);
    formData.append("itemName", message.itemName);
    formData.append("stockNumber", message.stockNumber);
    formData.append("id", message.id);
    formData.append("itemImgIds", itemImgIds);
    console.log("--------=-=-=-=", message.itemType);
    formData.append("itemType", message.itemType);
    //상품 수정
    await axios
      .post(`item/${location.state.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((e) => {
        alert("수정완료!");
        window.location.reload();
      })
      .catch(function (error) {
        if (error.response && error.response.status === 400) {
          alert("상품 등록시 필요한 값이없습니다.");
        } else if (error.response && error.response.status === 401) {
          alert("상품 등록시 필요한 값이없습니다.");
        } else {
          console.log("Error", error.message);
          alert("오류 발생");
          for (let value of formData.values()) {
            console.log("=========value:", value);
          }
        }
        console.log(error.config);
      });
  };

  //상품삭제
  // const deleteSubmit = async (e) => {
  //   await axios
  //     .delete(`/items/delete/${location.state.id}`)
  //     .then((e) => {
  //       console.log("삭제는 성공");
  //       alert("삭제 성공");
  //       window.location.assign("/ProductSellerList");
  //     })
  //     .catch(function (e) {
  //       console.log(e);
  //       console.log(location.state.id);
  //     });
  // };

  const deleteSubmit = useCallback(async () => {
    try {
      await axios.delete(`/items/delete/${location.state.id}`);
      console.log("삭제는 성공");
      alert("제발");
      window.location.assign("/ProductSellerList");
    } catch (e) {
      console.log(e);
      console.log(location.state.id);
    }
  }, [location]);

  return (
    <div className="ProductForm">
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
          <select
            className="mt-1 ml-3 py-2 px-2 w-[310px] shadow-sm sm:text-sm border-gray-300 rounded-md"
            id="itemType"
            value={message.itemType}
            onChange={onChangeItemType}
          >
            <option value="outer">outer</option>
            <option value="top">top</option>
            <option value="dress">dress</option>
            <option value="skirt">skirt</option>
            <option value="pants">pants</option>
            <option value="shoes&bag">shoes&bag</option>
            <option value="accessory">accessory</option>
          </select>
        </div>
        {message["itemImgDtoList"].map((i, key) => {
          return (
            <div key={key}>
              <label htmlFor="profile-upload" />
              <input
                className="mt-1 ml-1 py-2 px-2"
                type="file"
                name="itemImgFile"
                id="itemImgFile"
                accept="image/*"
                onChange={onChangeImg}
              />
            </div>
          );
        })}
        <div>
          <button className="mt-1 mb-3 ml-3 py-2 px-2 w-[80px] shadow-sm sm:text-sm border-gray-300 rounded-md">
            상품 수정
          </button>
        </div>
      </form>
      <form>
        <button
          onClick={deleteSubmit}
          className="mb-4 ml-3 py-2 px-2 w-[80px] shadow-sm sm:text-sm border-gray-300 rounded-md"
        >
          상품 삭제
        </button>
      </form>
    </div>
  );
};

export default ProductModify;
