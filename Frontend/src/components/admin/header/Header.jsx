import React, { useState, useEffect } from "react";
import "./Header.scss";
import menuLogo from "../../../assets/menu.svg";
import searchLogo from "../../../assets/search.svg";
import translationLogo from "../../../assets/translation.svg";
import themeLogo from "../../../assets/theme.svg";
import userAvatar from "../../../assets/avatar.png";

function Header(props) {
  const { isUnderPC, adminSidebarRef } = props;

  const handleShowHideSideBar = () => {
    adminSidebarRef.current.classList.toggle("maximized");
  };

  return (
    <header className="page-header">
      <div className="page-header-container d-flex">
        <div className="d-flex justify-content-between flex-grow-1">
          <div className="search-section d-flex">
            {isUnderPC && (
              <div
                className="menu-button d-flex align-items-center"
                onClick={handleShowHideSideBar}
              >
                <div className="img-container">
                  <img src={menuLogo} alt="menu" />
                </div>
              </div>
            )}

            <div className="tool-button">
              <div className="img-container">
                <img src={searchLogo} alt="search" />
              </div>
            </div>
            <div className="search-bar">
              <input type="text" placeholder="Search" />
            </div>
          </div>
          <div className="tool-section d-flex">
            <div className="tool-button">
              <div className="img-container">
                <img src={translationLogo} alt="translation" />
              </div>
            </div>
            <div className="tool-button">
              <div className="img-container">
                <img src={themeLogo} alt="theme" />
              </div>
            </div>
            <div className="user-avatar">
              <div className="img-container">
                <img src={userAvatar} alt="avatar" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
