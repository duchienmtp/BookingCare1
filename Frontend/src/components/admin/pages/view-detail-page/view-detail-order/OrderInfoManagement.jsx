// OrderInfoManagement Component (Single Order Viewer)
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Spinner, Alert } from "react-bootstrap";
import OrderDetails from "./order-info/OrderInfo";
import { getHealthCheckPackageScheduleBookingDetail } from "../../../../../services/admin/SiteServices";
import _ from "lodash";

const formatData = (order) => {
  const formattedData = {
    orderID: order.bookingId,
    bookingStatus: order.scheduleInfo.bookingStatus.name,
    patientRelativesName: order.patientRelativesName || "Không có người thân",
    patientRelativesPhoneNumber:
      order.patientRelativesPhoneNumber || "Không có số điện thoại",
    patientId: order.patientInfo.patientId,
    patientName: order.patientInfo.fullName,
    patientPhoneNumber: order.patientInfo.phoneNumber,
    patientEmail: order.patientInfo.email,
    patientAddress: order.patientInfo.address,
    packageScheduleId: order.scheduleInfo.packageScheduleId,
    medicalHealthCheckPackageId: order.scheduleInfo.medicalHealthCheckPackageId,
    medicalHealthCheckPackageName:
      order.scheduleInfo.medicalHealthCheckPackageName,
    scheduleTime: order.scheduleInfo.scheduleTime,
    scheduleDate: new Date(order.scheduleInfo.scheduleDate).toLocaleDateString(
      "vi-VN"
    ),
    bookingPackageName: order.scheduleInfo.bookingPackageInfo.name,
    bookingPackagePrice: new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(order.scheduleInfo.bookingPackageInfo.price),
    bookingReason: order.bookingReason,
    bookingMethod: order.purchaseMethodId,
    clinicName: order.clinicInfo.clinicFullName,
    clinicBranchName: order.clinicInfo.clinicBranchName,
    clinicAddress: order.clinicInfo.clinicBranchAddress,
    createdAt: new Date(order.createdAt).toLocaleString("vi-VN"),
    updatedAt: new Date(order.updatedAt).toLocaleString("vi-VN"),
  };

  console.log("Formatted Data", formattedData);
  return formattedData;
};

const OrderInfoManagement = () => {
  const { serviceId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await getHealthCheckPackageScheduleBookingDetail(serviceId);
        if (res.data) {
          const formattedOrder = formatData(res.data);
          setOrder(formattedOrder);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [serviceId]);

  const handleStatusChange = (newStatus) => {
    console.log("New status:", newStatus);
    // Handle the status change, e.g., API call
  };

  if (loading) {
    return (
      <div className="text-center my-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-2">Đang tải thông tin đơn hàng...</p>
      </div>
    );
  }

  if (error) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container fluid="md" className="management-container py-4">
      <OrderDetails order={order} onStatusChange={handleStatusChange} />
    </Container>
  );
};

export default OrderInfoManagement;
