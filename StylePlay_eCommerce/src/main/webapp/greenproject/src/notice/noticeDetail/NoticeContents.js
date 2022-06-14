import NoticeOne from "./NoticeOne";
import Pagination from "../../pagenation/Pagination";
import { useEffect, useState } from "react";

const NoticeContents = ({ data }) => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const offset = (page - 1) * limit; //첫 게시물의 위치

  const [cnt, setCnt] = useState(1);
  const [cntArr, setCntArr] = useState([]);

  const num = () => {
    console.log(data, "데이터 값이 뭐냐고");
    for (let i = 0; i < data.length; i++) {
      setCnt(cnt + 1);
      setCntArr([...cntArr, cnt]);
    }
  };

  useEffect(() => {
    num();
  }, []);

  // console.log(data);
  // console.log(data.length);
  // console.log("cnt2:", cnt);
  // console.log("cntArr", cntArr);

  const noticePerPage = (i, index) => {
    let temp2 = index + 1;
    let temp3 = temp2 % page;
    // console.log(page, "페이지");
    // console.log(index, "인덱스");
    console.log(index, "index");
    console.log(temp2, "temp2");
    console.log(temp3, "==========================");
    return (
      <tr>
        <td>
          {/* {cntArr.map((i, j) => (
            <ul key={j}>{i}</ul>
          ))}
          {data.map((i, j) => (
            <NoticeOne noticeId={i.noticeId} key={j} />
          ))} */}

          <ul>
            {index + 1}
            {/* <NoticeOne noticeId={i.noticeId} key={index} /> */}
          </ul>
        </td>
        <td>
          <ul key={index}>
            <NoticeOne
              noticeId={i.noticeId}
              noticeTitle={i.noticeTitle}
              key={index}
            />
          </ul>
        </td>
        <td>
          <ul key={index}>{i.regDate.substring(0, 10)}</ul>
        </td>
      </tr>
    );
  };

  return (
    <>
      <div style={{ marginTop: "18px" }}>
        <table className="table table-striped table-bordered">
          <colgroup>
            <col style={{ width: 162 }}></col>
            <col style={{ width: 612 }}></col>
            <col style={{ width: 162 }}></col>
          </colgroup>
          <thead>
            <tr>
              <th scope="col">번호</th>
              <th scope="col">제목</th>
              <th scope="col">등록일</th>
            </tr>
          </thead>
          <tbody>
            {data.length !== 0 &&
              data
                .slice(offset, offset + limit)
                .map((i, index) => noticePerPage(i, index))}
          </tbody>
        </table>
      </div>

      <div className="container">
        <div className="row justify-content-center">
          <div className="lead fw-bold mb-3 w-auto"></div>
        </div>
      </div>
      <div>
        <Pagination
          total={data.length}
          limit={limit}
          page={page}
          setPage={setPage}
        />
      </div>
    </>
  );
};

export default NoticeContents;
