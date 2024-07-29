import styles from "./cart.module.css";

export const CartList =({
    cart, 
    checkLists,
    handleQuantity, 
    handelRemove, 
    handleCheckList,
    convertPrice })=> {
    
    return (
    <section className={styles.cart_product_list}>
    <input type="checkbox" onChange={(e)=>{
       handleCheckList(e.currentTarget.checked, cart.id)
    }}
    checked ={checkLists.includes(cart.id) ? true : false}
    
    />
    <div className={styles.cart_product_wrap}>
      <div className={styles.cart_product_image}>
        <img src={cart.image} alt="product-img" />
      </div>
                              
      <div className={styles.cart_product_info}>
        <p className={styles.seller_store}>{cart.provider}</p>
        <p className={styles.product_name}>{cart.name}</p>  
        
      </div>
      <div className={styles.cart_product_info}>
        <p className={styles.price}>{convertPrice(cart.price)}원</p>
      </div>
    </div>
    

    <div className={styles.cart_product_count}>
      <img
        className={styles.minus}
        src="/images/icon-minus-line.svg"
        alt="minus"
        onClick={()=>handleQuantity("minus", cart.id, cart.quantity -1)}
      />

      <div className={styles.count}>
        <span>{cart.quantity}</span>
      </div>
      <img
        className={styles.plus}
        src="/images/icon-plus-line.svg"
        alt="plus"
        onClick={()=>handleQuantity("minus", cart.id, cart.quantity +1)}
      />
    </div>

    <div className={styles.cart_product_price}>
      <p className={styles.total_price}></p>
      <br></br>
      <p className={styles.total_price}></p>
      
    </div>

    

    <div className={styles.product_remove} onClick={()=>handelRemove(cart.id)}>
      <img src="/images/icon-delete.svg" alt="delete" />
    </div>
  </section>
    );   //* cart.quantity : 가격합산 바로 보려면 추가하기 line 27
};

//<br></br>
      //<div><button className={styles.btn_submit}>결제하기</button></div>