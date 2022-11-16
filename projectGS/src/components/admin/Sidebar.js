import React from "react";
import "../../css/sidebar.css";
import FaceIcon from "@mui/icons-material/Face";
import LaunchIcon from "@mui/icons-material/Launch";
import InventoryIcon from "@mui/icons-material/Inventory";
import ContactPageIcon from "@mui/icons-material/ContactPage";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import SettingsIcon from "@mui/icons-material/Settings";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard1</h3>
          <ul className="sidebarList">
            <li className="sidebarListItem">
              <FaceIcon />
              사용자 님
            </li>
            <li className="sidebarListItem">
              <LaunchIcon />
              사이트 바로가기
            </li>
          </ul>
          <h3 className="sidebarTitle">Dashboard2</h3>
          <ul className="sidebarList">
            <li className="sidebarListItem">
              <InventoryIcon />
              신고 내역
            </li>
            <li className="sidebarListItem">
              <ContactPageIcon />
              회원 관리
            </li>
            <li className="sidebarListItem">
              <ContentPasteIcon />
              게시판 관리
            </li>
            <li className="sidebarListItem">
              <SettingsIcon />
              환경 설정
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
