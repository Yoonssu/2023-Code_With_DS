import {Link, useParams} from 'react-router-dom';
import Modal from 'react-modal';
import checkLists from '../Cart/totalCart';

export default function Buy({total, checkLists}) {
    //console.log(cart);
    console.log('hi');

    const {cl} = useParams(checkLists);
    console.log(cl);
    return (
        <>
        <div className="buy_header">
            <div className="buy">결제</div>
            <Link to='/'>
                <div className="btn_cancel">취소하기</div>
            </Link>
        </div>
        <div className="buy_menu_area">
            <div className="menu">상품</div>
            <div className="menu_list">
                {cl}
            </div>
            <div className="total_price_area">총 결제 금액</div>
            <div>{total}원</div>
        </div>
        <div className="buy_method_area">
            <ul className="buy_method">결제 수단</ul>
                <li className="card">체크/신용카드</li>
                <li className="naverpay">NAVER pay</li>
                <li className="kakaopay">KAKAO pay</li>
                <li className="deposit">무통장입금</li>
        </div>
        <Modal>
            <div className='buy_success'>결제가 완료되었습니다.</div>
            <div>주문 번호 : 506번</div>
        </Modal>
        <div className="btn_buy">결제하기</div>
        </>
    );
};