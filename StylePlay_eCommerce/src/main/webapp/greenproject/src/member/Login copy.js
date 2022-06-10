import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./style.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const userRef = useRef();
  let navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [success, setSuccess] = useState(false);

  //const handleSubmit = (event) => {
  //event.preventDefault();
  useEffect(() => {
    console.log("useEffect");
    const member = { email, pwd };
    console.log("member", member);
    let url = "/member/login";
    const options = {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      member,
      url,
    };
    //if (success) {
    console.log("success", success);
    axios(options)
      .then((response) => {
        console.log("response", response);
        // navigate("/member/login", { replace: true });
      })
      .catch((error) => {
        console.log("error", error);
      });
    //  }
  }, []);
  //console.log(email);
  return (
    <>
      {/* {success ? (
        <Navigate to="/member/login" />
      ) : ( */}
      <div className="container">
        <div className="container-login">
          <div className="wrap-login">
            <form
              className="login-fom"
              method="post"
              onClick={() => setSuccess(true)}
              // onSubmit={handleSubmit}
            >
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

export default Login;
