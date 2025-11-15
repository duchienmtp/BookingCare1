import React, { useEffect, useState, memo } from "react";
import Slider from "react-slick";
import "./MedicalImagingDiagnostics.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SquarePageBanner from "../../partials/PageBanner/squarePageBanner/SquarePageBanner";
import SliderNextArrow from "../../partials/slider-arrow/slider-next-arrow/SliderNextArrow";
import SliderPrevArrow from "../../partials/slider-arrow/slider-prev-arrow/SliderPrevArrow";
import SeeMoreButton from "../../partials/main-page-section/see-more-button/SeeMoreButton";
import SectionHeaderTitle from "../../partials/main-page-section/section-title/SectionHeaderTitle";

function MedicalImagingDiagnostics(props) {
  let { data } = props;

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
    let formattedData = data.map((item) => {
      return {
        id: item.packageId,
        name: item.packageName,
        image: item.image,
        slug: `/dich-vu-y-te/${item.slug}`,
      };
    });

    setMedicalImagingDiagnosticsPackages(formattedData);
  }, [data]);

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

const MemoizedMedicalImagingDiagnostics = memo(MedicalImagingDiagnostics);
export default MemoizedMedicalImagingDiagnostics;
