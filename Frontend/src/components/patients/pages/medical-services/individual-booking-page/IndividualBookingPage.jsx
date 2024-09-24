import React, { useEffect, useState, useRef } from "react";
import "./IndividualBookingPage.scss";
import { Link } from "react-router-dom";
import Doctor from "../../../../doctors/Doctor";

function IndividualBookingPage() {
  const [scheduleDate, setScheduleDate] = useState([]);

  const daysOfWeek = {
    Mon: "Thứ Hai",
    Tue: "Thứ Ba",
    Wed: "Thứ Tư",
    Thu: "Thứ Năm",
    Fri: "Thứ Sáu",
    Sat: "Thứ Bảy",
    Sun: "Chủ Nhật",
  };

  useEffect(() => {
    // const today = new Date();
    // const tomorrow = new Date(today);
    // tomorrow.setDate(today.getDate() + 1);
    // console.log(">>> Check tomorrow: ", tomorrow);
    // let dayOfWeek = today.toLocaleDateString("en-US", { weekday: "short" });
    // let todayDate =
    //   daysOfWeek[dayOfWeek] +
    //   " - " +
    //   today.getDate() +
    //   "/" +
    //   (today.getMonth() + 1);
    // console.log(todayDate);
    // console.log(">>> Check todayDate: ", todayDate);
  }, []);

  return (
    <>
      <div className="upper-content">
        <div className="app-container">
          <Doctor className="individual-type" />
        </div>
      </div>
      <div className="lower-content">
        <div className="app-container">
          <div className="doctor-detail-info md-px-10">
            <h2>Bác sĩ CKII Tai Mũi Họng Đoàn Tiến Thành </h2>
            <ul>
              <li>Bác sĩ Chuyên khoa II - Chuyên khoa Tai Mũi Họng</li>
              <li>
                Tốt nghiệp Bác sĩ Chuyên khoa Tai Mũi Họng tại Học Viện Quân Y
                năm 1992
              </li>
              <li>
                Tốt nghiệp Bác sĩ Chuyên khoa II tại Đại học Y Hà Nội năm 2010
              </li>
              <li>Công tác tại Bệnh viện Quân y 354 từ năm 1992</li>
              <li>Phó trưởng khoa Tai Mũi Họng- Bệnh viện Quân y 354 </li>
              <li>
                Bác sĩ chuyên khoa uy tín, đã có hơn 30 năm kinh nghiệm khám và
                điều trị các bệnh lý về Tai Mũi Họng
              </li>
            </ul>
            <h2>Khám & điều trị</h2>
            <ul>
              <li>Khám chuyên khoa Tai Mũi Họng</li>
              <li>Nội soi Tai Mũi Họng</li>
              <li>
                Chuyên khám và điều trị các bệnh về Tai Mũi Họng cả người lớn và
                trẻ em
              </li>
            </ul>
            <h2>Các bệnh về tai</h2>
            <ul>
              <li>Ù tai, nghe kém, điếc đột ngột</li>
              <li>Chẩy mủ tai, viêm tai giữa cấp, mạn.</li>
              <li>
                Phát hiện sớm và điều trị viêm tai giữa màng nhĩ đóng kín, không
                chẩy mủ ra ngoài
              </li>
            </ul>
            <h2>Các bệnh mũi xoang</h2>
            <ul>
              <li>Viêm mũi xoang dị ứng, viêm mũi vận mạch.</li>
              <li>Viêm mũi ngạt tắc mũi mạn tính</li>
              <li>Viêm đa xoang mạn lâu ngày khó khỏi, polyp mũi xoang</li>
              <li>Nấm mũi xoang</li>
              <li>Đau đầu mạn tính do mũi xoang…</li>
            </ul>
            <h2>Các bệnh về họng thanh quản</h2>
            <ul>
              <li>Ở trẻ em viêm VA</li>
              <li>Viêm mũi họng mạn tính</li>
              <li>Viêm tai thanh dịch</li>
              <li>Viêm tai giữa cấp</li>
              <li>Viêm thanh khí phế quản</li>
              <li>Viêm amiđan cấp, mạn...</li>
            </ul>
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
    </>
  );
}

export default IndividualBookingPage;
