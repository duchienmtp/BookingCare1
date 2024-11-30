import React, { useState, useEffect, useRef } from "react";
import "./BookingList.scss";
import Doctor from "../../../../doctors/Doctor";

function BookingList() {
  const [isShowDetailInfo, setIsShow] = useState(false);
  const doctorDetailInfoRef = useRef(null);
  const [isShowFilterDropdown, setIsShowFilterDropdown] = useState(false);
  const filterDropdownRef = useRef(null);

  useEffect(() => {
    // Scroll to the top when the component mounts
    window.scrollTo(0, 0);
  }, []);

  const handleShowDetailInfo = () => {
    setIsShow(!isShowDetailInfo);
  };

  const handleShowFilterDropdown = () => {
    setIsShowFilterDropdown(!isShowFilterDropdown);
  };

  useEffect(() => {
    if (isShowDetailInfo) {
      doctorDetailInfoRef.current.style.overflow = "visible";
      doctorDetailInfoRef.current.style.height = "auto";
    } else {
      doctorDetailInfoRef.current.style.overflow = "hidden";
      doctorDetailInfoRef.current.style.height = "150px";
    }

    if (isShowFilterDropdown) {
      filterDropdownRef.current.classList.add("open");
    } else {
      filterDropdownRef.current.classList.remove("open");
    }
  }, [isShowDetailInfo, isShowFilterDropdown]);

  return (
    <div className="booking-list-section">
      <div className="doctor-detail-info-section">
        <div className="app-container">
          <h1>Cơ xương khớp</h1>
          <div className="doctor-detail-info" ref={doctorDetailInfoRef}>
            <h2>Bác sĩ Cơ Xương Khớp giỏi</h2>
            <p>
              Danh sách các bác sĩ uy tín đầu ngành Cơ Xương Khớp tại Việt Nam:
            </p>
            <ul>
              <li>
                Các chuyên gia có quá trình đào tạo bài bản, nhiều kinh nghiệm
              </li>
              <li>
                Các giáo sư, phó giáo sư đang trực tiếp nghiên cứu và giảng dạy
                tại Đại học Y khoa Hà Nội
              </li>
              <li>
                Các bác sĩ đã, đang công tác tại các bệnh viện hàng đầu Khoa Cơ
                Xương Khớp - Bệnh viện Bạch Mai, Bệnh viện Hữu nghị Việt
                Đức,Bệnh Viện E.
              </li>
              <li>
                Là thành viên hoặc lãnh đạo các tổ chức chuyên môn như: Hiệp hội
                Cơ Xương Khớp, Hội Thấp khớp học,...
              </li>
              <li>
                Được nhà nước công nhận các danh hiệu Thầy thuốc Nhân dân, Thầy
                thuốc Ưu tú, Bác sĩ Cao cấp,...
              </li>
            </ul>
            <h2>Bệnh Cơ Xương Khớp</h2>
            <ul>
              <li>Gout</li>
              <li>Thoái hóa khớp: khớp gối, cột sống thắt lưng, cột sống cổ</li>
              <li>Viêm khớp dạng thấp, Viêm đa khớp, Viêm gân</li>
              <li>
                Tràn dịch khớp gối, Tràn dịch khớp háng, Tràn dịch khớp khủy,
                Tràn dịch khớp vai
              </li>
              <li>Loãng xương, đau nhức xương</li>
              <li>Viêm xương, gai xương</li>
              <li>Viêm cơ, Teo cơ, chứng đau mỏi cơ</li>
              <li>Yếu cơ, Loạn dưỡng cơ</li>
              <li>Các chấn thương về cơ, xương, khớp</li>
              <li>...</li>
            </ul>
          </div>
          <div className="show-hide-button">
            <span onClick={handleShowDetailInfo}>
              {isShowDetailInfo ? "Ẩn bớt" : "Xem thêm"}
            </span>
          </div>
        </div>
      </div>
      <div className="doctors-schedule-section md-px-10">
        <div className="app-container">
          <div className="filter-section">
            <div className="filter-dropdown" onClick={handleShowFilterDropdown}>
              <span>Toàn quốc</span>
              <div className="img-container">
                <svg
                  width={16}
                  height={16}
                  fill="#000"
                  className="chevron-down_svg__bi chevron-down_svg__bi-chevron-down"
                  preserveAspectRatio="none"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"
                  />
                </svg>
              </div>
              <div className="filter-dropdown-content" ref={filterDropdownRef}>
                <div className="filter-item">
                  <span>Toàn quốc</span>
                </div>
                <div className="filter-item">
                  <span>Hà Nội</span>
                </div>
                <div className="filter-item">
                  <span>Hồ Chí Minh</span>
                </div>
              </div>
            </div>
          </div>
          <div className="doctors-schedule-list">
            <div className="doctor-schedule-item">
              <Doctor className="list-type" />
            </div>
          </div>
        </div>
      </div>
      <div className="see-more-section">
        <div className="app-container">
          <span>Cần tìm hiểu thêm ?</span>
          <a href="/">
            <span>xem câu hỏi thường gặp.</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default BookingList;
