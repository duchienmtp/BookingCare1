import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "./Operation.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SquarePageBanner from "../../partials/PageBanner/squarePageBanner/SquarePageBanner";
import SliderNextArrow from "../../partials/slider-arrow/slider-next-arrow/SliderNextArrow";
import SliderPrevArrow from "../../partials/slider-arrow/slider-prev-arrow/SliderPrevArrow";
import SeeMoreButton from "../../partials/main-page-section/see-more-button/SeeMoreButton";
import SectionHeaderTitle from "../../partials/main-page-section/section-title/SectionHeaderTitle";

function Operation() {
  const [operationDoctors, setOperationDoctors] = useState([]);

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
    setOperationDoctors([
      {
        id: 1,
        title: "PGs.Ts.Bs. Lê Mạnh Cường - Phẫu thuật cắt trĩ",
        image:
          "/src/assets/images/operation-doctor-images/095509-bs-le-manh-cuong.jpg",
      },
      {
        id: 2,
        title: "Phẫu thuật cắt Amidan bằng Dao Plasma (AV13)",
        image:
          "/src/assets/images/operation-doctor-images/174127-phuong-phap-cat-amidan-cho-tre-benh-vien-an-viet.jpg",
      },
      {
        id: 3,
        title: "THS.BS Thiều Sĩ Sắc - Phẫu thuật cắt bao quy đầu",
        image:
          "/src/assets/images/operation-doctor-images/145452-bs-thieu-si-sac.jpg",
      },
      {
        id: 4,
        title: "THS. BS Nguyễn Hữu Thảo - Phẫu thuật cắt bao quy đầu",
        image:
          "/src/assets/images/operation-doctor-images/142429-bs-nguyen-huu-thao.jpg",
      },
      {
        id: 5,
        title: "TS. BSCKII Trà Anh Duy - Phẫu thuật cắt bao quy đầu",
        image:
          "/src/assets/images/operation-doctor-images/104658-bs-tra-anh-duy.png",
      },
      {
        id: 6,
        title: "PGs.Ts.Bs.Nguyễn Thị Hoài An - Phẫu thuật cắt Amidan/nạo VA",
        image:
          "/src/assets/images/operation-doctor-images/090559-pgs-nguyen-thi-hoai-an.jpg",
      },
      {
        id: 7,
        title:
          "Tiến sĩ, Bác sĩ Boris Fattakhov Temanovich - Phẫu thuật tật khúc xạ bằng LASILK/ FEMTO/ ReLEx SMILE",
        image:
          "/src/assets/images/operation-doctor-images/095626-bac-si-boris-viet-nga.jpg",
      },
      {
        id: 8,
        title: "Gs.Ts.Bs. Hà Văn Quyết - Phẫu thuật cắt trĩ phương pháp Longo",
        image:
          "/src/assets/images/operation-doctor-images/152227-giao-su-ha-van-quyet-tieu-hoa-da-day.jpg",
      },
      {
        id: 9,
        title:
          "BSCKI Dương Văn Tiến - Phẫu thuật nạo VA/cắt Amidan bằng dao Plasma Plus",
        image:
          "/src/assets/images/operation-doctor-images/083944bac-si-duong-van-tien.jpg",
      },
      {
        id: 10,
        title:
          "BSCKII Nguyễn Đăng Dũng - Mổ cận thị bằng Lasik/ SmartSurfACE/ Femto-Lasik/ Relex Smile/ Phakic",
        image:
          "/src/assets/images/operation-doctor-images/141459-bsckii-nguyen-dang-dungpng.png",
      },
      {
        id: 11,
        title:
          "Ths.Bs. Nguyễn Trung Đương - Phẫu thuật cắt trĩ phương pháp Longo/kinh điển",
        image:
          "/src/assets/images/operation-doctor-images/171800-bscki-nguyen-trung-duong.jpg",
      },
      {
        id: 12,
        title: "Tiến sĩ, Bác sĩ Nguyễn Văn Lý - Phẫu thuật nạo VA",
        image:
          "/src/assets/images/operation-doctor-images/121515-bs-nguyen-van-ly.jpg",
      },
      {
        id: 13,
        title:
          "Ths.Bs. Đặng Thị Như Quỳnh - Mổ cận thị bằng Lasik/ SmartSurfACE/ Femto-Lasik/ Relex Smile/ Phakic",
        image:
          "/src/assets/images/operation-doctor-images/185150bac-si-dang-thi-nhu-quynh.jpeg",
      },
      {
        id: 14,
        title: "THS. BS Nguyễn Duy Khánh - Phẫu thuật cắt bao quy đầu",
        image:
          "/src/assets/images/operation-doctor-images/095108-bs-nguyen-duy-khanh.png",
      },
    ]);
  }, []);

  return (
    <div className="app-container">
      <div className="md-px-10 operation-doctors">
        <div className="operation-doctors-header">
          <SectionHeaderTitle title="Phẫu thuật" />
          <SeeMoreButton path="danh-sach/bac-si/phau-thuat" />
        </div>
        <div className="operation-doctors-content">
          <div className="operation-doctors-slider">
            <Slider {...settings}>
              {operationDoctors && operationDoctors.length > 0
                ? operationDoctors.map((item) => {
                    return (
                      <SquarePageBanner
                        key={item.id}
                        item={item}
                        className="operation-doctor"
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

export default Operation;
