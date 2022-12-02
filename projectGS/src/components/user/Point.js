import { React, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
// import items from './Items';
import PointItem from './PointItem';
import PointOrder from './PointOrder';


import gift_card_5000 from '../../images/5000.png';
import gift_card_10000 from '../../images/10000.png';
import gift_card_30000 from '../../images/30000.png';

const Point = () => {
  const navigate = useNavigate();

  // 1000의 자리마다 ,를 찍어주는 정규식
  const addComma = (num) => {
    var regexp = /\B(?=(\d{3})+(?!\d))/g;
    return num.toString().replace(regexp, ',');
  };

  const items = [
    {
      id: 1,
      img: gift_card_5000,
      brand: '소상공인시장진흥공단',
      title: '온누리상품권 5천원권',
      price: 5000,
    },
    {
      id: 2,
      img: gift_card_10000,
      brand: '소상공인시장진흥공단',
      title: '온누리상품권 1만원권',
      price: 10000,
    },
    {
      id: 3,
      img: gift_card_30000,
      brand: '소상공인시장진흥공단',
      title: '온누리상품권 3만원권',
      price: 30000,
    },
  ];

  return (
    <div id="Point" className="subPage">
      <div className="subTop">
        <h1>포인트 사용</h1>
      </div>

      <div className="section">
        <div className="sub-title"><h2>포인트 사용</h2></div>

        <div className="goods">
          <form>
            <div className="goodsList"><span>소상공인시장진흥공단</span><h3>온누리상품권</h3></div>
            <div className="goodsWrap">
              {items.map((article) => {
                return <PointItem article={article} />;
              })}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Point;
