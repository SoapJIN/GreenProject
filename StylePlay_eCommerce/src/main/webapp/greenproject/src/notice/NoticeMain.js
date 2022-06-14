import React, { useState, useEffect } from "react";
import ScrollToTopOnMount from "../template/ScrollToTopOnMount";
import { Link, useLocation, useParams } from "react-router-dom";
import NoticeSearch from "./noticeDetail/NoticeSearch";
import "./making.css";
import axios from "axios";
import NoticeContents from "./noticeDetail/NoticeContents";
import NotiPaging from "./noticeDetail/NotiPaging";
import NoticeTabMenu from "./noticeDetail/NoticeTabMenu";
import Search from "antd/lib/transfer/search";
import Pagination from "../pagenation/Pagination";

const NoticeMain = () => {
  // const { page } = useParams();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const offset = (page - 1) * limit; //첫 게시물의 위치

  const [search, setSearch] = useState("");
  const [searchType, setSearchType] = useState("");

  const [data, setData] = useState([]);

  const getdata = () => {
    axios.get("/notice/main/").then((response) => {
      console.log(response.data, "여기가 리스폰스 데이터거든?");
      setData(response.data);
    });
    //console.log(totalPage, "토탈페이지");
  };

  useEffect(() => {
    console.log("최초 로딩 페이지");
    getdata();
  }, []); //처음에 한번만 [nowPage]

  console.log(search, "이게 서치고");
  console.log(searchType, "이게 서치 타입이다");
  console.log(data.length, "데이터 사이즈");

  return (
    <div className="container mt-5 py-4 px-xl-5">
      <ScrollToTopOnMount />
      <nav aria-label="breadcrumb" className="bg-custom-light rounded">
        <ol className="breadcrumb p-3 mb-0">
          <li className="breadcrumb-item">
            <Link
              className="text-decoration-none link-secondary"
              to="/notice/main"
            >
              공지사항
            </Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Notice
          </li>
        </ol>
      </nav>
      <div className="row mb-4 mt-lg-3">
        <div className="d-flex flex-column h-100">
          <section>
            <div className="contents">
              <div className="3data">
                <NoticeTabMenu />
              </div>
              <div className="content">
                <NoticeContents data={data} />
              </div>
            </div>
          </section>
        </div>
        <div style={{ textAlign: "right" }}>
          <Link
            className="create-notice"
            to={"/notice/create/write"}
            state="t-no"
          >
            <button
              className="btn btn-outline-dark"
              style={{ marginRight: "-1px" }}
            >
              글쓰기
            </button>
          </Link>
        </div>

        {/* <div className="row">
          <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-center"></ul>
          </nav>
        </div> */}
      </div>
      <NoticeSearch search={setSearch} searchType={setSearchType} />
      {/* <div>
        <input type="hidden" value={member_id}></input>
      </div> */}
      {/* <Search search={setSearch} searchType={setSearchType} /> */}
    </div>
  );
};

export default NoticeMain;
