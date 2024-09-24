import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "./MedicalExamination.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SquarePageBanner from "../../partials/PageBanner/squarePageBanner/SquarePageBanner";
import SliderNextArrow from "../../partials/slider-arrow/slider-next-arrow/SliderNextArrow";
import SliderPrevArrow from "../../partials/slider-arrow/slider-prev-arrow/SliderPrevArrow";
import SeeMoreButton from "../../partials/main-page-section/see-more-button/SeeMoreButton";
import SectionHeaderTitle from "../../partials/main-page-section/section-title/SectionHeaderTitle";

function MedicalExamination() {
  const [medicalExaminations, setMedicalExaminations] = useState([]);

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
    setMedicalExaminations([
      {
        id: 1,
        title: "Dịch vụ xét nghiệm tại hệ thống y tế Medlatec",
        image:
          "/src/assets/images/medical-examination-images/104922-logo-med-tai-ha-noi--01.png",
      },
      {
        id: 2,
        title: "Dịch vụ xét nghiệm của Trung tâm xét nghiệm Diag Laboratories",
        image: "/src/assets/images/medical-examination-images/175554-diag.png",
      },
      {
        id: 3,
        title: "Gói xét nghiệm kiểm tra chức năng thận (CB-0040)",
        image:
          "/src/assets/images/medical-examination-images/103739xet-nghiem-mau.jpg",
      },
      {
        id: 4,
        title: "Sàng lọc trước sinh không xâm lấn(NIPT-BasicSave) thường",
        image: "/src/assets/images/medical-examination-images/171903-nipt2.jpg",
      },
      {
        id: 5,
        title: "Sàng lọc trước sinh không xâm lấn(NIPT-ExtraSave) thường ",
        image: "/src/assets/images/medical-examination-images/171903-nipt2.jpg",
      },
      {
        id: 6,
        title: "Gói xét nghiệm sàng lọc sốt xuất huyết cơ bản tại Medlatec",
        image:
          "/src/assets/images/medical-examination-images/104922-logo-med-tai-ha-noi--01.png",
      },
      {
        id: 7,
        title: "Sàng lọc trước sinh không xâm lấn(NIPT-ProSave) thường",
        image: "/src/assets/images/medical-examination-images/171903-nipt2.jpg",
      },
      {
        id: 8,
        title: "Sàng lọc trước sinh không xâm lấn (NIPT-Plus) thường",
        image: "/src/assets/images/medical-examination-images/171903-nipt2.jpg",
      },
      {
        id: 9,
        title: "Sàng lọc trước sinh không xâm lấn (NIPT-Twin) thường",
        image: "/src/assets/images/medical-examination-images/171903-nipt2.jpg",
      },
      {
        id: 10,
        title: "Xét nghiệm sàng lọc NIPT - Basic (MED)",
        image: "/src/assets/images/medical-examination-images/171903-nipt2.jpg",
      },
      {
        id: 11,
        title: "Dịch vụ xét nghiệm tại Phòng khám MEDLATEC TPHCM",
        image:
          "/src/assets/images/medical-examination-images/104922-logo-med-tai-ha-noi--01.png",
      },
      {
        id: 12,
        title: "Xét nghiệm sốt xuất huyết cơ bản (MED81)",
        image:
          "/src/assets/images/medical-examination-images/104922-logo-med-tai-ha-noi--01.png",
      },
      {
        id: 13,
        title: "Xét nghiệm Cúm A/B (MED79)",
        image:
          "/src/assets/images/medical-examination-images/104922-logo-med-tai-ha-noi--01.png",
      },
      {
        id: 14,
        title: "Xét nghiệm PCR COVID - Trung tâm Diag Quận 1 (Diag.018)",
        image:
          "/src/assets/images/medical-examination-images/151847-test-benh-covid-19.jpg",
      },
      {
        id: 15,
        title: "Gói xét nghiệm tầm soát viêm gan nâng cao (DIAG12)",
        image:
          "/src/assets/images/medical-examination-images/103739xet-nghiem-mau.jpg",
      },
      {
        id: 16,
        title: "Gói xét nghiệm sốt chưa rõ nguyên nhân (SOT)",
        image:
          "/src/assets/images/medical-examination-images/163734xet-nghiem-mau.jpg",
      },
    ]);
  }, []);

  return (
    <div className="app-container">
      <div className="md-px-10 medical-examinations">
        <div className="medical-examinations-header">
          <SectionHeaderTitle title="Xét nghiệm" />
          <SeeMoreButton path="danh-sach/bac-si/xet-nghiem" />
        </div>
        <div className="medical-examinations-content">
          <div className="medical-examinations-slider">
            <Slider {...settings}>
              {medicalExaminations && medicalExaminations.length > 0
                ? medicalExaminations.map((item) => {
                    return (
                      <SquarePageBanner
                        key={item.id}
                        item={item}
                        className="medical-examination"
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

export default MedicalExamination;
