import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./style.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login2 = () => {
  const userRef = useRef();
  let navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [success, setSuccess] = useState(false);

  const getMember = async () => {
    const member = { email, pwd };
    try {
      const result = await axios.post("/member/login2", member);
      console.log(result);
      setSuccess(true);
      window.location.reload();
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(() => {
    alert("성공했어요");
    getMember();
    if (success) Window.location.reload();
    axios.get("/member/login2").then((response) => {
      console.log("response", response);
    });
    //window.location.reload();
  }, []);
  console.log(success);
  return (
    <>
      {/* {success ? (
        <Navigate to="/member/login" />
      ) : ( */}
      <div className="container">
        <div className="container-login">
          <div className="wrap-login">
            <form className="login-fom" method="post">
              <span className="login-form-title"> 환영합니다! </span>
              <div className="wrap-input">
                <input
                  className={email !== "" ? "has-val input" : "input"}
                  type="email"
                  value={email}
                  id="email"
                  autoComplete="off"
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                  ref={userRef}
                  required
                />
                <span className="focus-input" data-placeholder="Email"></span>
              </div>

              <div className="wrap-input">
                <input
                  className={pwd !== "" ? "has-val input" : "input"}
                  type="password"
                  value={pwd}
                  id="password"
                  autoComplete="off"
                  name="pwd"
                  onChange={(e) => setPwd(e.target.value)}
                  required
                />
                <span
                  className="focus-input"
                  data-placeholder="Password"
                ></span>
              </div>

              <div className="container-login-form-btn">
                <button className="login-form-btn">Login</button>
              </div>

              <h5 className="text-center mb-3 text-muted">간편 로그인</h5>
              <div className="d-flex justify-content-center">
                <a href="!#" className="me-3">
                  <FontAwesomeIcon
                    icon={["fab", "facebook"]}
                    size="2x"
                    inverse
                  />
                </a>
                <a href="!#">
                  <FontAwesomeIcon
                    icon={["fab", "instagram"]}
                    size="2x"
                    inverse
                  />
                </a>
                <a href="!#" className="ms-3">
                  <FontAwesomeIcon
                    icon={["fab", "twitter"]}
                    size="2x"
                    inverse
                  />
                </a>
              </div>

              <div className="text-center">
                <span className="txt1">아이디가 없으신가요? </span>
                <a className="txt2" href="/member/signup">
                  회원가입
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* )} */}
    </>
  );
};

export default Login2;
