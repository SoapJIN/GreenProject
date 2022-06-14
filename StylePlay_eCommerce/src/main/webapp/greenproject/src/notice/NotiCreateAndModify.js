import React, { useState, useEffect } from "react";
import ScrollToTopOnMount from "../template/ScrollToTopOnMount";
import { Link, useParams, useLocation } from "react-router-dom";
import axios from "axios";
import NoticeTabMenu from "./noticeDetail/NoticeTabMenu";

const NotiCreateAndModify = () => {
  const location = useLocation();
  const [noticeType, setNoticeType] = useState("");
  const [noticeTitle, setNoticeTitle] = useState("");
  const [noticeContent, setNoticeContent] = useState("");
  const [noticeWriter, setNoticeWriter] = useState("");
  const [regDate, setRegDate] = useState("");
  const [success, setSuccess] = useState(false);
  const [load, setLoad] = useState("");

  const { noticeId } = useParams();
  console.log("useParams noticeId: " + noticeId);

  const onChangeType = (e) => {
    e.preventDefault();
    setNoticeType(e.target.value);
    console.log(noticeType);
  };

  const onChangeTitle = (e) => {
    e.preventDefault();
    setNoticeTitle(e.target.value);
    console.log(noticeTitle);
  };

  const onChangeContents = (e) => {
    e.preventDefault();
    setNoticeContent(e.target.value);
    console.log(noticeContent);
  };

  //수정이면 수정 값 불러와서 value에 넣어주기
  const getModifyData = () => {
    axios.get("/notice/detail/" + noticeId).then((response) => {
      let { noticeType, noticeTitle, noticeContent, writerAdmin, regDate } =
        response.data;
      console.log(response.data);
      setNoticeType(noticeType);
      setNoticeTitle(noticeTitle);
      setNoticeContent(noticeContent);
      setNoticeWriter(writerAdmin);
      setRegDate(regDate);
    });
  };

  //삭제 함수
  const deleteno = async (e) => {
    e.preventDefault();
    await axios
      .delete("/notice/delete/" + noticeId)
      .then((response) => {
        alert("삭제가 완료되었습니다.");
      })
      .catch(function (error) {
        if (error.response && error.status === 400) {
        } else if (error.response && error.status === 415) {
        } else console.log(error.config);
      });
    window.location.replace("/notice/main/1");
  };

  //수정 및 등록 버튼
  const submitHandler = async (e) => {
    e.preventDefault();
    if (noticeId === "write") {
      setLoad(location.state);
      await axios
        .post(
          "/notice/create/" + noticeId,
          {
            noticeType: noticeType,
            noticeTitle: noticeTitle,
            noticeContent: noticeContent,
            writerAdmin: noticeWriter,
            regDate: regDate,
          },
          {}
        )
        .then((response) => {
          alert("게시글 등록이 완료되었습니다.");
        })
        .catch(function (error) {
          if (error.response && error.status === 400) {
          } else if (error.response && error.status === 415) {
          } else {
          }
          console.log(error.config);
        });
    } else {
      setLoad(location.state);
      console.log("여기는 기존게시글 수정입니다.");
      axios
        .put(
          "/notice/modify/" + noticeId,
          {
            noticeId: noticeId,
            noticeType: noticeType,
            noticeTitle: noticeTitle,
            noticeContent: noticeContent,
            writerAdmin: noticeWriter,
            regDate: regDate,
          },
          {}
        )
        .then((response) => {
          alert("수정이 완료되었습니다.");
        })
        .catch(function (error) {
          if (error.response && error.status === 400) {
          } else if (error.response && error.status === 415) {
          } else {
          }
          console.log(error.config);
        });
    }
    setSuccess(true);
  };

  //글쓰기인지 수정인지 처음에 구별
  useEffect(() => {
    if (noticeId === "write") {
      console.log("새글쓰기입니다." + noticeId);
      return;
    } else {
      console.log("수정하는거일때");
      let url = "/notice/detail/" + noticeId;
      const getOne = {
        method: "GET",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        url,
      };
      axios(getOne);
      getModifyData();
    }
  }, []);

  return (
    <div>
      {success ? (
        // 글쓰기한 카테고리로 리로드 하기 위한 코드
        <>
          {load === "t-no"
            ? (document.location.href = "/notice/main/1")
            : (document.location.href = "/notice/qna")}
        </>
      ) : (
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
                  <fieldset>
                    <form onSubmit={submitHandler}>
                      <div className="form-group">
                        <label> 분류 </label>
                        <select
                          placeholder="type"
                          name="noticeType"
                          className="form-control"
                          value={noticeType || ""}
                          onChange={onChangeType}
                        >
                          <option value="">분류를 선택하세요</option>
                          <option value="t-no">공지사항</option>
                          <option value="t-qna">자주묻는질문</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label> 제목 </label>
                        <input
                          type="text"
                          placeholder="title"
                          name="noticeTitle"
                          className="form-control"
                          value={noticeTitle || ""}
                          onChange={onChangeTitle}
                        />
                      </div>
                      <div className="form-group">
                        <label> 내용 </label>
                        <textarea
                          placeholder="content"
                          name="noticeContent"
                          className="form-control"
                          value={noticeContent || ""}
                          onChange={onChangeContents}
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
                          value={regDate || new Date().toDateString()}
                          readOnly
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="hidden"
                          name="noticeId"
                          className="form-control"
                          value={noticeId}
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
                          to="/notice/main"
                          className="btn btn-outline-dark"
                          style={{ marginLeft: "-1px" }}
                          replace
                        >
                          취소
                        </Link>
                        <button
                          className="btn btn-outline-dark"
                          style={{ marginRight: "-1px" }}
                          name="delete"
                          onClick={deleteno}
                        >
                          삭제
                        </button>
                      </div>
                    </form>
                  </fieldset>
                </div>
              </section>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotiCreateAndModify;
