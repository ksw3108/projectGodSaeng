import React from "react";
import "../../css/todoList.css";

export default function TodoList() {
  return (
    <div className="todoList">
      <div className="todoTitle">오늘 할 일</div>
      <div className="todoListItem">
        <div className="todoContainer">
          <span className="newList">신규</span>
          <span className="newCount">0</span>
        </div>
      </div>
      <div className="todoListItem">
        <div className="todoContainer">
          <span className="progressList">진행</span>
          <span className="progressCount">0</span>
        </div>
      </div>
      <div className="todoListItem">
        <div className="todoContainer">
          <span className="dropList">취하</span>
          <span className="dropCount">0</span>
        </div>
      </div>
      <div className="todoListItem">
        <div className="todoContainer">
          <span className="finishList">완료</span>
          <span className="finishCount">0</span>
        </div>
      </div>
    </div>
  );
}
