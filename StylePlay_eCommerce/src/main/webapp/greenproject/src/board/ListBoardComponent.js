import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Pagination from "../pagenation/Pagination";
import Posts from "./PostsComponent";
import Search from "./Search";

function ListBoardComponent() {
  const [loading, setLoading] = useState(false);

  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);
  const [lastPage, setLastPage] = useState(0);
  const [firstPage, setFirstPage] = useState(1);
  const [search, setSearch] = useState("");
  const [searchType, setSearchType] = useState("");
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit; //첫 게시물의 위치

  useEffect(() => {
    setLoading(true);
    if (search.length == 0) {
      async function fetchData() {
        await axios.get("http://localhost:8080/api/board").then((response) => {
          setPosts(response.data);
          console.log("response data :" + response.data);
          setLastPage(Math.ceil(response.data.length / postsPerPage));
          console.log();
          console.log("search :" + search);
        });
      }
      fetchData();
    } else {
      async function fetchData2() {
        console.log(search);
        await axios
          .get("http://localhost:8080/api/board/search", {
            params: { search: search, searchType: searchType },
          })
          .then((response) => {
            setPosts(response.data);
            console.log("search response data :" + response.data);
            setLastPage(Math.ceil(response.data.length / postsPerPage));
            console.log();
            console.log("search :" + search);
          });
      }
      fetchData2();
    }
    setLoading(false);
  }, [search]);

  const indexOfLast = currentPage * postsPerPage;
  const indexOfFirst = indexOfLast - postsPerPage;
  function currentPosts(tmp) {
    let currentPosts = 0;
    console.log(tmp);
    currentPosts = tmp.slice(indexOfFirst, indexOfLast);
    return currentPosts;
  }

  async function countsPlus(post) {
    // 게시글 클릭시 조회수증가
    // console.log('post : ' + post);
    try {
      const data = await axios
        .put(
          "http://localhost:8080/api/board/count" + "/" + post.bno,
          { counts: post.counts + 1 },
          {}
        )
        .then((response) => {})
        .catch(function (error) {
          if (error.response && error.status === 400) {
          } else if (error.response && error.status === 415) {
          } else {
          }
          console.log(error.config);
        });
    } catch {
      // 오류 발생시 실행
    }
  }

  const postsM = (post, index) => {
    return (
      <>
        <tr key={post.bno}>
          <td className="font-normal">{post.bno}</td>
          <td
            className="font-normal"
            style={{ textAlign: "left", width: "400px" }}
          >
            <Link
              className="font-normal"
              to={`/readboard/${post.bno}`}
              style={{ marginRight: "5px" }}
              onClick={() => {
                countsPlus(post);
              }}
            >
              {post.title}
            </Link>

            <span style={{ color: "#848CB5" }}>
              {post.replyCount ? "[" + post.replyCount + "]" : ""}
            </span>
          </td>
          <td className="font-normal"> {post.memberNo} </td>
          <td className="font-normal"> {post.createdTime.split("T")[0]} </td>
          <td className="font-normal"> {post.likes} </td>
          <td className="font-normal"> {post.counts} </td>
        </tr>
      </>
    );
  };

  return (
    <div
      style={{
        width: "80%",
        textAlign: "center",
        margin: "0 auto",
        marginTop: "56px",
      }}
    >
      <div>
        <div className="">
          <div className=" ">
            <div>
              <h2 className="mt-20 text-3xl font-semibold"> 자유게시판 </h2>
            </div>
          </div>
        </div>
        <div style={{ textAlign: "right" }}></div>

        <div className="container ">
          <div className=" ">
            <label className="-mr-96 mt-2 mb-3">
              number of posts:&nbsp;
              <select
                type="number"
                value={limit}
                onChange={({ target: { value } }) => setLimit(Number(value))}
              >
                <option value="2">2</option>
                <option value="5">5</option>
                <option value="10">10</option>
              </select>
            </label>
          </div>
          <div className="row justify-content-center">
            <div className="lead fw-bold mb-3 w-auto">
              {loading && <div> loading... </div>}
              <table className="table table-striped table-bordered">
                <thead>
                  <tr>
                    <th>번호</th>
                    <th>제목 </th>
                    <th>작성자 </th>
                    <th>작성일 </th>
                    <th>좋아요</th>
                    <th>조회수</th>
                  </tr>
                </thead>
                <tbody>
                  {posts.length !== 0 &&
                    posts
                      .slice(offset, offset + limit)
                      .map((i, index) => postsM(i, index))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <Link
            to="/createboard/_create"
            className="mr-96  btn btn-outline-dark  "
            replace
          >
            글 작성
          </Link>
        </div>
        <Search search={setSearch} searchType={setSearchType}></Search>
        <div>
          <Pagination
            total={posts.length}
            limit={limit}
            page={page}
            setPage={setPage}
          />
        </div>
      </div>
    </div>
  );
}

export default ListBoardComponent;
