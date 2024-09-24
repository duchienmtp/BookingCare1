import React, { useState, useEffect, useRef } from "react";
import "./AdminHomePage.scss";
import { Outlet } from "react-router-dom";
import { auto } from "@cloudinary/url-gen/actions/resize";
import { autoGravity } from "@cloudinary/url-gen/qualifiers/gravity";
import { AdvancedImage } from "@cloudinary/react";
import SideBar from "../../sidebar/SideBar";
import Header from "../../header/Header";

function AdminHomePage(props) {
  let cld = props.cloudInstance;

  const adminAppContentRef = useRef(null);
  const adminSideBarSectionRef = useRef(null);
  const adminSidebarRef = useRef(null);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isUnderPC, setIsUnderPC] = useState(getWidth());

  useEffect(() => {
    const handleResize = () => setIsUnderPC(getWidth());

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function getWidth() {
    return window.innerWidth < 1200;
  }

  function handleResizeSideBar(adminSideBarSectionRef) {
    if (
      adminSideBarSectionRef.current.classList.contains("minimized") ||
      adminSideBarSectionRef.current.classList.contains("minimizing")
    ) {
      adminAppContentRef.current.style.width = "calc(100% - 68px)";
      adminAppContentRef.current.style.left = "0";
    } else {
      adminAppContentRef.current.style.width = "calc(100% - 260px)";
      // adminAppContentRef.current.style.left = "260px";
    }
  }

  useEffect(() => {
    if (isUnderPC) {
      adminAppContentRef.current.style.width = "100%";
      adminSideBarSectionRef.current.style.width = "0px";
    } else {
      isMinimized
        ? (adminAppContentRef.current.style.width = "100%")
        : (adminAppContentRef.current.style.width = "calc(100% - 260px)");
      isMinimized
        ? (adminSideBarSectionRef.current.style.width = "68px")
        : (adminSideBarSectionRef.current.style.width = "260px");
    }
  }, [isUnderPC, isMinimized]);

  return (
    <div className="admin-home-page d-flex">
      <SideBar
        isMinimized={isMinimized}
        setIsMinimized={setIsMinimized}
        isUnderPC={isUnderPC}
        adminSideBarSectionRef={adminSideBarSectionRef}
        adminSidebarRef={adminSidebarRef}
        handleResizeSideBar={handleResizeSideBar}
      />
      <main className="admin-app-content" ref={adminAppContentRef}>
        <Header isUnderPC={isUnderPC} adminSidebarRef={adminSidebarRef} />
        <Outlet />
      </main>
    </div>
  );
}

export default AdminHomePage;
