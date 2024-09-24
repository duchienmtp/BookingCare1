import React from "react";
import { Link } from "react-router-dom";
import "./SeeMoreButton.scss";

function SeeMoreButton(props) {
  let { path } = props;
  return (
    <Link to={path}>
      <button className="see-more-button">
        <span>Xem thêm</span>
      </button>
    </Link>
  );
}

export default SeeMoreButton;
