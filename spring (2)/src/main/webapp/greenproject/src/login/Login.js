import React, {  useRef, useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "../login/style.css"

const Login = () => {

    const userRef = useRef();;

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [success , setSuccess] = useState(false);


    // useEffect(() => {
    //   userRef.current.focus();
    // }, [])
    // useEffect(() => {
    //   setErrMsg("오류")
    // }, [email,password])

    const handleSubmit = async(e) => {
      e.preventDefault();
      console.log(email,password);
      setSuccess(true);
    }
    
  
  return (
    <>
    {success ? (
      <div>
        {document.location.href='/'}
      </div>
    ):(
    <div className="container">   
      <div className="container-login">
        <div className="wrap-login">
          <form className="login-fom" onSubmit={handleSubmit}>
            <span className="login-form-title"> 환영합니다! </span>
            <div className="wrap-input">
              <input
                className={email !== "" ? "has-val input" : "input"}
                type="email"
                value={email}
                id="email"
                autoComplete='off'
                onChange={(e) => setEmail(e.target.value)}
                ref={userRef}
                required
              />
              <span className="focus-input" data-placeholder="Email"></span>
            </div>

            <div className="wrap-input">
              <input
                className={password !== "" ? "has-val input" : "input"}
                type="password"
                value={password}
                id="password"
                autoComplete='off'
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span className="focus-input" data-placeholder="Password"></span>
            </div>

            <div className="container-login-form-btn">
              <button className="login-form-btn">Login</button>
            </div>

            <h5 className="text-center mb-3 text-muted">간편 로그인</h5>
            <div className="d-flex justify-content-center">
            <a href="!#" className="me-3">
                <FontAwesomeIcon icon={["fab", "facebook"]} size="2x" inverse />
            </a>
            <a href="!#">
                <FontAwesomeIcon icon={["fab", "instagram"]} size="2x" inverse />
            </a>
            <a href="!#" className="ms-3">
                <FontAwesomeIcon icon={["fab", "twitter"]} size="2x" inverse />
            </a>
            </div>


            <div className="text-center">
              <span className="txt1">아이디가 없으신가요? </span>
              <a className="txt2" href="#/signup">
                회원가입
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>)}
    </>
  )
}

export default Login

