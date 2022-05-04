import React, { useState } from 'react'

import "../login/style.css"

const SignUp = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [nickname, setNickName] = useState("");


    
  
  return (
    <div className="container">
      <div className="container-login">
        <div className="wrap-login">
          <form className="login-form" action='http://localhost:8080/react/signup' method='post'>
            <span className="login-form-title"> 회원가입 </span>
            <div className="wrap-input">
              <input
                className={email !== "" ? "has-val input" : "input"}
                type="email"
                value={email}
                name="email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <span className="focus-input" data-placeholder="Email"></span>
            </div>

            <div className="wrap-input">
              <input
                className={nickname !== "" ? "has-val input" : "input"}
                type="text"
                value={nickname}
                name="nickname"
                onChange={(e) => setNickName(e.target.value)}
              />
              <span className="focus-input" data-placeholder="Nick Name"></span>
            </div>
            <div className="wrap-input">
              <input
                className={password !== "" ? "has-val input" : "input"}
                type="password"
                value={password}
                name="password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <span className="focus-input" data-placeholder="Password"></span>
            </div>

            <div className="container-login-form-btn">
              <button className="login-form-btn">Sign up</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SignUp