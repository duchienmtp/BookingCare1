import React, { useEffect, useState, memo } from "react";
import Slider from "react-slick";
import "./OnlineDiagnostic.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SquarePageBanner from "../../partials/PageBanner/squarePageBanner/SquarePageBanner";
import SliderNextArrow from "../../partials/slider-arrow/slider-next-arrow/SliderNextArrow";
import SliderPrevArrow from "../../partials/slider-arrow/slider-prev-arrow/SliderPrevArrow";
import SeeMoreButton from "../../partials/main-page-section/see-more-button/SeeMoreButton";
import SectionHeaderTitle from "../../partials/main-page-section/section-title/SectionHeaderTitle";
import CameraSVG from "/src/assets/images/camera-icon.svg?react";

function OnlineDiagnostic(props) {
  let { data } = props;
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
    const filteredData = data.filter((item) => {
      const itemsMatchedMedicalService =
        item.specificMedicalService_MedicalServiceId.filter(
          (medicalService) =>
            medicalService.medicalService.slug === "kham-tu-xa"
        );

      return itemsMatchedMedicalService.length > 0; // Include item if any medicalService matches the slug
    });

    const formattedData = filteredData.map((item) => ({
      ...item,
      slug: `/dich-vu-y-te/kham-tu-xa/${item.slug}`,
    }));

    setOnlineDiagnostics(formattedData);
  }, [data]);

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

const MemoizedOnlineDiagnostic = memo(OnlineDiagnostic);
export default MemoizedOnlineDiagnostic;
