import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "./Community.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SquarePageBanner from "../../partials/PageBanner/squarePageBanner/SquarePageBanner";
import SliderNextArrow from "../../partials/slider-arrow/slider-next-arrow/SliderNextArrow";
import SliderPrevArrow from "../../partials/slider-arrow/slider-prev-arrow/SliderPrevArrow";
import SectionHeaderTitle from "../../partials/main-page-section/section-title/SectionHeaderTitle";

function Community() {
  const [communities, setCommunities] = useState([]);

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
    setCommunities([
      {
        id: 1,
        name: "BookingCare - Y tế sức khỏe toàn diện",
        image:
          "/src/assets/images/community-images/155237-y-te-suc-khoe-toan-dien.png",
        slug: "https://www.facebook.com/bookingcare",
      },
      {
        id: 2,
        name: "Review Bệnh viện - Phòng khám - Bác sĩ giỏi",
        image:
          "/src/assets/images/community-images/155238-review-benh-vien-phong-kham-bac-si-gioi.png",
        slug: "https://www.facebook.com/groups/1384838201648397",
      },
      {
        id: 3,
        name: "Sống khỏe cùng bệnh Tiểu đường",
        image:
          "/src/assets/images/community-images/141147-congdongtieuduong.jpg",
        slug: "https://www.facebook.com/groups/815419770274573",
      },
      {
        id: 4,
        name: "Tư vấn Tâm lý - Tâm thần",
        image:
          "/src/assets/images/community-images/141458-congdongtinhthan.jpeg",
        slug: "https://www.facebook.com/groups/1299270953764061",
      },
      {
        id: 5,
        name: "Chuyên trang Nha khoa",
        image:
          "/src/assets/images/community-images/141131-congdongnhakhoa.jpeg",
        slug: "https://www.facebook.com/dentalhealthh",
      },
    ]);
  }, []);

  return (
    <div className="app-container">
      <div className="md-px-10 communities">
        <div className="communities-header">
          <SectionHeaderTitle title="Cộng đồng" />
        </div>
        <div className="communities-content">
          <div className="communities-slider">
            <Slider {...settings}>
              {communities && communities.length > 0
                ? communities.map((item) => {
                    return (
                      <SquarePageBanner
                        key={item.id}
                        item={item}
                        className="community"
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

export default Community;
