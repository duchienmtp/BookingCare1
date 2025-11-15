import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UserForm from "../../user-form/UserForm";
import ServiceForm from "../../service-form/ServiceForm";
import ClinicForm from "../../clinic-form/ClinicForm";
import PackageForm from "../../create-package-form/PackageForm";
import {
  getAllBookingPrices,
  getAllHealthCheckPackagesNotCurrentlyHaveSchedule,
  getAllPackageTypes,
  getLatestClinic,
  getLatestDoctor,
  getLatestHealthCheckPackage,
  getLatestSpecificMedicalService,
} from "../../../../services/admin/SiteServices";
import { useSelector } from "react-redux";
import {
  selectDoctors,
  selectSpecificMedicalServices,
  selectSpecialties,
  selectClinics,
} from "../../../../redux/slices/adminSlice";
import { Spinner } from "react-bootstrap";
import HealthCheckSchedule from "../../package-schedule-form/HealthCheckSchedule";

function AddPage() {
  const { slug1, slug2, slug3 } = useParams();
  const [roleConfig, setRoleConfig] = useState({
    roleCode: "R002",
    roleLabel: "Doctor",
  });
  const [fetchStatus, setFetchStatus] = useState({
    isLoading: false,
    isError: false,
  });
  const [chosenData, setChosenData] = useState(null);
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
  }, [doctors, specificMedicalServices, specialties, clinics])

  const fetchPackageFormData = async () => {
    try {
      setFetchStatus({
        isLoading: true,
        isError: true,
      });

      const [latestHealthCheckPackage, packageTypes, bookingPrices] = await Promise.all([
        getLatestHealthCheckPackage(),
        getAllPackageTypes(),
        getAllBookingPrices(),
      ]);

      if (latestHealthCheckPackage.data && packageTypes.data && bookingPrices.data) {
        setChosenData(latestHealthCheckPackage.data);

        setListDataOptions((prevState) => ({
          ...prevState,
          packageTypeOptions: packageTypes.data.map((item) => ({
            value: item.id,
            label: item.name,
          })),
        }));

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
  };

  const fetchServiceFormData = async () => {
    try {
      setFetchStatus({
        isLoading: true,
        isError: true,
      });

      const result = await getLatestSpecificMedicalService();
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
  };

  const fetchUserFormData = async () => {
    try {
      setFetchStatus({
        isLoading: true,
        isError: true,
      });

      const result = await getLatestDoctor();
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
  };

  const fetchClinicFormData = async () => {
    try {
      setFetchStatus({
        isLoading: true,
        isError: true,
      });

      const result = await getLatestClinic();
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
  }

  const fetchScheduleFormData = async () => {
    try {
      setFetchStatus({
        isLoading: true,
        isError: true,
      });

      const result = await getAllHealthCheckPackagesNotCurrentlyHaveSchedule();
      if (result.data) {
        const healthCheckPackages = result.data.map((item) => ({
          value: item.packageId,
          label: `${item.packageId} - ${item.packageName}`,
          packageName: item.packageName,
          packageType: item.packageTypeName,
          clinic: item.clinic.fullname || "",
          branches: item.clinicBranches.map((branch) => `${branch.clinicBranchName} - ${branch.clinicBranchAddress}`),
          packageImage: item.image,
        }));
        setListDataOptions((prevState) => ({
          ...prevState,
          healthCheckPackageOptions: healthCheckPackages,
        }));
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
  }

  useEffect(() => {
    if (slug1 === "users") {
      if (slug2 === "doctors") {
        setRoleConfig({ roleCode: "R002", roleLabel: "Doctor" });
        fetchUserFormData();
      } else if (slug2 === "patients") {
        setRoleConfig({ roleCode: "R003", roleLabel: "Patient" });
      }
    } else if (slug1 === "eCommerce") {
      if (slug2 === "packages") {
        if (!doctors || !specialties || !specificMedicalServices || !clinics)
          return;
        fetchPackageFormData();
      } else if (slug2 === "specific-medical-services") {
        fetchServiceFormData();
      } else if (slug2 === "schedules") {
        fetchScheduleFormData();
      }
    } else if (slug1 === "clinics") {
      fetchClinicFormData();
    }
  }, [
    slug1,
    slug2,
    slug3,
    doctors,
    specialties,
    specificMedicalServices,
    clinics,
  ]);

  const renderPage = () => {
    if (slug1 === "users") {
      return <UserForm isEditMode={false} roleConfig={roleConfig} existingUser={chosenData} />;
    } else if (slug1 === "eCommerce") {
      if (slug2 === "specific-medical-services") {
        return <ServiceForm isEditMode={false} existingData={chosenData} />;
      }
      if (slug2 === "packages") {
        return (
          <PackageForm
            isEditMode={false}
            existingData={chosenData}
            listDataOptions={listDataOptions}
          />
        );
      }
      if (slug2 === "schedules") {
        return (
          <HealthCheckSchedule
            isEditMode={false}
            listDataOptions={listDataOptions}
            fetchData={fetchScheduleFormData}
          />
        )
      }
    } else if (slug1 === "clinics") {
      return (
        <ClinicForm
          latestClinic={chosenData}
          isEditMode={false}
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

export default AddPage;
