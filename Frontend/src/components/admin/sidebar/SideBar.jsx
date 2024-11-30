import React, { useState, useRef, useEffect } from "react";
import "./SideBar.scss";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useParams } from "react-router-dom";
import { adminPath } from "../../../utils/constants.js";
import { faCircleDot, faCircle } from "@fortawesome/free-regular-svg-icons";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import HomeLogo from "/src/assets/home.svg";
import CartLogo from "/src/assets/cart.svg";
import UserLogo from "/src/assets/user.svg";
import CloseLogo from "/src/assets/close.svg";
import { getAllCategories } from "../../../services/admin/SiteServices.js";

library.add(faCircleDot, faCircle, faAngleDown);

function SideBar(props) {
  const [sideBarMenu, setSideBarMenu] = useState([]);
  const refs = useRef({});

  const scrollBoxRef = useRef(null);
  const { slug1, slug2, slug3 } = useParams();

  let {
    isMinimized,
    setIsMinimized,
    isUnderPC,
    adminSideBarSectionRef,
    adminSidebarRef,
    handleResizeSideBar,
  } = props;

  const handleMinimizeButton = () => {
    setIsMinimized(!isMinimized);
  };

  useEffect(() => {
    if (isUnderPC) {
      adminSidebarRef.current?.classList.remove("maximized");
      adminSideBarSectionRef.current?.classList.remove("minimized");
    } else {
      adminSideBarSectionRef.current?.classList.toggle(
        "minimized",
        isMinimized
      );
    }
  }, [isUnderPC, adminSidebarRef, adminSideBarSectionRef]);

  const handleCloseMenuButton = () => {
    adminSidebarRef.current.classList.remove("maximized");
  };

  useEffect(() => {
    let adminSideBarSection = adminSideBarSectionRef.current;
    if (!adminSideBarSection.classList.contains("minimized") && !isMinimized) {
      return;
    }

    if (isMinimized) {
      adminSideBarSection.classList.add("minimizing");
      adminSideBarSection.addEventListener(
        "transitionend",
        () => {
          adminSideBarSection.classList.remove("minimizing");
          adminSideBarSection.classList.add("minimized");
        },
        { once: true }
      );
    } else {
      adminSideBarSection.classList.remove("minimized");
      adminSideBarSection.classList.remove("minimizing");
    }

    handleResizeSideBar(adminSideBarSectionRef);

    // Cleanup the event listener on component unmount
    return () => {
      adminSideBarSection.removeEventListener("transitionend", () => {
        adminSideBarSection.classList.remove("minimizing");
        adminSideBarSection.classList.add("minimized");
      });
    };
  }, [isMinimized]);

  const handleOpenSubMenuDropdown = (id) => {
    const submenu = refs.current[id].querySelector(".side-bar-submenu-content");
    if (submenu.style.height === "0px" || submenu.style.height === "") {
      submenu.style.height = `${submenu.scrollHeight}px`;
      submenu.classList.add("transitioning");
      submenu.addEventListener(
        "transitionend",
        () => {
          submenu.classList.remove("transitioning");
          submenu.style.height = "auto";
        },
        { once: true }
      );
    } else {
      submenu.style.height = `${submenu.scrollHeight}px`; // Set to current height to trigger transition
      submenu.offsetHeight; // Force reflow
      submenu.style.height = "0px";
      submenu.classList.add("transitioning");
      submenu.addEventListener(
        "transitionend",
        () => {
          submenu.classList.remove("transitioning");
        },
        { once: true }
      );
    }
    refs.current[id].classList.toggle("open");
  };

  const handleOpenSubMenuSubMenuDropdown = (id) => {
    const submenu = refs.current[id].querySelector(
      ".subMenu-of-subMenu-content"
    );

    if (submenu.style.height === "0px" || submenu.style.height === "") {
      submenu.style.height = `${submenu.scrollHeight}px`;
      submenu.classList.add("transitioning");
      submenu.addEventListener(
        "transitionend",
        () => {
          submenu.classList.remove("transitioning");
          submenu.style.height = "auto";
        },
        { once: true }
      );
    } else {
      submenu.style.height = `${submenu.scrollHeight}px`; // Set to current height to trigger transition
      submenu.offsetHeight; // Force reflow
      submenu.style.height = "0px";
      submenu.classList.add("transitioning");
      submenu.addEventListener(
        "transitionend",
        () => {
          submenu.classList.remove("transitioning");
        },
        { once: true }
      );
    }
    refs.current[id].classList.toggle("open");
  };

  useEffect(() => {
    const handleScroll = () => {
      if (scrollBoxRef.current) {
        if (scrollBoxRef.current.scrollTop > 0) {
          document.querySelector(".side-bar-scroll-blur").style.opacity = 1;
        } else {
          document.querySelector(".side-bar-scroll-blur").style.opacity = 0;
        }
      }
    };

    const sideBarContent = scrollBoxRef.current;
    if (sideBarContent) {
      sideBarContent.addEventListener("scroll", handleScroll);
    }

    // Cleanup the event listener on component unmount
    return () => {
      if (sideBarContent) {
        sideBarContent.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await getAllCategories();
        if (res && res.data) {
          const categories = res.data;

          const newSideBarMenu = [];

          // Helper function to find the parent category
          const findParent = (menu, ownerId) => {
            let parent = null;
            for (const item of menu) {
              if (item.id === ownerId) {
                parent = item;
                break;
              }
              const foundSubItem = item.subMenu.find(
                (subItem) => subItem.id === ownerId
              );

              if (foundSubItem) {
                parent = foundSubItem;
                break;
              }
            }
            return parent;
          };
          categories.forEach((category) => {
            if (category.level === "root") {
              // Add root level categories
              newSideBarMenu.push({
                id: category.id,
                label: category.name,
                icon: category.icon || HomeLogo, // Use a default icon if none is provided
                slug: category.slug,
                subMenu: [], // Initialize subMenu as an empty array
              });
            } else if (
              category.level === "sub-menu-1" ||
              category.level === "bottom"
            ) {
              // Find the parent category
              const parent = findParent(newSideBarMenu, category.ownerId);
              if (parent) {
                parent.subMenu.push({
                  id: category.id,
                  label: category.name,
                  slug: category.slug,
                  subMenu: category.level === "sub-menu-1" ? [] : undefined, // Initialize subMenu for sub-menu-1 level
                });
              }
            }
          });

          setSideBarMenu(newSideBarMenu);
        }
      } catch (error) {
        console.error("Error fetching categories: ", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <>
      <aside className="admin-sidebar-section" ref={adminSideBarSectionRef}>
        <div className="admin-sidebar" ref={adminSidebarRef}>
          <div className="d-flex justify-content-between side-bar-header">
            <Link to={adminPath.ADMIN}>
              <div className="d-flex align-items-center side-bar-header-container">
                <svg
                  width="1.2658em"
                  height="1em"
                  viewBox="0 0 100 79"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-[22px] text-primary"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M4.92008 0.501904L22.662 11.4573C23.614 12.0451 24.1936 13.0844 24.1936 14.2036V64.2521C24.1936 65.3871 23.5976 66.4387 22.6241 67.0214L4.8822 77.6429C3.35344 78.5581 1.37254 78.0602 0.457741 76.5307C0.158194 76.0299 0 75.4572 0 74.8736V3.24818C0 1.46582 1.44424 0.0209274 3.22581 0.0209274C3.82422 0.0209274 4.41085 0.18746 4.92008 0.501904Z"
                    fill="currentColor"
                  />
                  <path
                    opacity={0.077704}
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M0 26.1063L24.1936 39.9852V53.5915L0 26.1063Z"
                    fill="black"
                  />
                  <path
                    opacity={0.077704}
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M0 26.1063L24.1936 39.6319V47.9438L0 26.1063Z"
                    fill="black"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M95.084 0.489601L77.3421 11.4083C76.3878 11.9956 75.8064 13.0362 75.8064 14.1571V64.2526C75.8064 65.3875 76.4024 66.4391 77.3759 67.0219L95.1178 77.6433C96.6466 78.5585 98.6275 78.0606 99.5423 76.5312C99.8418 76.0303 100 75.4576 100 74.874V3.23842C100 1.45605 98.5558 0.0111618 96.7742 0.0111618C96.1774 0.0111618 95.5923 0.176782 95.084 0.489601Z"
                    fill="currentColor"
                  />
                  <path
                    opacity={0.077704}
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M100 26.1063L75.8064 39.956V54.0023L100 26.1063Z"
                    fill="black"
                  />
                  <path
                    opacity={0.077704}
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M100 26.1063L75.8064 39.6199V48.3546L100 26.1063Z"
                    fill="black"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M4.91149 0.475694L50 28.123V54.7479L0 26.0986V3.22726C0 1.44489 1.44424 0 3.22581 0C3.8208 0 4.4042 0.164633 4.91149 0.475694Z"
                    fill="currentColor"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M4.91149 0.475694L50 28.123V54.7479L0 26.0986V3.22726C0 1.44489 1.44424 0 3.22581 0C3.8208 0 4.4042 0.164633 4.91149 0.475694Z"
                    fill="white"
                    fillOpacity={0.15}
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M95.0885 0.475694L50 28.123V54.7479L100 26.0986V3.22726C100 1.44489 98.5558 0 96.7742 0C96.1792 0 95.5958 0.164633 95.0885 0.475694Z"
                    fill="currentColor"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M95.0885 0.475694L50 28.123V54.7479L100 26.0986V3.22726C100 1.44489 98.5558 0 96.7742 0C96.1792 0 95.5958 0.164633 95.0885 0.475694Z"
                    fill="white"
                    fillOpacity={0.3}
                  />
                </svg>
                <span>Materio</span>
              </div>
            </Link>
            {isUnderPC ? (
              <div className="img-container " onClick={handleCloseMenuButton}>
                <img src={CloseLogo} alt="close" />
              </div>
            ) : (
              <div className="img-container " onClick={handleMinimizeButton}>
                <FontAwesomeIcon icon={isMinimized ? faCircle : faCircleDot} />
              </div>
            )}
          </div>
          <div className="side-bar-scroll-blur"></div>
          <div className="side-bar-content scroll-box" ref={scrollBoxRef}>
            <nav className="side-bar-menu scroll-box-inner">
              <ul>
                {sideBarMenu &&
                  sideBarMenu.length > 0 &&
                  sideBarMenu.map((item) => {
                    return (
                      <li
                        className="side-bar-submenu-root"
                        ref={(el) => (refs.current[item.id] = el)}
                        key={item.id}
                      >
                        {item && item.subMenu && item.subMenu.length > 0 ? (
                          <div
                            className="d-flex justify-content-between side-bar-submenu-root-content"
                            onClick={() => handleOpenSubMenuDropdown(item.id)}
                          >
                            <div className="d-flex align-items-center dropdown-header">
                              <div className="img-container">
                                <img src={item.icon} alt="Home" />
                              </div>
                              <span className="menu-item-label">
                                {item.label}
                              </span>
                            </div>
                            <div className="dropdown-arrow ">
                              <div className="img-container d-flex justify-content-center align-items-center">
                                <FontAwesomeIcon icon={faAngleDown} />
                              </div>
                            </div>
                          </div>
                        ) : (
                          <Link
                            className="d-flex justify-content-between side-bar-submenu-root-content"
                            onClick={() => handleOpenSubMenuDropdown(item.id)}
                            to={item.slug}
                          >
                            <div className="d-flex align-items-center dropdown-header">
                              <div className="img-container">
                                <img src={item.icon} alt="Home" />
                              </div>
                              <span className="menu-item-label">
                                {item.label}
                              </span>
                            </div>
                            <div className="dropdown-arrow ">
                              <div className="img-container d-flex justify-content-center align-items-center">
                                <FontAwesomeIcon icon={faAngleDown} />
                              </div>
                            </div>
                          </Link>
                        )}

                        {item.subMenu && item.subMenu.length > 0 && (
                          <div className="side-bar-submenu-content">
                            <ul>
                              {item.subMenu &&
                                item.subMenu.length > 0 &&
                                item.subMenu.map((subMenuItem) => {
                                  return (
                                    <li
                                      className={`side-bar-menu-item ${
                                        item.slug === slug1 &&
                                        subMenuItem.slug === slug3
                                          ? "active"
                                          : ""
                                      }`}
                                      ref={(el) =>
                                        (refs.current[subMenuItem.id] = el)
                                      }
                                      key={subMenuItem.id}
                                    >
                                      {subMenuItem &&
                                      subMenuItem.subMenu &&
                                      subMenuItem.subMenu.length > 0 ? (
                                        <div
                                          className="d-flex justify-content-between subMenu-of-subMenu-root-content"
                                          onClick={() =>
                                            handleOpenSubMenuSubMenuDropdown(
                                              subMenuItem.id
                                            )
                                          }
                                          to={`${item.slug}/${subMenuItem.slug}`}
                                        >
                                          <div className="d-flex dropdown-header">
                                            <div className="img-container">
                                              <FontAwesomeIcon
                                                icon={faCircle}
                                              />
                                            </div>
                                            <span className="menu-item-label">
                                              {subMenuItem.label}
                                            </span>
                                          </div>
                                          {subMenuItem.subMenu &&
                                            subMenuItem.subMenu.length > 0 && (
                                              <div className="dropdown-arrow">
                                                <div className="img-container d-flex justify-content-center align-items-center">
                                                  <FontAwesomeIcon
                                                    icon={faAngleDown}
                                                  />
                                                </div>
                                              </div>
                                            )}
                                        </div>
                                      ) : (
                                        <Link
                                          className="d-flex justify-content-between subMenu-of-subMenu-root-content"
                                          to={`${item.slug}/${subMenuItem.slug}`}
                                        >
                                          <div className="d-flex dropdown-header">
                                            <div className="img-container">
                                              <FontAwesomeIcon
                                                icon={faCircle}
                                              />
                                            </div>
                                            <span className="menu-item-label">
                                              {subMenuItem.label}
                                            </span>
                                          </div>
                                          {subMenuItem.subMenu &&
                                            subMenuItem.subMenu.length > 0 && (
                                              <div className="dropdown-arrow">
                                                <div className="img-container d-flex justify-content-center align-items-center">
                                                  <FontAwesomeIcon
                                                    icon={faAngleDown}
                                                  />
                                                </div>
                                              </div>
                                            )}
                                        </Link>
                                      )}

                                      {subMenuItem &&
                                        subMenuItem.subMenu &&
                                        subMenuItem.subMenu.length > 0 && (
                                          <div className="subMenu-of-subMenu-content">
                                            <ul>
                                              {subMenuItem.subMenu.map(
                                                (subSubMenuItem) => {
                                                  return (
                                                    <li
                                                      className={`subMenu-of-subMenu-item-container ${
                                                        item.slug === slug1 &&
                                                        subMenuItem.slug ===
                                                          slug2 &&
                                                        subSubMenuItem.slug ===
                                                          slug3
                                                          ? "active"
                                                          : ""
                                                      }`}
                                                      key={subSubMenuItem.id}
                                                    >
                                                      <Link
                                                        className="d-flex subMenu-of-subMenu-item"
                                                        to={`${item.slug}/${subMenuItem.slug}/${subSubMenuItem.slug}`}
                                                      >
                                                        <div className="d-flex dropdown-header">
                                                          <div className="img-container">
                                                            <FontAwesomeIcon
                                                              icon={faCircle}
                                                            />
                                                          </div>
                                                          <span className="menu-item-label">
                                                            {
                                                              subSubMenuItem.label
                                                            }
                                                          </span>
                                                        </div>
                                                      </Link>
                                                    </li>
                                                  );
                                                }
                                              )}
                                            </ul>
                                          </div>
                                        )}
                                    </li>
                                  );
                                })}
                            </ul>
                          </div>
                        )}
                      </li>
                    );
                  })}
              </ul>
            </nav>
          </div>
        </div>
        <div className="sidebar-overlay" onClick={handleCloseMenuButton}></div>
      </aside>
    </>
  );
}

export default SideBar;
