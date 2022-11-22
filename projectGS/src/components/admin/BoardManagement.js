import React from "react";
import "../../css/BoardManagement.css";

import { DataGrid } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const columns = [
  { field: "id", headerName: "No", width: 70 },
  { field: "heading", headerName: "제목", width: 500 },
  { field: "writer", headerName: "작성자", width: 130 },
  { field: "date", headerName: "작성일", width: 130 },
  {
    field: "action",
    headerName: "기능",
    width: 150,
    renderCell: () => {
      return (
        <>
          <EditIcon className="boardEdit" />
          <button className="boardEdit">수정</button>
          <DeleteIcon className="boardDelete" />
          <button className="boardDelete">삭제</button>
        </>
      );
    },
  },
];

const rows = [
  {
    id: 1,
    heading: "전동 킥보드 안전 수칙",
    writer: "관리자",
    date: "2022.05.12",
  },
  {
    id: 2,
    heading: "주정차 단속 근거 법률",
    writer: "관리자",
    date: "2022.05.01",
  },
  {
    id: 3,
    heading: "단속시간 및 탄력적 주차허용 공간",
    writer: "관리자",
    date: "2022.04.27",
  },
];

const BoardManagement = () => {
  return (
    <div className="boardManagement">
      <h1>게시판 관리</h1>
      <DataGrid
        rows={rows}
        disableSelectionOnClick
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
  );
};
export default BoardManagement;
