import React, { useEffect, useState } from "react";
import "./FullService.scss";
import RectanglePageBanner from "../../partials/PageBanner/rectanglePageBanner/RectanglePageBanner";
import SectionHeaderTitle from "../../partials/main-page-section/section-title/SectionHeaderTitle";
import { Link } from "react-router-dom";
import { path } from "../../../utils/constants";

function FullService(props) {
  let { data } = props;

  return (
    <div className="app-container">
      <div className="md-px-10 full-service">
        <div className="full-service-section-header">
          <SectionHeaderTitle title="Dịch vụ toàn diện" />
        </div>
        <div className="full-service-content">
          {data &&
            data.length > 0 &&
            data.map((item) => {
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
