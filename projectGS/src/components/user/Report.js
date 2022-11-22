import React, { useState, useRef } from "react";
import DaumPostcode from "react-daum-postcode";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const ReportWriteComponent = () => {
  // 신고 유형 선택 ====================================================
  let CATEGORY_VALUE = ""; // 값이 계속 바뀌기 때문에 let으로 선언.
  const { register, handleSubmit } = useForm(); //ref의 선택자인 register
  const onSubmit = (data) => {
    CATEGORY_VALUE = data.lifeArr;
    console.log(CATEGORY_VALUE);
  }; // data(인자)를 받아 lifeArr(select name 속성) LIFE_VALUE의 값에 반영한다.

  // 이미지 파일 업로드 & 미리보기 =====================================
  const contentsRef = useRef();

  const [imageSrc, setImageSrc] = useState("");

  const encodeFileToBase64 = (fileBlob) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    return new Promise((resolve) => {
      reader.onload = () => {
        setImageSrc(reader.result);
        resolve();
      };
    });
  };

  // 카카오 주소 검색 API ===============================================
  const [openPostcode, setOpenPostcode] = useState(false);
  const [address, setAddress] = useState("");
  const selectAddress = (data) => {
    console.log(`
                주소: ${data.address},
                우편번호: ${data.zonecode}
            `);
    setOpenPostcode(false);
  };

  const handle = {
    // 버튼 클릭 이벤트
    clickButton: () => {
      setOpenPostcode((current) => !current);
    },
    // // 주소 선택 이벤트
    // selectAddress: (data) => {
    //   console.log(`
    //             주소: ${data.address},
    //             우편번호: ${data.zonecode}
    //         `);
    // },
  };

  const onCompletePost = (data) => {
    console.log(data.address);
    setAddress(data.address);
    setOpenPostcode(false);
  };

  // 달력 react-datepicker ================================================================
  const [startDate, setStartDate] = useState(new Date());

  // ==============================================
  const navigate = useNavigate();

  const categoryRef = useRef();
  const imgRef = useRef();
  const carNumRef = useRef();
  const notifySpotRef = useRef();
  const notifyDateRef = useRef();
  const notifyTxtRef = useRef();
  const notifyPnumRef = useRef(); // 처리상태
  const userTelRef = useRef(); // 처리상태

  const [category, setCategory] = useState("");
  const [img, setImg] = useState("");
  const [carNum, setCarNum] = useState("");
  const [notifySpot, setNotifySpot] = useState("");
  const [notifyDate, setNotifyDate] = useState();
  const [notifyTxt, setNotifyTxt] = useState("");
  const [notifyPnum, setNotifyPnum] = useState("");
  const [userTel, setUserTel] = useState("");

  // 신고접수
  const notifySubmit = () => {
    console.log(notifyDateRef.current.value); //날짜 나오는지 확인
    axios
      .post("http://localhost:8000/report", {
        category: categoryRef.current.value,
        img: imgRef.current.value,
        carNum: carNumRef.current.value,
        notifySpot: notifySpotRef.current.value,
        notifyDate: notifyDateRef.current.value,
        notifyTxt: notifyTxtRef.current.value,
        notifyPnum: notifyPnumRef.current.value,
      })

      .then((res) => {
        console.log(res);
        if (res.data === "신고 접수 성공") {
          navigate("/report");
        } else {
          category.current.value = "";
          img.current.value = "";
          carNum.current.value = "";
          notifySpot.current.value = "";
          notifyDate.current.value = "";
          notifyTxt.current.value = "";
          notifyPnum.current.value = "";

          navigate("/report");
        }
      })
      .catch((e) => {
        console.error(e);
      });
  };

  // 개인정보 동의 내용 숨기기
  const [value, setValue] = useState(true);
  function onClickHide() {
    setValue((value) => !value);
  }

  return (
    <div className="container">
      <span>불법주정차 신고</span>
      <div>
        <form />
        <table>
          <tr>
            <th>불법 주정차 유형</th>
            <td>
              <form onSubmit={handleSubmit(onSubmit)}>
                <select ref={categoryRef}>
                  <option value="none">선택하세요</option>
                  <option value="01">소화전</option>
                  <option value="02">교차로 모퉁이</option>
                  <option value="03">버스 정류소</option>
                  <option value="04">횡단보도</option>
                  <option value="05">어린이 보호구역</option>
                  <option value="06">장애인 전용구역</option>
                  <option value="07">소방차 전용구역</option>
                  <option value="08">친환경차 충전구역</option>
                  <option value="09">기타</option>
                </select>
              </form>
            </td>
          </tr>
          <tr>
            <th>사진 업로드</th>
            <td>
              <input
                className="img"
                ref={imgRef}
                type="file"
                accept="image/jpg, image/png, image/jpeg, image/gif"
                onChange={(e) => {
                  encodeFileToBase64(e.target.files[0]);
                }}
              />
              {imageSrc && <img src={imageSrc} alt="preview-img" />}
            </td>
          </tr>
          <tr>
            <th>차량 번호</th>
            <td>
              <input
                className="carNum"
                ref={carNumRef}
                type="text"
                placeholder="차량 번호"
              />
              <button>수정</button>
            </td>
          </tr>
          <tr>
            <th>발생 지역</th>
            <td>
              <input
                className="notifySpot"
                ref={notifySpotRef}
                type="text"
                placeholder="주소 입력"
                onClick={handle.clickButton}
                defaultValue={address}
              />
              <button onClick={handle.clickButton}>우편번호 찾기</button>
              {openPostcode && (
                <DaumPostcode
                  onComplete={onCompletePost} // 값을 선택할 경우 실행되는 이벤트
                  autoClose={false} // 값을 선택할 경우 사용되는 DOM을 제거하여 자동 닫힘 설정
                  defaultQuery="광주광역시 동구 제봉로 92" // 팝업을 열때 기본적으로 입력되는 검색어
                />
              )}
            </td>
          </tr>
          <tr>
            <th>발생 일자</th>
            <td>
              <input
                className="notifyDate"
                type="datetime-local"
                ref={notifyDateRef}
              />
            </td>
          </tr>
          <tr>
            <th>신고 내용</th>
            <td>
              <textarea
                className="notifyTxt"
                ref={notifyTxtRef}
                placeholder="불법 주정차 위반 사항을 입력해주세요"
              />
            </td>
          </tr>
          {/* <tr>
            <th>신고처리내역 수신방법</th>
            <td>
              <input type="radio" name="check" value="tel" />
              휴대폰
              <input type="radio" name="check" value="mail" />
              이메일
            </td>
          </tr> */}
          <tr>
            <th>휴대전화</th>
            <td>
              <input
                className="userTel"
                ref={userTelRef}
                type="text"
                placeholder="핸드폰 번호를 입력하세요"
              />
            </td>
          </tr>
          {/* <tr>
            <th>이메일</th>
            <td>
              <input type="email" placeholder="이메일을 입력하세요" />
            </td>
          </tr> */}
          <tr>
            <th>비고</th>
            <td>
              <input type="checkbox" />
              개인정보 수집 동의
              <button onClick={onClickHide}>내용보기</button>
              {value === false && (
                <div>
                  1. 개인정보의 수집 및 이용 목적(개인정보보호법 제15조) OOO는
                  관계법령 등에서 정하는 소관 업무의 수행을 위하여 다음과 같이
                  개인정보를 수집 및 이용합니다. <br />
                  수집된 개인정보는 정해진 목적 이외의 용도로는 이용되지 않으며
                  수집 목적이 변경될 경우 사전에 알리고 동의를 받을 예정입니다.{" "}
                  <br />※ 관계법령 등 : 민원사무 처리에 관한 법률 및 동법
                  시행령, 행정안전부의 설치와 운영에 관한 법률, 전자정부법 및
                  동법 시행령 등 <br />
                  가. 민원사무 접수·처리·사후관리 서비스 제공민원신청서에 포함된
                  개인정보는 민원의 접수·처리 등 소관 업무 수행을 위해
                  행정·공공기관에서 이용합니다. <br />
                  나. 타 행정·공공기관 시스템 이용민원사무의 전자적 처리를 위해
                  내부적으로 타 시스템 연계 및 이용 시 개인정보를 이용합니다.{" "}
                  <br />
                  다. OOO 정책지원 OOO 서비스 향상 및 정책평가를 위하여 접수된
                  민원은 관계 법령에 따라 분석·평가 및 처리결과의 사후관리를
                  시행합니다. <br />
                  2. 수집하는 개인정보의 항목(개인정보보호법 제15조, 제16조){" "}
                  <br />
                  가. 필수항목: 휴대전화 <br />
                  나. 선택항목: 성명, 기업명, 이메일 <br />
                  다. 자동수집항목: IP(Internet Protocol)주소, 이용내용의 기록-
                  부정한 방법으로 타인명의를 사용하는 경우에 대비하기 위해
                  정보이용내역 등을 자동수집 합니다. <br />※ 부정한 방법으로
                  타인명의 사용 시, 주민등록법 제37조(벌칙)에 의해 처벌 받을 수
                  있습니다. <br />
                  3. 개인정보의 보유 및 이용기간(공공기록물 관리에 관한 법률
                  시행령 제26조) <br />
                  안전신문고는 원칙적으로 개인정보 보존기간이 경과하거나,
                  처리목적이 달성된 경우에는 지체 없이 개인정보를 파기합니다.
                  다만, 다른 법령에 따라 보존하여야 하는 경우에는 그러하지 않을
                  수 있습니다. <br />
                  1) 신고, 제안: 10년 <br />
                  2) 회원정보: 회원탈퇴시 즉시 파기 <br />
                  3) 자동수집항목 중 IP주소: 1년 <br />
                  4. 동의를 거부할 권리가 있다는 사실 및 동의 거부에 따른 불이익
                  내용(개인정보보호법 제16조) <br />
                  민원 신청 시 수집하는 필요한 최소한의 정보 외의 개인정보
                  수집에 동의를 거부할 권리가 있으나 최소한의 개인정보 수집동의
                  거부 시에는 민원 신청 서비스가 제한됩니다.
                </div>
              )}
            </td>
          </tr>
          <input
            className="notifyPnum"
            ref={notifyPnumRef}
            type="button"
            value="신고하기"
            onClick={notifySubmit}
          />
        </table>
      </div>
    </div>
  );
};

export default ReportWriteComponent;
