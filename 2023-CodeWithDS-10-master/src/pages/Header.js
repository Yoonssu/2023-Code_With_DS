import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useUserState, useUserDispatch } from "../UserContext";

const Header = () => {
  const location = useLocation();
  const { user } = useUserState();

  const dispatch = useUserDispatch();
  const navigate = useNavigate();

  const onLogOut = () => {
    alert("로그아웃 되었습니다.");
    dispatch({
      type: "LOGOUT",
    });
    navigate("/"); // 로그아웃 시 로그인페이지로 이동
  };

  const onMyPage = () => {
    // 마이페이지 이동시

    dispatch({
      type: "LOGIN",
      userId: user.userId,
      userPwd: user.userPwd,
      userName: user.userName,
    });
    navigate("/mypage"); // 로그인 성공 시 /home 페이지로 이동
  };

  return (
    <nav className="header-container">
      <ul>
        {user ? (
          <div>
            <li>{user.userId}님</li>
            <li>
              <button type="button" onClick={onMyPage}>
                마이페이지
              </button>
            </li>
            <li>
              <button type="button" onClick={onLogOut}>
                로그아웃
              </button>
            </li>
          </div>
        ) : location.pathname === "/signup" ? (
          <div>
            <li>
              <a href="/login">로그인</a>
            </li>
          </div>
        ) : (
          <div>
            <li>
              <a href="/signup">회원가입</a>
            </li>
          </div>
        )}
      </ul>
    </nav>
  );
};

export default Header;
