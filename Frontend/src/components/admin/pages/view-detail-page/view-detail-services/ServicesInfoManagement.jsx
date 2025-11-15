import React, { useEffect, useState } from "react";
import "./ServicesInfoManagement.scss";
import ServicesInfo from "../view-detail-services/services-info/ServicesInfo";
import ServicesTable from "../view-detail-services/services-table/ServicesTable";
import {
  getMedicalServicesByID,
  getSpecificMedicalServiceByID,
} from "../../../../../services/admin/SiteServices.js";
import { Spinner } from "react-bootstrap";

const ServicesInfoManagement = ({ serviceType, serviceId }) => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let data = {};
        if (serviceType === "medical-services") {
          data = await getMedicalServicesByID(serviceId);
        } else {
          data = await getSpecificMedicalServiceByID(serviceId);
        }
        console.log(data.data);
        setData(data.data);
        setIsLoading(false);
      } catch (error) {
        console.log("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, [serviceId, serviceType]);

  if (isLoading) {
    return (
      <div className="text-center my-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-2">Đang tải thông tin dịch vụ...</p>
      </div>
    );
  }

  return (
    <div className="info-management-detail-wrapper">
      {serviceType === "medical-services" ? (
        <>
          <ServicesInfo service={data} />
          <ServicesTable
            data={data?.specificMedicalServices || []}
            tableHeader={"Specific Medical Services Table"}
          />
        </>
      ) : (
        <>
          <ServicesInfo service={data.specificMedicalServiceDetails} />
          <ServicesTable
            data={data?.associatedMedicalServicePackage || []}
            tableHeader={"Medical Services Table"}
          />
        </>
      )}
    </div>
  );
};

export default ServicesInfoManagement;
