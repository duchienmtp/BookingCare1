import React, { useEffect, useState, memo } from "react";
import Slider from "react-slick";
import "./Specialty.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SquarePageBanner from "../../partials/PageBanner/squarePageBanner/SquarePageBanner";
import SliderNextArrow from "../../partials/slider-arrow/slider-next-arrow/SliderNextArrow";
import SliderPrevArrow from "../../partials/slider-arrow/slider-prev-arrow/SliderPrevArrow";
import SeeMoreButton from "../../partials/main-page-section/see-more-button/SeeMoreButton";
import SectionHeaderTitle from "../../partials/main-page-section/section-title/SectionHeaderTitle";

function Specialty(props) {
  let { data } = props;
  const [specialties, setSpecialties] = useState([]);

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
    const formattedData = data.map((item) => ({
      ...item,
      slug: `/dich-vu-y-te/kham-chuyen-khoa/${item.slug}`,
    }));
    setSpecialties(formattedData);
  }, [data]);

  return (
    <div className="app-container">
      <div className="md-pl-10 specialties">
        <div className="specialties-header">
          <SectionHeaderTitle title="Chuyên khoa" />
          <SeeMoreButton path="/danh-sach/chuyen-khoa/tat-ca" />
        </div>
        <div className="specialties-content">
          <div className="specialties-slider">
            <Slider {...settings}>
              {specialties && specialties.length > 0
                ? specialties.map((item) => {
                    return (
                      <SquarePageBanner
                        key={item.id}
                        item={item}
                        className="specialty"
                        aspectRatio="aspect-ratio-330-216 aspect-ratio-10-6"
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

const MemoizedSpecialty = memo(Specialty);
export default MemoizedSpecialty;
