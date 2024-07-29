import React, { useState, useCallback } from "react";
import { useUserDispatch } from "../UserContext";
import useInput from "./useInput";
import { useNavigate } from "react-router-dom";
import "./Login.css";

// 이미지
import so_img from "../img/siren_orduk.jpg";
import login_id from "../img/login_id.jpg";
import login_pwd from "../img/login_pwd.jpg";

const Login = () => {
  const [id, onChangeId, setId] = useInput("");
  const [pwd, onChangePwd, setPwd] = useInput("");

  const dispatch = useUserDispatch();
  const navigate = useNavigate(); // useNavigate를 사용해서 navigate 함수를 가져옵니다.

  const onReset = useCallback(() => {
    setId("");
    setPwd("");
  }, [setId, setPwd]);

  const onLogin = () => {
    // 로그인 성공 시 처리
    alert("로그인 성공");
    onReset();
    dispatch({
      type: "LOGIN",
      userId: id,
      userPwd: pwd,
    });
    navigate("/menu"); // 로그인 성공 시 /menu 페이지로 이동
  };

  return (
    <div className="login-container">
      <img className="logo_img_login" src={so_img}></img>

      <img className="id_img" src={login_id} alt="아이디" />
      <input
        type="text"
        value={id}
        onChange={onChangeId}
        placeholder="메일 입력"
        required
        className="input_1"
      />
      <br />

      <img img className="pwd_img" src={login_pwd} alt="비밀번호" />
      <input
        type="password"
        value={pwd}
        onChange={onChangePwd}
        placeholder="비밀번호 입력"
        required
        className="input_2"
      />
      <br />
      <br />

      <button type="button" onClick={onLogin} className="login_button">
        로그인
      </button>
      <br />
      <a href="/signup">
        <button type="button" className="signup_button">
          {" "}
          회원가입
        </button>
      </a>
    </div>
  );
};

export default Login;
