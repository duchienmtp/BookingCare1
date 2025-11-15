import React from "react";
import "./ServicesInfo.scss";

const ServicesInfo = ({ service }) => {
  const { id, name, image, additionalFields } = service;

  return (
    <div className="service-info-card">
      <div className="service-image">
        <img src={image} alt={name} />
      </div>
      <div className="service-details">
        <h2>{name}</h2>
        <div className="detail-item">
          <strong>ID:</strong> {id}
        </div>
        {additionalFields &&
          additionalFields.map((field, index) => (
            <div className="detail-item" key={index}>
              <strong>{field.label}:</strong> {field.value}
            </div>
          ))}
      </div>
    </div>
  );
};

export default ServicesInfo;
