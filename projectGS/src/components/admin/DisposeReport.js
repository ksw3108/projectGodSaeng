import * as admin_ctrl from '../../controller/admin_ctrl';
import * as server_bridge from '../../controller/server_bridge';
import CsvDownload from 'react-json-to-csv';

let data = [
  {
    title1: '1111',
    title2: '1111',
    title3: '1111',
    title4: '1111',
  },
  {
    title1: '2222',
    title2: '2222',
    title3: '2222',
    title4: '2222',
  },
  {
    title1: '3333',
    title2: '3333',
    title3: '3333',
    title4: '3333',
  },
];
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
      <CsvDownload
        className="excelbtn"
        // data : object 또는 object의 배열
        data={data}
        // filename : 파일이름
        filename="react_json_to_csv.csv"
      >
        엑셀 다운로드
      </CsvDownload>
    </div>
  );
};
export default DisposeReport;
