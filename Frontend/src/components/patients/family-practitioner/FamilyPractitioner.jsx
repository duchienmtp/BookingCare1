import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "./FamilyPractitioner.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SectionHeaderTitle from "../../partials/main-page-section/section-title/SectionHeaderTitle";
import SeeMoreButton from "../../partials/main-page-section/see-more-button/SeeMoreButton";
import SliderPrevArrow from "../../partials/slider-arrow/slider-prev-arrow/SliderPrevArrow";
import SliderNextArrow from "../../partials/slider-arrow/slider-next-arrow/SliderNextArrow";
import CirclePageBanner from "../../partials/PageBanner/circlePageBanner/CirclePageBanner";

function FamilyPractitioner() {
  const [doctors, setDoctors] = useState([]);

  let settings = {
    dots: false,
    infinite: false,
    swipe: true,
    speed: 800,
    slidesToShow: 4,
    slidesToScroll: 4,
    variableWidth: true,
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

  useEffect(() => {
    setDoctors([
      {
        id: 1,
        name: "Điều dưỡng tại nhà",
        image:
          "/src/assets/images/family-practitioner-images/103043dieu-duong-tai-nha.jpg",
        specialty: "",
        description:
          "Đội ngũ điều dưỡng giàu kinh nghiệm, được đào tạo bài bản, có chứng chỉ hành nghề - Hỗ trợ đặt khám trực tuyến (miễn phí đặt lịch)",
        place: "Hà Nội",
      },
      {
        id: 2,
        name: "Thạc sĩ, Bác sĩ Dương Thị Cẩm Tuyền ",
        image:
          "/src/assets/images/family-practitioner-images/125158-bs-duong-thi-cam-tuyen-min.jpg",
        specialty: "Bác sĩ chuyên về Nội khoa",
        description:
          "Nhiều năm công tác tại Bệnh viện Trưng Vương TP.HCM - Là Bác sĩ gia đình cộng tác cùng Phòng khám Bác sĩ Gia đình Việt Úc",
        place: "Thành phố Hồ Chí Minh",
      },
      {
        id: 3,
        name: "Bác sĩ Đinh Quang Vinh",
        image:
          "/src/assets/images/family-practitioner-images/130243-bs-dinh-quang-vinh-min.jpg",
        specialty: "Bác sĩ chuyên khoa Nội Tổng quát  - Y học gia đình",
        description:
          "Nhiều năm công tác tại Bệnh viện Trưng Vương, TP.HCM - Hiện là Bác sĩ gia đình cộng tác cùng Phòng khám Bác sĩ Gia đình Việt Úc",
        place: "Thành phố Hồ Chí Minh",
      },
      {
        id: 4,
        name: "Bác sĩ khám bệnh tại nhà của Trung tâm y khoa Gia đình Hà Nội Dr.Care ",
        image:
          "/src/assets/images/family-practitioner-images/093722-logo-drcare1.jpg",
        specialty: "",
        description:
          "Được thăm khám với các bác sĩ các y, bác sĩ đã tốt nghiệp loại ưu của các khối trường Đại học, Cao đẳng chuyên ngành đào tạo Y học tại Hà Nội -Đội ngũ y, bác sĩ nhiệt tình, chu đáo, chuyên môn cao giúp bệnh nhân yên tâm khi được chăm sóc - Đội ngũ bác sĩ  sẽ có mặt ngay sau 30 phút hay 1 giờ đồng hồ tùy vào khoảng cách tới nhà bệnh nhân",
        place: "Hà Nội",
      },
    ]);
  }, []);

  return (
    <div className="app-container">
      <div className="md-px-10 family-practitioners">
        <div className="family-practitioners-header">
          <SectionHeaderTitle title="Bác sĩ tại nhà" />
          <SeeMoreButton path="danh-sach/bac-si/bac-si-tai-nha" />
        </div>
        <div className="family-practitioners-content">
          <div className="family-practitioners-slider">
            <Slider {...settings}>
              {doctors && doctors.length > 0
                ? doctors.map((item) => {
                    return (
                      <CirclePageBanner
                        key={item.id}
                        image={item.image}
                        title={item.name}
                        className="family-practitioner"
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

export default FamilyPractitioner;
