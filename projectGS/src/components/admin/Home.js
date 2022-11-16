import React from "react";
import "../../css/home.css";
import TodoList from "./TodoList";
import ChartWidgets from "./ChartWidgets";
import SummaryWidgets from "./SummaryWidgets";
import NotifyListWidgets from "./NotifyListWidgets";
import NoticeWidgets from "./NoticeWidgets";

export default function Home() {
  return (
    <div className="home">
      <TodoList />
      <div className="homeWidgets">
        <ChartWidgets />
        <SummaryWidgets />
      </div>
      <div className="homeWidgets">
        <NotifyListWidgets />
        <NoticeWidgets />
      </div>
    </div>
  );
}
