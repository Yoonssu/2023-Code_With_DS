
import './headermark.css'
import { Link } from 'react-router-dom';

export default function Header() {
    return(
        <div className='Container'>
            <div className='HeaderArea'>
                <div className='TopArea'>
                    <div className='TopWrap'>
                        <div className='Title'>
                            <Link to='/'>
                                <img src='/images/siren_orduk.jpg' alt='사이렌 오덕'></img>
                            </Link>
                        </div>
                        <div className='App_list'>
                            <div className='AppWrap'>
                                <div className='LogArea'>
                                    <img src='/images/member.jpg' alt='회원' width='43px' height='43px'></img>
                                    <a className='nick' href='#!'>덕밥이</a>
                                    <span>님</span>
                                    <Link to="/" className='btn_login'>로그아웃</Link>
                                </div>
                                <div className='myPage'>
                                    <Link to="">마이페이지</Link>
                                </div>
                                <div className='Cart'>
                                    <Link to={`/cart`}>
                                        <img src='/images/cart_img.jpg' alt='장바구니' width='120px' height='35px'></img>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};