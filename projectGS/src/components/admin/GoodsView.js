import * as server_bridge from '../../controller/server_bridge';
import { useNavigate, useLocation } from 'react-router-dom';
import { useRef, useEffect, useState } from 'react';
const GoodsView = () => {
  const imgRef = useRef();
  const nameRef = useRef();
  const priceRef = useRef();
  const { state } = useLocation();
  const navigate = useNavigate();

  const updateGoods = async () => {
    if (window.confirm('정말로 수정하시겠습니까?')) {
      const formData = new FormData();
      formData.append('name', nameRef.current.value);
      formData.append('price', priceRef.current.value);
      formData.append(
        //업로드할 파일(파일업로드를 안한다면 "" 을 업로드)
        'img',
        imgRef.current.files[0] ? imgRef.current.files[0] : '',
      );
      formData.append('goods_idx', state.data.GOODS_IDX);

      const response = await server_bridge.axios_instace.post(
        '/updategoods',
        formData,
      );
      if (response.data === 'success') {
        alert('수정 성공!');
        navigate('/admin/goodsmanage');
      } else {
        alert('수정 실패!');
      }
    }
  };
  const deleteGoods = async (goods_idx) => {
    if (window.confirm('정말로 삭제하시겠습니까?')) {
      const response = await server_bridge.axios_instace.post('/goodslist', {
        goods_idx: goods_idx,
      });
      if (response.data === 'success') {
        alert('삭제 성공!');
        navigate('/admin/goodsmanage');
      } else {
        alert('삭제 실패!');
      }
    }
  };
  return (
    <div className="Contents">
      <div className="adminTitle"><h3>상품권 상세</h3></div>
      
      <div className="pageWrap">
        <table className="boardTable" border="0" cellPadding="0" cellSpacing="0">
            <colgroup>
              <col width="200px" />
              <col />
            </colgroup>
            <tr>
              <th>등록된 상품권 이미지</th>
              <td>
                <div className="goodsImgWrap">
                  <img src={server_bridge.py_url + '/' + state.data.GOODS_IMG} alt="상품권 이미지" />
                </div>
              </td>
            </tr>
            <tr>
              <th>상품권 이미지 변경</th>
              <td>
                <div className="goodsImgUp">                
                  <input type="file" accept="image/*" ref={imgRef} id="goodsImg" />
                  <label htmlFor="goodsImg"><i className="xi-image-o"></i>이미지 선택</label>
                </div>
              </td>
            </tr>
            <tr>
              <th>상품권 명</th>
              <td><input type="text" ref={nameRef} defaultValue={state.data.GOODS_NAME} /></td>
            </tr>
            <tr>
              <th>가격</th>
              <td><input
                  type="text"
                  ref={priceRef}
                  placeholder="숫자만 입력해주세요! ex)9000"
                  defaultValue={state.data.GOODS_PRICE}
                /></td>
            </tr>
        </table>


        <div className="adminBtnWrap adminBtnWrap2">
          <button onClick={updateGoods} className="adminBtn adminBtn2 adminBtnNavy">수정하기</button>
          <button onClick={deleteGoods} className="adminBtn adminBtn2">삭제하기</button>
        </div>
      </div>
    </div>
  );
};
export default GoodsView;
