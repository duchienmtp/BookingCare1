import React, { useEffect, useState } from "react";
import "./FullService.scss";
import RectanglePageBanner from "../../partials/PageBanner/rectanglePageBanner/RectanglePageBanner";
import SectionHeaderTitle from "../../partials/main-page-section/section-title/SectionHeaderTitle";
import { Link } from "react-router-dom";
import { path } from "../../../utils/constants/constants";
import { selectMedicalServices } from "../../../redux/slices/adminSlice.js";
import { useSelector, useDispatch } from "react-redux";
import { getAllDataBySlug } from "../../../services/admin/SiteServices";

function FullService() {
  const dispatch = useDispatch();
  const fullService = useSelector(selectMedicalServices);

  useEffect(() => {
    dispatch(getAllDataBySlug("medical-services"));
  }, []);

  console.log(">>> Check full service: ", fullService);
  return (
    <div className="app-container">
      <div className="md-px-10 full-service">
        <div className="full-service-section-header">
          <SectionHeaderTitle title="Dịch vụ toàn diện" />
        </div>
        <div className="full-service-content">
          {fullService &&
            fullService.length > 0 &&
            fullService.map((item) => {
              return (
                <div key={item.id}>
                  <Link to={`/dich-vu-y-te/${item.slug}`}>
                    <RectanglePageBanner item={item} />
                  </Link>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default FullService;
