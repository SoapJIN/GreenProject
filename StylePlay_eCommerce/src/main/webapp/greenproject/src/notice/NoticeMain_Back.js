import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import NoticeList from './noticeDetail/NoticeList';
import ScrollToTopOnMount from "../template/ScrollToTopOnMount";
import NoticeSearch from "./noticeDetail/NoticeSearch";
import "./making.css";
import axios from "axios";


const NoticeMain= () => {

    const [data, setData] = useState(null);

    useEffect(() => {
        getdata()
    });

    const getdata = async() => { //이게 콘솔에는 찍히는데..ㅜㅜ
        const axdata = await axios.get("/notice/main");
        console.log(axdata)
    }

  return (
        <div className="container mt-5 py-4 px-xl-5">
                 <form>
                <div>
                  <ul>
                    <li>
                      <label for="qnaType">분류</label>
                      <select id="qnaType" name="qnaType">
                        <option>문의분류를 선택하세요</option>
                        <option value={1}>주문</option>
                        <option value={2}>상품</option>
                        <option value={3}>기타</option>
                      </select>
                    </li>
                    <li>
                      <label for="qnaTitle">제목</label>
                      <input
                        type="text"
                        name="qnaTitle"
                        id="qnaTitle"
                        placeholder="제목을 입력하세요"
                      ></input>
                    </li>
                    <li>
                      <p>휴대전화</p>
                      <ul>
                        <li>
                          <select id="phone start" name="phone start">
                            <option value="010">010</option>
                            <option value="011">011</option>
                            <option value="016">016</option>
                            <option value="017">017</option>
                          </select>
                        </li>
                        <li>
                          <input
                            type="text"
                            name="phone 2"
                            id="phone 2"
                            value={2222}
                          />
                        </li>
                        <li>
                          <input
                            type="text"
                            name="phone 3"
                            id="phone 3"
                            value={3333}
                          />
                        </li>
                        <li>
                          <label for="qnafile">첨부파일</label>
                          <input
                            type="file"
                            className="input-file"
                            id="qnafile"
                            name="qnafile"
                          ></input>
                        </li>
                        <li>
                          <label for="qnacontent"></label>
                          <textarea
                            id="qnacontent"
                            name="qnacontent"
                            placeholder="내용을 입력하세요"
                          ></textarea>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>
                <ul>
                  <li>
                    <Link className="main" to="/notice/contact" replace>
                      <span>목록</span>
                    </Link>
                  </li>
                  <li>
                    <button type="submit" id="register-btn" onClick={click}>등록</button>
                  </li>
                </ul>
                </form>
    </div>
  )
}

export default NoticeMain