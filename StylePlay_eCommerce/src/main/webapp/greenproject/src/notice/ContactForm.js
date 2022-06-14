import React, { useEffect, useState } from "react";
import ScrollToTopOnMount from "../template/ScrollToTopOnMount";
import { Link } from "react-router-dom";
import axios from "axios";
import NoticeTabMenu from "./noticeDetail/NoticeTabMenu";

const ContactForm = () => {
  const [qnaType, setQnaType] = useState("");
  const [qnaTitle, setQnaTitle] = useState("");
  const [qnaContent, setQnaContent] = useState("");
  const [qnaPhone, setQnaPhone] = useState("");
  const [qnaFile, setQnaFile] = useState([]);

  const onChangeType = (e) => {
    e.preventDefault();
    setQnaType(e.target.value);
  };

  const onChageTitle = (e) => {
    e.preventDefault();
    setQnaTitle(e.target.value);
  };

  const onChageContent = (e) => {
    e.preventDefault();
    setQnaContent(e.target.value);
  };

  const onChagePhone = (e) => {
    e.preventDefault();
    setQnaPhone(e.target.value);
  };

  const onImgChange = async (e) => {
    e.preventDefault();
    if (e.target.files) {
      const uploadFile = e.target.files;
      setQnaFile(uploadFile);
    }
  };

  const qnaSubmitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (let i = 0; i < qnaFile.length; i++) {
      formData.append("qnaImgFiles", qnaFile[i]);
    }
    formData.append("qnaType", qnaType);
    formData.append("qnaTitle", qnaTitle);
    formData.append("qnaContent", qnaContent);
    formData.append("qnaPhone", qnaPhone);

    await axios
      .post("/notice/contact/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        alert("문의 등록이 완료 되었습니다.");
        document.location.href = "/notice/contact";
      })
      .catch(function (error) {
        if (error.response && error.status === 400) {
          alert("모든 항목을 입력해주세요");
          document.location.reload();
        } else if (error.response && error.status === 500) {
          alert("문의 등록에 실패하였습니다.");
          document.location.reload();
        } else console.log(error.config);
      });
  };

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
              <fieldset>
                <form onSubmit={qnaSubmitHandler} encType="multipart/form-data">
                  <div className="form-group">
                    <label> 분류 </label>
                    <select
                      placeholder="qnaType"
                      name="qnaType"
                      className="form-control"
                      onChange={onChangeType}
                    >
                      <option>분류를 선택하세요</option>
                      <option value="order">주문</option>
                      <option value="product">상품</option>
                      <option value="etc">기타</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label> 제목 </label>
                    <input
                      type="text"
                      placeholder="제목을 입력하세요"
                      name="qnaTitle"
                      className="form-control"
                      onChange={onChageTitle}
                    />
                  </div>
                  <div className="form-group">
                    <label> 내용 </label>
                    <textarea
                      placeholder="내용을 입력하세요"
                      name="qnaContent"
                      className="form-control"
                      onChange={onChageContent}
                    />
                  </div>
                  <div className="form-group">
                    <label> 첨부파일 </label>
                    <input
                      type="file"
                      id="qnaImgFiles"
                      name="qnaImgFiles"
                      className="form-control"
                      accept="image/*"
                      multiple="multiple"
                      onChange={onImgChange}
                    />
                  </div>
                  <div className="form-group">
                    <label> 연락 받으실 전화번호(- 제외)</label>
                    <input
                      type="text"
                      name="qnaPhone"
                      id="qnaPhone"
                      className="form-control"
                      onChange={onChagePhone}
                    />
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <button
                      className="btn btn-outline-dark"
                      style={{ marginRight: "-1px" }}
                    >
                      등록
                    </button>
                    <Link
                      to="/notice/contact"
                      className="btn btn-outline-dark"
                      style={{ marginLeft: "10px" }}
                      replace
                    >
                      취소
                    </Link>
                  </div>
                </form>
              </fieldset>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
