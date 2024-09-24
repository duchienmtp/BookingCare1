import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "./TestAtHome.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SquarePageBanner from "../../partials/PageBanner/squarePageBanner/SquarePageBanner";
import SliderNextArrow from "../../partials/slider-arrow/slider-next-arrow/SliderNextArrow";
import SliderPrevArrow from "../../partials/slider-arrow/slider-prev-arrow/SliderPrevArrow";
import SeeMoreButton from "../../partials/main-page-section/see-more-button/SeeMoreButton";
import SectionHeaderTitle from "../../partials/main-page-section/section-title/SectionHeaderTitle";

function TestAtHome() {
  const [testsAtHome, setSpecialties] = useState([]);

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
    setSpecialties([
      {
        id: 1,
        title:
          "Dịch vụ Lấy mẫu xét nghiệm tại nhà của Phòng khám MEDLATEC TPHCM",
        image:
          "/src/assets/images/blood-test-at-home-images/162306-medlatec.png",
      },
      {
        id: 2,
        title: "Gói xét nghiệm sàng lọc sốt xuất huyết cơ bản Medlatec tại nhà",
        image:
          "/src/assets/images/blood-test-at-home-images/162306-medlatec.png",
      },
      {
        id: 3,
        title: "Gói xét nghiệm viêm gan B tại nhà (VI-XN6TN)",
        image:
          "/src/assets/images/blood-test-at-home-images/165322-xn-viem-gan-b.jpg",
      },
      {
        id: 4,
        title: "Gói xét nghiệm chức năng Gan tại nhà (VI-XN5TN)",
        image:
          "/src/assets/images/blood-test-at-home-images/141144-lab-34985841920.jpg",
      },
      {
        id: 5,
        title: "Gói xét nghiệm tuyến giáp tại nhà (VL-XN4TN)",
        image:
          "/src/assets/images/blood-test-at-home-images/110015-xn-tuyen-giap.jpg",
      },
      {
        id: 6,
        title: "Gói xét nghiệm tiểu đường tại nhà (VI-XN3TN)",
        image:
          "/src/assets/images/blood-test-at-home-images/155041-xn-tieu-duong.jpg",
      },
      {
        id: 7,
        title: "Gói xét nghiệm mỡ máu tại nhà (VI-XN2TN)",
        image:
          "/src/assets/images/blood-test-at-home-images/153723-xn-mo-mau.jpg",
      },
      {
        id: 8,
        title: "Gói xét nghiệm tổng quát tại nhà (VI-XN1TN)",
        image:
          "/src/assets/images/blood-test-at-home-images/141144-lab-34985841920.jpg",
      },
      {
        id: 9,
        title: "Gói xét nghiệm tổng quát cơ bản tại nhà (MD-XN1TN)",
        image:
          "/src/assets/images/blood-test-at-home-images/141144-lab-34985841920.jpg",
      },
      {
        id: 10,
        title: "Xét nghiệm PCR COVID lấy mẫu tại nhà - Trung tâm LabHouse",
        image:
          "/src/assets/images/blood-test-at-home-images/140801-test-covid.jpg",
      },
      {
        id: 11,
        title:
          "Gói xét nghiệm kiểm tra chức năng thận lấy mẫu tại nhà (CB-0040)",
        image:
          "/src/assets/images/blood-test-at-home-images/103739xet-nghiem-mau.jpg",
      },
      {
        id: 12,
        title:
          "Gói xét nghiệm kiểm tra chức năng gan lấy mẫu tại nhà (CB-0041)",
        image:
          "/src/assets/images/blood-test-at-home-images/103739xet-nghiem-mau.jpg",
      },
      {
        id: 13,
        title:
          "Gói xét nghiệm kiểm tra chức năng gan ở người bị nhiễm viêm gan B lấy mẫu tại nhà (CB-0042)",
        image:
          "/src/assets/images/blood-test-at-home-images/103739xet-nghiem-mau.jpg",
      },
      {
        id: 14,
        title:
          "Gói xét nghiệm kiểm tra chức năng tuyến giáp lấy mẫu tại nhà (CB-0043)",
        image:
          "/src/assets/images/blood-test-at-home-images/103739xet-nghiem-mau.jpg",
      },
      {
        id: 15,
        title:
          "Gói xét nghiệm tầm soát nguy cơ bệnh tim mạch tiêu chuẩn lấy mẫu tại nhà (CB-0044)",
        image:
          "/src/assets/images/blood-test-at-home-images/103739xet-nghiem-mau.jpg",
      },
      {
        id: 16,
        title:
          "Gói xét nghiệm chẩn đoán bệnh tiểu đường lấy mẫu tại nhà (CB-0050)",
        image:
          "/src/assets/images/blood-test-at-home-images/103739xet-nghiem-mau.jpg",
      },
    ]);
  }, []);

  return (
    <div className="app-container">
      <div className="md-px-10 tests-at-home">
        <div className="tests-at-home-header">
          <SectionHeaderTitle title="Xét nghiệm tại nhà" />
          <SeeMoreButton path="danh-sach/bac-si/xet-nghiem-tai-nha" />
        </div>
        <div className="tests-at-home-content">
          <div className="tests-at-home-slider">
            <Slider {...settings}>
              {testsAtHome && testsAtHome.length > 0
                ? testsAtHome.map((item) => {
                    return (
                      <SquarePageBanner
                        key={item.id}
                        item={item}
                        className="test-at-home"
                        aspectRatio="aspect-ratio-330-216"
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

export default TestAtHome;
