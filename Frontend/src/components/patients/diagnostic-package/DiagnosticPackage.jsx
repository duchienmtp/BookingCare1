import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "./DiagnosticPackage.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SquarePageBanner from "../../partials/PageBanner/squarePageBanner/SquarePageBanner";
import SliderNextArrow from "../../partials/slider-arrow/slider-next-arrow/SliderNextArrow";
import SliderPrevArrow from "../../partials/slider-arrow/slider-prev-arrow/SliderPrevArrow";
import SeeMoreButton from "../../partials/main-page-section/see-more-button/SeeMoreButton";
import SectionHeaderTitle from "../../partials/main-page-section/section-title/SectionHeaderTitle";

function DiagnosticPackage() {
  const [diagnosticPackages, setDiagnosticPackages] = useState([]);

  let settings = {
    dots: false,
    infinite: false,
    swipe: true,
    speed: 800,
    slidesToShow: 3,
    slidesToScroll: 3,
    variableWidth: true,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
    prevArrow: <SliderPrevArrow />,
    nextArrow: <SliderNextArrow />,
  };

  useEffect(() => {
    setDiagnosticPackages([
      {
        id: 1,
        title: "Khám Sức khỏe Toàn diện cho Nữ (1084F)",
        image:
          "/src/assets/images/diagnostic-package-images/091154-bv-1081.jpg",
      },
      {
        id: 2,
        title: "Gói khám sức khỏe tổng quát cơ bản cho nam (PKYD1M)",
        image:
          "/src/assets/images/diagnostic-package-images/093819goi-kham-suc-khoe-co-ban.jpg",
      },
      {
        id: 3,
        title: "Khám Sức khỏe cơ bản (1081)",
        image:
          "/src/assets/images/diagnostic-package-images/091154-bv-1081.jpg",
      },
      {
        id: 4,
        title: "Gói khám sức khỏe tổng quát nâng cao dành cho nữ (PKYD3F)",
        image:
          "/src/assets/images/diagnostic-package-images/150352goi-kham-dinh-ki-tam-soat-ung-thu-co-ban-nu.jpg",
      },
      {
        id: 5,
        title: "Khám Sức khỏe Toàn diện cho Nam (1084M)",
        image:
          "/src/assets/images/diagnostic-package-images/091154-bv-1081.jpg",
      },
      {
        id: 6,
        title: "Gói xét nghiệm tầm soát chức năng gan (DIAG12)",
        image:
          "/src/assets/images/diagnostic-package-images/103739xet-nghiem-mau.jpg",
      },
      {
        id: 7,
        title: "Gói khám sức khỏe tổng quát chuyên sâu dành cho nữ (PKYD4F)",
        image:
          "/src/assets/images/diagnostic-package-images/121331goi-kham-suc-khoe-toan-dien-nu.jpg",
      },
      {
        id: 8,
        title: "Gói khám sức khỏe tổng quát cơ bản cho nữ (PKYD1F)",
        image:
          "/src/assets/images/diagnostic-package-images/093819goi-kham-suc-khoe-co-ban.jpg",
      },
      {
        id: 9,
        title: "Khám Sức khỏe nâng cao (1083)",
        image:
          "/src/assets/images/diagnostic-package-images/091154-bv-1081.jpg",
      },
      {
        id: 10,
        title: "Gói khám sức khỏe tổng quát chuyên sâu dành cho nam (PKYD4M)",
        image:
          "/src/assets/images/diagnostic-package-images/114709goi-kham-suc-khoe-toan-dien-nam.jpg",
      },
      {
        id: 11,
        title:
          "Gói khám sức khỏe thi bằng lái xe tại Phòng khám Golden HealthCare ",
        image:
          "/src/assets/images/diagnostic-package-images/170209-logo-golden1.jpg",
      },
      {
        id: 12,
        title: "Gói khám tổng quát tiêu chuẩn cho nam và nữ (DC2)  ",
        image:
          "/src/assets/images/diagnostic-package-images/155158-goi-ktq-tieu-chuan-nam-va-nu.jpg",
      },
      {
        id: 13,
        title:
          "Khám Sức khỏe Định kỳ và Tầm soát ung thư cơ bản cho Nam (10818M)",
        image:
          "/src/assets/images/diagnostic-package-images/091154-bv-1081.jpg",
      },
      {
        id: 14,
        title: "Gói khám sức khỏe tổng quát nâng cao dành cho nam (PKYD3M)",
        image:
          "/src/assets/images/diagnostic-package-images/135610goi-kham-suc-khoe-nang-cao.jpg",
      },
      {
        id: 15,
        title: "Gói tầm soát ung thư vú (CIH21)",
        image:
          "/src/assets/images/diagnostic-package-images/113204ung-thu-vu-1.jpg",
      },
      {
        id: 16,
        title: "Gói khám sức khỏe thi bằng lái xe (5SAO125)",
        image:
          "/src/assets/images/diagnostic-package-images/101431-logo-5-sao.jpg",
      },
    ]);
  }, []);

  return (
    <div className="app-container">
      <div className="md-px-10 diagnostic-packages">
        <div className="diagnostic-packages-header">
          <SectionHeaderTitle title="Gói khám" />
          <SeeMoreButton path="danh-sach/bac-si/goi-kham" />
        </div>
        <div className="diagnostic-packages-content">
          <div className="diagnostic-packages-slider">
            <Slider {...settings}>
              {diagnosticPackages && diagnosticPackages.length > 0
                ? diagnosticPackages.map((item) => {
                    return (
                      <SquarePageBanner
                        key={item.id}
                        item={item}
                        className="diagnostic-package"
                        aspectRatio="aspect-ratio-330-157"
                      />
                    );
                  })
                : ""}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DiagnosticPackage;
