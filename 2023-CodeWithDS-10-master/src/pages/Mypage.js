import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserState } from "../UserContext";
import Headers from "../Headers/Headers";
import "./Mypage.css";

const MyPage = () => {
  const { user } = useUserState();
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);

  console.log(user.userId);
  console.log(user.userPwd);

  const handleWithdrawal = () => {
    const confirmWithdrawal = window.confirm("정말로 탈퇴하시겠습니까?");
    if (confirmWithdrawal) {
      // 탈퇴 동작을 수행하는 로직~~

      navigate("/");
    }
  };

  const maskedPassword = "*".repeat(user.userPwd.length);

  const orderHistory = [
    {
      id: 1,
      date: "2023-08-01",
      time: "15:03",
      menu: "라멘-탄탄멘",
      orderNumber: "506번",
    },
    {
      id: 2,
      date: "2023-08-02",
      time: "12:30",
      menu: "라멘-바질라멘",
      orderNumber: "974번",
    },
  ];

  return (
    <div>
      <div className="info">회원정보</div>
      <br />

      <table className="user_info_table">
        <tbody>
          <tr>
            <td className="user_info_label">아이디(이메일)</td>
            <td className="user_info_value">{user.userId}</td>
            <td></td>
          </tr>
          <tr>
            <td className="user_info_label">닉네임</td>
            <td className="user_info_value">덕밥이</td>
            <td>
              <a href="/modifyname">
                <button className="name_button">닉네임 변경</button>
              </a>
            </td>
          </tr>
          <tr>
            <td className="user_info_label">비밀번호</td>
            <td className="user_info_value">
              {"*".repeat(user.userPwd.length)}
            </td>
            <td>
              <a href="/modify">
                <button className="pwd_button">비밀번호 변경</button>
              </a>
            </td>
          </tr>
        </tbody>
      </table>
      <br />

      <button className="bye_button" onClick={handleWithdrawal}>
        회원 탈퇴
      </button>

      <div className="order_history">주문내역 </div>

      <div className="order_history_info">
        <table>
          <thead>
            <tr>
              <th>주문 날짜</th>
              <th>주문 메뉴</th>
              <th>주문 번호</th>
            </tr>
          </thead>
          <tbody>
            {orderHistory.map((order) => (
              <tr key={order.id}>
                <td className="order_date">{`${order.date} ${order.time}`}</td>
                <td className="order_menu">{order.menu}</td>
                <td>{order.orderNumber}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyPage;
