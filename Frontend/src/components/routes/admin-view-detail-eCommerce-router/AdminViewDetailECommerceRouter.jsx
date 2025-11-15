import React from "react";
import { useParams } from "react-router-dom";
import ServicesInfoManagement from "../../admin/pages/view-detail-page/view-detail-services/ServicesInfoManagement";
import SpecialtyInfoManagement from "../../admin/pages/view-detail-page/view-detail-specialty/SpecialtyInfoManagement";
import PackageManagement from "../../admin/pages/view-detail-page/view-detail-packages/PackageInfoManagement";
import OrderInfoManagement from "../../admin/pages/view-detail-page/view-detail-order/OrderInfoManagement";

const AdminViewDetailECommerceRouter = () => {
  const { serviceType, serviceId } = useParams();

  if (serviceType === "specialties") {
    return <SpecialtyInfoManagement serviceId={serviceId} />;
  }

  if (serviceType === "packages") {
    return <PackageManagement serviceId={serviceId} />;
  }

  if (serviceType === "orders") {
    return <OrderInfoManagement serviceId={serviceId} />;
  }

  return (
    <ServicesInfoManagement serviceType={serviceType} serviceId={serviceId} />
  );
};

export default AdminViewDetailECommerceRouter;
