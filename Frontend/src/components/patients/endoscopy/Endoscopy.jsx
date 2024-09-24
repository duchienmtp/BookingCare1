import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "./Endoscopy.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SquarePageBanner from "../../partials/PageBanner/squarePageBanner/SquarePageBanner";
import SliderNextArrow from "../../partials/slider-arrow/slider-next-arrow/SliderNextArrow";
import SliderPrevArrow from "../../partials/slider-arrow/slider-prev-arrow/SliderPrevArrow";
import SeeMoreButton from "../../partials/main-page-section/see-more-button/SeeMoreButton";
import SectionHeaderTitle from "../../partials/main-page-section/section-title/SectionHeaderTitle";

function Endoscopy() {
  const [endoscopyPackages, setEndoscopyPackages] = useState([]);

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
    setEndoscopyPackages([
      {
        id: 1,
        title: "Nội Soi Dạ Dày Không Đau - Endo Clinic",
        image:
          "/src/assets/images/endoscopy-images/111220-noi-soi-da-day-khong-dau-v2.jpg",
      },
      {
        id: 2,
        title: "Nội soi dạ dày/trực tràng/đại tràng - Bệnh viện Bảo Sơn",
        image: "/src/assets/images/endoscopy-images/134748-noi-soi.jpg",
      },
      {
        id: 3,
        title: "Nội soi dạ dày - Phòng khám Vietlife",
        image: "/src/assets/images/endoscopy-images/104227-nsthcv240001.jpg",
      },
      {
        id: 4,
        title: "Nội soi đại tràng - Phòng khám Vietlife",
        image:
          "/src/assets/images/endoscopy-images/104227-logovietlifemrijpg.jpg",
      },
      {
        id: 5,
        title: "Nội soi dạ dày/trực tràng/đại tràng - Bệnh viện Quốc tế City",
        image:
          "/src/assets/images/endoscopy-images/161101-anh-dai-dien-goi-noi-soi-city.png",
      },
      {
        id: 6,
        title:
          "Nội soi dạ dày/trực tràng/đại tràng - Hệ thống Y tế Thu Cúc TCI",
        image: "/src/assets/images/endoscopy-images/154944-noi-soi-thu-cuc.jpg",
      },
      {
        id: 7,
        title: "Nội soi dạ dày/trực tràng/đại tràng - Tổ hợp y tế MEDIPLUS",
        image: "/src/assets/images/endoscopy-images/101504-anh-bia-noi-soi.jpg",
      },
      {
        id: 8,
        title:
          "Gói nội soi đại tràng - Bệnh viện Đa khoa Chữ Thập Xanh (CTX90)",
        image: "/src/assets/images/endoscopy-images/101935-logo-ctx.png",
      },
      {
        id: 9,
        title: "Gói nội soi dạ dày - Bệnh viện Đa khoa Chữ Thập Xanh (CTX90)",
        image: "/src/assets/images/endoscopy-images/101935-logo-ctx.png",
      },
      {
        id: 10,
        title:
          "Gói nội soi dạ dày và đại trực tràng - Bệnh viện Đa khoa Chữ Thập Xanh (CTX90)",
        image: "/src/assets/images/endoscopy-images/101935-logo-ctx.png",
      },
      {
        id: 11,
        title:
          "Nội soi dạ dày/trực tràng/đại tràng - Bệnh viện Đa khoa Đông Đô",
        image: "/src/assets/images/endoscopy-images/091211-logo-dong-do.jpg",
      },
      {
        id: 12,
        title: "Nội Soi Đại Trực Tràng Không Đau - Endo Clinic",
        image:
          "/src/assets/images/endoscopy-images/111510-noi-soi-dai-trang-khong-dau-v2.jpg",
      },
      {
        id: 13,
        title: "Nội Soi Cặp Dạ Dày Và Đại Trực Tràng Không Đau - Endo Clinic",
        image:
          "/src/assets/images/endoscopy-images/111855-noi-soi-cap-khong-dau-v2.jpg",
      },
      {
        id: 14,
        title: "Nội Soi Dạ Dày Thường - Endo Clinic",
        image:
          "/src/assets/images/endoscopy-images/131643-noi-soi-da-day-thuong-v2.jpg",
      },
      {
        id: 15,
        title: "Nội Soi Đại Trực Tràng Thường - Endo Clinic",
        image:
          "/src/assets/images/endoscopy-images/132422-noi-soi-dai-trang-thuong-v2.jpg",
      },
      {
        id: 16,
        title: "Nội Soi Cặp Dạ Dày Và Đại Trực Tràng Thường - Endo Clinic",
        image:
          "/src/assets/images/endoscopy-images/132753-noi-soi-cap-thuong-v2-1.jpg",
      },
    ]);
  }, []);

  return (
    <div className="app-container">
      <div className="md-px-10 endoscopy-packages">
        <div className="endoscopy-packages-header">
          <SectionHeaderTitle title="Nội soi" />
          <SeeMoreButton path="danh-sach/bac-si/noi-soi" />
        </div>
        <div className="endoscopy-packages-content">
          <div className="endoscopy-packages-slider">
            <Slider {...settings}>
              {endoscopyPackages && endoscopyPackages.length > 0
                ? endoscopyPackages.map((item) => {
                    return (
                      <SquarePageBanner
                        key={item.id}
                        item={item}
                        className="endoscopy-package"
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

export default Endoscopy;
