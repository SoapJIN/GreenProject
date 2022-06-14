import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const NoticeSearch = ({ search, searchType }) => {
  const [keyword, setKeyword] = useState("");
  const [keywordType, setKeywordType] = useState("tpc"); // 기본값을 제목+내용으로
  const onChangeSearchSpace = (e) => {
    setKeyword(e.target.value);
  };

  const onChangeKeywordType = (e) => {
    // 검색조건이 바뀌면
    e.preventDefault();
    setKeywordType(e.target.value);
    // console.log(e.target.value);
  };

  return (
    <div className="row mb-4 mt-lg-3">
      {/* 아래는 균형맞추기 위해 넣은 div + 그냥 넣어본 chatModal*/}
      {/* <div className="d-none d-lg-block col-lg-3">
        <ChatModal />{" "}
      </div> */}
      {/* <div className="col-lg-9"> */}
      <div className="d-flex flex-column h-100">
        <div className="row mb-3">
          <div className="d-flex align-items-center mt-auto">
            <div className="col-lg-3 d-none d-lg-block">
              <select
                className="form-select"
                aria-label="Default select example"
                defaultValue={keywordType}
                placeholder="type"
                onChange={onChangeKeywordType}
              >
                <option value="tpc">제목+내용</option>
                <option value="title">제목</option>
                <option value="contents">내용</option>
              </select>
            </div>
            {/* 바로 아래 태그 없으면 여백없이 검색창 풀사이즈 */}
            {/* <div className="col-lg-9 col-xl-5 offset-xl-4 d-flex flex-row"> */}
            <div className="d-none d-lg-block col-lg-3"></div>
            <div className="input-group">
              <input
                className="form-control"
                type="text"
                placeholder=" 검색어를 입력하세요"
                onChange={(e) => onChangeSearchSpace(e)}
                aria-label="search input"
              />
              <button
                className="btn btn-outline-dark"
                onClick={() => {
                  search(keyword);
                  searchType(keywordType);
                }}
              >
                <FontAwesomeIcon icon={["fas", "search"]} />
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* </div> */}
      {/* </div> */}
    </div>
  );
};

export default NoticeSearch;
