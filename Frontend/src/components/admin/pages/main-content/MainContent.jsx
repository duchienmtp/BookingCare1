import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import DashboardPage from "../dashboard-page/DashboardPage";
import ListPage from "../list-page/ListPage";
import AddPage from "../add-page/AddPage";

function MainContent() {
  const { slug3 } = useParams();

  const renderPage = () => {
    switch (slug3) {
      case "dashboard":
        return <DashboardPage />;
      case "list":
        return <ListPage />;
      case "add":
        return <AddPage />;
      default:
        return null;
    }
  };

  return <div className="main-content-section">{renderPage()}</div>;
}

export default MainContent;
