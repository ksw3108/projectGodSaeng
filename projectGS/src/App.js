/* 221115 선우 - 공용 및 메인페이지 레이아웃 관련 */
import GlobalStyles from "./components/common/GlobalStyles";
import NotFound from "./components/common/NotFound";
import Layout from "./components/layout/Layout";
import Main from "./components/Main";

/* 221115 선우 - 사용자용 페이지 관련 */
import Join from "./components/user/Join";
import MyPage from "./components/user/MyPage";
import Report from "./components/user/Report";
import IllegalAreaGuide from "./components/user/IllegalAreaGuide";
import Notice from "./components/user/Notice";
import Point from "./components/user/Point";

/* 221115 선우 - 관리자용 페이지 관련 */
import AdminMain from "./components/admin/AdminMain";
import AdminLogin from "./components/admin/AdminLogin";
import BoardManagement from "./components/admin/BoardManagement";
import DisposeReport from "./components/admin/DisposeReport";
import UserManagement from "./components/admin/UserManagement";

import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
function App() {
  return (
    <>
      <GlobalStyles />
      <Router>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Main />} />
            <Route path="/join" element={<Join />} /> {/* 회원가입 */}
            <Route path="/mypage" element={<MyPage />} /> {/* 마이페이지 */}
            <Route path="/report" element={<Report />} /> {/* 신고페이지 */}
            <Route path="/illegalareaguide" element={<IllegalAreaGuide />} /> {/* 불법주정차구역안내 */}
            <Route path="/notice" element={<Notice />} /> {/* 공지사항 */}
            <Route path="/point" element={<Point />} /> {/* 포인트 */}
            <Route path="/adminlogin" element={<AdminLogin />} /> {/* 관리자 - 로그인 */}
            <Route path="/adminmain" element={<AdminMain />} /> {/* 관리자 - 메인 */}
            <Route path="/boardmanage" element={<BoardManagement />} /> {/* 관리자 - 게시판 관리 */}
            <Route path="/disposereport" element={<DisposeReport />} /> {/* 관리자 - 신고 처리 */}
            <Route path="/usermanage" element={<UserManagement />} /> {/* 관리자 - 회원관리 */}
          </Route>
          <Route path="*" element={<NotFound />} /> {/* 404 페이지 */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
