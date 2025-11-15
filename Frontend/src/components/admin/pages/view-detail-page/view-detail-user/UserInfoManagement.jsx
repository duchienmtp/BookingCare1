import React, { useEffect, useState } from "react";
import "../view-detail-services/ServicesInfoManagement.scss";
import { useParams } from "react-router-dom";
import UserInfo from "./user-info/UserInfo";
import DoctorPackageTable from "./doctor-package-table/DoctorPackageTable";
import PatientUsedPackagesTable from "./patient-used-packages-table/PatientUsedPackagesTable";
import {
  getDoctorUserByID,
  getPatientUserByID,
} from "../../../../../services/admin/SiteServices";
import { Spinner } from "react-bootstrap";

function UserInfoManagement() {
  const params = useParams();
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);

  const formatUserData = (data) => {
    let formattedData = {
      userId: data.user.id,
      patientId: data.patients?.patientId || "",
      fullName: data.user.fullName,
      birthDate: data.user.birthDate.split("-").reverse().join("/"),
      gender: data.user.gender,
      phoneNumber: data.user.phoneNumber,
      email: data.user.email,
      address: data.user.address,
      image: data.user.image,
      role: data.user.role.name,
      packages:
        data.user.role.id === "R002"
          ? data.doctorPackages?.map((item) => ({
              packageId: item.packageId,
              packageName: item.packageName,
              packageTypeName: item.PackageType.name,
              isDeleted: item.isDeleted,
            })) || []
          : data.packages?.map((item) => ({
              orderId: item.orderId || "",
              packageScheduleId: item.packageScheduleId || "",
              packageId: item.packageId,
              packageName: item.packageName,
              packageTypeName: item.packageTypeName,
              scheduleDate: item.scheduleDate.split("-").reverse().join("/"),
              bookingStatus: item.bookingStatus,
            })),
    };
    return formattedData;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        let data = "";
        if (params.role === "doctors") {
          data = await getDoctorUserByID(params.userId);
        } else {
          data = await getPatientUserByID(params.userId);
        }
        data = formatUserData(data.data);
        setData(data);
        setLoading(false);
      } catch (error) {
        console.log("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, [params.role, params.userId]);

  if (isLoading) {
    return (
      <div className="text-center my-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-2">Đang tải thông tin người dùng...</p>
      </div>
    );
  }

  return (
    <div className="info-management-detail-wrapper">
      <UserInfo doctor={data} rolePage={params.role} />
      {params.role === "doctors" ? (
        <DoctorPackageTable packages={data.packages} />
      ) : (
        <PatientUsedPackagesTable packages={data.packages} />
      )}
    </div>
  );
}

export default UserInfoManagement;
