import './main.scss';
import Header from './Header';
import Footer from './Footer';
import FaceIcon from '@mui/icons-material/Face';
import LaunchIcon from '@mui/icons-material/Launch';
import InventoryIcon from '@mui/icons-material/Inventory';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import CampaignIcon from '@mui/icons-material/Campaign';
import HouseIcon from '@mui/icons-material/House';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import { Outlet, Link, useNavigate } from 'react-router-dom';
const Layout = () => {
  const navigate = useNavigate();
  const logout = () => {
    window.sessionStorage.clear();
    console.log('세션초기화');

    window.location.href = '/home';
  };

  return (
    <div>
      <header className="menu">
        <div>
          {window.sessionStorage.getItem('USER_ID') !== null ? (
            <>
              <button
                onClick={() => {
                  navigate('/home/admininfo');
                }}
              >
                <FaceIcon />내 정보
              </button>
              <button onClick={logout}>
                <LogoutIcon />
                로그아웃
              </button>
            </>
          ) : (
            ''
          )}
        </div>
        <ul className="sidebarList">
          <li className="sidebarListItem">
            <button
              onClick={() => {
                window.open('/');
              }}
            >
              <LaunchIcon />
              사이트 바로가기
            </button>
          </li>
          <li className="sidebarListItem">
            <button
              onClick={() => {
                navigate('/home');
              }}
            >
              <HouseIcon />
              메인페이지
            </button>
          </li>
          {/* <li className="sidebarListItem">
            <button
              onClick={() => {
                navigate('/home/admininfo');
              }}
            >
              <FaceIcon />내 정보(미완)
            </button>
          </li> */}

          <li className="sidebarListItem">
            <button
              onClick={() => {
                navigate('/home/boardmanage');
              }}
            >
              <CampaignIcon />
              공지사항
            </button>
          </li>
        </ul>
        <h3 className="sidebarTitle"></h3>
        <ul className="sidebarList">
          <li className="sidebarListItem">
            <button
              onClick={() => {
                navigate('/home/disposereport');
              }}
            >
              <InventoryIcon />
              신고 처리
            </button>
          </li>
          <li className="sidebarListItem">
            <button
              onClick={() => {
                navigate('/home/usermanage');
              }}
            >
              <ContactPageIcon />
              회원 관리(미완)
            </button>
          </li>
          <li className="sidebarListItem">
            <button
              onClick={() => {
                navigate('/home/boardmanage');
              }}
            >
              <ContentPasteIcon />
              게시판 관리
            </button>
          </li>
          {/* <li className="sidebarListItem">
                  <button>
                    <SettingsIcon />
                    환경 설정
                  </button>
                </li> */}
        </ul>
      </header>
      <main className="main">
        <Outlet />
      </main>
    </div>
  );
};
export default Layout;
