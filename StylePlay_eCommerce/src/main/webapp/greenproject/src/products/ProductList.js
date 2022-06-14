import { Link, useParams } from "react-router-dom";
import Product from "./Product";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ScrollToTopOnMount from "../template/ScrollToTopOnMount";
import axios from "axios";
import Pagination from "../pagenation/Pagination";

const categories = [
  "all",
  "outer",
  "top",
  "dress",
  "skirt",
  "pants",
  "shoes&bag",
  "accessory",
];

function FilterMenuLeft({
  changeFilter,
  priceStart,
  priceEnd,
  setPriceEnd,
  setPriceStart,
}) {
  const changePriceStart = (e) => {
    console.log("1)", e.target.value);
    setPriceStart(e.target.value);
  };
  const changePriceEnd = (e) => {
    console.log("2)", e.target.value);
    setPriceEnd(e.target.value);
  };

  return (
    <ul className="list-group list-group-flush rounded">
      <li className="list-group-item d-none d-lg-block">
        <h5 className="mt-1 mb-2">제품 상세 목록</h5>
        <div className="d-flex flex-wrap my-2">
          {categories.map((category, index) => {
            return (
              <Link
                key={index}
                to={`/products/cate/${category}`}
                className="btn btn-sm btn-outline-dark rounded-pill me-2 mb-2"
                onClick={() => {
                  changeFilter();
                }}
                replace
              >
                {category}
              </Link>
            );
          })}
          {/* 제품 상제 목록에 있는 걸 누르면 해당 주소로 이동하는데 map를 돌려서 각자 다르개 처리 */}
        </div>
      </li>
      <li className="list-group-item">
        <h5 className="mt-1 mb-2">금액 범위</h5>
        <div className="d-grid d-block mb-3">
          <div className="form-floating mb-2">
            <input
              type="number"
              className="form-control"
              placeholder="Max"
              value={priceStart}
              onChange={changePriceStart}
            />
            <label htmlFor="floatingInput">최소 금액</label>
          </div>
          <div className="form-floating mb-2">
            <input
              type="number"
              className="form-control"
              placeholder="Max"
              value={priceEnd}
              onChange={changePriceEnd}
            />
            <label htmlFor="floatingInput">최대 금액</label>
          </div>
        </div>
      </li>
    </ul>
  );
}

function ProductList() {
  const [viewType, setViewType] = useState({ grid: true });
  const { id } = useParams(); //url cate뒤에 오는 카테고리 키워드!
  const [page1, setPage1] = useState(1);
  const [priceStart, setPriceStart] = useState(0);
  const [priceEnd, setPriceEnd] = useState(0);
  const [searchName, setSearchName] = useState("Search products...");

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

  function changeViewType() {
    setViewType({
      grid: !viewType.grid,
    });
  }

  //카테고리-필터 처리
  //page에 맞게 데이터 3개씩 가져옴
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `/main/${page1 - 1}/${priceStart}/${priceEnd}/${id}/${searchName}`
      ); // 가져오다
      setItems(response.data);
      console.log(response.data);
    };
    fetchData();
  }, [id, page1, priceStart, priceEnd, searchName]); // 페이지가 바뀔때마다 해당 페이지로 재 렌더링

  const changeSearchName = (e) => {
    console.log("2)", e.target.value);
    setSearchName(e.target.value);
  };

  return (
    <div className="container mt-5 py-4 px-xl-5">
      <ScrollToTopOnMount />
      <nav aria-label="breadcrumb" className="bg-custom-light rounded">
        <ol className="breadcrumb p-3 mb-0">
          <li className="breadcrumb-item">
            <Link
              className="text-decoration-none link-secondary"
              to="/products"
              replace
            >
              ALL
            </Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {id}
          </li>
        </ol>
      </nav>
      <div className="row mb-4 mt-lg-3">
        <div className="d-none d-lg-block col-lg-3">
          <div className="border rounded shadow-sm">
            <FilterMenuLeft
              priceStart={priceStart}
              priceEnd={priceEnd}
              setPriceStart={setPriceStart}
              setPriceEnd={setPriceEnd}
              page1={page1}
              setItems={setItems}
            />
          </div>
        </div>
        <div className="col-lg-9">
          <div className="d-flex flex-column h-100">
            <div className="row mb-3">
              <div className="col-lg-3 d-none d-lg-block"></div>
              <div className="col-lg-9 col-xl-5 offset-xl-4 d-flex flex-row">
                <div className="input-group">
                  <input
                    className="form-control"
                    type="text"
                    value={searchName}
                    onChange={changeSearchName}
                    placeholder="Search products..."
                    aria-label="search input"
                  />
                  <button className="btn btn-outline-dark">
                    <FontAwesomeIcon icon={["fas", "search"]} />
                  </button>
                </div>
                <button
                  className="btn btn-outline-dark ms-2 d-none d-lg-inline"
                  onClick={changeViewType}
                >
                  <FontAwesomeIcon
                    icon={["fas", viewType.grid ? "th-list" : "th-large"]}
                  />
                </button>
              </div>
            </div>
            <div
              className={
                "row row-cols-1 row-cols-md-2 row-cols-lg-2 g-3 mb-4 flex-shrink-0 " +
                (viewType.grid ? "row-cols-xl-3" : "row-cols-xl-2")
              }
            >
              {items.content.map((content, index) => {
                if (viewType.grid) {
                  return (
                    <Product
                      key={index}
                      percentOff={index % 2 === 0 ? 15 : null}
                      id={content.id}
                      title={content.itemName}
                      price={content.price}
                      image={content.imgUrl}
                      rating={5}
                      heading={id}
                      itemType={content.itemType}
                    />
                  );
                }
                return (
                  <Product
                    key={index}
                    percentOff={index % 2 === 0 ? 15 : null}
                    id={content.id}
                    title={content.itemName}
                    price={content.price}
                    image={content.imgUrl}
                    rating={5}
                    heading={id}
                    itemType={content.itemType}
                  />
                );
              })}
              {/* 보는 방식을 다르게 함! 보는 방식을 다르게 할 때 제품군의 매칭을 우리가 해결해야함 굳이 해야할지는 모르겠음 데이터만 잘들어가면 알아서해줄거 같기도함 */}
            </div>
            <div className="d-flex flex-row justify-content-between">
              <span className="text-muted small d-none d-md-inline">
                Showing {items.size} of {items.totalElements}
              </span>
              {/* 100개중에 10개를 보여주는데 이것도 데이터 받아서 구현할꺼면 해야함
                아래 부분은 페이징 처리 부분 JPA로 처리해야함 */}
              <Pagination
                total={items.totalElements}
                limit={items.size}
                page={page1}
                setPage={setPage1}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductList;
