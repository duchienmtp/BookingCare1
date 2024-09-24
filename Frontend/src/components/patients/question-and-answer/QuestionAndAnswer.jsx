import React, { useEffect, useState } from "react";
import "./QuestionAndAnswer.scss";
import SquarePageBanner from "../../partials/PageBanner/squarePageBanner/SquarePageBanner";
import SectionHeaderTitle from "../../partials/main-page-section/section-title/SectionHeaderTitle";
import FreeDoctorAskingImg from "../../../assets/images/question-and-answer-images/141028-hoidapcongdong.jpeg";
import GuideQnAImg from "../../../assets/images/question-and-answer-images/cam-nang-hoi-dap.jpg";
import Slider from "react-slick";
import SliderPrevArrow from "../../partials/slider-arrow/slider-prev-arrow/SliderPrevArrow";
import SliderNextArrow from "../../partials/slider-arrow/slider-next-arrow/SliderNextArrow";

function QuestionAndAnswer() {
  const [topics, setTopics] = useState([]);

  let settings = {
    dots: false,
    infinite: false,
    swipe: true,
    speed: 800,
    slidesToShow: 4,
    slidesToScroll: 4,
    variableWidth: true,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 576,
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
    setTopics([
      {
        id: 1,
        title: "Hỏi bác sĩ miễn phí",
        image: FreeDoctorAskingImg,
      },
      {
        id: 2,
        title: "Cẩm nang hỏi đáp",
        image: GuideQnAImg,
      },
    ]);
  }, []);

  return (
    <div className="app-container">
      <div className="md-px-10 question-and-answers">
        <div className="question-and-answers-header">
          <SectionHeaderTitle title="Bác sĩ hỏi đáp" />
        </div>
        <div className="question-and-answers-content">
          <div className="question-and-answers-slider">
            <Slider {...settings}>
              {topics && topics.length > 0
                ? topics.map((item) => {
                    return (
                      <SquarePageBanner
                        key={item.id}
                        item={item}
                        className="question-and-answer"
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

export default QuestionAndAnswer;
