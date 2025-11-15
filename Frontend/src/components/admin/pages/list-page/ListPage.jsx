import React, { useEffect, useState, useRef } from "react";
import "./ListPage.scss";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import helperFunction from "../../../../utils/helperFunction.js";
import ExportIcon from "/src/assets/export.svg";
import AddIcon from "/src/assets/add.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getAllDataBySlug } from "../../../../services/admin/SiteServices.js";
import {
  selectMedicalServices,
  selectSpecialties,
  selectClinics,
  selectSpecificMedicalServices,
  selectBlogs,
  selectPackages,
  selectOrders,
  selectPatients,
  selectDoctors,
} from "../../../../redux/slices/adminSlice";
import { tableConfigs } from "../../../../utils/tableConfig.jsx";
import BaseTable from "../../base-table/BaseTable.jsx";

function ListPage() {
  const [data, setData] = useState([]);
  const [checkedItems, setCheckedItems] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = useRef(10);
  const [offset, setOffset] = useState(0);
  const totalPage = useRef(0);
  let dataKeys = useRef([]);
  const refs = useRef({});

  const { slug1, slug2, slug3 } = useParams();
  const currentSlug = slug2 || slug1;
  const tableConfig = tableConfigs[currentSlug];
  const medicalServices = useSelector(selectMedicalServices);
  const specialties = useSelector(selectSpecialties);
  const clinics = useSelector(selectClinics);
  const specificMedicalServices = useSelector(selectSpecificMedicalServices);
  const blogs = useSelector(selectBlogs);
  const packages = useSelector(selectPackages);
  const orders = useSelector(selectOrders);
  const patients = useSelector(selectPatients);
  const doctors = useSelector(selectDoctors);
  const isLoading = useSelector((state) => state.admin.isLoading);
  const isError = useSelector((state) => state.admin.isError);

  useEffect(() => {
    let selectedData;
    let formattedData;
    switch (slug2 || slug1) {
      case "medical-services":
        selectedData = medicalServices;
        formattedData = helperFunction.adminPageFormatData(selectedData);
        break;

      case "specialties":
        selectedData = specialties;
        formattedData = helperFunction.adminPageFormatData(selectedData);
        break;

      case "clinics":
        selectedData = clinics;
        formattedData = helperFunction.adminPageFormatData(selectedData);
        break;

      case "specific-medical-services":
        selectedData = specificMedicalServices;
        formattedData =
          helperFunction.adminPageFormatSpecificMedicalServicesData(
            selectedData
          );
        break;

      case "blogs":
        selectedData = blogs;
        formattedData = helperFunction.adminPageFormatBlogData(selectedData);
        break;

      case "packages":
        selectedData = packages;
        formattedData = helperFunction.adminPageFormatPackageData(selectedData);
        break;

      case "orders":
        selectedData = orders;
        formattedData = helperFunction.adminPageFormatOrderData(selectedData);
        break;

      case "patients":
        selectedData = patients;
        formattedData = helperFunction.adminPageFormatPatientData(selectedData);
        break;

      case "doctors":
        selectedData = doctors;
        formattedData = helperFunction.adminPageFormatDoctorData(selectedData);
        break;

      default:
        selectedData = [];
        dataKeys.current = [];
        break;
    }

    // const formattedData = selectedData.map((item) => {
    //   const formattedItem = {
    //     ...item,
    //     createdAt: helperFunction.formatDateFromDBTypeToStandardType(
    //       item.createdAt
    //     ),
    //     updatedAt: helperFunction.formatDateFromDBTypeToStandardType(
    //       item.updatedAt
    //     ),
    //   };

    //   if (item.specialty && item.specialty.name) {
    //     formattedItem["specialty.name"] = item.specialty.name;
    //   }

    //   if (item.blogPostsUploadedTo && item.blogPostsUploadedTo.name) {
    //     formattedItem["blogPostsUploadedTo.name"] =
    //       item.blogPostsUploadedTo.name;
    //   }

    //   return formattedItem;
    // });

    dataKeys.current =
      formattedData?.length > 0 ? Object.keys(formattedData[0]) : [];

    totalPage.current = Math.ceil(formattedData?.length / rowsPerPage.current);

    setData(formattedData);
  }, [
    medicalServices,
    specialties,
    clinics,
    specificMedicalServices,
    packages,
    blogs,
    orders,
    patients,
    doctors,
    slug1,
    slug2,
    tableConfig.columns,
  ]);

  useEffect(() => {
    const initialCheckedItems = data?.reduce((acc, item) => {
      acc[item.id] = false; // Assuming each item has a unique 'id' field
      return acc;
    }, {});

    setCheckedItems(initialCheckedItems);
  }, [data]);

  const handleExportBtn = () => {
    const selectedItems = Object.keys(checkedItems).filter(
      (key) => checkedItems[key]
    );
    console.log("Selected items: ", selectedItems);
  };

  console.log(">>> Check: ", checkedItems);

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
            <Link to={tableConfig.basePath + "/create"}>
              <button className="btn add-btn">
                <div className="img-container">
                  <img src={AddIcon} alt="Add doctor" />
                </div>
                Add Doctor
              </button>
            </Link>
          </div>
        </div>
      </div>
      {tableConfig && (
        <BaseTable
          data={data}
          columns={tableConfig.columns}
          checkedItems={checkedItems}
          onCheckboxChange={setCheckedItems}
          offset={offset}
          rowsPerPage={rowsPerPage.current}
          currentPage={currentPage}
          totalPages={totalPage.current}
          onPageChange={(page) => {
            setCurrentPage(page);
            setOffset((page - 1) * rowsPerPage.current);
          }}
          basePath={tableConfig.basePath}
        />
      )}
    </div>
  );
}

export default ListPage;
