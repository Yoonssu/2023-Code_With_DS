import React, { useState, useCallback, useEffect } from "react";
import useInput from "./useInput";
import { useUserState, useUserDispatch } from "../UserContext";
import { useNavigate } from "react-router-dom"; // useNavigate 임포트

const Modify = () => {
  const { user, userList } = useUserState();
  const dispatch = useUserDispatch();
  const navigate = useNavigate();

  console.log(user.userId);
  console.log(user.userPwd);

  const [id, onChangeId] = useInput(user.userId);
  const [nowPwd, onChangeNowPwd] = useInput("");
  const [pwd, onChangePwd] = useInput("");
  const [confirmPwd, onChangeConfirmPwd] = useInput("");

  const [errorMessage, setErrorMessage] = useState({
    nowPwdError: "",
    pwdError: "",
    confirmPwdError: "",
  });

  const inputRegexs = {
    idReg: /^[A-Za-z0-9]{5,15}@duksung\.ac\.kr$/,
    pwdReg: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/g,
  };

  //정규식확인
  const validationCheck = useCallback((input, regex) => {
    return input === "" || regex.test(input);
  }, []);

  useEffect(() => {
    if (user.userPwd === nowPwd || nowPwd === "") {
      setErrorMessage((prevErrors) => ({
        ...prevErrors,
        nowPwdError: "",
      }));
    } else {
      setErrorMessage((prevErrors) => ({
        ...prevErrors,
        nowPwdError: "현재 비밀번호와 일치하지 않습니다.",
      }));
    }
  }, [nowPwd, user.userPwd]);

  useEffect(() => {
    if (validationCheck(pwd, inputRegexs.pwdReg) || pwd === "") {
      setErrorMessage((prevErrors) => ({
        ...prevErrors,
        pwdError: "",
      }));
    } else {
      setErrorMessage((prevErrors) => ({
        ...prevErrors,
        pwdError:
          "비밀번호는 최소 하나의 문자 및 하나의 숫자로 8자 이상이여야 합니다.",
      }));
    }
  }, [pwd, validationCheck, inputRegexs]);

  useEffect(() => {
    if (pwd === confirmPwd || confirmPwd === "") {
      setErrorMessage((prevErrors) => ({
        ...prevErrors,
        confirmPwdError: "",
      }));
    } else {
      setErrorMessage((prevErrors) => ({
        ...prevErrors,
        confirmPwdError: "비밀번호 확인이 일치하지 않습니다.",
      }));
    }
  }, [confirmPwd, pwd]);

  const onModify = () => {
    if (errorMessage.nowPwdError) {
      alert("현재 비밀번호와 일치하지 않습니다.");
      return;
    } else if (errorMessage.pwdError) {
      alert("비밀번호가 형식에 맞지 않습니다");
      return;
    } else if (errorMessage.confirmPwdError) {
      alert("비밀번호 확인이 일치하지 않습니다.");
      return;
    }
    const index = userList.findIndex((x) => x.id === user.userId);

    dispatch({
      type: "MODIFY",
      index: index,
      userId: id,
      userPwd: pwd,
    });

    alert("수정을 완료했습니다.");
    navigate("/mypage");
  };

  return (
    <div>
      <div>메일 : {id}</div>

      <div>
        현재 비밀번호 :
        <input
          type="password"
          value={nowPwd}
          onChange={onChangeNowPwd}
          placeholder="now_password"
        />
        {errorMessage.nowPwdError && <div>{errorMessage.nowPwdError}</div>}
      </div>

      <div>
        새로운 비밀번호 :
        <input
          type="password"
          value={pwd}
          onChange={onChangePwd}
          placeholder="new_password"
        />
        {errorMessage.pwdError && <div>{errorMessage.pwdError}</div>}
      </div>

      <div>
        비밀번호 확인 :
        <input
          type="password"
          value={confirmPwd}
          onChange={onChangeConfirmPwd}
          placeholder="new_password_confirm"
        />
        {errorMessage.confirmPwdError && (
          <div>{errorMessage.confirmPwdError}</div>
        )}
      </div>
      <button type="button" onClick={onModify}>
        수정 완료
      </button>
    </div>
  );
};

export default Modify;
