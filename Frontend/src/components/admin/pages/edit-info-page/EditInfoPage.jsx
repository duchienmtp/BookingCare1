import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UserForm from "../../user-form/UserForm";
import ServiceForm from "../../service-form/ServiceForm";
import ClinicForm from "../../clinic-form/ClinicForm";
import { Spinner } from "react-bootstrap";
import {
  getDoctorUserByID,
  getPatientUserByID,
  getMedicalHealthCheckPackageByID,
  getSpecificMedicalServiceByID,
  getClinicByID,
  getAllPackageTypes,
  getAllBookingPrices,
  getAllHealthCheckPackagesWithTheseSchedules,
} from "../../../../services/admin/SiteServices";
import PackageForm from "../../create-package-form/PackageForm";
import { useSelector } from "react-redux";
import {
  selectDoctors,
  selectSpecificMedicalServices,
  selectSpecialties,
  selectClinics,
} from "../../../../redux/slices/adminSlice";
import HealthCheckSchedule from "../../package-schedule-form/HealthCheckSchedule";

const formatUserData = (data) => {
  return {
    userId: data.userId,
    doctorId: data.doctorId,
    patientId: data.patients?.patientId || "",
    fullName: data.user.fullName,
    birthDate: data.user.birthDate,
    gender: data.user.gender,
    phoneNumber: data.user.phoneNumber,
    email: data.user.email,
    address: data.user.address,
    image: data.user.image,
    shortDoctorInfo: data.shortDoctorInfo,
    doctorDetailInfo: data.doctorDetailInfo,
  };
};

