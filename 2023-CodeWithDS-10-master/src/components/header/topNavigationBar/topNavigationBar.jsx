import styles from "./topNavigationBar.module.css";
import { Link } from "react-router-dom";

export const TopNavigationBar = ({cart}) => {
  
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link to="/">
          <h1 className={styles.logo}>
            <img src="/images/logo.png" alt="logo" />
          </h1>
        </Link>
      </div>
      <div className='Container'>
            <div className='HeaderArea'>
                <div className='TopArea'>
                    <div className='TopWrap'>
                        <div className='Title'>
                            <Link to='menu'>
                                <img src="/images/siren_orduk.jpg" alt='사이렌 오덕' width='310px' height='79px'></img>
                            </Link>
                        </div>

                          <div className='App_list'>
                            <div className='AppWrap'>
                                <div className='LogArea'>
                                    <img src="/images/member.jpg" alt='회원' width='45.95px' height='45.95px'></img>
                                    <a className='nick' href='#!'>덕밥이</a>
                                    <span>님</span>
                                    <Link to="" className='btn_login'>로그아웃</Link>
                                </div>
                                <div className='myPage'>
                                    <Link to="">마이페이지</Link>
                                </div>
                                <div className='Cart'>
                                    <Link to="/cart">
                                        <img src="/images/cart_img.jpg" alt='장바구니' width='120px' height='35px'></img>
                                    </Link>
                                </div>
                            </div>
                          </div>
                      </div>
                </div>
            </div>
        </div>
      
    </header>
  );
};

/*

      <div className={styles.menu}>
        <Link to="">
          <div className={styles.mypage}>
            <img src="/images/member.jpg" alt="user" />
            <span>로그인</span>
          </div>
        </Link>

        <Link to="/cart">
          <div className={styles.shopping_cart}>
            <img src="/images/cart_img.jpg" alt="cart" />
            <span>장바구니</span>
            {cart.length >=1 ?(
              <div className={styles.new_shopping_cart}>
                <p>{cart.length}</p>
              </div>
            ):""}
          </div>
        </Link>









        
 */


