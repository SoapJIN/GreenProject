import React, { useState } from "react";
import { Link } from "react-router-dom";
import QnaOne from "./QnaOne";

const QnaContents = ({ data }) => {
  let cnt = 0;
  let cntArr = [];
  for (let i = 0; i < data.length; i++) {
    cnt++;
    cntArr = [...cntArr, cnt];
  }

  console.log(cnt, "cnt 값 알려줘");
  console.log(cntArr, "cntarr 값 알려줘");

  return (
    <div style={{ marginTop: "18px" }}>
      <table className="table table-striped table-bordered">
        <colgroup>
          <col style={{ width: 100 }}></col>
          <col style={{ width: 100 }}></col>
          <col style={{ width: 574 }}></col>
          <col style={{ width: 200 }}></col>
        </colgroup>
        <thead>
          <tr>
            <th scope="col">분류</th>
            <th scope="col">번호</th>
            <th scope="col">제목</th>
            <th scope="col">등록일</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              {data.map((i, j) => (
                <ul key={j}>{i.qnaType}</ul>
              ))}
            </td>
            <td>
              {cntArr.map((i, j) => (
                <ul key={j}>{i}</ul>
              ))}
              {/* {data.map((i, j) => (
                <QnaOne qnaId={i.qnaId} key={j} />
              ))} */}
            </td>
            <td>
              {data.map((i, j) => (
                <ul key={j}>
                  <QnaOne
                    qnaTitle={i.qnaTitle}
                    qnaId={i.qnaId}
                    key={j}
                  ></QnaOne>
                </ul>
              ))}
            </td>
            <td>
              {data.map((i, j) => (
                <ul key={j}>{i.regDate.substring(0, 10)}</ul> //regDate로 바꿔야하는데, subString이 먹을때가 있고 안될때가있어서
                // 일단 그냥 notice_id로 해둠. (적용해야할건 i.regDate.substring(0,10))
              ))}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default QnaContents;
