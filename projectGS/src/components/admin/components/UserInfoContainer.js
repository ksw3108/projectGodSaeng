import { useState, useRef, useReducer } from 'react';
import * as server_bridge from '../../../controller/server_bridge';

import userIcon from '../../../images/profile.png';

const UserInfoContainer = ({ data }) => {
    const pwRef = useRef();
    const nameRef = useRef();
    const telRef = useRef();
    const mailRef = useRef();
    const oRef = useRef();
    const xRef = useRef();

    const updateUser = async (e) => {
        e.preventDefault();
        if (window.confirm('정말로 수정하시겠습니까?')) {
            const res = await server_bridge.axios_instace.post('/updateuserinfo', {
                user_pw: data.USER_PW,
                user_name: nameRef.current.value,
                user_tel: telRef.current.value,
                user_mail: mailRef.current.value,
                user_idx: data.USER_IDX,
                user_ox: oRef.current.checked ? 'O' : 'X',
            });
            if (res.data === 'success') {
                alert('회원 정보 수정에 성공했습니다!');
            } else {
                alert('회원 정보 수정에 실패했습니다!' + '\r\n' + res.data);
            }
        }
    };
    console.log('관리자여부가아닌 회원여부확인', data);

  //사용자 정보 핸들링용 공용 컴포넌트
  return (
    <div className="userWrap">
      <div className="userImg">
        <img src={userIcon} alt="Profile" />
      </div>
      <div className="user">
        <table className="userTable" border="0" cellPadding="0" cellSpacing="0">
            <colgroup>
                <col width="120px;" />
                <col />
            </colgroup>
            <tbody>
                <tr>
                    <th>이름</th>
                    <td><input type="text" ref={nameRef} defaultValue={data.USER_NAME} /></td>
                </tr>
                <tr>
                    <th>아이디</th>
                    <td><input type="text" defaultValue={data.USER_ID} disabled /></td>
                </tr>
                <tr>
                    <th>이메일</th>
                    <td><input type="text" ref={mailRef} defaultValue={data.USER_MAIL} /></td>
                </tr>
                <tr>
                    <th>연락처</th>
                    <td><input type="text" ref={telRef} defaultValue={data.USER_TEL} /></td>
                </tr>
                <tr>
                    <th>회원 여부</th>
                    <td>
                        <div className="radioWrap">
                            {data.USER_OX === 'O' ? (
                                <>
                                    <input type="radio" id="user_o" name="user" value="O" ref={oRef} defaultChecked />
                                    <label htmlFor="user_o">일반회원</label>
                                    <input type="radio" id="user_x" name="user" value="X" ref={xRef} />
                                    <label htmlFor="user_x">비회원</label>
                                </>
                            ):(
                                <>
                                    <input type="radio" id="user_o" name="user" value="O" ref={oRef} />
                                    <label htmlFor="user_o">일반회원</label>
                                    <input type="radio" id="user_x" name="user" value="X" ref={xRef} defaultChecked />
                                    <label htmlFor="user_x">비회원</label>
                                </>
                            )}
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>

        <div className="adminBtnWrap">
            <button type="submit" className="adminBtn adminBtn2 adminBtnNavy" onClick={updateUser}>수정하기</button>
        </div>
      </div>

    </div>
  );
};
export default UserInfoContainer;
