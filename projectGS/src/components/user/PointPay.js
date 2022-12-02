import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const PointPay = () => {
  const { state } = useLocation(); // 포인트 오더에서 넘겨받은 데이터
  console.log('오더에서 넘겨받은 데이터', state);
  console.log('타입', typeof state.state.article.price);

  const totalPrice = state.num.count * state.state.article.price;
  console.log('총금액', totalPrice);

  // 1000의 자리마다 ,를 찍어주는 정규식
  const addComma = (num) => {
    var regexp = /\B(?=(\d{3})+(?!\d))/g;
    return num.toString().replace(regexp, ',');
  };

  return (
    <div id="PointPay" className="subPage">
      <div className="subTop">
        <h1>포인트 사용</h1>
      </div>

      <div className="section">
        <div className="sub-title"><h2>상품권 결제하기</h2></div>

        <form>
          <div className="payWrap">
            <div className="orderWrap">
              <div className="orderList">
                <h3><span className="num">1</span>주문 내역 확인</h3>
                <table border="0" cellPadding="0" cellSpacing="0">
                  <thead>
                    <tr>
                      <th>상품</th>
                      <th>수량</th>
                      <th>판매가</th>
                      <th>주문금액</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="textLeft goods">
                        <div className="orderImg">
                          <img src={state.state.article.img} alt="상품권이미지" />
                        </div>
                        <div className="orderGoods">
                          <span>{state.state.article.brand}</span><br />
                          {state.state.article.title}
                        </div>
                      </td>
                      <td>{state.num.count}</td>
                      <td>{addComma(state.state.article.price)}</td>
                      <td>{addComma(totalPrice)}</td>
                    </tr>
                  
                    <tr>
                      <th colSpan="3" className="textRight">총 상품금액</th>
                      <td> 
                        <strong className="ft_og totalPrice">{addComma(totalPrice)}</strong> <i>point</i>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="orderInfo">
                <h3><span className="num">2</span>수신자 정보 입력</h3>

                <table border="0" cellPadding="0" cellSpacing="0">
                  <colgroup>
                    <col width="20%;" />
                    <col />
                  </colgroup>
                  <tr>
                    <th>받는 분</th>
                    <td><input type="text" /></td>
                  </tr>
                  <tr>
                    <th>휴대폰 번호</th>
                    <td><input type="text" /></td>
                  </tr>
                </table>
              </div>
            </div>

            <div className="userPoint">
              <h3><span className="num">3</span>결제하기</h3>
              <table border="0" cellPadding="0" cellSpacing="0">
                <tr>
                  <td></td>
                  <th>보유 포인트</th>
                  <td>10,000 <i>point</i></td>
                </tr>
                <tr>
                  <td>-</td>
                  <th>사용 포인트</th>
                  <td>{addComma(totalPrice)} <i>point</i></td>
                </tr>
                <tr>
                  <td>=</td>
                  <th>잔여 포인트</th>
                  <td>{addComma(10000 - totalPrice)} <i>point</i></td>
                </tr>
              </table>

              <button type="button" className="btn btn-navy">결제하기</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PointPay;
