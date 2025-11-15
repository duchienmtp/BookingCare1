// Updated OrderInfo Component
import React, { useState } from "react";
import { Card, Row, Col, Badge, Button } from "react-bootstrap";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import { adminPath } from "../../../../../../utils/constants";
import "./OrderInfo.scss";

const statusMap = {
  pending: { label: "Chờ xác nhận", className: "status-yellow" },
  confirmed: { label: "Đã xác nhận", className: "status-blue" },
  completed: { label: "Hoàn thành", className: "status-green" },
  cancelled: { label: "Đã hủy", className: "status-red" },
  no_show: { label: "Không đến", className: "status-gray" },
};

const statusOptions = [
  { value: "pending", label: "Chờ xác nhận" },
  { value: "confirmed", label: "Đã xác nhận" },
  { value: "completed", label: "Hoàn thành" },
  { value: "cancelled", label: "Đã hủy" },
  { value: "no_show", label: "Không đến" },
];

const statusColorMap = {
  pending: {
    text: "#b07800",
    background: "#fff8e6",
    hoverBg: "#fff1cc",
  },
  confirmed: {
    text: "#0050d0",
    background: "#e6f0ff",
    hoverBg: "#cce1ff",
  },
  completed: {
    text: "#00a000",
    background: "#e6ffe6",
    hoverBg: "#ccffcc",
  },
  cancelled: {
    text: "#d00000",
    background: "#ffe6e6",
    hoverBg: "#ffcccc",
  },
  no_show: {
    text: "#808080",
    background: "#f2f2f2",
    hoverBg: "#e6e6e6",
  },
};

