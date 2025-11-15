import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import PackageInfo from "../view-detail-packages/package-info/PackageInfo";
import PackageStatistics from "./package-statistic/PackageStatistics";
import { getMedicalHealthCheckPackageByID } from "../../../../../services/admin/SiteServices";
import "./PackageInfoManagement.scss";
import { Spinner } from "react-bootstrap";

const PackageManagement = ({ serviceId }) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const packageData = {
    packageId: "PKG-2023-045",
    packageName: "Executive Health Check",
    packageTypeName: "Premium",
    isDeletedStatus: false,
    packageImage: "https://via.placeholder.com/150",
    clinics: [
      { name: "City Clinic", branches: ["Main Branch", "Downtown Branch"] },
      { name: "Health Plus", branches: ["North Branch"] },
    ],
    bookingPackages: [
      "Package for female above 50",
      "Package for female beneath 50",
    ],
    bookingsPerPackage: {
      "Package for female above 50": 150,
      "Package for female beneath 50": 95,
    },
    revenuePerPackage: {
      "Package for female above 50": 75000,
      "Package for female beneath 50": 47755,
    },
    createdAt: "2023-01-10 14:30",
    updatedAt: "2023-07-20 09:15",
    totalBookings: 245,
    revenueGenerated: 122755,
    lastBookingDate: "2023-08-15",
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getMedicalHealthCheckPackageByID(serviceId);
        const formattedData = {
          packageId: response.data.packageId,
          packageName: response.data.packageName,
          packageTypeName: response.data.packageType,
          isDeletedStatus: response.data.isDeleted,
          packageImage: response.data.image,
          createdAt: format(response.data.createdAt, "dd/MM/yyyy HH:mm"),
          updatedAt: format(response.data.updatedAt, "dd/MM/yyyy HH:mm"),
          clinics: response.data.clinicsWorkingAt.map((clinic) => ({
            id: clinic.clinicBranchId,
            name: clinic.clinicName,
            branches: clinic.clinicBranchName,
            address: clinic.clinicBranchAddress,
          })),
          bookingPackages: response.data.bookingPackages.map((item) => ({
            id: item.bookingPackageId,
            name: item.bookingPackageName,
            price: item.bookingPackagePrice,
          })),
        };
        setData(formattedData);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [serviceId]);

  if (isLoading) {
    return (
      <div className="text-center my-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-2">Đang tải thông tin gói khám...</p>
      </div>
    );
  }

  return (
    <div className="package-management">
      <h1>Package Management</h1>
      <div className="package-content">
        <PackageInfo packageData={data} />
        <PackageStatistics packageData={packageData} />
      </div>
    </div>
  );
};

export default PackageManagement;
