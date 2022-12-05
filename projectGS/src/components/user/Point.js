import React from 'react';
import * as server_bridge from '../../controller/server_bridge';
import { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PointItem from './PointItem';

const Point = () => {
  const [goods, setGoods] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    getGoodsList();
  }, []);

  // console.log('구우웃~', goods);

  const getGoodsList = async () => {
    const response = await server_bridge.axios_instace.get('/goodslist');
    setGoods(response.data);
    console.log(response.data);
  };

  // 1000의 자리마다 ,를 찍어주는 정규식
  const addComma = (num) => {
    var regexp = /\B(?=(\d{3})+(?!\d))/g;
    return num.toString().replace(regexp, ',');
  };

  console.log('상품권 리스트', goods);
  return (
    <div>
      <form>
        <div>포인트 사용</div>
        {goods.map((item) => {
          return <PointItem article={item} />;
        })}

        {/* {goods.map((item, idx) => (
          <div
            key={idx}
            article={item}
            onClick={() => navigate('/point', { state: { data: item } })}
            style={{ cursor: 'pointer' }}
          >
            <img
              src={server_bridge.py_url + '/' + item.GOODS_IMG}
              alt="상품권 이미지"
            />
            <br />
            {item.GOODS_NAME}
            <br />
            {addComma(item.GOODS_PRICE)} 원
            <br />
          </div>
        ))} */}
      </form>
    </div>
  );
};

export default Point;
