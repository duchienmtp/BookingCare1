import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "./FamousDoctor.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SectionHeaderTitle from "../../partials/main-page-section/section-title/SectionHeaderTitle";
import SeeMoreButton from "../../partials/main-page-section/see-more-button/SeeMoreButton";
import SliderPrevArrow from "../../partials/slider-arrow/slider-prev-arrow/SliderPrevArrow";
import SliderNextArrow from "../../partials/slider-arrow/slider-next-arrow/SliderNextArrow";
import CirclePageBanner from "../../partials/PageBanner/circlePageBanner/CirclePageBanner";

function FamousDoctor(props) {
  let { data } = props;

  let settings = {
    dots: false,
    infinite: false,
    swipe: true,
    speed: 800,
    slidesToShow: 4,
    slidesToScroll: 4,
    variableWidth: true,
    adaptiveHeight: true,
    prevArrow: <SliderPrevArrow />,
    nextArrow: <SliderNextArrow />,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };

  return (
    <div className="app-container">
      <div className="md-pl-10 famous-doctors">
        <div className="famous-doctors-header">
          <SectionHeaderTitle title="Bác sĩ nổi bật" />
          <SeeMoreButton path="danh-sach/bac-si/noi-bat" />
        </div>
        <div className="famous-doctors-content">
          <div className="famous-doctors-slider">
            <Slider {...settings}>
              {data && data.length > 0
                ? data.map((item) => {
                    return (
                      <CirclePageBanner
                        key={item.id}
                        image={item.image}
                        title={item.name}
                        description={item.specialty}
                        className="famous-doctor"
                        slug={`/dich-vu-y-te/kham-chuyen-khoa/${item.slug}`}
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

export default FamousDoctor;
