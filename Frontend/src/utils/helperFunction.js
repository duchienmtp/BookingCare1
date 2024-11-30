import { name } from "@cloudinary/url-gen/actions/namedTransformation";

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
      specialty: item.specialty.name,
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
      id: item.id,
      name: `${item.user.fullName}${item.packageName || ""}`,
      specialty: item.specialty?.name,
      packageType: item.packageType.name,
      createdAt: formatDateFromDBTypeToStandardType(item.user.createdAt),
      updatedAt: formatDateFromDBTypeToStandardType(item.user.updatedAt),
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
};
