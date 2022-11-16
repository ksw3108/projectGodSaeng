import React from "react";
import "../../css/topBar.css";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";

export default function TopBar() {
  return (
    <div className="topBar">
      <div className="topBarWrapper">
        <div className="topLeft">
          <span className="logo">갓생살조</span>
        </div>
        <div className="topRight">
          <LoginIcon /> 로그인
          <LogoutIcon /> 로그아웃
        </div>
      </div>
    </div>
  );
}
