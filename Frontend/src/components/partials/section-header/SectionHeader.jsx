import React from "react";
import "./SectionHeader.scss";

function SectionHeader(props) {
  let { title = "Danh mục" } = props;
  return (
    <div className="header">
      <div className="header-content">
        <div className="title">
          <h2>{title}</h2>
        </div>
        <button type="button" className="see-more-btn">
          <span>Xem thêm</span>
        </button>
      </div>
    </div>
  );
}

export default SectionHeader;
