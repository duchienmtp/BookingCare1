import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./Doctor.scss";

function Doctor(props) {
  let { className } = props;

  const [schedules, setSchedules] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef(null);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    setSchedules([
      {
        id: 1,
        timeRange: "08:00 - 08:30",
      },
      {
        id: 2,
        timeRange: "08:30 - 09:00",
      },
      {
        id: 3,
        timeRange: "09:00 - 09:30",
      },
      {
        id: 4,
        timeRange: "09:30 - 10:00",
      },
      {
        id: 5,
        timeRange: "10:00 - 10:30",
      },
      {
        id: 6,
        timeRange: "10:30 - 11:00",
      },
      {
        id: 7,
        timeRange: "11:00 - 11:30",
      },
      {
        id: 8,
        timeRange: "13:00 - 13:30",
      },
      {
        id: 9,
        timeRange: "13:30 - 14:00",
      },
      {
        id: 10,
        timeRange: "14:00 - 14:30",
      },
      {
        id: 11,
        timeRange: "14:30 - 15:00",
      },
    ]);
  }, []);

  return (
    <>
      <div className={`individual-doctor-item ${className}`}>
        <div className="doctor-info-section">
          <div className="doctor-info-summary">
            <div className="doctor-image">
              <div className="img-container">
                <img
                  src="/src/assets/images/doctor-images/075004bac-si-duong-thi-thanh-huyen.jpg"
                  alt="aaa"
                />
              </div>

              {className === "list-type" && (
                <div className="see-more">
                  <Link to="/dich-vu-y-te/kham-chuyen-khoa/pho-giao-su-tien-si-bac-si-nguyen-trong-hung-i172">
                    <span>Xem thêm</span>
                  </Link>
                </div>
              )}
            </div>
            <div className="doctor-info-summary-content">
              <div className="page-header">
                <h1 className="page-title">
                  <div className="favorite-section">
                    <div className="img-container">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                        preserveAspectRatio="none"
                        width={14}
                        height={14}
                        fill="#fff"
                      >
                        <path d="m47.6 300.4 180.7 168.7c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9l180.7-168.7c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141-45.6-7.6-92 7.3-124.6 39.9l-12 12-12-12c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5" />
                      </svg>
                    </div>
                    <div className="favorite-title">
                      <span>Yêu thích</span>
                    </div>
                  </div>
                  Bác sĩ Chuyên khoa II Nguyễn Tiến Thành
                </h1>
              </div>
              <div className="achievement-section">
                <span>
                  Hơn 15 năm kinh nghiệm trong chuyên khoa Da liễu và thế mạnh
                  chính về Laser sắc tố da
                  <br />
                  Phó Trưởng phòng Quản lý chất lượng, Bệnh viện Da liễu Trung
                  ương
                  <br />
                  Bác sĩ khoa Laser và săn sóc da, Bệnh viện Da liễu Trung ương
                </span>
              </div>
              <div className="place-section">
                <div className="img-container">
                  <svg
                    xmlSpace="preserve"
                    width={14}
                    height={14}
                    preserveAspectRatio="none"
                    viewBox="0 0 42 42"
                    fill="#000"
                  >
                    <path
                      fillRule="evenodd"
                      d="M33 13.924C33 6.893 27.594 1 20.51 1S8 6.897 8 13.93C8 16.25 8.324 18 9.423 20h-.021l10.695 20.621c.402.551.824-.032.824-.032C20.56 41.13 31.616 20 31.616 20h-.009C32.695 18 33 16.246 33 13.924m-18.249-.396c0-3.317 2.579-6.004 5.759-6.004 3.179 0 5.76 2.687 5.76 6.004s-2.581 6.005-5.76 6.005c-3.18 0-5.759-2.687-5.759-6.005"
                    />
                  </svg>
                </div>
                <div className="place-title">
                  <span>Hà Nội</span>
                </div>
              </div>
              <div className="like-share-buttons"></div>
            </div>
          </div>
        </div>
        <div className="booking-section">
          <div className="left-content">
            <div className="schedule-this-week-dropdown" onClick={openModal}>
              <div className="schedule-title">
                <span>Chủ nhật - 18/8</span>
              </div>
              <div className="img-container">
                <svg
                  viewBox="0 0 24 24"
                  preserveAspectRatio="none"
                  width={22}
                  fill="#337ab7"
                  height={22}
                >
                  <path d="M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6z" />
                </svg>
              </div>
            </div>
            <div className="schedule-header">
              <div className="img-container">
                <svg
                  viewBox="0 0 24 24"
                  preserveAspectRatio="none"
                  width={16}
                  fill="#333"
                  height={16}
                >
                  <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2m0 16H5V10h14zM9 14H7v-2h2zm4 0h-2v-2h2zm4 0h-2v-2h2zm-8 4H7v-2h2zm4 0h-2v-2h2zm4 0h-2v-2h2z" />
                </svg>
              </div>
              <span>lịch khám</span>
            </div>
            <div className="schedule-list">
              {schedules &&
                schedules.length > 0 &&
                schedules.map((item) => {
                  return (
                    <div className="schedule-item" key={item.id}>
                      <Link>
                        <div className="schedule-time-title">
                          <span>{item.timeRange}</span>
                        </div>
                      </Link>
                    </div>
                  );
                })}
            </div>
            <div className="booking-instruction">
              <span>Chọn&nbsp;</span>
              <div className="img-container">
                <svg
                  viewBox="0 0 448 512"
                  preserveAspectRatio="none"
                  width={14}
                  fill="#333"
                  height={16}
                >
                  <path d="M105.6 83.2v86.177a115.52 115.52 0 0 0-22.4-2.176c-47.914 0-83.2 35.072-83.2 92 0 45.314 48.537 57.002 78.784 75.707 12.413 7.735 23.317 16.994 33.253 25.851l.146.131.148.129C129.807 376.338 136 384.236 136 391.2v2.679c-4.952 5.747-8 13.536-8 22.12v64c0 17.673 12.894 32 28.8 32h230.4c15.906 0 28.8-14.327 28.8-32v-64c0-8.584-3.048-16.373-8-22.12V391.2c0-28.688 40-67.137 40-127.2v-21.299c0-62.542-38.658-98.8-91.145-99.94-17.813-12.482-40.785-18.491-62.791-15.985A93.148 93.148 0 0 0 272 118.847V83.2C272 37.765 234.416 0 188.8 0c-45.099 0-83.2 38.101-83.2 83.2m118.4 0v91.026c14.669-12.837 42.825-14.415 61.05 4.95 19.646-11.227 45.624-1.687 53.625 12.925 39.128-6.524 61.325 10.076 61.325 50.6V264c0 45.491-35.913 77.21-39.676 120H183.571c-2.964-25.239-21.222-42.966-39.596-59.075-12.65-11.275-25.3-21.725-39.875-30.799C80.712 279.645 48 267.994 48 259.2c0-23.375 8.8-44 35.2-44 35.2 0 53.075 26.4 70.4 26.4V83.2c0-18.425 16.5-35.2 35.2-35.2 18.975 0 35.2 16.225 35.2 35.2M352 424c13.255 0 24 10.745 24 24s-10.745 24-24 24-24-10.745-24-24 10.745-24 24-24" />
                </svg>
              </div>
              <span>&nbsp;và đặt (Phí đặt lịch 0đ)</span>
            </div>
          </div>
          <div className="right-content">
            <div className="address-section">
              <div className="address-header">
                <span>địa chỉ khám</span>
              </div>
              <div className="clinic-name">
                <span>Phòng khám Hello Doctor cơ sở TP.HCM</span>
              </div>
              <div className="clinic-address">
                <span>152/6 Thành Thái, phường 12, quận 10, TP.HCM</span>
              </div>
            </div>
            <div className="price-section">
              <div className="price">
                <span>giá khám:&nbsp;</span>
                <span>300.000đ</span>
              </div>
              <div className="see-detail">
                <span>&nbsp;Xem chi tiết</span>
              </div>
            </div>
            <div className="price-section">
              <div className="price">
                <span>Lọai bảo hiểm áp dụng:&nbsp;</span>
              </div>
              <div className="see-detail">
                <span>&nbsp;Xem chi tiết</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`schedule-modal-overlay ${isModalOpen ? "open" : ""}`}
        ref={modalRef}
        onClick={closeModal}
      >
        <div className={`schedule-modal ${isModalOpen ? "open" : ""}`}>
          <div className="schedule-list">
            <div className="button-container">
              <button type="button">Hôm nay - 18/8</button>
            </div>
            <div className="button-container">
              <button type="button">Thứ 2 - 19/8</button>
            </div>
            <div className="button-container">
              <button type="button">Thứ 3 - 20/8</button>
            </div>
            <div className="button-container">
              <button type="button">Thứ 4 - 21/8</button>
            </div>
            <div className="button-container">
              <button type="button">Thứ 5 - 22/8</button>
            </div>
            <div className="button-container">
              <button type="button">Thứ 6 - 23/8</button>
            </div>
            <div className="button-container">
              <button type="button">Thứ 7 - 24/8</button>
            </div>
            <div className="button-container" onClick={closeModal}>
              <button type="button">Bỏ qua</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Doctor;
