import React from "react";
import "../../notice/making.css";
import { Link } from "react-router-dom";

const NoticeTabMenu = ({ clickContact }) => {
  //1:1문의 탭 누르면 서버로 전송하여 로그인 여부 확인 및 리스트 반환
  return (
    <div className="tabmenu">
      <Link className="main" to="/notice/main">
        <span>공지사항</span>
      </Link>
      <Link className="main" to="/notice/qna">
        <span>자주묻는질문</span>
      </Link>
    </div>
  );
};

export default NoticeTabMenu;
