import styles from "./Detail.css";
import { useEffect, useState } from "react";
import star from "../img/star.jpg";
import btn_review from "../img/btn_reviewlist.jpg";
import menu from "../Menu/MenuList";
import { Link, useLocation, useParams } from "react-router-dom";
import { getMenus } from "../Service/fetcher";
import Modal from "react-modal";

const Detail = ({ cart, setCart }) => {
  const { title } = useParams();
  const [menu, setMenu] = useState({});

  useEffect(() => {
    getMenus().then((data) => {
      setMenu(data.data.menus.find((menu) => menu.title === title));
    });
  }, [title]);

  //장바구니 담는 액션 팝업
  const [modalVisible, setModalVisible] = useState(false);
  const openModal = () => {
    setModalVisible(true);
  };
  const hideModal = () => {
    setModalVisible(false);
  };

  // 수량 업/다운 기능
  const [count, setCount] = useState(1);
  const handleQuantitiy = (type) => {
    if (type === "plus") {
      setCount(count + 1);
    } else {
      if (count === 1) return;
      setCount(count - 1);
    }
  };

  //장바구니에 중복된 메뉴 들어왔을 때 수량 증가
  const setQuantity = (title, quantity) => {
    const found = cart.filter((el) => el.title === title)[0];
    const idx = cart.indexOf(found);
    const cartItem = {
      id: menu.id,
      title: menu.title,
      category: menu.category,
      price: menu.price,
      img: menu.img,
      quantity: quantity,
    };
    setCart([...cart.slice(0, idx), cartItem, ...cart.slice(idx + 1)]);
  };

  //장바구니
  const handleCart = () => {
    const cartItem = {
      id: menu.id,
      title: menu.title,
      category: menu.category,
      price: menu.price,
      img: menu.img,
      quantity: count,
    };
    const found = cart.find((el) => el.title === cartItem.title);

    if (found)
      setQuantity(
        cartItem.title,
        found.quantity + count
      ); // 중복된 메뉴 확인 -> 해당 메뉴 수량 증가
    else {
      setCart([...cart, cartItem]);
    } //여러개 들어가도록
  };

  return (
    <>
      <div className="detail_container">
        <div className="detail_wrap">
          <div className="left">
            <div className="food_img">
              <img
                src={process.env.PUBLIC_URL + menu.img}
                width="630px"
                height="630px"
              ></img>
            </div>
          </div>
          <div className="right">
            <div className="food_info">
              <p className="food_title">
                {menu.category}-{menu.title}
              </p>
              <p className="food_price">{menu.price}원</p>
              <div className="food_ingr">
                <p>알레르기 정보</p>
                <span>
                  - 돼지고기, 쇠고기, 땅콩, 대두, 밀, 닭고기, 우유, 알류 함유
                </span>
              </div>
              <div className="food_origin">
                <p>원산지 정보</p>
                <span>- 돼지고기(국산), 소고기(호주산)</span>
              </div>
            </div>
            <div className="quantity">
              <p>구매 수량</p>
              <div className="amount">
                <button
                  className="minus"
                  onClick={() => handleQuantitiy("minus")}
                >
                  -
                </button>
                <div className="count">
                  <span>{count}</span>
                </div>
                <button
                  className="plus"
                  onClick={() => handleQuantitiy("plus")}
                >
                  +
                </button>
              </div>
            </div>
            <div className="cart_purchase">
              <div className="total">
                <p>금액 합계</p>
                <p>{parseInt(menu.price) * count}원</p>
              </div>
              <div className="btn_container">
                <Modal className="ModalPortal" isOpen={modalVisible}>
                  <div>
                    <span>장바구니에 추가되었습니다.</span>
                    <button onClick={hideModal}>확인</button>
                  </div>
                </Modal>
                <div
                  className="btn_cart"
                  onClick={() => {
                    openModal();
                    handleCart();
                  }}
                >
                  장바구니
                </div>
                <Link to="/buy">
                  <div className="btn_purchase">결제</div>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="review">
          <p>덕우들의 리뷰</p>
          <div className="review_wrap">
            <div className="star">
              <img src={star} alt="별점" width="30px" height="30px"></img>
              <img src={star} alt="별점" width="30px" height="30px"></img>
              <img src={star} alt="별점" width="30px" height="30px"></img>
              <img src={star} alt="별점" width="30px" height="30px"></img>
              <img src={star} alt="별점" width="30px" height="30px"></img>
            </div>
            <Link to={`/review`}>
              <img
                src={btn_review}
                alt="리뷰버튼"
                width="145px"
                height="45px"
              ></img>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Detail;
