import axios from "axios";
import React, { useEffect } from "react";

const Error = () => {
  const getMember = async () => {
    try {
      const result = await axios.get("/member/error");
      console.log(result);
    } catch (error) {}
  };
  useEffect(() => {
    getMember();
  }, []);

  return (
    <>
      <div className="container">
        <div className="container-login">
          <div className="wrap-login">
            <span className="login-form-title">
              아이디와 비밀번호를 확인해주세요.
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Error;
