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

let user = require("./user_module"); //회원 관련 정보만 처리
app.post("/login", (req, res) => {
  //로그인 신청했을때 여기서 처리.
  user.login(req, res, db);
});

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
