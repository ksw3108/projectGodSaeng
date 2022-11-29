import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../css/userManagement.css';
import * as server_bridge from '../../controller/server_bridge';
const UserManagement = () => {
  const navigate = useNavigate();
  const [user, setUserList] = useState([]);
  const keywordRef = useRef();
  const optionRef = useRef();
  useEffect(() => {
    getUserList(0);
  }, []);
  const getUserList = async (is_searching) => {
    const res = await server_bridge.axios_instace.post('/getuserlist', {
      is_searching: is_searching,
      search_option: optionRef.current.value,
      keyword: keywordRef.current.value,
    });
    setUserList(res.data);
    console.log(res.data);
    return;
  };
  const reset = () => {
    optionRef.current.value = 'USER_ID';
    keywordRef.current.value = '';
    getUserList(0);
  };
  const move2userdetail = (user_idx) => {
    navigate('/admin/userdetail', {
      state: { user_idx: user_idx },
    });
  };
  return (
    <div className="userManagement">
      <div className="userTitleContainer">
        <h3 className="userTitle">회원 관리</h3>
        <div>
          <select ref={optionRef}>
            <option value="USER_ID">아이디</option>
            <option value="USER_NAME">이름</option>
            <option value="USER_TEL">연락처</option>
            <option value="USER_MAIL">이메일</option>
          </select>
          <input
            type="text"
            ref={keywordRef}
            placeholder="검색어를 입력해주세요"
          />
          <button onClick={() => getUserList(1)}>검색</button>
          <button onClick={reset}>초기화</button>
        </div>
        <div className="userContainer">
          {user.length > 0 &&
            user.map((data, idx) => (
              <div
                key={idx}
                className="userShow"
                onClick={() => move2userdetail(data.USER_IDX)}
              >
                <ul>
                  <li>{data.USER_NAME}</li>
                  <li>{data.USER_TEL}</li>
                  <li>{data.USER_MAIL}</li>
                </ul>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
export default UserManagement;
