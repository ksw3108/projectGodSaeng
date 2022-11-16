//221116 선우 - 여기에 관리자 관련 기능 추가
import * as server_bridge from "../controller/server_bridge";

export const cate_big = ["도로교통법(경찰청)", "장애인등 편의법(복지부)", "소방기본법(소방청)", "친환경자동차법(산업부)"];
export const cate_small = ["소화전", "교차로 모퉁이", "버스정류소", "횡단보도", "어린이보호구역", "기타"];

export async function getReportList() {
  let search_option = {
    //검색 옵션
    start_date: "", //시작일
    end_date: "", //종료일
    category: "", //카테고리
    process: "", //처리상태
  };

  const res = server_bridge.axios_instace.post("/pythonserver", { testdata: "from_client" });

  return res;
}
