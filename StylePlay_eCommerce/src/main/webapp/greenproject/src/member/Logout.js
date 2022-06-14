import React, { useEffect } from "react";

import "./style.css";
import axios from "axios";
const Logout = () => {
  useEffect(() => {
    axios.get("/member/logout").then((response) => {
      console.log("response", response);
      window.location.assign("/");
    });

    //window.location.reload();
  }, []);
  console.log(localStorage.getItem("access"));
  return (
    <>
      <div className="container">
        <div className="container-login">
          <div className="wrap-login">
            <span className="login-form-title"> 로그아웃되었습니다. </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Logout;
