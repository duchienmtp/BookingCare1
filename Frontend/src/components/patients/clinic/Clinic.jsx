import React, { useEffect, useState, memo } from "react";
import "./Clinic.scss";
import { path } from "../../../utils/constants";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SquarePageBanner from "../../partials/PageBanner/squarePageBanner/SquarePageBanner";
import SliderPrevArrow from "../../partials/slider-arrow/slider-prev-arrow/SliderPrevArrow";
import SliderNextArrow from "../../partials/slider-arrow/slider-next-arrow/SliderNextArrow";
import SectionHeaderTitle from "../../partials/main-page-section/section-title/SectionHeaderTitle";
import SeeMoreButton from "../../partials/main-page-section/see-more-button/SeeMoreButton";

function Clinic(props) {
  const { data } = props;
  const [clinics, setClinics] = useState([]);

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
    const formattedData = data.slice(0, 25).map((item) => ({
      ...item,
      name: item.fullname,
      slug: `/co-so-y-te/${item.slug}`,
    }));
    setClinics(formattedData);
  }, [data]);

  return (
    <div className="app-container">
      <div className="md-pl-10 clinics">
        <div className="clinics-header">
          <SectionHeaderTitle title="Cơ sở y tế" />
          <SeeMoreButton path={path.SEE_MORE_PAGE.ALL_CLINICS} />
        </div>
        <div className="clinics-content">
          <div className="clinics-slider">
            <Slider {...settings}>
              {clinics && clinics.length > 0
                ? clinics.map((item) => {
                    return (
                      <SquarePageBanner
                        key={item.id}
                        item={item}
                        className="clinic"
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

const MemoizedClinic = memo(Clinic);
export default MemoizedClinic;
