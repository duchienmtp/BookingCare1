import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getAllDataBySlug } from "../../../../services/admin/SiteServices";
import { appMainDataSlug } from "../../../../utils/constants";
import DashboardPage from "../dashboard-page/DashboardPage";
import ListPage from "../list-page/ListPage";
import AddPage from "../add-page/AddPage";

function MainContent() {
  const dispatch = useDispatch();
  const { slug3 } = useParams();

  useEffect(() => {
    appMainDataSlug.forEach((slug) => {
      dispatch(getAllDataBySlug(slug));
    });
  }, [dispatch]);

  const renderPage = () => {
    switch (slug3) {
      case "dashboard":
        return <DashboardPage />;
      case "list":
        return <ListPage />;
      case "create":
        return <AddPage />;
      default:
        return null;
    }
  };

  return <div className="main-content-section">{renderPage()}</div>;
}

export default MainContent;
