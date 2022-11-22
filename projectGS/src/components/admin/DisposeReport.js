import React from "react";
import "../../css/disposeReport.css";

const Classification = () => {
  return (
    <select>
      <option key="traffic" value="traffic">
        도로교통법(경찰청)
      </option>
      <option key="handicapped" value="handicapped">
        장애인등편의법(복지부)
      </option>
      <option key="fireService" value="fireService">
        소방기본법(소방청)
      </option>
      <option key="ecoFriendly" value="ecoFriendly">
        친환경자동차법(산업부)
      </option>
    </select>
  );
};

const MinorTraffic = () => {
  return (
    <select>
      <option key="hydrant" value="hydrant">
        소화전
      </option>
      <option key="crossroad" value="crossroad">
        교차로 모퉁이
      </option>
      <option key="busStop" value="busStop">
        버스 정류소
      </option>
      <option key="crosswalk" value="crosswalk">
        횡단보도
      </option>
      <option key="childrenProtection" value="childrenProtection">
        어린이 보호구역
      </option>
      <option key="etc" value="etc">
        기타
      </option>
    </select>
  );
};

const MinorHandicapped = () => {
  return (
    <select>
      <option key="handicapParking" value="handicapParking">
        장애인 전용구역
      </option>
    </select>
  );
};

const MinorFireService = () => {
  return (
    <select>
      <option key="fireEngin" value="fireEngin">
        소방차 전용구역
      </option>
    </select>
  );
};

const MinorEcoFriendly = () => {
  return (
    <select>
      <option key="fireEngin" value="fireEngin">
        친환경차 충전구역
      </option>
    </select>
  );
};

const DisposeReport = () => {
  return (
    <div>
      <table className="disposeReportTable">
        <tr className="disposeReportTr">
          <th>기간</th>
          <td>달력 추가해야함</td>
        </tr>
        <tr className="disposeReportTr">
          <th>카테고리</th>
          <td>
            대분류
            <Classification />
            소분류
            {/* Classification 선택에 따라서 하단의 리스트로 바뀌어야함 */}
            <MinorTraffic />
            <MinorHandicapped />
            <MinorFireService />
            <MinorEcoFriendly />
          </td>
        </tr>
        <tr className="disposeReportTr">
          <th>처리상태</th>
          <td>
            <input type="checkbox" />
            신규
            <input type="checkbox" />
            진행
            <input type="checkbox" />
            취하
            <input type="checkbox" />
            완료
          </td>
        </tr>
      </table>
      <div>월별 그래프</div>
      <div className="pieChart">차트넣을 자리</div>
      <div>신고 리스트</div>
      <input type="button" value="엑셀 다운로드" />
      <table className="notifyTable">
        <tr className="notifyTr">
          <th className="notifyNum">No</th>
          <th className="notifyCategory">카테고리</th>
          <th className="notifyDate">신고일시</th>
          <th className="notifyContent">신고내용</th>
          <th className="notifyPhone">신고자 연락처</th>
          <th className="notifyEtc">기타</th>
        </tr>
        <tr className="notifyTr">
          <td className="notifyNum">1</td>
          <td className="notifyCategory">소분류 나오도록</td>
          <td className="notifyDate">시간까지 나와야함</td>
          <td className="notifyContent">길면 ...</td>
          <td className="notifyPhone">핸드폰번호필수</td>
          <td className="notifyEtc">기타</td>
        </tr>
      </table>
    </div>
  );
};
export default DisposeReport;
