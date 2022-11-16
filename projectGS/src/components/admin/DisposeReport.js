import * as admin_ctrl from "../../controller/admin_ctrl";
import * as server_bridge from "../../controller/server_bridge";

const test = () => {
  admin_ctrl
    .getReportList()
    .then((val) => {
      console.log(val.data);
    })
    .catch((err) => {
      console.log(err);
    });
};
const DisposeReport = () => {
  return (
    <div>
      관리자의 신고 내용 처리 페이지
      <br />
      <button onClick={test}>async 리턴값 체크</button>
    </div>
  );
};
export default DisposeReport;
