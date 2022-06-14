import React, { useEffect, useState } from "react";
import BoardService from "../service/BoardService";
import { Link, useParams } from "react-router-dom";
import { BsPersonFill } from "react-icons/bs";
import { ImEye } from "react-icons/im";
import axios from "axios";
import { MdDelete, MdDeleteOutline } from "react-icons/md";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import "../products/detail/Review.css";

const ReadBoardComponent = () => {
  const { bno } = useParams();
  const [board, setBoard] = useState({});
  const [reply, setReply] = useState([]);
  const [comments, setComments] = useState("");
  const [loading, setLoading] = useState(false);
  const [createdTime, setCreatedTime] = useState(new Date());
  const [success, setSuccess] = useState(false);

  const [state, setState] = useState([]);
  const [isClicked, setIsClicked] = useState([]);
  const [isHovering, setIsHovering] = useState([]);
  const [over, setOver] = useState(false);
  const [user, setUser] = useState({
    name: "",
    email: "",
    address: "",
    addressNumber: "",
    nickname: "",
    phone: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("/main2");
      console.log("response_user:", response);
      console.log("readone user : ", response.data.nickname);
      setUser(response.data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    axios.get("http://localhost:8080/api/board" + "/" + bno).then((res) => {
      setBoard(res.data);
      console.log(res.data);
    });
  }, []);
  useEffect(() => {
    async function replyData() {
      setLoading(true);
      await axios
        .get("http://localhost:8080/api/replyList" + "/" + bno)
        .then((res) => {
          setReply(res.data);
          console.log(res.data);
          console.log(res.data.length);

          setState(Array(res.data.length).fill(false));
          setIsClicked(res.data.map((i) => i.rno));
          setIsHovering(res.data.map((i) => i.rno));

          setLoading(false);
        });
    }
    replyData();
  }, []);

  async function deleteView() {
    if (
      window.confirm(
        "정말로 글을 삭제하시겠습니까?\n삭제된 글은 복구 할 수 없습니다."
      )
    ) {
      BoardService.deleteBoard(bno).then((res) => {
        if (res.status === 200) {
          document.location.href = "/board";
        } else {
          alert("글 삭제가 실패했습니다.");
        }
      });
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post(
        "http://localhost:8080/api/reply" + "/" + bno,
        {
          contents: comments,
          createdTime: createdTime,
        },
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
    setSuccess(true);
  };

  async function ReplyDelete(rno) {
    if (
      window.confirm(
        "정말로 댓글을 삭제하시겠습니까?\n삭제된 댓글은 복구 할 수 없습니다."
      )
    ) {
      axios
        .delete("http://localhost:8080/api/reply" + "/" + rno)
        .then((res) => {
          if (res.status === 200) {
            window.location.reload(); /* 새로고침 */
          } else {
            alert("댓글 삭제가 실패했습니다.");
          }
        });
    }
  }

  async function likesPlus(bno) {
    // 하트 누를시 좋아요증가
    try {
      const data = await axios
        .put(
          "http://localhost:8080/api/board/likes" + "/" + bno,
          { likes: board.likes + 1 },
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
  const onChangeContents = (e) => {
    e.preventDefault();
    setComments(e.target.value);
  };

  function returnBoardType(typeNo) {
    let type = null;
    if (typeNo === 1) {
      type = "자유게시판";
    } else if (typeNo === 2) {
      type = "질문과 답변 게시판";
    } else {
      type = "타입 미지정";
    }

    return <div className="row"></div>;
  }

  function returnDate(cTime, uTime) {
    return (
      <div className="row" style={{ float: "right" }}>
        <label>{cTime ? cTime.split("T")[0] : ""}</label>
      </div>
    );
  }

  const ReplyHandleClick = (idx) => {
    setState(
      state.map((element, index) => {
        console.log(isClicked[index], idx);
        return isClicked[index] === idx ? !element : element;
      })
    );
  };

  const ReplyHandleHover = (idx) => {
    setState(
      state.map((element, index) => {
        console.log(isHovering[index], idx);
        return isHovering[index] === idx ? !element : element;
      })
    );
  };

  return (
    <div>
      {success ? (
        <div>{window.location.reload() /* 새로고침 */}</div>
      ) : (
        <div
          className="card col-md-6 offset-md-3"
          style={{ marginTop: "56px" }}
        >
          <h3
            className="text-center"
            style={{ float: "left", fontSize: "30px" }}
          >
            {" "}
            {board.title}
          </h3>
          <div className="card-body">
            {returnBoardType(board.type)}
            <div style={{ height: "30px" }}>
              작성일
              {returnDate(board.createdTime, board.updatedTime)}
            </div>
            <hr />
            <div style={{ height: "30px" }}>
              <div style={{ float: "left" }}>
                <div
                  style={{
                    float: "left",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <BsPersonFill style={{ float: "left", marginRight: "3px" }} />
                  {board.memberNo}
                </div>
              </div>
              <div
                style={{
                  float: "right",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <ImEye style={{ marginRight: "3px" }} /> {board.counts}
              </div>
            </div>
            <hr />
            <div className="row" style={{ height: "300px" }}>
              <div>{board.contents}</div>
            </div>
            <div style={{ textAlign: "center", marginBottom: "20px" }}>
              <div
                style={{
                  border: "1px solid",
                  borderRadius: "3em",
                  width: "10%",
                  margin: "0 auto",
                  cursor: "pointer",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onMouseEnter={() => setOver(!over)}
                onMouseLeave={() => setOver(!over)}
                onClick={() => {
                  likesPlus(bno);
                  window.location.reload();
                }}
              >
                {over ? <AiFillHeart /> : <AiOutlineHeart />}
                <span style={{ marginLeft: "3px" }}>{board.likes}</span>
              </div>
            </div>
            <hr />

            <div style={{ marginTop: "20px" }} className="flex justify-center">
              <Link to="/board" className="btn btn-outline-dark" replace>
                목록
              </Link>
              <Link
                to={`/createboard/${bno}`}
                className="btn btn-outline-dark"
                replace
              >
                수정
              </Link>
              <button
                className="btn btn-outline-dark"
                onClick={() => deleteView()}
                style={{ marginLeft: "10px" }}
              >
                삭제
              </button>
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            <div
              style={{
                width: "100%",
                height: "60px",
                display: "inline-block",
                textAlign: "center",
              }}
            >
              <div style={{ width: "95%", display: "inline-block" }}>
                <textarea
                  placeholder="comments"
                  name="comments"
                  className="form-control"
                  value={comments}
                  onChange={onChangeContents}
                  style={{ float: "left", width: "89%" }}
                />
                <button
                  className="btn btn-outline-dark"
                  style={{ float: "right", width: "11%", height: "60px" }}
                >
                  등록
                </button>
              </div>
            </div>
            <hr />
          </form>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <div>
              {reply.map((rep, index) => (
                <div key={rep.rno}>
                  <div className="DiaryItem_container">
                    <div className="info">
                      <span className="author_info">
                        | 작성자 : {rep.writer} |
                        {state[index] ? (
                          <MdDelete
                            style={{ float: "right", cursor: "pointer" }}
                            onMouseLeave={() => ReplyHandleHover(rep.rno)}
                            onClick={() => {
                              ReplyHandleClick(rep.rno);
                              if (state[index]) return ReplyDelete(rep.rno);
                            }}
                          />
                        ) : (
                          <MdDeleteOutline
                            style={{ float: "right", cursor: "pointer" }}
                            onMouseEnter={() => ReplyHandleHover(rep.rno)}
                          ></MdDeleteOutline>
                        )}
                      </span>
                      <br />
                      <span className="date">
                        {rep.createdTime.split("T")[0]}
                      </span>
                    </div>
                    <div className="content" style={{ wordBreak: "break-all" }}>
                      {rep.contents}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ReadBoardComponent;
