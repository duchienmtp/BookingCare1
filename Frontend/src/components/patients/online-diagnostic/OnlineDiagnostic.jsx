import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "./OnlineDiagnostic.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SquarePageBanner from "../../partials/PageBanner/squarePageBanner/SquarePageBanner";
import SliderNextArrow from "../../partials/slider-arrow/slider-next-arrow/SliderNextArrow";
import SliderPrevArrow from "../../partials/slider-arrow/slider-prev-arrow/SliderPrevArrow";
import SeeMoreButton from "../../partials/main-page-section/see-more-button/SeeMoreButton";
import SectionHeaderTitle from "../../partials/main-page-section/section-title/SectionHeaderTitle";
import CameraSVG from "../../../assets/images/camera-icon.svg?react";

function OnlineDiagnostic() {
  const [onlineDiagnostics, setOnlineDiagnostics] = useState([]);

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
    setOnlineDiagnostics([
      {
        id: 1,
        title: "Tư vấn, trị liệu Tâm lý từ xa",
        image: "/src/assets/images/online-diagnostic-images/tam-ly-tu-xa.png",
      },
      {
        id: 2,
        title: "Sức khỏe tâm thần từ xa",
        image:
          "/src/assets/images/online-diagnostic-images/tam-than-tu-xa-1.png",
      },
      {
        id: 3,
        title: "Bác sĩ Da liễu từ xa",
        image: "/src/assets/images/online-diagnostic-images/da-lieu-tu--xa.png",
      },
      {
        id: 4,
        title: "Bác sĩ Cơ-Xương-Khớp từ xa",
        image:
          "/src/assets/images/online-diagnostic-images/co-xuong-khop-tu-xa.png",
      },
      {
        id: 5,
        title: "Bác sĩ Tiêu hóa từ xa",
        image:
          "/src/assets/images/online-diagnostic-images/tieu-hoa-tu--xa.png",
      },
      {
        id: 6,
        title: "Bác sĩ Nội khoa từ xa",
        image: "/src/assets/images/online-diagnostic-images/noi-khoa-tu-xa.png",
      },
      {
        id: 7,
        title: "Bác sĩ Sản phụ khoa từ xa",
        image:
          "/src/assets/images/online-diagnostic-images/san-phu-khoa-tu-xa.png",
      },
      {
        id: 8,
        title: "Bác sĩ Tim mạch từ xa",
        image:
          "/src/assets/images/online-diagnostic-images/tim-mach-tu--xa.png",
      },
      {
        id: 9,
        title: "Bác sĩ Nhi từ xa",
        image: "/src/assets/images/online-diagnostic-images/nhi-khoa-tu-xa.png",
      },
      {
        id: 10,
        title: "Bác sĩ Tai-Mũi-Họng từ xa",
        image:
          "/src/assets/images/online-diagnostic-images/tai-mui-hong-tu--xa.png",
      },
      {
        id: 11,
        title: "Bác sĩ Thần kinh từ xa",
        image:
          "/src/assets/images/online-diagnostic-images/than-kinh-tu-xa.png",
      },
      {
        id: 12,
        title: "Bác sĩ tư vấn F0",
        image:
          "/src/assets/images/online-diagnostic-images/tu-van-f0-tu-xa.png",
      },
    ]);
  }, []);

  return (
    <div className="app-container">
      <div className="md-pl-10 online-diagnostics">
        <div className="online-diagnostics-header">
          <SectionHeaderTitle title="Khám từ xa" />
          <SeeMoreButton path="danh-sach/chuyen-khoa/kham-tu-xa" />
        </div>
        <div className="online-diagnostics-content">
          <div className="online-diagnostics-slider">
            <Slider {...settings}>
              {onlineDiagnostics && onlineDiagnostics.length > 0
                ? onlineDiagnostics.map((item) => {
                    return (
                      <SquarePageBanner
                        key={item.id}
                        item={item}
                        className="online-diagnostic"
                        aspectRatio="aspect-ratio-330-216"
                        svg={<CameraSVG />}
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

export default OnlineDiagnostic;
