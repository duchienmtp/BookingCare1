import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "./Endoscopy.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SquarePageBanner from "../../partials/PageBanner/squarePageBanner/SquarePageBanner";
import SliderNextArrow from "../../partials/slider-arrow/slider-next-arrow/SliderNextArrow";
import SliderPrevArrow from "../../partials/slider-arrow/slider-prev-arrow/SliderPrevArrow";
import SeeMoreButton from "../../partials/main-page-section/see-more-button/SeeMoreButton";
import SectionHeaderTitle from "../../partials/main-page-section/section-title/SectionHeaderTitle";
import { set } from "lodash";

function Endoscopy(props) {
  let { data } = props;
  const [endoscopyPackages, setEndoscopyPackages] = useState([]);

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
    let formattedData = data.map((item) => ({
      ...item,
      id: item.doctorId,
      name: item.user.fullName,
      image: item.user.image,
      slug: `/dich-vu-y-te/kham-chuyen-khoa/${item.user.slug}`,
    }));

    setEndoscopyPackages(formattedData);
  }, [data]);

  return (
    <div className="app-container">
      <div className="md-px-10 endoscopy-packages">
        <div className="endoscopy-packages-header">
          <SectionHeaderTitle title="Nội soi" />
          <SeeMoreButton path="danh-sach/bac-si/noi-soi" />
        </div>
        <div className="endoscopy-packages-content">
          <div className="endoscopy-packages-slider">
            <Slider {...settings}>
              {endoscopyPackages && endoscopyPackages.length > 0
                ? endoscopyPackages.map((item) => {
                    return (
                      <SquarePageBanner
                        key={item.id}
                        item={item}
                        className="endoscopy-package"
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

export default Endoscopy;
