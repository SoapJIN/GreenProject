import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "../pagenation/Pagination";

const ProductSellerList = () => {
  const [page, setPage] = useState(1); // 현재페이지
  const [items, setItems] = useState({
    content: [
      {
        itemName: "",
        price: 0,
        id: 0,
        imgUrl: "",
      },
    ],
    pageable: {},
    size: 1,
    totalElements: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`/main/${page - 1}/5`); // 가져오다
      setItems(response.data);
    };
    fetchData();
  }, [page]); // 페이지가 바뀔때마다 해당 페이지로 재 렌더링

  console.log(items);
  return (
    <div>
      <div className="checkout">
        <div className="checkout_left">
          <div>
            <h2 className="checkout_title text-3xl"> 등록 상품 종류 </h2>
          </div>
        </div>
      </div>
      {items["content"].map((content, index) => (
        <div key={index} className="m-4 ">
          <Link
            className="mt-1 mb-4 ml-2 py-3 px-3 w-[50px] shadow-sm sm:text-sm border-gray-300 rounded-md"
            to={"/productModify"}
            state={{ id: content.id }}
          >
            {content.itemName}
          </Link>
        </div>
      ))}
      <div className="d-flex flex-row justify-content-start">
        <Pagination
          total={items.totalElements}
          limit={items.size}
          page={page}
          setPage={setPage}
        />
      </div>
    </div>
  );
};

export default ProductSellerList;
