import React, { useState, useEffect } from "react";
import ScrollToTopOnMount from "../../template/ScrollToTopOnMount";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import "../../notice/making.css";

const QnaDetail = () => {
  const { qnaId } = useParams();

  const [oneData, setOneData] = useState([]);
  const [name, setName] = useState("");
  const [images, setImages] = useState([
    {
      qnaImgeId: 0,
      imgName: "",
      orgImgName: "",
      imgUrl: "",
      haveImg: "",
    },
  ]);

  let imagesLi;
  const getOnedata = () => {
    console.log("getOnedata    호출 ");
    axios.get("/notice/qnadetail/" + qnaId).then((response) => {
      console.log(response.data, "여기 리스폰스 데이터 qna");
      setOneData(response.data);
      let { qnaImageDTOList } = response.data;
      setImages(qnaImageDTOList);
    });
  };

  console.log("imagesLi", imagesLi);
  const showVal = (e) => {
    if (e === "order") {
      setName("주문");
    } else if (e === "product") {
      setName("상품");
    } else {
      setName("기타");
    }
  };
  console.log(images[0].imgName, "이거이미지 리스트");
  //삭제 함수
  const deleteQna = async (e) => {
    e.preventDefault();
    await axios
      .delete("/notice/qnadelete/" + qnaId)
      .then((response) => {
        alert("삭제가 완료되었습니다.");
      })
      .catch(function (error) {
        if (error.response && error.status === 400) {
        } else if (error.response && error.status === 415) {
        } else console.log(error.config);
      });
    window.location.replace("/notice/contact");
  };

  useEffect(() => {
    getOnedata();
    showVal(oneData.qnaType);
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
                <div className="tabmenu">
                  <Link className="main" to="/notice/main" replace>
                    <span>공지사항</span>
                  </Link>
                  <Link className="main" to="/notice/contact" replace>
                    <span>1:1문의</span>
                  </Link>
                  <Link className="main" to="/notice/qna" replace>
                    <span>자주묻는질문</span>
                  </Link>
                </div>
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
                value={oneData.qnaTitle}
                readOnly
              />
            </div>
            <div className="form-group">
              <label>내용</label>
              <textarea
                name="contents"
                className="form-control"
                value={oneData.qnaContent}
                readOnly
              />
            </div>
            <div className="form-group">
              <label>작성일</label>
              <input
                name="regDate"
                className="form-control"
                value={oneData.regDate} // 이건 또 왜 substring이 안먹는거지
                readOnly
              />
            </div>
            <div className="form-group">
              <label>파일</label>
              <ul className="imageBox">
                {images.map((i, j) => (
                  <li key={j}>
                    <img
                      src={`/notice/display?fileName=${i.imgName}`}
                      width="130"
                    />
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </div>
      </div>
      <div style={{ textAlign: "center" }}>
        <Link
          to="/notice/contact"
          className="btn btn-outline-dark"
          style={{ marginLeft: "10px" }}
        >
          목록
        </Link>
        <button
          className="btn btn-outline-dark"
          style={{ marginRight: "-1px" }}
          name="delete"
          onClick={deleteQna}
        >
          삭제
        </button>
      </div>
    </div>
  );
};
export default QnaDetail;
