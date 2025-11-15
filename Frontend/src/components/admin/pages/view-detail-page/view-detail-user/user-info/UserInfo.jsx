import React, { useEffect, useState } from "react";
import "./UserInfo.scss";

function UserInfo({ doctor, rolePage }) {
  const {
    userId,
    patientId,
    fullName,
    birthDate,
    gender,
    phoneNumber,
    email,
    address,
    image,
    role,
  } = doctor;

  const patientIdValue = patientId ? patientId : "";

  return (
    <div className="doctor-info">
      <div className="doctor-image">
        <img src={image} alt={fullName} />
      </div>
      <div className="doctor-details">
        <h2>{fullName}</h2>
        <div className="details-grid">
          <div>
            <label>User ID</label>
            <p>{userId}</p>
          </div>
          {rolePage === "patients" && (
            <div>
              <label>Patient ID</label>
              <p>{patientIdValue}</p>
            </div>
          )}
          <div>
            <label>Birthdate</label>
            <p>{birthDate}</p>
          </div>
          <div>
            <label>Gender</label>
            <p>{gender}</p>
          </div>
          <div>
            <label>Phone</label>
            <p>{phoneNumber}</p>
          </div>
          <div>
            <label>Email</label>
            <p>{email}</p>
          </div>
          <div>
            <label>Address</label>
            <p>{address}</p>
          </div>
          <div>
            <label>Role</label>
            <p>{role}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserInfo;
