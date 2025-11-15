import React, { useEffect, useState, useCallback } from "react";
import "../view-detail-services/ServicesInfoManagement.scss";
import SpecialtyInfo from "./specialty-info/SpecialtyInfo";
import { Spinner } from "react-bootstrap";
import { getSpecialtyByID } from "../../../../../services/admin/SiteServices";

const SpecialtyInfoManagement = ({ serviceId }) => {
  const [fetchStatus, setFetchStatus] = useState({
    isLoading: false,
    isError: false,
  });
  const [chosenData, setChosenData] = useState(null);

  const fetchSpecialtyData = useCallback(async () => {
    try {
      setFetchStatus({
        isLoading: true,
        isError: false,
      });

      const result = await getSpecialtyByID(serviceId);
      if (result.data) {
        setChosenData(result.data);
      }

      setFetchStatus({
        isLoading: false,
        isError: false,
      });
    } catch (err) {
      setFetchStatus({
        isLoading: false,
        isError: true,
      });
      console.error(err);
    }
  }, [serviceId]);

  useEffect(() => {
    fetchSpecialtyData();
  }, [fetchSpecialtyData]);

  if (fetchStatus.isLoading) {
    return (
      <div className="text-center my-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-2">Xin vui lòng chờ đợi trong giây lát...</p>
      </div>
    );
  }

  return (
    <div className="info-management-detail-wrapper">
      <SpecialtyInfo data={chosenData} />
    </div>
  );
};

export default SpecialtyInfoManagement;
