import React, { useEffect, useState } from "react";
import "./ForDoctorAndClinic.scss";
import SectionHeaderTitle from "../../partials/main-page-section/section-title/SectionHeaderTitle";
import CustomSlider from "../../partials/custom-slider/CustomSlider";
import Post from "../../partials/PageBanner/post/Post";

function ForDoctorAndClinic() {
  const [forDoctorAndClinicGuides, setForDoctorAndClinicGuides] = useState([]);

  useEffect(() => {
    setForDoctorAndClinicGuides([
      {
        id: 1,
        title:
          "10X Content là gì? Cách xây dựng Content SEO Y tế theo 10X Content",
        image:
          "/src/assets/images/for-doctor-and-clinic-images/132939-10x-content-seo-y-te.png",
      },
      {
        id: 2,
        title: "Cách sử dụng Google Keyword Planner để chọn từ khóa bài viết",
        image:
          "/src/assets/images/for-doctor-and-clinic-images/175657-cach-su-dung-google-keyword-planner.png",
      },
      {
        id: 3,
        title: "Các Module quan trọng trong thiết kế Website phòng khám",
        image:
          "/src/assets/images/for-doctor-and-clinic-images/172027-module-thiet-ke-website-phong-kham.jpg",
      },
      {
        id: 4,
        title:
          "Marketing phòng khám - Phần 1: Chiến lược tập trung vào chất lượng khám chữa bệnh",
        image:
          "/src/assets/images/for-doctor-and-clinic-images/134643-marketing-phong-kham-1.png",
      },
      {
        id: 5,
        title:
          "7 sáng kiến giúp giảm thời gian chờ trong bệnh viện, phòng khám",
        image:
          "/src/assets/images/for-doctor-and-clinic-images/172415-sang-kien-giam-thoi-gian-cho-trong-benh-vien.png",
      },
      {
        id: 6,
        title: "Dùng thử BookingCare_DX bản miễn phí, có những tính năng gì?",
        image:
          "/src/assets/images/for-doctor-and-clinic-images/150002-tinh-nang-dung-thu-bookingcare-dx.png",
      },
      {
        id: 7,
        title: "4 Lợi ích Giải pháp Chuyển đổi số Phòng khám BookingCare_DX",
        image:
          "/src/assets/images/for-doctor-and-clinic-images/174911-chuyen-doi-so-bookingcare-dx.png",
      },
      {
        id: 8,
        title: "Lean Startup là gì? Ứng dụng trong Marketing phòng khám",
        image:
          "/src/assets/images/for-doctor-and-clinic-images/120624-lean-startup-marketing-phong-kham.png",
      },
      {
        id: 9,
        title:
          "Marketing phòng khám trên Facebook: Cách viết Content Facebook thu hút",
        image:
          "/src/assets/images/for-doctor-and-clinic-images/160728-content-facebook-phong-kham.png",
      },
      {
        id: 10,
        title: "Hướng dẫn chi tiết 7 bước sản xuất Content chuẩn SEO Y tế",
        image:
          "/src/assets/images/for-doctor-and-clinic-images/164110-san-xuat-content-chuan-seo-y-te.png",
      },
      {
        id: 11,
        title: "Chiến lược Online Marketing phòng khám: Trọn bộ từ A đến Z",
        image:
          "/src/assets/images/for-doctor-and-clinic-images/164710-kenh-online-marketing-benh-vien-phong-kham.png",
      },
      {
        id: 12,
        title:
          "SEO trong Marketing y tế có quan trọng? 5 Lưu ý đặc biệt cho cơ sở y tế",
        image:
          "/src/assets/images/for-doctor-and-clinic-images/160401-seo-y-te.png",
      },
      {
        id: 13,
        title: "Nguyên tắc quan trọng trong SEO Y tế để lên Top Google",
        image:
          "/src/assets/images/for-doctor-and-clinic-images/154856-nguyen-tac-seo-y-te.png",
      },
      {
        id: 14,
        title: "Gợi ý 5 ý tưởng Marketing phòng khám giúp thu hút khách hàng",
        image:
          "/src/assets/images/for-doctor-and-clinic-images/092553-y-tuong-marketing-phong-kham-1.png",
      },
      {
        id: 15,
        title: "5 lỗi cơ bản cần tránh trong thiết kế Website phòng khám",
        image:
          "/src/assets/images/for-doctor-and-clinic-images/225606-loi-thiet-ke-website-phong-kham.jpg",
      },
      {
        id: 16,
        title: "6 nguyên tắc Thiết kế Website phòng khám chuẩn SEO",
        image:
          "/src/assets/images/for-doctor-and-clinic-images/090303-thiet-ke-website-phong-kham-chuan-seo.png",
      },
    ]);
  }, []);

  return (
    <div className="app-container">
      <div className="md-pl-10 for-doctor-and-clinic-guides">
        <div className="for-doctor-and-clinic-guides-header">
          <SectionHeaderTitle title="Dành cho bác sĩ và cơ sở y tế" />
          <div className="group-btns">
            <button className="grey-btn">
              <span>Bài viết</span>
            </button>
            <button className="grey-btn">
              <span>Hợp tác</span>
            </button>
            <button className="grey-btn">
              <span>Liên hệ</span>
            </button>
          </div>
        </div>
        <div className="for-doctor-and-clinic-guides-content">
          <div className="for-doctor-and-clinic-guides-slider">
            <CustomSlider data={forDoctorAndClinicGuides}>
              {forDoctorAndClinicGuides &&
                forDoctorAndClinicGuides.length > 0 &&
                forDoctorAndClinicGuides.map((item) => {
                  return (
                    <div key={item.id}>
                      <Post
                        item={item}
                        className="for-doctor-and-clinic-guide"
                        aspectRatio="aspect-ratio-1200-628"
                      />
                    </div>
                  );
                })}
            </CustomSlider>
          </div>
        </div>
        <div className="group-btns">
          <button className="grey-btn">
            <span>Bài viết</span>
          </button>
          <button className="grey-btn">
            <span>Hợp tác</span>
          </button>
          <button className="grey-btn">
            <span>Liên hệ</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ForDoctorAndClinic;
