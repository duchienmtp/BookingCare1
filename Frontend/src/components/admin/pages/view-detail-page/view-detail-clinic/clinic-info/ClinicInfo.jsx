// ClinicInfo.jsx
import React from "react";
import { Link } from "react-router-dom";
import "./ClinicInfo.scss";

const ClinicInfo = ({ clinicData }) => {
  return (
    <div className="clinic-info">
      <div className="clinic-image">
        <img src={clinicData.image} alt={clinicData.clinicFullName} />
      </div>
      <div className="clinic-details">
        <h1>{clinicData.clinicFullName}</h1>
        <p>
          <strong>ID:</strong> {clinicData.clinicId}
        </p>
        <p>
          <strong>Short Name:</strong> {clinicData.clinicShortName}
        </p>
        <p>
          <strong>Address:</strong> {clinicData.address}
        </p>
        <Link
          to={`/co-so-y-te/${clinicData.slug}`}
          className="view-full-button"
          target="_blank"
          rel="noopener noreferrer"
        >
          View Full Clinic Information
        </Link>
      </div>
    </div>
  );
};

export default ClinicInfo;
