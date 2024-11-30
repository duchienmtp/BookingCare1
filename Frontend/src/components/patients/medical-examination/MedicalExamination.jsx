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

function MedicalExamination(props) {
  let { data } = props;
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
    let formattedData = data.map((item) => ({
      ...item,
      id: item.doctorId,
      name: item.user.fullName,
      image: item.user.image,
      slug: `/dich-vu-y-te/kham-chuyen-khoa/${item.user.slug}`,
    }));

    setMedicalExaminations(formattedData);
  }, [data]);

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
