const formatDateFromDBTypeToStandardType = (dateString) => {
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };

  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB", options).replace(",", "");
};

const adminPageFormatData = (data) => {
  data = data.map((item) => {
    return {
      id: item.id,
      name: item.name,
      status: "active",
      createdAt: formatDateFromDBTypeToStandardType(item.createdAt),
      updatedAt: formatDateFromDBTypeToStandardType(item.updatedAt),
    };
  });

  return data;
};

const adminPageFormatSpecificMedicalServicesData = (data) => {
  data = data.map((item) => {
    return {
      id: item.id,
      name: item.name,
      status: "active",
      createdAt: formatDateFromDBTypeToStandardType(item.createdAt),
      updatedAt: formatDateFromDBTypeToStandardType(item.updatedAt),
    };
  });

  return data;
};

const adminPageFormatBlogData = (data) => {
  data = data.map((item) => {
    return {
      id: item.id,
      name: item.name,
      uploadedTo: item.blogPostsUploadedTo.name,
      specialty: item.specialty?.name,
      createdAt: formatDateFromDBTypeToStandardType(item.createdAt),
      updatedAt: formatDateFromDBTypeToStandardType(item.updatedAt),
    };
  });

  return data;
};

const adminPageFormatPackageData = (data) => {
  data = data.map((item) => {
    return {
      id: item.packageId,
      name: item.packageName,
      packageType: item.packageTypeName,
      status: item.isDeleted ? "inactive" : "active",
      createdAt: formatDateFromDBTypeToStandardType(item.createdAt),
      updatedAt: formatDateFromDBTypeToStandardType(item.updatedAt),
    };
  });

  return data;
};

const adminPageFormatOrderData = (data) => {
  data = data.map((item) => {
    return {
      id: item.bookingId,
      patientName: item.patientInfo.fullName,
      packageName: item.scheduleInfo.medicalHealthCheckPackageName,
      // clinicName: `${item.clinicInfo.fullname} - ${item.clinicInfo.clinicBranchName}`,
      clinicName: `Bệnh viện nhân dân Gia Định`,
      createdAt: formatDateFromDBTypeToStandardType(item.createdAt),
      updatedAt: formatDateFromDBTypeToStandardType(item.updatedAt),
      status: item.scheduleInfo.bookingStatus.name,
    };
  });

  return data;
};

const adminPageFormatPatientData = (data) => {
  data = data.map((item) => {
    return {
      id: item.patientId,
      name: item.user.fullName,
      gender: item.user.gender,
      dob: new Date(item.user.birthDate).toLocaleDateString("en-GB"),
      phoneNumber: item.user.phoneNumber,
      status: "active",
      createdAt: formatDateFromDBTypeToStandardType(item.createdAt),
      updatedAt: formatDateFromDBTypeToStandardType(item.updatedAt),
    };
  });

  return data;
};

const adminPageFormatDoctorData = (data) => {
  data = data.map((item) => {
    return {
      id: item.doctorId,
      name: item.fullName,
      gender: item.gender,
      dob: new Date(item.birthDate).toLocaleDateString("en-GB"),
      phoneNumber: item.phoneNumber,
      status: item.status ? "inactive" : "active",
      createdAt: formatDateFromDBTypeToStandardType(item.createdAt),
      updatedAt: formatDateFromDBTypeToStandardType(item.updatedAt),
    };
  });
  return data;
};

export default {
  formatDateFromDBTypeToStandardType,
  adminPageFormatData,
  adminPageFormatSpecificMedicalServicesData,
  adminPageFormatBlogData,
  adminPageFormatPackageData,
  adminPageFormatOrderData,
  adminPageFormatPatientData,
  adminPageFormatDoctorData,
};
