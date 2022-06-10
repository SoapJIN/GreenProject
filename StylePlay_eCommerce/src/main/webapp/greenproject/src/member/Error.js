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

  return <>에러발생</>;
};

export default Error;
