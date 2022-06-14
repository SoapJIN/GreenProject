import React, { useState } from "react";
import { faCommentDots } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

function ChatModal() {
  const [openedDrawer, setOpenedDrawer] = useState(false); // useState 변수 선언 토글을 하기 위해 처음을 false 선언

  function changeNav(event) {
    if (openedDrawer) {
      setOpenedDrawer(false); // 네비게이션 바를 끄기 위해 설정
    }
  }

  return (
    <article id="chatIcon">
      <div className="fa-2x">
        <a
          href="!#"
          className="dropdown-toggle:empty::after"
          data-toggle="dropdown"
          id="userDropdown"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <FontAwesomeIcon icon={faCommentDots} />
        </a>
        <ul
          className="dropdown-menu dropdown-menu-end"
          aria-labelledby="userDropdown"
        >
          <li>
            <Link
              to="/notice/main"
              className="dropdown-item"
              onClick={changeNav}
            >
              운영공지
            </Link>
          </li>
          <li>
            <Link
              to="/notice/contact"
              className="dropdown-item"
              onClick={changeNav}
            >
              1:1 문의하기
            </Link>
          </li>
        </ul>
      </div>
    </article>
  );
}

export default ChatModal;