const OrderInfo = ({ order, onStatusChange }) => {
  const navigate = useNavigate();
  const [selectedStatus, setSelectedStatus] = useState(order.bookingStatus);
  const [isStatusChanged, setIsStatusChanged] = useState(false);

  // Custom styles for react-select to match the component theme
  const customSelectStyles = {
    control: (base, state) => ({
      ...base,
      minHeight: "38px",
      backgroundColor: "transparent",
      borderColor: "#e5e7eb",
      borderRadius: "8px",
      boxShadow: state.isFocused ? "0 0 0 2px #6b21a8" : "none",
      "&:hover": {
        borderColor: "#6b21a8",
      },
    }),
    option: (base, { data, isSelected, isFocused }) => ({
      ...base,
      backgroundColor: isSelected
        ? statusColorMap[data.value].hoverBg
        : isFocused
        ? statusColorMap[data.value].background
        : "transparent",
      color: statusColorMap[data.value].text,
      padding: "8px 12px",
      cursor: "pointer",
      fontWeight: "500",
      "&:active": {
        backgroundColor: statusColorMap[data.value].hoverBg,
      },
      "&:hover": {
        backgroundColor: statusColorMap[data.value].hoverBg,
      },
    }),
    singleValue: (base, { data }) => ({
      ...base,
      color: statusColorMap[data.value].text,
      fontWeight: "500",
    }),
    menu: (base) => ({
      ...base,
      borderRadius: "8px",
      boxShadow:
        "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
      border: "1px solid #e5e7eb",
      overflow: "hidden",
    }),
    menuList: (base) => ({
      ...base,
      padding: "4px",
    }),
    // Add styles for the dropdown indicator
    dropdownIndicator: (base, state) => ({
      ...base,
      color: "#6b7280",
      transition: "all .2s ease",
      transform: state.selectProps.menuIsOpen ? "rotate(180deg)" : null,
      "&:hover": {
        color: "#6b21a8",
      },
    }),
    // Add styles for the indicator separator
    indicatorSeparator: (base) => ({
      ...base,
      backgroundColor: "#e5e7eb",
    }),
  };

  const handleStatusChange = (selectedOption) => {
    setSelectedStatus(selectedOption.value);
    setIsStatusChanged(true);
  };

  const handleConfirm = async () => {
    try {
      // await onStatusChange(selectedStatus);
      navigate(adminPath.ORDERS_MANAGEMENT_PAGE.LIST.path);
    } catch (error) {
      console.error("Error updating status:", error);
      // Handle error (show notification, etc.)
    }
  };

  return (
    <Card className="order-card">
      <Card.Body>
        {/* Header Section */}
        <Row className="mb-4 border-bottom pb-3 align-items-center">
          <Col md={6}>
            <h1 className="h4 mb-0">
              <Badge bg="light" className="me-2 id-badge order-id">
                {order.orderID}
              </Badge>
              <span
                className={`status-badge ${
                  statusMap[order.bookingStatus].className
                }`}
              >
                {statusMap[order.bookingStatus].label}
              </span>
            </h1>
            <div className="text-muted small mt-2">
              <span className="me-3">Ngày tạo: {order.createdAt}</span>
              <span>Cập nhật cuối: {order.updatedAt}</span>
            </div>
          </Col>
          <Col md={6}>
            <div className="status-select-container">
              <label className="status-select-label">Cập nhật trạng thái</label>
              <div className="status-actions">
                <Select
                  options={statusOptions}
                  value={statusOptions.find(
                    (option) => option.value === selectedStatus
                  )}
                  onChange={handleStatusChange}
                  styles={customSelectStyles}
                  isSearchable={false}
                  className="booking-status-select"
                />
                <Button
                  variant="purple"
                  disabled={!isStatusChanged}
                  onClick={handleConfirm}
                  className="confirm-button"
                >
                  Xác nhận
                </Button>
              </div>
            </div>
          </Col>
        </Row>

        {/* Main Content */}
        <Row>
          {/* Patient Information Column */}
          <Col md={4} className="border-end pe-4">
            <h5 className="section-title text-purple mb-4">
              Thông tin bệnh nhân
            </h5>
            <dl className="info-list">
              <dt>ID Bệnh nhân:</dt>
              <dd className="id-badge patient-id">{order.patientId}</dd>

              <dt>Họ tên:</dt>
              <dd>{order.patientName}</dd>

              <dt>Địa chỉ:</dt>
              <dd>{order.patientAddress}</dd>

              <dt>Liên hệ:</dt>
              <dd>
                <div>Số điện thoại: {order.patientPhoneNumber}</div>
                <div>Email: {order.patientEmail}</div>
              </dd>

              {order.patientRelativesName && (
                <>
                  <dt>Người đặt hộ:</dt>
                  <dd>
                    <div>{order.patientRelativesName}</div>
                    <div>{order.patientRelativesPhoneNumber}</div>
                  </dd>
                </>
              )}
            </dl>
          </Col>

          {/* Appointment Details Column */}
          <Col md={4} className="border-end pe-4">
            <h5 className="section-title text-purple mb-4">
              Thông tin lịch hẹn
            </h5>
            <dl className="info-list">
              <dt>ID Gói khám:</dt>
              <dd>
                <div className="id-badge doctor-id mt-1">
                  {order.medicalHealthCheckPackageId}
                </div>
              </dd>

              <dt>Tên gói khám:</dt>
              <dd>{order.medicalHealthCheckPackageName}</dd>

              <dt>ID Lịch trình:</dt>
              <dd className="id-badge doctor-schedule-id mt-1">
                {order.packageScheduleId}
              </dd>

              <dt>Thời gian:</dt>
              <dd>
                <span>{order.scheduleDate}</span> vào lúc{" "}
                <span className="text-primary">{order.scheduleTime}</span>
              </dd>

              <dt>Loại gói khám:</dt>
              <dd>
                {order.bookingPackageName}
                <div className="price-display mt-1">
                  {order.bookingPackagePrice}
                </div>
              </dd>

              <dt>Lý do khám:</dt>
              <dd className="text-muted">{order.bookingReason}</dd>

              <dt>Hình thức:</dt>
              <dd>{order.bookingMethod}</dd>
            </dl>
          </Col>

          {/* Clinic Information Column */}
          <Col md={4}>
            <h5 className="section-title text-purple mb-4">
              Thông tin phòng khám
            </h5>
            <dl className="info-list">
              <dt>Cơ sở:</dt>
              <dd>
                {order.clinicName}
                <div className="text-muted">{order.clinicBranchName}</div>
              </dd>

              <dt>Địa chỉ:</dt>
              <dd>{order.clinicAddress}</dd>
            </dl>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default OrderInfo;
