import styles from "./cart.module.css";
import { useEffect } from "react";

export const TotalCart = ({ total, setTotal, cart, found }) => {
  //total금액 계산
  useEffect(() => {
    if (found && found.length > 0) {
      const sum = found.map((item) => item[0].price * item[0].quantity);
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



  return(
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
        {convertPrice(total)}</p>
    </div>


    <div className={styles.paycart}>
          <Link to="" onClick={handlePayment}>
            <img src='/images/pay.jpg' alt='결제' width='300px' height='60px'></img>
          </Link>
    </div>



  </div>

  
  
  );
};
