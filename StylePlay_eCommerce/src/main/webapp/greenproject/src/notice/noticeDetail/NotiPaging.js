import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const NotiPaging = (props) => {
  console.log("props", props);
  const {
    pageList,
    nowPage,
    totalPage,
    start,
    end,
    prev,
    next,
    size,
    moveSelectPage,
  } = props;
  const [pageListp, setPageListp] = useState([]);
  const [nowPagep, setNowPagep] = useState(0);
  const [totalPagep, setTotalPagep] = useState(0);
  const [startp, setStartp] = useState(0);
  const [endp, setEndp] = useState(0);
  const [prevp, setPrevp] = useState(false);
  const [nextp, setNextp] = useState(false);
  const [sizep, setSizep] = useState(0);
  const [prevNum, setPrevNum] = useState(0);
  const [nextNum, setNextNum] = useState(0);

  const allPage = () => {
    setPageListp(pageList);
    setNowPagep(nowPage);
    setTotalPagep(totalPage);
    setStartp(start);
    setEndp(end);
    setPrevp(prev);
    setNextp(next);
    setSizep(size);
    setPrevNum(nowPage - 1);
    setNextNum(nowPage + 1);
  };

  useEffect(() => {
    allPage();
  }, [pageList]);

  console.log(nowPagep + "여기 자식 나우 페이지");

  return (
    <div className="row">
      <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-center">
          <li className="page-item">
            <Link
              className="page-link"
              onClick={() => moveSelectPage(start)}
              to={"/notice/main/" + start}
            >
              {`<<`}
            </Link>
          </li>
          <li className="page-item">
            <Link
              className="page-link"
              id="prevButton"
              onClick={() => moveSelectPage(prevNum)}
              to={"/notice/main/" + prevNum}
              state={{ page: prevNum }}
            >
              {`<`}
            </Link>
          </li>
          {pageListp.map((i, j) => (
            <li className="page-item" key={j}>
              {/* moveSelectPage은 부모함수(NoticeMain)*/}
              <Link
                className="page-link"
                to={"/notice/main/" + i}
                onClick={() => moveSelectPage(i)}
              >
                {i}
              </Link>
            </li>
          ))}
          <li className="page-item">
            <Link
              className="page-link"
              id="nextButton"
              onClick={() => moveSelectPage(nextNum)}
              to={"/notice/main/" + nextNum}
              state={{ page: nextNum }}
            >
              {`>`}
            </Link>
          </li>
          <li className="page-item">
            <Link
              className="page-link"
              onClick={() => moveSelectPage(end)}
              to={"/notice/main/" + end}
            >
              {`>>`}
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default NotiPaging;
