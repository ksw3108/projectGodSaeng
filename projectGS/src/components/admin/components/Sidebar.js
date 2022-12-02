import React from 'react';
// import '../../css/sidebar.css';
import FaceIcon from '@mui/icons-material/Face';
import LaunchIcon from '@mui/icons-material/Launch';
import InventoryIcon from '@mui/icons-material/Inventory';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
// import SettingsIcon from "@mui/icons-material/Settings";
import CampaignIcon from '@mui/icons-material/Campaign';
import HouseIcon from '@mui/icons-material/House';

import { Outlet } from 'react-router-dom';
import TopBar from '../not_using/TopBar';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRef } from 'react';

import "../../../css/admin/common.scss";

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <div id="SideBar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <ul className="sidebarList">
            <li className="sidebarListItem">
              <button onClick={() => {window.open('/');}}><LaunchIcon />사이트 바로가기</button>
            </li>
          </ul>

          <ul className="sidebarList">
            <li className="sidebarListItem">
              <button onClick={() => {navigate('/admin');}}><HouseIcon />메인페이지</button>
            </li>
            <li>
              <button onClick={() => {navigate('/admin/admininfo');}}><FaceIcon />내 정보 </button>
            </li>

            <li className="sidebarListItem">
              <button onClick={() => {navigate('/admin/boardmanage');}}><CampaignIcon />공지사항</button>
            </li>
          </ul>


          <ul className="sidebarList">
            <li className="sidebarListItem">
              <button onClick={() => {navigate('/admin/disposereport');}}><InventoryIcon />신고 처리</button>
            </li>
            <li className="sidebarListItem">
              <button onClick={() => {navigate('/admin/usermanage');}}><ContactPageIcon />회원 관리(미완)</button>
            </li>
            {/* <li className="sidebarListItem">
              <button
                onClick={() => {
                  navigate('/admin/boardmanage');
                }}
              >
                <ContentPasteIcon />
                게시판 관리
              </button>
            </li> */}
            {/* <li className="sidebarListItem">
                    <button>
                      <SettingsIcon />
                      환경 설정
                    </button>
                  </li> */}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
