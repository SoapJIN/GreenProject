import React, { useEffect, useState } from "react";

import "../member/style.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [nickname, setNickName] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    //DB로 보내는 코드
    const member = { email, name, phone, address, nickname, pwd };
    let url = "/member/signup";
    const options = {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      member,
      url,
    };
    axios(options)
      .then((response) => {
        console.log("response", response);
        setSuccess(true);
        console.log("success", success);
        if (success) alert("성공적으로 가입되셨습니다");
      })
      .catch(function (error) {
        console.log("error: ", error);
        if (error.response.data == null) {
          console.log("여기는 리다이렉트");
          axios.get(url).then().catch();
        }
        if (error.response && error.status === 400) {
          // 400 에러 코드일 경우
          console.log("에러400.");
        } else if (error.response && error.status === 401) {
          console.log("에러401.");
        } else {
          // 오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다.
          console.log("Error", error.message);
          alert("양식을 작성해주세요");
        }
        console.log(error.config);
      });
  }, []);

  return (
    <>
      <div className="container">
        <div className="container-login">
          <div className="wrap-login">
            <form className="login-form" method="post">
              <span className="login-form-title"> 회원가입 </span>
              <div className="wrap-input">
                <input
                  className={email !== "" ? "has-val input" : "input"}
                  type="text"
                  value={email}
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <span className="focus-input" data-placeholder="email"></span>
              </div>
              <div className="wrap-input">
                <input
                  className={name !== "" ? "has-val input" : "input"}
                  type="text"
                  value={name}
                  name="name"
                  onChange={(e) => setName(e.target.value)}
                />
                <span className="focus-input" data-placeholder="Name"></span>
              </div>
              <div className="wrap-input">
                <input
                  className={nickname !== "" ? "has-val input" : "input"}
                  type="text"
                  value={nickname}
                  name="nickname"
                  onChange={(e) => setNickName(e.target.value)}
                />
                <span
                  className="focus-input"
                  data-placeholder="Nick Name"
                ></span>
              </div>
              <div className="wrap-input">
                <input
                  className={pwd !== "" ? "has-val input" : "input"}
                  type="password"
                  value={pwd}
                  name="pwd"
                  onChange={(e) => setPwd(e.target.value)}
                />
                <span
                  className="focus-input"
                  data-placeholder="Password"
                ></span>
              </div>
              <div className="wrap-input">
                <input
                  className={address !== "" ? "has-val input" : "input"}
                  type="text"
                  value={address}
                  name="address"
                  onChange={(e) => setAddress(e.target.value)}
                />
                <span className="focus-input" data-placeholder="Address"></span>
              </div>
              <div className="wrap-input">
                <input
                  className={phone !== "" ? "has-val input" : "input"}
                  type="text"
                  value={phone}
                  name="phone"
                  onChange={(e) => setPhone(e.target.value)}
                />
                <span className="focus-input" data-placeholder="Phone"></span>
              </div>
              <div className="container-login-form-btn">
                <button className="login-form-btn">Sign up</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
