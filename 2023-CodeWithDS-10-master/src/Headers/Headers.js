import so_img from "../img/siren_orduk.jpg";
import member_img from "../img/member.jpg";
import cart_img from "../img/cart_img.jpg";
import myticketicon from "../img/myticketicon.jpg";

import "./Headers.css";
import { Link } from "react-router-dom";

import { useUserState } from "../UserContext";

export default function Headers() {
  const { user } = useUserState();

  const handleLogout = () => {
    const confirmLogout = window.confirm("로그아웃하시겠습니까?");
    if (confirmLogout) {
      // 로그아웃 동작을 수행하는 로직 추가
    }
  };

  return (
    <div className="Container">
      <div className="HeaderArea">
        <div className="TopArea">
          <div className="TopWrap">
            <div className="Title">
              <Link to="menu">
                <img
                  src={so_img}
                  alt="사이렌 오덕"
                  width="310px"
                  height="79px"
                ></img>
              </Link>
            </div>
            <div className="App_list">
              <div className="AppWrap">
                <div className="LogArea">
                  <img
                    src={member_img}
                    alt="회원"
                    width="45.95px"
                    height="45.95px"
                  ></img>
                  <a className="nick" href="#!">
                    {user.userId}
                  </a>
                  <span>님</span>
                  <Link to={`/`} className="btn_login" onClick={handleLogout}>
                    로그아웃
                  </Link>
                </div>
                <div className="myPage">
                  <Link to={`/mypage`}>마이페이지</Link>
                </div>
                <div className="Cart">
                  <Link to={`/cart`}>
                    <img
                      src={cart_img}
                      alt="장바구니"
                      width="120px"
                      height="35px"
                    ></img>
                  </Link>
                </div>
                <div className="myTicket">
                  <Link to={`/ticket`}>
                    <img
                      src={myticketicon}
                      alt="마이티켓"
                      width="120px"
                      height="35px"
                    ></img>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
