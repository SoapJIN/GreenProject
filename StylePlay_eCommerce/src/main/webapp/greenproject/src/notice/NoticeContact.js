import React, { useEffect, useState } from "react";
import ScrollToTopOnMount from "../template/ScrollToTopOnMount";
import { Link, useParams } from "react-router-dom";
import NoticeSearch from "./noticeDetail/NoticeSearch";
import "./making.css";
import axios from "axios";
import NoticeTabMenu from "./noticeDetail/NoticeTabMenu";
import NoticeContents from "./noticeDetail/NoticeContents";
import QnaContents from "./qnaDetail/QnaContents";

const NoticeContact = () => {
  const [data, setData] = useState([]);

  const getQna = async () => {
    try {
      await axios.get("/notice/contact").then((response) => {
        console.log(response, "리스폰스 데이터=");
        setData(response.data);
      });
    } catch {
      alert("로그인이 필요합니다.");
      document.location.href = "/member/login";
    }
  };

  useEffect(() => {
    getQna();
  }, []);

  return (
    <div className="container mt-5 py-4 px-xl-5">
      <ScrollToTopOnMount />
      <nav aria-label="breadcrumb" className="bg-custom-light rounded">
        <ol className="breadcrumb p-3 mb-0">
          <li className="breadcrumb-item">
            <Link
              className="text-decoration-none link-secondary"
              to="/notice/contact"
              replace
            >
              1:1 문의
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
                <QnaContents data={data} />
              </div>
              <div className="form button" style={{ textAlign: "right" }}>
                <Link className="main" to="/notice/contactform" replace>
                  <button
                    className="btn btn-outline-dark"
                    style={{ marginRight: "-1px" }}
                  >
                    글쓰기
                  </button>
                </Link>
              </div>
            </div>
          </section>
        </div>
      </div>
      <NoticeSearch />
    </div>
  );
};

export default NoticeContact;
