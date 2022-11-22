const express = require("express");
const mysql = require("mysql2"); //mysql 버전 8 이상인 경우에는 mysql을 사용하면 오류가 나기 때문에 mysql2를 사용
const bodyParser = require("body-parser"); //요청정보 처리를 위함
const cors = require("cors"); // 교차허용

const multer = require("multer");
const path = require("path");
const mime = require("mime-types");
const { v4: uuid } = require("uuid");

const app = express(); //서버생성
const PORT = process.env.port || 8000; //포트설정
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

let corsOptions = {
  origin: "*", //출저 허용 옵션
  credential: true, //사용자 인증이 필요한 리소스(쿠키...등) 접근
};

app.use(cors(corsOptions));

// 디비
const db = mysql.createPool({
  host: "project-db-stu.ddns.net",
  user: "jsa_5",
  password: "godsang",
  database: "jsa_5",
  port: 3307,
  multipleStatements: true, //여러 쿼리를 동시에 전송하기 위한 설정
});

const { spawn } = require("child_process"); //node.js 에서 다른 프로그램을 실행하거나 명령어를 수행하고싶을때 사용하는 모듈

// let user = require("./user_module"); //회원 관련 정보만 처리
// app.post("/login", (req, res) => {
//   //로그인 신청했을때 여기서 처리.
//   user.login(req, res, db);
// });

app.post("/dbtest", (req, res) => {
  //db 연결 테스트용
  user.getUser(req, res, db);
});

app.post("/pytest", (req, res) => {
  //파이썬 연결 테스트
  let dataToSend;
  const python = spawn("python", ["test.py"]);
  python.stdout.on("data", (data) => {
    dataToSend = data.toString();
    console.log(dataToSend);
  });
  python.on("close", (code) => {
    console.log(code);
    res.send(dataToSend);
  });
});

// ===============================================================================

app.listen(PORT, () => {
  console.log(`running on port ${PORT}`);
});

// ===============================================================================
// 221117 순아 추가  관리자 로그인
// ===============================================================================
let admin = require("./admin_module");
app.post("/home/adminlogin", (req, res) => {
  console.log("/home/adminlogin =>", req.body);
  var id = req.body.id;
  var pw = req.body.pw;

  const sqlQuery = "SELECT * FROM USER WHERE USER_ID=? AND USER_PW=?;";
  db.query(sqlQuery, [id, pw], (err, result) => {
    if (err) res.send("err:" + err);
    else res.send(result);
    // console.log("관리자 로그인 성공", result);
    // console.log(typeof result);
  });
});

// ===============================================================================
// 221118 순아 추가  사용자 로그인
// ===============================================================================
let user = require("./user_module");
app.post("/login", (req, res) => {
  console.log("/login =>", req.body);
  var id = req.body.id;
  var pw = req.body.pw;

  const sqlQuery = "SELECT * FROM USER WHERE USER_ID=? AND USER_PW=?;";
  db.query(sqlQuery, [id, pw], (err, result) => {
    if (err) res.send("err:" + err);
    else res.send(result);
    // console.log("사용자 로그인 성공", result);
    // console.log(typeof result);
  });
});

// ===============================================================================
// 221118 순아 추가  사용자 회원가입
// ===============================================================================
// 회원가입 요청
app.post("/join", (req, res) => {
  console.log("/join", req.body);
  var id = req.body.id;
  var pw = req.body.pw;
  var name = req.body.name;
  var mail = req.body.mail;
  var tel = req.body.tel;
  var ox = "O";

  // 회원가입 요청한 아이디가 기존에 회원으로 가입된적이 있는지 체크
  const sqlQuery1 = "SELECT COUNT(*) AS CNT FROM USER WHERE USER_ID=?;";
  db.query(sqlQuery1, id, (err, result) => {
    if (result[0].CNT === 0) {
      // 회원가입 요청
      const sqlQuery2 =
        "INSERT INTO USER(USER_ID, USER_PW, USER_NAME, USER_MAIL, USER_TEL, USER_OX) VALUES (?,?,?,?,?,?);";
      db.query(sqlQuery2, [id, pw, name, mail, tel, ox], (err, result) => {
        // console.log("회원가입 결과", result);
        res.send("회원가입 성공");
      });
    } else {
      // console.log("회원가입 실패", err);
      res.send("회원가입 실패");
    }
  });
});

// ===============================================================================
// 221121 순아 추가 신고 접수
// ===============================================================================
app.post("/report", (req, res) => {
  // console.log("신고 카테고리 확인", req.body.category);

  var category = req.body.category;
  var carNum = req.body.carNum;
  var notifySpot = req.body.notifySpot;
  var notifyDate = req.body.notifyDate;
  var notifyTxt = req.body.notifyTxt;
  var notifyPnum = 1;

  console.log("이미지 확인", req.body.img);
  var img = req.body.img;

  const sqlQuery1 =
    "INSERT INTO NOTIFY(CATEGORY_IDX, CAR_NUM, NOTIFY_DATE, NOTIFY_SPOT, NOTIFY_TXT, NOTIFY_PNUM) VALUES (?,?,?,?,?,?); \
     INSERT INTO IMG(NOTIFY_IDX, IMG_PATH) VALUES (LAST_INSERT_ID(), ?)";

  db.query(
    sqlQuery1,
    [category, carNum, notifyDate, notifySpot, notifyTxt, notifyPnum, img],
    (err, result) => {
      console.log("신고접수 에러", err);
      console.log("신고접수 결과", result);

      res.send("신고 접수 성공");
    }
  );
});

// ===============================================================================
// 221122 순아 추가
// ===============================================================================
// 라이브러리를 사용하기 위한 작업
const fs = require("fs");

try {
  fs.readdirSync("uploads");
} catch (error) {
  console.error("uploads 폴더가 없어 uploads 폴더를 생성합니다.");
  fs.mkdirSync("uploads");
}
