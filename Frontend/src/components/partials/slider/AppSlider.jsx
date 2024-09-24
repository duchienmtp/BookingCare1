/* eslint-disable no-unused-vars */
import React, { useCallback, useState, useEffect, useRef } from "react";
import Slider from "react-slick";
import "./Slider.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SliderImg1 from "../../../assets/images/slider-images/slider1.jpg";
import SliderImg2 from "../../../assets/images/slider-images/slider2.jpg";
import SliderImg3 from "../../../assets/images/slider-images/slider3.png";
import SliderImg4 from "../../../assets/images/slider-images/slider4.jpg";

function AppSlider() {
  const [sliderImage, setSliderImage] = useState([]);

  useEffect(() => {
    setSliderImage([
      {
        imageSrc: SliderImg1,
        imageAlt: "Nền tảng chăm sóc sức khỏe toàn diện",
      },
      {
        imageSrc: SliderImg2,
        imageAlt: "Hỏi đáp cộng đồng",
      },
      {
        imageSrc: SliderImg4,
        imageAlt: "Đặt lịch khám bệnh với BookingCare",
      },
      {
        imageSrc: SliderImg3,
        imageAlt: "Đặt lịch chăm sóc với WeCare247 ngay tại BookingCare",
      },
    ]);
  }, []);

  let settings = {
    dots: true,
    arrows: false,
    autoplay: false,
    infinite: true,
    speed: 800,
    autoplaySpeed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,

    customPaging: (i) => (
      <div
        style={{
          width: "7.8px",
          height: "7.8px",
          borderRadius: "50%",
          marginRight: "8px",
          marginLeft: "8px",
          marginTop: "10px",
          opacity: "0.4",
          backgroundColor: "rgb(255, 220, 117)",
          transition: "transform 0.3s",
        }}
      ></div>
    ),
  };

  return (
    <>
      <div className="app-slider">
        <div className="app-container">
          <div className="md-px-10 slider">
            <Slider {...settings}>
              {sliderImage && sliderImage.length > 0
                ? sliderImage.map((item, index) => {
                    return (
                      <div key={index} className="slider-image">
                        <img src={item.imageSrc} alt={item.imageAlt} />
                      </div>
                    );
                  })
                : null}
            </Slider>
          </div>
        </div>
      </div>
    </>
  );
}

export default AppSlider;
