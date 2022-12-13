// 마이페이지 - 포인트 관리
import { SlArrowLeft } from 'react-icons/sl';
import '../../css/user/ManagementP.scss';

const ManagementP = () => {
  return (
    <div id="Notice" className="subPage">
      <div className="subTop">
        <h1>포인트 관리</h1>
      </div>
      <div className="managementP">
        {/* 내용 1 - Head */}
        <div className="miniTitle">
          <a>마이페이지</a>
          <SlArrowLeft />
          <a>포인트 관리</a>
        </div>
        <div className="pointTitle">
          <h2>현재 회원님의 포인트</h2>
        </div>
        {/* 내용 2 */}
        <div className="pointSubTitle">
          <h3>• 포인트 총 잔액: 150p</h3>
        </div>
        {/* 내용 3 - 목록 리스트 */}
        <div className="topList">
          {' '}
          <table border="0" cellPadding="0" cellSpacing="0">
            <thead>
              <tr>
                <th>NO</th>
                <th>일시</th>
                <th>신고유형</th>
                <th>적립</th>
                <th>사용</th>
                <th>포인트 잔액</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>3</td>
                <td>2022-12-01</td>
                <td>불법주정차 (횡단보도)</td>
                <td>+ 50p🪙</td>
                <td></td>
                <td>150p🪙</td>
              </tr>
              <tr>
                <td>2</td>
                <td>2022-11-28</td>
                <td>불법주정차 (소화전)</td>
                <td>+ 50p🪙</td>
                <td></td>
                <td>100p🪙</td>
              </tr>
              <tr>
                <td>1</td>
                <td>2022-10-02</td>
                <td>불법주정차 (어린이 보호구역)</td>
                <td>+ 50p🪙</td>
                <td></td>
                <td>50p🪙</td>
              </tr>
            </tbody>
          </table>
        </div>
        {/* 안내사항 */}
        <div className="pointInfo">
          <span>
            • 잔여 포인트: 사용가능한 포인트로 사용방법은 💰5,000p이상시 사용
            가능합니다.
          </span>
          <br />
          <span>
            • 소멸예정 포인트: 소멸되기 2개월 전에 안내되며 소멸예정월 1일에
            소멸됩니다.
          </span>
        </div>
      </div>
    </div>
  );
};
export default ManagementP;
