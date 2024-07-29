import styles from "./cart.module.css";
import { CartHeader } from "./cartHeader";
import { CartList } from "./cartList";
import { TotalCart } from "./totalCart";
import { useState } from "react";

import Headers from "../../Headers/Headers";

export const Cart = ({
  cart,
  setCart,
  convertPrice,
  checkLists,
  setCheckLists,
}) => {
  //장바구니 가격
  const [total, setTotal] = useState(0);

  //체크된 상품의 가격 반환
  const found = checkLists.map((checkLists) => {
    return cart.filter((el) => el.id === checkLists); //선택된 것들을 found에 담음   //undefined 오류 앞에 return 붙여서 해결
  });

  //장바구니 수량 증감
  const handleQuantity = (type, id, quantity) => {
    const found = cart.filter((el) => el.id === id)[0]; //filter는 배열을 반환
    const idx = cart.indexOf(found);

    const cartItem = {
      id: found.id,
      image: found.image,
      name: found.name,
      price: found.price,
      quantity: quantity,
      provider: found.provider,
    };

    if (type === "plus") {
      setCart([...cart.slice(0, idx), cartItem, ...cart.slice(idx + 1)]);
    } else {
      if (quantity === 0) return;
      setCart([...cart.slice(0, idx), cartItem, ...cart.slice(idx + 1)]);
    }
  };

  //장바구니 x 표시 클릭
  const handelRemove = (id) => {
    setCart(cart.filter((el) => el.id !== id));
    setCheckLists(checkLists.filter((check) => check !== id));
  };

  //장바구니 낱개 체크 (다른 페이지 갔다가 돌아와도 체크 유지)
  const handleCheckList = (checked, id) => {
    if (checked) {
      setCheckLists([...checkLists, id]);
    } else {
      setCheckLists(checkLists.filter((check) => check !== id));
    }
  };

  //장바구니 전체 체크
  const handleAllCheck = (checked) => {
    if (checked) {
      const checkItems = [];
      cart.map((cart) => checkItems.push(cart.id));
      setCheckLists(checkItems);
    } else {
      setCheckLists([]);
    }
  };

  //장바구니에서 하나라도 체크 해제되면 전체 체크 해제
  const isAllChecked =
    cart.length === checkLists.length && checkLists.length !== 0;

  return (
    <>
      <header className={styles.header}>
        <h1>장바구니</h1>
      </header>
      <CartHeader handleAllCheck={handleAllCheck} isAllChecked={isAllChecked} />
      {cart.length === 0 ? (
        <div className={styles.not}>
          <h3>장바구니에 담긴 상품이 없습니다.</h3>
          <p>원하는 상품을 장바구니에 담아보세요.</p>
        </div>
      ) : (
        cart.map((cart) => {
          return (
            <CartList
              key={`key-${cart.id}`}
              cart={cart}
              setCart={setCart}
              convertPrice={convertPrice}
              handleQuantity={handleQuantity}
              handelRemove={handelRemove}
              handleCheckList={handleCheckList}
              checkLists={checkLists}
            />
          );
        })
      )}

      {cart.length === 0 ? (
        ""
      ) : (
        <TotalCart
          total={total}
          setTotal={setTotal}
          cart={cart}
          found={found}
          convertPrice={convertPrice}
        ></TotalCart>
      )}
    </>
  );
};
