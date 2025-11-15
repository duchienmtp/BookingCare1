import React, { useState, useEffect } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { path } from "../../../utils/constants.js";
import { getAllDataBySlug } from "../../../services/admin/SiteServices";
import {
  selectSpecificMedicalServices,
  selectSpecialties,
} from "../../../redux/slices/adminSlice.js";
import "./MedicalService.scss";

function MedicalService() {
  const [data, setData] = useState([]);
  const [width, setWidth] = useState(getWidth());
  const { slug } = useParams();
  const location = useLocation();
  const dispatch = useDispatch();

  const specialties = useSelector(selectSpecialties);
  const specificMedicalServices = useSelector(selectSpecificMedicalServices);
  const isLoading = useSelector((state) => state.admin.isLoading);
  const isError = useSelector((state) => state.admin.isError);

  function getWidth() {
    if (window.innerWidth >= 1200) return "260.8px";
    if (window.innerWidth >= 992 && window.innerWidth < 1200)
      return "220.875px";
    if (window.innerWidth >= 768 && window.innerWidth < 992) return "226.150px";
  }

  useEffect(() => {
    const handleResize = () => setWidth(getWidth());

    window.addEventListener("resize", handleResize);

    dispatch(getAllDataBySlug("specific-medical-services"));
    dispatch(getAllDataBySlug("specialties"));

    return () => window.removeEventListener("resize", handleResize);
  }, [dispatch]);

  useEffect(() => {
    let filteredData = specificMedicalServices.filter((item) => {
      const itemsMatchedMedicalService =
        item.specificMedicalService_MedicalServiceId.filter(
          (medicalService) => medicalService.medicalService.slug === slug
        );

      return itemsMatchedMedicalService.length > 0; // Include item if any medicalService matches the slug
    });

    if (slug === "kham-tinh-than") {
      filteredData = filteredData.filter(
        (item) => item.name !== "Bài test sức khỏe"
      );
    }

    if (slug === "kham-chuyen-khoa") {
      filteredData = specialties;
    }

    setData(filteredData);
  }, [specificMedicalServices, slug, specialties]);

  return (
    <div className="app-container">
      <div className="path-section">
        <Link to={path.HOME}>
          <div className="img-container">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={16}
              height={16}
              preserveAspectRatio="none"
              viewBox="0 0 20 20"
              fill="#45c3d2"
            >
              <path d="M8 20H3V10H0L10 0l10 10h-3v10h-5v-6H8z" />
            </svg>
          </div>

          <span> /</span>
        </Link>
        {/* {data && data.length > 0 && (
          <span className="slug-name">
            {data[data.length - 1].medicalServiceName[0].medicalService.name}
          </span>
        )} */}
      </div>
      <div className="medical-services">
        <div className="medical-services-content">
          {data &&
            data.length > 0 &&
            data.map((item) => {
              const medicalServiceSlug = location.pathname.split("/")[2];
              return (
                <Link to={`/dich-vu-y-te/${medicalServiceSlug}/${item.slug}`} key={item.id}>
                  <div
                    className="medical-service"
                    style={{ width: `${width}` }}
                  >
                    <div className="img-container">
                      <img src={item.image} alt={item.name} />
                    </div>
                    <div className="medical-service-title">
                      <span>{item.name}</span>
                    </div>
                  </div>
                </Link>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default MedicalService;
