import React from "react";
import "./PackageInfo.scss";

const PackageInfo = ({ packageData }) => {
  const {
    packageId,
    packageName,
    packageTypeName,
    isDeletedStatus,
    packageImage, // Add package image
    clinics,
    bookingPackages,
    createdAt,
    createdBy,
    updatedAt,
    updatedBy,
  } = packageData;

  return (
    <div className="package-details">
      <div className="package-info">
        <h2>Package Details</h2>
        <div className="package-image">
          <img src={packageImage} alt={packageName} />
        </div>
        <div className="info-item">
          <strong>Package ID:</strong> {packageId}
        </div>
        <div className="info-item">
          <strong>Package Name:</strong> {packageName}
        </div>
        <div className="info-item">
          <strong>Package Type:</strong> {packageTypeName}
        </div>
        <div className="info-item">
          <strong>Status:</strong>
          <span className={`status ${isDeletedStatus ? "deleted" : "active"}`}>
            {isDeletedStatus ? "Deleted" : "Active"}
          </span>
        </div>
      </div>

      <div className="clinics-section">
        <h3>Clinics Handling This Package</h3>
        <ul>
          {clinics?.map((clinic) => (
            <li key={clinic.id}>
              {clinic.name} ({clinic.branches}) : {clinic.address}
            </li>
          ))}
        </ul>
      </div>

      <div className="booking-packages-section">
        <h3>Booking Packages</h3>
        <ul>
          {bookingPackages?.map((booking) => (
            <li key={booking.id}>
              {booking.name} : {booking.price}
            </li>
          ))}
        </ul>
      </div>

      <div className="audit-info">
        <h3>Audit Information</h3>
        <div className="info-item">
          <strong>Created At:</strong> {createdAt}
        </div>
        <div className="info-item">
          <strong>Last Updated At:</strong> {updatedAt}
        </div>
      </div>
    </div>
  );
};

export default PackageInfo;
