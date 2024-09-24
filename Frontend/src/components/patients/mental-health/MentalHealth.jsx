import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "./MentalHealth.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SquarePageBanner from "../../partials/PageBanner/squarePageBanner/SquarePageBanner";
import SliderNextArrow from "../../partials/slider-arrow/slider-next-arrow/SliderNextArrow";
import SliderPrevArrow from "../../partials/slider-arrow/slider-prev-arrow/SliderPrevArrow";
import SeeMoreButton from "../../partials/main-page-section/see-more-button/SeeMoreButton";
import SectionHeaderTitle from "../../partials/main-page-section/section-title/SectionHeaderTitle";

function MentalHealth() {
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
    setMentalHealths([
      {
        id: 1,
        title: "Bài test sức khoẻ",
        image: "/src/assets/images/mental-health-images/bai-test-suc-khoe.jpeg",
      },
      {
        id: 2,
        title: "Sức khỏe tâm thần",
        image: "/src/assets/images/mental-health-images/suc-khoe-tam-than.png",
      },
      {
        id: 3,
        title: "Tư vấn, trị liệu Tâm lý từ xa",
        image: "/src/assets/images/online-diagnostic-images/tam-ly-tu-xa.png",
      },
      {
        id: 4,
        title: "Sức khỏe tâm thần từ xa",
        image:
          "/src/assets/images/online-diagnostic-images/tam-than-tu-xa-1.png",
      },
      {
        id: 5,
        title: "Tư vấn, trị liệu Tâm lý",
        image:
          "/src/assets/images/mental-health-images/tu-van-tri-lieu-tam-ly.png",
      },
    ]);
  }, []);

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

export default MentalHealth;
