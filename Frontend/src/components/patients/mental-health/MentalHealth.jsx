import React, { useEffect, useState, memo } from "react";
import Slider from "react-slick";
import "./MentalHealth.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SquarePageBanner from "../../partials/PageBanner/squarePageBanner/SquarePageBanner";
import SliderNextArrow from "../../partials/slider-arrow/slider-next-arrow/SliderNextArrow";
import SliderPrevArrow from "../../partials/slider-arrow/slider-prev-arrow/SliderPrevArrow";
import SeeMoreButton from "../../partials/main-page-section/see-more-button/SeeMoreButton";
import SectionHeaderTitle from "../../partials/main-page-section/section-title/SectionHeaderTitle";

function MentalHealth(props) {
  let { data } = props;
  const [mentalHealths, setMentalHealths] = useState([]);

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
            medicalService.medicalService.slug === "kham-tinh-than"
        );

      return itemsMatchedMedicalService.length > 0; // Include item if any medicalService matches the slug
    });

    filteredData.sort((a, b) => a.name.localeCompare(b.name));

    setMentalHealths(filteredData);
  }, [data]);

  return (
    <div className="app-container">
      <div className="md-pl-10 mental-healths">
        <div className="mental-healths-header">
          <SectionHeaderTitle title="Sức khỏe tinh thần" />
        </div>
        <div className="mental-healths-content">
          <div className="mental-healths-slider">
            <Slider {...settings}>
              {mentalHealths && mentalHealths.length > 0
                ? mentalHealths.map((item) => {
                    return (
                      <SquarePageBanner
                        key={item.id}
                        item={item}
                        className="mental-health"
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

const MemoizedMentalHealth = memo(MentalHealth);
export default MemoizedMentalHealth;
