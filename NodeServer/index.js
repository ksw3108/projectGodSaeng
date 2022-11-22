const express = require("express");
const mysql = require("mysql2"); //mysql 버전 8 이상인 경우에는 mysql을 사용하면 오류가 나기 때문에 mysql2를 사용
const bodyParser = require("body-parser"); //요청정보 처리를 위함
const cors = require("cors"); // 교차허용

const multer = require("multer");
const path = require("path");
const mime = require("mime-types");
const { v4: uuid } = require("uuid");

const fs = require("fs");
try {
  fs.readdirSync("uploads");
} catch (error) {
  console.error("upload 폴더가 없어 upload폴더를 생성합니다.");
  fs.mkdirSync("uploads");
}

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

//221117 선우 - 여기서부터 관리자 페이지 기능=======================================

let admin = require("./admin_module");
app.post("/notilist4admin", (req, res) => {
  //신고 리스트 가져오기
  admin.getNotifyList(req, res, db);
});
app.post("/updatenoti4admin", (req, res) => {
  //신고 리스트 가져오기
  admin.update_noti(req, res, db);
});
let folderstr = "";
const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      folderstr = "uploads/" + Date.now();
      try {
        fs.readdirSync(folderstr);
      } catch (error) {
        console.error("upload 폴더가 없어 upload폴더를 생성합니다.");
        fs.mkdirSync(folderstr);
      }
      done(null, folderstr);
    },
    filename(req, file, done) {
      const ext = path.extname(file.originalname); //확장자
      //파일명과 확장자, 날짜를 연결시켜서 저장
      //업로드하는 파일의 파일명의 중복을 피하기 위해 현재시간을 붙임
      done(null, path.basename(file.originalname, ext) + ext);
    },
  }),
  //파일 용량 제한(100gb?)
  limits: { fileSize: 100 * 1024 * 1024 * 1024 },
});

app.post("/uploadnoti", upload.single("notifile"), (req, res) => {
  //공지사항 올리기
  fileinfo = req.file ? `{"filename":"${req.file.originalname}","dir":"${folderstr + "/" + req.file.originalname}"}` : "";
  admin.upload_board(req, res, db, fileinfo);
});

app.post("/updatenoti", upload.single("notifile"), (req, res) => {
  //공지사항 수정하기
  fileinfo = req.file ? `{"filename":"${req.file.originalname}","dir":"${folderstr + "/" + req.file.originalname}"}` : "";
  admin.update_board(req, res, db, fileinfo);
});
app.post("/delete_board", (req, res) => {
  //공지사항 삭제하기
  admin.delete_board(req, res, db);
});
app.post("/board_list", (req, res) => {
  //공지사항 리스트
  admin.get_board_list(req, res, db);
});
app.post("/board_view", (req, res) => {
  //공지사항 내용 보기
  admin.get_board_data(req, res, db);
});
app.get("/download_file/uploads/:time/:filename", (req, res) => {
  //등록된 파일 다운로드
  file_dir = "./uploads/" + req.params.time + "/" + req.params.filename;
  res.download(file_dir, req.params.filename);
});

// ===============================================================================

//221117 선우 - 여기서부터 일반사용자 페이지 기능=======================================

let user = require("./user_module"); //회원 관련 정보만 처리
app.post("/login", (req, res) => {
  //로그인 신청했을때 여기서 처리.
  user.login(req, res, db);
});
// ===============================================================================

// ===============================================================================

app.listen(PORT, () => {
  console.log(`running on port ${PORT}`);
});
