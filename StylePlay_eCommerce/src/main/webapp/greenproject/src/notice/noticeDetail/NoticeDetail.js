import React, { useState, useEffect } from "react";
import ScrollToTopOnMount from "../../template/ScrollToTopOnMount";
import { Link, useLocation, useParams } from "react-router-dom";
import axios from "axios";
import NoticeTabMenu from "./NoticeTabMenu";

const NoticeDetail = () => {
  //state로 값 넘겨준것을 useLocation을 통해 받는다.ㅠㅠ

  const { noticeId } = useParams();
  const [oneData, setOneData] = useState([]);
  const [linkUrl, setLinkUrl] = useState("");
  const [name, setName] = useState("");

  const getOnedata = () => {
    axios.get("/notice/detail/" + noticeId).then((response) => {
      setOneData(response.data);
    });
  };

  const showVal = (e) => {
    if (e === "t-no") {
      setLinkUrl("/notice/main");
      setName("공지사항");
    } else {
      setLinkUrl("/notice/qna");
      setName("자주묻는질문");
    }
  };

  useEffect(() => {
    getOnedata();
    showVal(oneData.noticeType);
  }, []); //처음에 한번만
  return (
    <div className="container mt-5 py-4 px-xl-5">
      <ScrollToTopOnMount />
      <nav aria-label="breadcrumb" className="bg-custom-light rounded">
        <ol className="breadcrumb p-3 mb-0">
          <li className="breadcrumb-item">
            <Link
              className="text-decoration-none link-secondary"
              to="/notice/main/1"
              replace
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
            </div>
            <div className="form-group"></div>
            <div className="form-group">
              <label>분류</label>
              <input
                type="text"
                name="type"
                className="form-control"
                value={name}
                readOnly
              />
            </div>
            <div className="form-group">
              <label>제목</label>
              <input
                type="text"
                name="title"
                className="form-control"
                value={oneData.noticeTitle}
                readOnly
              />
            </div>
            <div className="form-group">
              <label>내용</label>
              <textarea
                name="contents"
                className="form-control"
                value={oneData.noticeContent}
                readOnly
              />
            </div>
            <div className="form-group">
              <label>글쓴이</label>
              <input
                name="writerAdmin"
                className="form-control"
                value={"관리자"}
                readOnly
              />
            </div>
            <div className="form-group">
              <label>작성일</label>
              <input
                name="regDate"
                className="form-control"
                value={oneData.regDate}
                readOnly
              />
            </div>
            <div style={{ textAlign: "center" }}>
              <Link
                to={`/notice/create/${noticeId}`}
                className="btn btn-outline-dark"
                data={oneData}
                state={oneData.noticeType}
              >
                수정
              </Link>
              <Link
                to={linkUrl}
                className="btn btn-outline-dark"
                style={{ marginLeft: "10px" }}
                replace
              >
                목록
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
export default NoticeDetail;
