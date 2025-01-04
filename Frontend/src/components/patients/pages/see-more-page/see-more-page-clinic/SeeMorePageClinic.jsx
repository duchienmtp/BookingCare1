import React, { useState, useRef, useEffect } from "react";
import "./SeeMorePageClinic.scss";
import _ from "lodash";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { Link, useParams } from "react-router-dom";
import { path } from "../../../../../utils/constants.js";
import { useSelector, useDispatch } from "react-redux";
import { getAllDataBySlug } from "../../../../../services/admin/SiteServices.js";
import { selectClinics } from "../../../../../redux/slices/adminSlice.js";

library.add(fas);

function SeeMorePageClinic() {
  const dispatch = useDispatch();
  const clinics = useSelector(selectClinics);
  const [clinicList, setClinicList] = useState([]);
  const [popularCities, setPopularCities] = useState([
    "Hải Phòng",
    "Thành phố Hồ Chí Minh",
    "Hà Nội",
    "Đà Nẵng",
    "Bình Dương",
    "Đồng Nai",
  ]);
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ#";
  const wordsRef = useRef([]);
  const filterToolRef = useRef(null);
  const filterTitleRef = useRef(null);
  const searchToolRef = useRef(null);
  const filterBoxRef = useRef(null);
  const modalOverlayRef = useRef(null);
  const filterBoxModalRef = useRef(null);
  const popularCitiesRef = useRef([]);
  const clinicMenuItemRef = useRef([]);
  const noClinicWarningRef = useRef(false);

  useEffect(() => {
    dispatch(getAllDataBySlug("clinics"));
  }, []);

  useEffect(() => {
    let words = alphabet.split("").map((word) => {
      return {
        word,
        link: `#${word}`,
      };
    });

    wordsRef.current = words;

    // Group clinics by the first letter of their name
    const groupedClinics = clinics.reduce((acc, clinic) => {
      const firstLetterOfName = clinic.name[0].toUpperCase();
      if (!acc[firstLetterOfName]) {
        acc[firstLetterOfName] = [];
      }
      acc[firstLetterOfName].push({
        id: clinic.id,
        fullName: clinic.fullname,
        name: clinic.name,
        image: clinic.image,
        slug: clinic.slug,
      });
      return acc;
    }, {});

    // Map the alphabet to the grouped clinics
    const formattedClinicData = words.map((word) => {
      return {
        word: word.word,
        link: word.link,
        clinics: groupedClinics[word.word] || [],
      };
    });

    console.log("formattedClinicData", formattedClinicData);

    setClinicList(formattedClinicData);
  }, [clinics]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        if (filterBoxRef.current.classList.contains("active")) {
          filterBoxRef.current.classList.remove("active");
          modalOverlayRef.current.classList.add("active");
          filterBoxModalRef.current.classList.add("active");
        }
      } else {
        if (filterBoxModalRef.current.classList.contains("active")) {
          modalOverlayRef.current.classList.remove("active");
          filterBoxModalRef.current.classList.remove("active");
          filterBoxRef.current.classList.add("active");
        }
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSearchToolClick = (e) => {
    e.stopPropagation(); // Prevent the click event from bubbling up to the document
    if (searchToolRef.current && searchToolRef.current.contains(e.target)) {
      searchToolRef.current.classList.add("active");
    }
  };

  const handleFilterToolClick = (e) => {
    e.stopPropagation(); // Prevent the click event from bubbling up to the document
    if (filterToolRef.current && filterToolRef.current.contains(e.target)) {
      filterToolRef.current.classList.add("active");

      if (window.innerWidth >= 768) {
        filterBoxRef.current.classList.toggle("active");
      } else {
        modalOverlayRef.current.classList.add("active");
        filterBoxModalRef.current.classList.add("active");
      }

      // Toggle no-scroll class on body
      if (
        filterBoxRef.current.classList.contains("active") ||
        filterBoxModalRef.current.classList.contains("active")
      ) {
        document.body.classList.add("no-scroll");
      } else {
        document.body.classList.remove("no-scroll");
      }
    }
  };

  const handleCloseModal = () => {
    modalOverlayRef.current.classList.remove("active");
    filterBoxModalRef.current.classList.remove("active");
    document.body.classList.remove("no-scroll");
  };

  const handleClickOutside = (e) => {
    if (searchToolRef.current && !searchToolRef.current.contains(e.target)) {
      searchToolRef.current.classList.remove("active");
    }
    if (filterToolRef.current && !filterToolRef.current.contains(e.target)) {
      filterToolRef.current.classList.remove("active");
    }

    if (filterBoxRef.current && !filterBoxRef.current.contains(e.target)) {
      filterBoxRef.current.classList.remove("active");
    }

    if (
      filterBoxModalRef.current &&
      !filterBoxModalRef.current.contains(e.target)
    ) {
      modalOverlayRef.current.classList.remove("active");
      filterBoxModalRef.current.classList.remove("active");
    }
  };

  const handleClinicMenuItemClick = (ref) => {
    if (ref) {
      console.log("ref", ref);
      const aTag = ref.children[0];
      const href = aTag ? aTag.getAttribute("href") : null;

      const isHavingClinics =
        clinicList.find((clinic) => {
          return href === clinic.link;
        }).clinics.length > 0
          ? true
          : false;

      if (isHavingClinics) {
        if (noClinicWarningRef.current.style.display === "block") {
          noClinicWarningRef.current.style.display = "none";
        }

        clinicMenuItemRef.current.forEach((item) => {
          if (item.classList.contains("active")) {
            item.classList.remove("active");
          }
        });

        ref.classList.add("active");
      } else {
        noClinicWarningRef.current.style.display = "block";
      }
    }
  };

  const handleFilterMostChooseItemClick = (ref) => {
    ref.classList.toggle("active");
    const activeItemsInnerText = popularCitiesRef.current
      .filter((item) => {
        return item.classList.contains("active");
      })
      .map((item) => item.children[0].innerText)
      .join(", ");

    filterTitleRef.current.innerText =
      activeItemsInnerText.length > 0 ? activeItemsInnerText : "Tỉnh thành";
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="see-more-page-clinic">
      <div className="app-container md-px-10">
        <div className="page-header">
          <div className="page-title">
            <h3>Cơ sở y tế</h3>
          </div>
          <div className="page-tool-section">
            <div className="filter-tool-section">
              <div
                className="filter-tool"
                ref={filterToolRef}
                onClick={(e) => handleFilterToolClick(e)}
              >
                <div className="filter-title">
                  <h4 ref={filterTitleRef}>Tỉnh thành</h4>
                </div>
                <div className="img-container">
                  <FontAwesomeIcon icon="fa-solid fa-angle-down" />
                </div>
              </div>
              <div className="filter-box dropdown-mode" ref={filterBoxRef}>
                <div className="filter-choice-title">
                  <h3>Lựa chọn tỉnh thành</h3>
                </div>
                <div className="filter-box-container">
                  <div className="filter-box-search-box">
                    <div className="search-box">
                      <input type="text" placeholder="Tìm kiếm" />
                      <div className="img-container">
                        <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" />
                      </div>
                    </div>
                  </div>
                  <div className="filter-most-choose-list">
                    {popularCities &&
                      popularCities.length > 0 &&
                      popularCities.map((city, index) => {
                        return (
                          <div
                            className="filter-most-choose-item dropdown-mode"
                            key={index}
                            ref={(el) => (popularCitiesRef.current[index] = el)}
                            onClick={() =>
                              handleFilterMostChooseItemClick(
                                popularCitiesRef.current[index]
                              )
                            }
                          >
                            <span>{city}</span>
                          </div>
                        );
                      })}
                  </div>
                </div>
                <div className="filter-box-buttons">
                  <button className="btn btn-outline btn-reset">
                    <div className="img-container">
                      <FontAwesomeIcon icon="fa-solid fa-arrows-rotate" />
                    </div>
                    <span>Đặt lại</span>
                  </button>
                  <button className="btn btn-apply">
                    <span>Áp dụng</span>
                  </button>
                </div>
              </div>
            </div>
            <div className="search-tool-section">
              <div className="search-tool" ref={searchToolRef}>
                <input
                  type="text"
                  placeholder="Tim kiem"
                  onClick={(e) => handleSearchToolClick(e)}
                />
                <div className="img-container">
                  <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="clinic-menu-by-alphabet" id="navbar-example3">
          <div className="clinic-menu">
            {wordsRef.current &&
              wordsRef.current.length > 0 &&
              wordsRef.current.map((word, index) => {
                return (
                  <div
                    className="clinic-menu-item"
                    key={word.word}
                    ref={(el) => (clinicMenuItemRef.current[index] = el)}
                    onClick={() =>
                      handleClinicMenuItemClick(
                        clinicMenuItemRef.current[index]
                      )
                    }
                  >
                    <a href={word.link}>{word.word}</a>
                  </div>
                );
              })}
          </div>
        </div>
        <div
          className="no-clinic-warning"
          style={{
            color: "red",
            paddingLeft: "15px",
            margin: "10px 0",
            display: "none",
          }}
          ref={noClinicWarningRef}
        >
          Không tìm thấy cơ cở y tế
        </div>
        <div
          className="clinic-list"
          data-bs-spy="scroll"
          data-bs-target="#navbar-example3"
        >
          {clinicList &&
            clinicList.length > 0 &&
            clinicList.map(
              (clinic) =>
                clinic.clinics.length > 0 && (
                  <div
                    className="clinic-list-item"
                    key={`clinic-list-item-${clinic.word}`}
                  >
                    <div
                      className="clinic-list-item-header"
                      id={_.toArray(clinic.link)[1]}
                    >
                      <div className="item-header-title-container">
                        <span className="item-header-title">{clinic.word}</span>
                      </div>
                    </div>
                    <div className="clinic-list-item-body">
                      {clinic.clinics.map((cln) => (
                        <Link to={`/co-so-y-te/${cln.slug}`} key={cln.id}>
                          <div className="clinic-item">
                            <div className="img-container">
                              <img src={cln.image} alt={cln.fullName} />
                            </div>
                            <div className="clinic-fullname">
                              <span>{cln.fullName}</span>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )
            )}
        </div>
      </div>
      <div className="modal-overlay" ref={modalOverlayRef}>
        <div className="filter-box modal-mode" ref={filterBoxModalRef}>
          <div className="filter-choice-title">
            <h3>Lựa chọn tỉnh thành</h3>
            <div className="img-container" onClick={() => handleCloseModal()}>
              <FontAwesomeIcon icon="fa-solid fa-times" />
            </div>
          </div>
          <div className="filter-box-container">
            <div className="filter-box-search-box">
              <div className="search-box">
                <input type="text" placeholder="Tìm kiếm" />
                <div className="img-container">
                  <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" />
                </div>
              </div>
            </div>
            <div className="filter-most-choose-list">
              {popularCities &&
                popularCities.length > 0 &&
                popularCities.map((city, index) => {
                  return (
                    <div
                      className="filter-most-choose-item modal-mode"
                      key={index + popularCities.length}
                      ref={(el) =>
                        (popularCitiesRef.current[
                          index + popularCities.length
                        ] = el)
                      }
                      onClick={() =>
                        handleFilterMostChooseItemClick(
                          popularCitiesRef.current[index]
                        )
                      }
                    >
                      <span>{city}</span>
                    </div>
                  );
                })}
            </div>
          </div>
          <div className="filter-box-buttons">
            <button className="btn btn-outline btn-reset">
              <div className="img-container">
                <FontAwesomeIcon icon="fa-solid fa-arrows-rotate" />
              </div>
              <span>Đặt lại</span>
            </button>
            <button className="btn btn-apply">
              <span>Áp dụng</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SeeMorePageClinic;
