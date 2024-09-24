import React from "react";
import "./SectionHeaderTitle.scss";

function SectionHeaderTitle(props) {
  let { title } = props;
  return <span className="section-header-title">{title}</span>;
}

export default SectionHeaderTitle;
