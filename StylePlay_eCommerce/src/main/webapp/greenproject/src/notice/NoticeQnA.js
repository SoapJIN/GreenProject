import React, { useState, useEffect } from "react";
import ScrollToTopOnMount from "../template/ScrollToTopOnMount";
import { Link } from "react-router-dom";
import NoticeSearch from "./noticeDetail/NoticeSearch";
import "./making.css";
import axios from "axios";
import NoticeContents from "./noticeDetail/NoticeContents";
import NoticeTabMenu from "./noticeDetail/NoticeTabMenu";

const NoticeQnA = () => {
  const [data, setData] = useState([]);
  const [nowPage, setNowPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(0);
  const [prev, setPrev] = useState(false);
  const [next, setNext] = useState(false);
  const [pageList, setPageList] = useState([]);
  const [size, setSize] = useState(0);

  const getdata = () => {
    axios.get("/notice/qna").then((response) => {
      console.log(response.data, "여기가 리스폰스 데이터거든?");
      let { page, totalPage, start, end, prev, next, pageList, size, dtoList } =
        response.data;
      setNowPage(page);
      setTotalPage(totalPage);
      setStart(start);
      setEnd(end);
      setPrev(prev);
      setNext(next);
      setPageList(pageList);
      setSize(size);
      setData(dtoList);
    });
  };
  useEffect(() => {
    getdata();
  }, []); //처음에 한번만

  return (
    <div className="container mt-5 py-4 px-xl-5">
      <ScrollToTopOnMount />
      <nav aria-label="breadcrumb" className="bg-custom-light rounded">
        <ol className="breadcrumb p-3 mb-0">
          <li className="breadcrumb-item">
            <Link
              className="text-decoration-none link-secondary"
              to="/notice/qna"
            >
              자주묻는 질문
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
            state="t-"
          >
            <button
              className="btn btn-outline-dark"
              style={{ marginRight: "-1px" }}
            >
              글쓰기
            </button>
          </Link>
        </div>
      </div>
      <NoticeSearch />
      <div>
        <input type="hidden"></input>
      </div>
    </div>
  );
};

export default NoticeQnA;
