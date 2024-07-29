import React, { useState, useEffect } from "react";
import styles from "./cart.module.css";
import { Link } from "react-router-dom";

export const TotalCart = ({ total, setTotal, cart, found, convertPrice }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  //total금액 계산
  useEffect(() => {
    if (found && found.length > 0) {
      const temp = found.filter((item) => item.length != 0);
      const sum = temp.map((item) => item[0].price * item[0].quantity);
      const reducer = (acc, cur) => acc + cur;
      if (sum.length == 0) {
        setTotal(0);
        return;
      }
      const itemTotal = sum.reduce(reducer, 0);
      setTotal(itemTotal);
    } else {
      setTotal(0);
    }
  }, [cart, total, found, setTotal]);
  console.log(found);

  const handlePayment = () => {
    alert("결제가 진행됩니다!");
  };

  return (
    <div className={styles.total}>
      <div className={styles.total_price}>
        <p className={styles.cart_product_total_price}></p>
        <p className={styles.cart_product_price}></p>
      </div>

      <div className={styles.sale}>
        <p className={styles.cart_product_sale}></p>
        <p className={styles.cart_product_sale_price}></p>
      </div>
      <br></br>

      <div className={styles.payment}>
        <p className={styles.cart_prouct_payment}>총 계산금액</p>
      </div>

      <div className={styles.payment}>
        <p className={styles.cart_prouct_payment_price}>
          {convertPrice(total)}
        </p>
      </div>

      <div className={styles.paycart}>
        <Link to="" onClick={handlePayment}>
          <img
            src="/images/pay.jpg"
            alt="결제"
            width="300px"
            height="60px"
          ></img>
        </Link>
      </div>
    </div>
  );
};

/*


<div className="paycheck">
  <button onClick={onClickConfirmButton} disabled={notAllow}
  className="bottomBotton">결제하기</button>
</div>c
<div className={styles.btn_submit}>
     <button className={styles.btn_buy}>결제하기</button>
    </div>


<div className={styles.total_price}>
            <p className={styles.cart_product_total_price}>총 상품금액</p>
            <p className={styles.cart_product_price}>{convertPrice(total)}</p>
          </div>

<div className={styles.delivery}>
      <p className={styles.cart_product_delivery}>배송비</p>
      <p className={styles.cart_product_delivery_price}>0원</p>
    </div>

<div className={styles.sale}>
<p className={styles.cart_product_sale}>상품 할인</p>
<p className={styles.cart_product_sale_price}>0원</p>
</div> 
<div className={styles.pay_minus}>
      <img src="/images/icon-minus-line.svg" alt="minus" />
    </div>
    
    <div className={styles.pay_plus}>
      <img src="/images/icon-plus-line.svg" alt="plus" />
    </div>
*/
