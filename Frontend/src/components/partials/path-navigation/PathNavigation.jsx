import React from "react";
import "./PathNavigation.scss";
import { Link } from "react-router-dom";
import { path } from "../../../utils/constants/constants";

function PathNavigation(props) {
  let { title } = props;
  return (
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
      <span className="slug-name">Khám Chuyên khoa</span>
    </div>
  );
}

export default PathNavigation;