function EditInfoPage() {
  const params = useParams();
  const [chosenData, setChosenData] = useState(null);
  const [fetchStatus, setFetchStatus] = useState({
    isLoading: false,
    isError: false,
  });
  const [roleConfig, setRoleConfig] = useState({
    roleCode: "R002",
    roleLabel: "Doctor",
  });
  const [listDataOptions, setListDataOptions] = useState({
    doctorsOptions: [],
    specialtyOptions: [],
    serviceOptions: [],
    clinicOptions: [],
    packageTypeOptions: [],
    bookingPriceOptions: [],
    healthCheckPackageOptions: [],
  });

  const doctors = useSelector(selectDoctors);
  const specificMedicalServices = useSelector(selectSpecificMedicalServices);
  const specialties = useSelector(selectSpecialties);
  const clinics = useSelector(selectClinics);

  useEffect(() => {
    const updateOptionsFromRedux = () => {
      const options = {};

      if (doctors && doctors.length > 0) {
        options.doctorsOptions = doctors.map((item) => ({
          value: item.doctorId,
          label: item.doctorId,
          fullName: item.fullName,
        }));
      }

      if (specialties && specialties.length > 0) {
        options.specialtyOptions = specialties.map((item) => ({
          value: item.id,
          label: item.name,
        }));
      }

      if (specificMedicalServices && specificMedicalServices.length > 0) {
        options.serviceOptions = specificMedicalServices.map((item) => ({
          value: item.id,
          label: item.name,
        }));
      }

      if (clinics && clinics.length > 0) {
        options.clinicOptions = clinics.map((item) => ({
          value: item.id,
          label: item.fullname,
        }));
      }

      if (Object.keys(options).length > 0) {
        setListDataOptions((prev) => ({ ...prev, ...options }));
      }
    };

    updateOptionsFromRedux();
  }, [doctors, specialties, specificMedicalServices, clinics]);

  const fetchPackageTypes = useCallback(async () => {
    try {
      const packageTypes = await getAllPackageTypes();
      if (packageTypes.data) {
        setListDataOptions((prev) => ({
          ...prev,
          packageTypeOptions: packageTypes.data.map((item) => ({
            value: item.id,
            label: item.name,
          })),
        }));
      }
    } catch (error) {
      console.error("Failed to fetch package types:", error);
    }
  }, []);

  const fetchBookingPrices = useCallback(async () => {
    try {
      const bookingPrices = await getAllBookingPrices();
      if (bookingPrices.data && bookingPrices.data.length > 0) {
        setListDataOptions((prevState) => ({
          ...prevState,
          bookingPriceOptions: bookingPrices.data.map((item) => ({
            id: item.id,
            name: item.name,
            description: item.description || "",
          })),
        }));
      }
    } catch (error) {
      console.error("Failed to fetch booking prices:", error);
    }
  }, []);

  const fetchAllHealthCheckPackagesWithTheseSchedules = useCallback(async () => {
    try {
      const healthCheckPackages = await getAllHealthCheckPackagesWithTheseSchedules();
      if (healthCheckPackages.data) {
        setListDataOptions((prev) => ({
          ...prev,
          healthCheckPackageOptions: healthCheckPackages.data.map((item) => ({
            value: item.packageId,
            label: `${item.packageId} - ${item.packageName}`,
            packageName: item.packageName,
            packageType: item.packageTypeName,
            clinic: item.clinic.fullname || "",
            branches: item.clinicBranches.map((branch) => `${branch.clinicBranchName} - ${branch.clinicBranchAddress}`),
            packageImage: item.image,
            schedule: item.schedule,
          })),
        }));
      }
    } catch (error) {
      console.error("Failed to fetch health check packages:", error);
    }
  }, []);

  const fetchUserData = async (role, userId) => {
    if (role === "doctors") {
      const doctorData = await getDoctorUserByID(userId);
      return formatUserData(doctorData.data);
    } else if (role === "patients") {
      const patientData = await getPatientUserByID(userId);
      return formatUserData(patientData.data);
    }
    return null;
  };

  const fetchECommerceData = useCallback(
    async (role, userId = "") => {
      console.log("Fetching schedules");
      switch (role) {
        case "packages": {
          const [data] = await Promise.all([
            getMedicalHealthCheckPackageByID(userId),
            fetchPackageTypes(),
            fetchBookingPrices(),
          ]);
          return {
            ...data.data,
            packageType: {
              value: data.data.packageTypeId,
              label: data.data.packageType,
            },
            clinic: {
              value: data.data.clinicsWorkingAt[0].clinicId,
              label: data.data.clinicsWorkingAt[0].clinicFullName,
            },
            branches: data.data.clinicsWorkingAt.map((item) => ({
              value: item.clinicBranchId,
              label: `${item.clinicFullName} - ${item.clinicBranchName}`,
            })),
            specialties: data.data.specialties.map((item) => ({
              value: item.id,
              label: item.name,
            })),
            services: data.data.specificMedicalServices.map((item) => ({
              value: item.id,
              label: item.name,
            })),
            packagePrices: data.data.bookingPackages.map((item) => ({
              id: item.bookingPackageId,
              name: item.bookingPackageName,
              description: item.bookingPackageDescription || "",
              price: item.bookingPackagePrice,
            }))
          };
        }
        case "specific-medical-services": {
          const data = await getSpecificMedicalServiceByID(userId);
          return {
            id: data.data.specificMedicalServiceDetails.id,
            name: data.data.specificMedicalServiceDetails.name,
            slug: data.data.specificMedicalServiceDetails.slug,
            image: data.data.specificMedicalServiceDetails.image,
            description: data.data.specificMedicalServiceDetails.description,
            medicalServices: data.data.associatedMedicalServicePackage.map(
              (item) => ({
                value: item.id,
                label: item.name,
              })
            ),
            deployedPackages: data.data.associatedHealthCheckPackages.map(
              (item) => ({
                value: item.id,
                label: item.name,
              })
            ),
          };
        }
        case "schedules": {
          await fetchAllHealthCheckPackagesWithTheseSchedules();
          break;
        }
        default:
          break;
      }
    },
    [fetchPackageTypes, fetchBookingPrices, fetchAllHealthCheckPackagesWithTheseSchedules]
  );

  const fetchClinicData = useCallback(async (userId) => {
    try {
      const data = await getClinicByID(userId);
      return {
        id: data.data.id,
        fullName: data.data.fullname,
        shortName: data.data.name,
        address: data.data.address,
        detailInfo: data.data.clinicDetailInfo,
        image: data.data.image,
        slug: data.data.slug,
        branches: data.data.branches,
      };
    } catch (err) {
      console.error(err);
    }
  }, []);

  const fetchData = useCallback(async () => {
    try {
      setFetchStatus({
        isLoading: true,
        isError: false,
      });

      const { root, role, userId } = params;
      let data = null;

      if (root === "users") {
        data = await fetchUserData(role, userId);
      } else if (root === "eCommerce") {
        data = await fetchECommerceData(role, userId);
      } else if (root == "clinics") {
        data = await fetchClinicData(userId);
      }

      if (data) {
        setChosenData(data);
      }

      setFetchStatus({
        isLoading: false,
        isError: false,
      });
    } catch (error) {
      console.error("Error fetching data:", error);
      setFetchStatus({
        isLoading: false,
        isError: true,
      });
    }
  }, [params, fetchECommerceData]);

  useEffect(() => {
    if (params.root === "users") {
      if (params.role === "doctors") {
        setRoleConfig({ roleCode: "R002", roleLabel: "Doctor" });
      } else if (params.role === "patients") {
        setRoleConfig({ roleCode: "R003", roleLabel: "Patient" });
      }
    }

    fetchData();
  }, [params, fetchData]);

  const renderPage = () => {
    const { root, role } = params;

    console.log("root", root);
    console.log("role", role);

    if (root === "users") {
      return (
        <UserForm
          isEditMode={true}
          roleConfig={roleConfig}
          existingUser={chosenData}
        />
      );
    } else if (root === "eCommerce") {
      if (role === "specific-medical-services") {
        return <ServiceForm isEditMode={true} existingData={chosenData} />;
      }

      if (role === "packages") {
        return (
          <PackageForm
            isEditMode={true}
            existingData={chosenData}
            listDataOptions={listDataOptions}
          />
        );
      }

      if (role === "schedules") {
        return (
          <HealthCheckSchedule
            isEditMode={true}
            listDataOptions={listDataOptions}
          />
        );
      }
    } else if (root === "clinics") {
      return (
        <ClinicForm
          isEditMode={true}
          existingData={chosenData}
        />
      );
    }
  };

  if (fetchStatus.isLoading) {
    return (
      <div className="text-center my-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-2">Xin vui lòng chờ đợi trong giây lát...</p>
      </div>
    );
  }

  return <div>{renderPage()}</div>;
}

export default EditInfoPage;
