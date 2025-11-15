// ClinicInfoManagement.jsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ClinicInfo from "./clinic-info/ClinicInfo";
import ClinicBranchTable from "./clinic-branch-table/ClinicBranchTable";
import ClinicPackageTable from "./clinic-package-table/ClinicPackageTable";
import ClinicDoctorTable from "./clinic-doctor-table/ClinicDoctorTable";
import "./ClinicInfoManagement.scss";
import { getClinicByID } from "../../../../../services/admin/SiteServices";
import { Spinner } from "react-bootstrap";

const formatData = (data) => {
  return {
    clinicData: {
      clinicId: data.id,
      clinicFullName: data.fullname,
      clinicShortName: data.name,
      address: data.address,
      image: data.image,
      slug: data.slug,
    },
    branches: data.branches.map((branch) => ({
      id: branch.id,
      name: branch.name,
      address: branch.address,
      isMain: branch.name === "Cơ sở chính" ? true : false,
      isDeleted: false,
    })),
    packages:
      data.assignedPackages?.map((pkg) => ({
        id: pkg.packageId,
        name: pkg.packageName,
        rank: 4,
        isDeleted: pkg.isDeleted,
      })) || [],
    doctors:
      data.doctors?.map((doctor) => ({
        id: doctor.id,
        name: doctor.fullName,
        specialty: "TDB",
        isDeleted: false,
      })) || [],
  };
};

const ClinicInfoManagement = () => {
  const params = useParams();
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentBranchesPage, setCurrentBranchesPage] = useState(1);
  const [currentPackagesPage, setCurrentPackagesPage] = useState(1);
  const [currentDoctorsPage, setCurrentDoctorsPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getClinicByID(params.clinicId);
        const formattedData = formatData(response.data);
        setData(formattedData);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [params.clinicId]);

  if (isLoading) {
    return (
      <div className="text-center my-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-2">Đang tải thông tin dịch vụ...</p>
      </div>
    );
  }

  return (
    <div className="clinic-management">
      <ClinicInfo clinicData={data.clinicData} />

      <div className="data-sections">
        <div className="section">
          <h2>Branches</h2>
          <ClinicBranchTable
            data={data.branches}
            currentPage={currentBranchesPage}
            onPageChange={setCurrentBranchesPage}
          />
        </div>

        <div className="section">
          <h2>Medical Packages</h2>
          <ClinicPackageTable
            data={data.packages}
            currentPage={currentPackagesPage}
            onPageChange={setCurrentPackagesPage}
          />
        </div>

        <div className="section">
          <h2>Doctors</h2>
          <ClinicDoctorTable
            data={data.doctors}
            currentPage={currentDoctorsPage}
            onPageChange={setCurrentDoctorsPage}
          />
        </div>
      </div>
    </div>
  );
};

export default ClinicInfoManagement;
