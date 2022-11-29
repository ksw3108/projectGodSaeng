/* 221115 선우 - 공용 및 메인페이지 레이아웃 관련 */
import GlobalStyles from './components/common/GlobalStyles';
import NotFound from './components/common/NotFound';
import Layout from './components/layout/Layout';
import Main from './components/Main';

/* 221115 선우 - 사용자용 페이지 관련 */
import Join from './components/user/Join';
import MyPage from './components/user/MyPage';
import Report from './components/user/Report';
import IllegalAreaGuide from './components/user/IllegalAreaGuide';
import Notice from './components/user/Notice';
import Point from './components/user/Point';

/* 221116 순아 사용자용 페이지 추가*/
import Login from './components/user/Login';

/* 221115 선우 - 관리자용 페이지 관련 */
//import AdminMain from './components/admin/AdminMain';
//import AdminLogin from './components/admin/AdminLogin';
import BoardManagement from './components/admin/BoardManagement';
import DisposeReport from './components/admin/DisposeReport';
import UserManagement from './components/admin/UserManagement';
import WriteNotify from './components/admin/WriteNotify';
import BoardView from './components/admin/BoardView';
import DisposeDetail from './components/admin/DisposeDetail';
import UserDetail from './components/admin/UserDetail';
import AdminLayout from './components/admin/components/AdminLayout';

/* 221116 순아 관리자용 페이지 추가*/
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
//import Sidebar from './components/admin/Sidebar';
import Home from './components/admin/Home';
import AdminInformation from './components/admin/AdminInformation';

function App() {
  return (
    <>
      <GlobalStyles />
      <Router>
        <Routes>
          {/* ===================== 여기가 사용자단 ===================================*/}
          <Route element={<Layout />}>
            <Route index element={<Main />} />
            <Route path="/join" element={<Join />} /> {/* 회원가입 */}
            <Route path="/mypage" element={<MyPage />} /> {/* 마이페이지 */}
            <Route path="/report" element={<Report />} /> {/* 신고페이지 */}
            <Route path="/illegalareaguide" element={<IllegalAreaGuide />} />
            {/* 불법주정차구역안내 */}
            <Route path="/notice" element={<Notice />} /> {/* 공지사항 */}
            <Route path="/point" element={<Point />} /> {/* 포인트 */}
            {/* 20221118 순아 추가 ================================== */}
            <Route path="/login" element={<Login />} /> {/* 회원가입 */}
          </Route>
          {/* ===================== 여기가 관리자단 ===================================*/}
          {/* <Route path="/home" element={<Sidebar />}> */}
          {/* 221122 선우 - 임시로 사용중인 레이아웃, 디자인 진입시 수정해소 상관없음 */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Home />} />
            {/* <Route path="/home/adminmain" element={<AdminMain />} /> */}
            {/* 관리자 - 메인 */}
            {/* <Route path="/home/adminlogin" element={<AdminLogin />} /> */}
            {/* 관리자 - 로그인 */}
            <Route path="/admin/admininfo" element={<AdminInformation />} />
            {/* 관리자 - 내정보 */}
            <Route path="/admin/boardmanage" element={<BoardManagement />} />
            {/* 관리자 - 게시판 관리 */}
            <Route path="/admin/disposereport" element={<DisposeReport />} />
            {/* 관리자 - 신고 처리 */}
            <Route path="/admin/disposedetail" element={<DisposeDetail />} />
            {/* 관리자 - 신고 처리 상세 */}
            <Route path="/admin/usermanage" element={<UserManagement />} />
            {/* 관리자 - 회원관리 */}
            <Route path="/admin/userdetail" element={<UserDetail />} />
            {/* 관리자 - 회원 정보 상세 */}
            <Route path="/admin/writenoti" element={<WriteNotify />} />
            {/* 관리자 - 게시판 작성 */}
            <Route path="/admin/boardview" element={<BoardView />} />
            {/* 관리자 - 게시판 내용 보기 */}
          </Route>
          <Route path="*" element={<NotFound />} /> {/* 404 페이지 */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
