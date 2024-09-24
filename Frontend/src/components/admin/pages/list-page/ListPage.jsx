import React, { useEffect, useState, useRef } from "react";
import "./ListPage.scss";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ExportIcon from "/src/assets/export.svg";
import AddIcon from "/src/assets/add.svg";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faPenToSquare,
  faTrashCan,
} from "@fortawesome/free-regular-svg-icons";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { getAllDataBySlug } from "../../../../services/admin/SiteServices.js";
import { createSelector } from "reselect";
import {
  selectMedicalServices,
  selectSpecialties,
  selectClinics,
} from "../../../../redux/slices/adminSlice";
import { objectSlugs } from "../../../../utils/constants/constants.js";

library.add(faPenToSquare, faTrashCan, faAngleLeft, faAngleRight);

function ListPage() {
  const dispatch = useDispatch();

  const [checkedItems, setCheckedItems] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [offset, setOffset] = useState(0);
  const totalPage = useRef(0);
  const refs = useRef({});

  const { slug1, slug2, slug3 } = useParams();
  const medicalServices = useSelector(selectMedicalServices);
  const specialties = useSelector(selectSpecialties);
  const clinics = useSelector(selectClinics);
  const isLoading = useSelector((state) => state.admin.isLoading);
  const isError = useSelector((state) => state.admin.isError);

  let data;
  switch (slug2 || slug1) {
    case "medical-services":
      data = medicalServices;
      break;
    case "specialties":
      data = specialties;
      break;
    case "clinics":
      data = clinics;
      break;
    default:
      data = [];
      break;
  }

  useEffect(() => {
    const formattedData = data.map((item) => {
      return {
        ...item,
        createdAt: formatDateFromDBTypeToStandardType(item.createdAt),
        updatedAt: formatDateFromDBTypeToStandardType(item.updatedAt),
      };
    });

    const initialCheckedItems = formattedData.reduce((acc, item) => {
      acc[item.id] = false; // Assuming each item has a unique 'id' field
      return acc;
    }, {});

    setCheckedItems(initialCheckedItems);
  }, [data]);

  const headersEnum = Object.freeze({
    id: "ID",
    name: "Tên đầy đủ",
    birthDate: "Ngày sinh",
    email: "Email",
    position: "Chức vụ",
    status: "Tình trạng",
    action: "Hành động",
    createdAt: "Ngày tạo",
    updatedAt: "Ngày cập nhật",
  });

  const formatDateFromDBTypeToStandardType = (dateString) => {
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };

    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", options).replace(",", "");
  };

  useEffect(() => {
    dispatch(getAllDataBySlug(slug2 || slug1));
  }, [slug1, slug2]);

  let headers = data.length > 0 ? Object.keys(data[0]) : [];
  headers = headers
    .filter((header) => headersEnum[header])
    .map((header) => headersEnum[header]);

  const reverseHeadersEnum = Object.fromEntries(
    Object.entries(headersEnum).map(([key, value]) => [value, key])
  );

  const handleCheckAllButton = (e) => {
    let isCheckedAll = e.target.checked;
    const updatedCheckedItems = Object.keys(checkedItems).reduce((acc, key) => {
      acc[key] = isCheckedAll;
      return acc;
    }, {});
    setCheckedItems(updatedCheckedItems);
  };

  const handleCheckboxChange = (id) => {
    setCheckedItems((prevCheckedItems) => ({
      ...prevCheckedItems,
      [id]: !prevCheckedItems[id],
    }));
  };

  const handleExportBtn = () => {
    const selectedItems = Object.keys(checkedItems).filter(
      (key) => checkedItems[key]
    );
    console.log("Selected items: ", selectedItems);
  };

  return (
    <div className="list-page">
      <div className="filter-section">
        <div className="filter-header">
          <span>Bộ lọc</span>
        </div>
        <div className="filter-body">
          <div className="filter-container">
            <select className="form-select" id="status-filter">
              <option defaultValue>Tất cả</option>
              <option value="1">Đang hoạt động</option>
              <option value="2">Đã nghỉ việc</option>
            </select>
          </div>
          <div className="filter-container">
            <select className="form-select">
              <option defaultValue>Open this select menu</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
          </div>
          <div className="filter-container">
            <select className="form-select">
              <option defaultValue>Open this select menu</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
          </div>
        </div>
      </div>
      <hr style={{ border: "1.5px solid rgba(46, 38, 61, 0.22)" }} />
      <div className="list-page-header">
        <div className="left">
          <div className="search-box-container">
            <input type="text" placeholder="Search" />
          </div>
        </div>
        <div className="right">
          <div className="button-container">
            <button className="btn export-btn" onClick={handleExportBtn}>
              <div className="img-container">
                <img src={ExportIcon} alt="export" />
              </div>
              Export
            </button>
          </div>
          <div className="button-container">
            <button className="btn add-btn">
              <div className="img-container">
                <img src={AddIcon} alt="Add doctor" />
              </div>
              Add Doctor
            </button>
          </div>
        </div>
      </div>
      <div className="table-section">
        <table>
          <thead>
            <tr>
              <th>
                <div className="table-header-check-all">
                  <input
                    type="checkbox"
                    id="check-all-button"
                    className="check-all-button"
                    onChange={handleCheckAllButton}
                    checked={Object.values(checkedItems).every(
                      (isChecked) => isChecked
                    )}
                  />
                </div>
              </th>
              {headers.map((header, index) => (
                <th key={index}>
                  <div>
                    <span>{header}</span>
                  </div>
                </th>
              ))}
              <th>
                <div className="table-header-action">
                  <span>Hành động</span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.length > 0 &&
              data.slice(offset, offset + rowsPerPage).map((item) => (
                <tr key={item.id}>
                  <td>
                    <div className="table-data-checkbox">
                      <input
                        type="checkbox"
                        checked={checkedItems[item.id] || false}
                        ref={(el) => (refs.current[item.id] = el)}
                        onChange={() => handleCheckboxChange(item.id)}
                      />
                    </div>
                  </td>
                  {headers.map((header, index) => {
                    const key = reverseHeadersEnum[header];
                    return (
                      <td key={index}>
                        <div>
                          <span>{item[key]}</span>
                        </div>
                      </td>
                    );
                  })}
                  <td>
                    <div className="table-data-action">
                      <div className="img-container view-detail-btn">
                        <FontAwesomeIcon icon={faEye} />
                      </div>
                      <div className="img-container edit-info-btn">
                        <FontAwesomeIcon icon={faPenToSquare} />
                      </div>
                      <div className="img-container delete-data-btn">
                        <FontAwesomeIcon icon={faTrashCan} />
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <div className="table-pagination-section">
          <div className="table-pagination">
            <div className="page-teller">
              <span>
                Page: {currentPage} of {totalPage.current}
              </span>
            </div>
            <div className="pagination">
              <div
                className={`img-container prev-arrow ${
                  currentPage == 1 ? "disabled" : "enabled"
                }`}
                onClick={() => {
                  if (currentPage > 1) {
                    setCurrentPage((prevCurrentPage) => prevCurrentPage - 1);
                    setOffset((prevOffset) => prevOffset - 10);
                  }
                }}
              >
                <FontAwesomeIcon icon={faAngleLeft} />
              </div>
              <div
                className={`img-container next-arrow ${
                  currentPage == totalPage.current ? "disabled" : "enabled"
                }`}
                onClick={() => {
                  if (currentPage < totalPage.current) {
                    setCurrentPage((prevCurrentPage) => prevCurrentPage + 1);
                    setOffset((prevOffset) => prevOffset + 10);
                  }
                }}
              >
                <FontAwesomeIcon icon={faAngleRight} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListPage;
