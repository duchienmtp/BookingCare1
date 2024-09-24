import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "./MedicalImagingDiagnostics.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SquarePageBanner from "../../partials/PageBanner/squarePageBanner/SquarePageBanner";
import SliderNextArrow from "../../partials/slider-arrow/slider-next-arrow/SliderNextArrow";
import SliderPrevArrow from "../../partials/slider-arrow/slider-prev-arrow/SliderPrevArrow";
import SeeMoreButton from "../../partials/main-page-section/see-more-button/SeeMoreButton";
import SectionHeaderTitle from "../../partials/main-page-section/section-title/SectionHeaderTitle";

function MedicalImagingDiagnostics() {
  const [
    medicalImagingDiagnosticsPackages,
    setMedicalImagingDiagnosticsPackages,
  ] = useState([]);

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
    setMedicalImagingDiagnosticsPackages([
      {
        id: 1,
        title: "CHỤP CỘNG HƯỞNG TỪ 1.5 Tesla Tim + Dot (VFC)",
        image:
          "/src/assets/images/medical-imaging-diagnostic-images/100851may-cong-huong-tu-vietfile.png",
      },
      {
        id: 2,
        title: "Chụp PET/CT (VĐ)",
        image:
          "/src/assets/images/medical-imaging-diagnostic-images/104240-pet-ct1.jpg",
      },
      {
        id: 3,
        title: "CHỤP CỘNG HƯỞNG TỪ 1.5 TESLA (BSH)",
        image:
          "/src/assets/images/medical-imaging-diagnostic-images/143737-mri-bsh.jpg",
      },
      {
        id: 4,
        title: "Chụp Cộng hưởng từ 1.5 Tesla (MeT)",
        image:
          "/src/assets/images/medical-imaging-diagnostic-images/143621-mri-med.jpg",
      },
      {
        id: 5,
        title: "Chụp PET/CT (UB)",
        image:
          "/src/assets/images/medical-imaging-diagnostic-images/1554030cbc0d98d26b3c35657a-1.jpg",
      },
      {
        id: 6,
        title: "Chụp Cộng hưởng từ 1.5 Tesla (NSG)",
        image:
          "/src/assets/images/medical-imaging-diagnostic-images/143621-mri-med.jpg",
      },
      {
        id: 7,
        title: "CHỤP CỘNG HƯỞNG TỪ 1.5 Tesla (BN)",
        image:
          "/src/assets/images/medical-imaging-diagnostic-images/142617-may-mri-bn.jpg",
      },
      {
        id: 8,
        title: "CHỤP CỘNG HƯỞNG TỪ 1.5 Tesla (EC)",
        image:
          "/src/assets/images/medical-imaging-diagnostic-images/144011-anh-mri-ben-eco.jpg",
      },
      {
        id: 9,
        title: "CHỤP CỘNG HƯỞNG TỪ 1.5 Tesla (MDP)",
        image:
          "/src/assets/images/medical-imaging-diagnostic-images/102707-mri-mediplus.jpg",
      },
      {
        id: 10,
        title: "CHỤP CẮT LỚP VI TÍNH 128 LÁT CẮT/ VÒNG QUAY (MDP)",
        image:
          "/src/assets/images/medical-imaging-diagnostic-images/093343-ct-mediplus.jpg",
      },
      {
        id: 11,
        title: "CHỤP NHŨ ẢNH KỸ THUẬT SỐ (MDP)",
        image:
          "/src/assets/images/medical-imaging-diagnostic-images/154429-chup-mamo-vu-1.jpg",
      },
      {
        id: 12,
        title: "CHỤP CỘNG HƯỞNG TỪ 1.5 Tesla (TCI)",
        image:
          "/src/assets/images/medical-imaging-diagnostic-images/100842-thu-cuc-2.jpg",
      },
      {
        id: 13,
        title: "CHỤP CẮT LỚP VI TÍNH ĐA DÃY (TCI)",
        image:
          "/src/assets/images/medical-imaging-diagnostic-images/100912-thu-cuc-1.jpg",
      },
      {
        id: 14,
        title: "CHỤP CỘNG HƯỞNG TỪ 1.5 Tesla (16A)",
        image:
          "/src/assets/images/medical-imaging-diagnostic-images/090957-mri-16a.jpg",
      },
      {
        id: 15,
        title: "CHỤP CỘNG HƯỞNG TỪ 1.5 Tesla (VHC)",
        image:
          "/src/assets/images/medical-imaging-diagnostic-images/153624-mri-vhc1.jpg",
      },
    ]);
  }, []);

  return (
    <div className="app-container">
      <div className="md-px-10 medical-imaging-diagnostics">
        <div className="medical-imaging-diagnostics-header">
          <SectionHeaderTitle title="Chụp chiếu" />
          <SeeMoreButton path="danh-sach/bac-si/chup-chieu" />
        </div>
        <div className="medical-imaging-diagnostics-content">
          <div className="medical-imaging-diagnostics-slider">
            <Slider {...settings}>
              {medicalImagingDiagnosticsPackages &&
              medicalImagingDiagnosticsPackages.length > 0
                ? medicalImagingDiagnosticsPackages.map((item) => {
                    return (
                      <SquarePageBanner
                        key={item.id}
                        item={item}
                        className="medical-imaging-diagnostic"
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

export default MedicalImagingDiagnostics;
