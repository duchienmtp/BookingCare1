import React, { useEffect, useState } from "react";
import "./Clinic.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SquarePageBanner from "../../partials/PageBanner/squarePageBanner/SquarePageBanner";
import SliderPrevArrow from "../../partials/slider-arrow/slider-prev-arrow/SliderPrevArrow";
import SliderNextArrow from "../../partials/slider-arrow/slider-next-arrow/SliderNextArrow";
import SectionHeaderTitle from "../../partials/main-page-section/section-title/SectionHeaderTitle";
import SeeMoreButton from "../../partials/main-page-section/see-more-button/SeeMoreButton";

function Clinic() {
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
    setClinics([
      {
        id: 1,
        title: "Bệnh viện hữu nghị Việt Đức",
        image: "/src/assets/images/clinic-images/viet-duc.jpg",
      },
      {
        id: 2,
        title: "Bệnh viện chợ rẫy",
        image: "/src/assets/images/clinic-images/benh-vien-cho-ray-moi.jpg",
      },
      {
        id: 3,
        title: "Doctor Check - Tầm Soát Bệnh Để Sống Thọ Hơn",
        image: "/src/assets/images/clinic-images/doctor-check.jpg",
      },
      {
        id: 4,
        title: "Phòng Khám Bệnh viện Đại Học Y Dược 1",
        image:
          "/src/assets/images/clinic-images/benh-vien-dai-hoc-y-duoc-1.jpg",
      },
      {
        id: 5,
        title:
          "Trung tâm Khám sức khỏe định kỳ, Bệnh viện Trung ương Quân đội 108",
        image:
          "/src/assets/images/clinic-images/benh-vien-trung-uong-quan-doi-108.jpg",
      },
      {
        id: 6,
        title: "Bệnh viện Ung bướu Hưng Việt",
        image: "/src/assets/images/clinic-images/hung-viet.jpg",
      },
      {
        id: 7,
        title: "Hệ thống y tế MEDLATEC",
        image: "/src/assets/images/clinic-images/medlatec-tai-ha-noi-01.png",
      },
      {
        id: 8,
        title: "Trung tâm xét nghiệm Diag Laboratories",
        image: "/src/assets/images/clinic-images/diag.png",
      },
      {
        id: 9,
        title: "Hệ thống Y tế Thu Cúc TCI",
        image: "/src/assets/images/clinic-images/thucuc.png",
      },
      {
        id: 10,
        title: "Bệnh viện Nam học và Hiếm muộn Hà Nội",
        image:
          "/src/assets/images/clinic-images/benh-vien-nam-hoc-va-hiem-muon-hn.jpg",
      },
      {
        id: 11,
        title: "Bệnh viên Đa khoa Hồng Phát",
        image: "/src/assets/images/clinic-images/hong-phat.png",
      },
      {
        id: 12,
        title: "Bệnh viện Đa khoa An Việt",
        image: "/src/assets/images/clinic-images/benh-vien-an-viet.jpg",
      },
      {
        id: 13,
        title: "Phòng khám Quốc tế EXSON",
        image:
          "/src/assets/images/clinic-images/phong-kham-da-khoa-quoc-te-exson1.jpg",
      },
      {
        id: 14,
        title: "Bệnh viện Y học cổ truyền Trung ương",
        image:
          "/src/assets/images/clinic-images/benh-vien-y-hoc-co-truyen-trung-uong.jpg",
      },
      {
        id: 15,
        title: "Bệnh viện Đa khoa Bảo Sơn 2",
        image: "/src/assets/images/clinic-images/benh-vien-bao-son.jpg",
      },
      {
        id: 16,
        title: "Hệ Thống phòng khám Vietlife",
        image: "/src/assets/images/clinic-images/phong-kham-viet-life.png",
      },
      {
        id: 17,
        title: "Phòng khám Đa khoa Saigon Healthcare",
        image: "/src/assets/images/clinic-images/sg-health-care.png",
      },
      {
        id: 18,
        title: "Bệnh viện Lão khoa Trung ương",
        image:
          "/src/assets/images/clinic-images/benh-vien-lao-khoa-trung-uong-1.jpeg",
      },
      {
        id: 19,
        title: "Phòng khám Đa khoa Meditec",
        image:
          "/src/assets/images/clinic-images/phong-kham-da-khoa-meditec-clinic.jpeg",
      },
      {
        id: 20,
        title: "Bệnh viện STO Phương Đông",
        image: "/src/assets/images/clinic-images/sto-hospital.jpg",
      },
      {
        id: 21,
        title: "Bệnh viện Mắt quốc tế DND",
        image: "/src/assets/images/clinic-images/bv-mat-dnd.jpg",
      },
      {
        id: 22,
        title: "Bệnh viện Đa khoa Đông Đô",
        image: "/src/assets/images/clinic-images/bv-dong-do.jpg",
      },
      {
        id: 23,
        title: "Phòng khám Chuyên khoa Quốc tế Phổi Sài Gòn",
        image: "/src/assets/images/clinic-images/phoi-sai-gon.png",
      },
      {
        id: 24,
        title: "Phòng khám Đa khoa Quốc tế Golden Healthcare",
        image: "/src/assets/images/clinic-images/golden-healthcare.png",
      },
      {
        id: 25,
        title: "Hệ thống Phòng khám Bác sĩ Gia đình Med247",
        image: "/src/assets/images/clinic-images/med247.jpg",
      },
    ]);
  }, []);

  return (
    <div className="app-container">
      <div className="md-pl-10 clinics">
        <div className="clinics-header">
          <SectionHeaderTitle title="Cơ sở y tế" />
          <SeeMoreButton path={"/co-so-y-te/tat-ca"} />
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

export default Clinic;
