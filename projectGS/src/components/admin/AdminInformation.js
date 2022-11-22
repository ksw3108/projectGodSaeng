import React from "react";

const AdminInformation = () => {
  return (
    <div className="adminInformation">
      <div className="adminInformationContent">
        <h3>내 정보</h3>
        <table>
          <tr>
            <th>아이디</th>
            <td>admin 아이디 넣고</td>
          </tr>
          <tr>
            <th>비밀번호</th>
            <td>변경 팝업 넣고</td>
          </tr>
          <tr>
            <th>이름</th>
            <td>관리자 이름 / 회원 정보 변경 팝업</td>
          </tr>
          <tr>
            <th>연락처</th>
            <td>관리자 연락처 넣고</td>
          </tr>
          <tr>
            <th>관리자 등급</th>
            <td>일반 관리자</td>
          </tr>
        </table>
      </div>
    </div>
  );
};

export default AdminInformation;
