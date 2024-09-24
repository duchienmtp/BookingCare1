import React, { useState, useEffect } from "react";
import "./DiabetesPage.scss";
import ImageBanner from "../../../../partials/PageBanner/image-banner/ImageBanner";
import BannerImg from "/src/assets/images/135822-theo-doi-chi-so-suc-khoe-3.png";
import SectionHeaderTitle from "../../../../partials/main-page-section/section-title/SectionHeaderTitle";
import SeeMoreButton from "../../../../partials/main-page-section/see-more-button/SeeMoreButton";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SliderPrevArrow from "../../../../partials/slider-arrow/slider-prev-arrow/SliderPrevArrow";
import SliderNextArrow from "../../../../partials/slider-arrow/slider-next-arrow/SliderNextArrow";
import { Link } from "react-router-dom";
import { set } from "lodash";

function DiabetesPage() {
  const [doctors, setDoctors] = useState([]);
  const [dietRegimenBlogs, setDietRegimenBlogs] = useState([]);
  const [practisingMethodBlogs, setPractisingMethodBlogs] = useState([]);
  const [communityQuestionBlogs, setCommunityQuestionBlogs] = useState([]);
  const [diabetesGuideBlogs, setDiabetesGuideBlogs] = useState([]);

  useEffect(() => {
    setDoctors([
      {
        id: "1",
        name: "Bác sĩ Nguyễn Thị Hải Đan",
        image:
          "/src/assets/images/doctor-images/171044-bac-si-noi-tiet-nguyen-thi-hai-dan.jpg",
      },
      {
        id: "2",
        name: "Bác sĩ Chuyên khoa I Sơn Thiên Trang",
        image:
          "/src/assets/images/doctor-images/165934-bac-si-noi-tiet-son-thien-trang.jpg",
      },
      {
        id: "3",
        name: "Tiến sĩ, Bác sĩ Nguyễn Thị Thúy Hằng",
        image:
          "/src/assets/images/doctor-images/160306-bac-si-noi-tiet-nguyen-thi-thuy-hang.jpg",
      },
    ]);

    setDietRegimenBlogs([
      {
        id: "1",
        title:
          "Người bệnh đái tháo đường tuýp 2 nên ăn gì, không nên ăn gì (phần 2)",
        image:
          "/src/assets/images/diet-regimen-images/112707-tieu-duong-tuyp-2-nen-va-khong-nen-an-gi-p2-utube.png",
      },
      {
        id: "2",
        title: "Hướng dẫn cách đọc nhãn thực phẩm cho người bệnh tiểu đường",
        image:
          "/src/assets/images/diet-regimen-images/153839-113613-cach-doc-nhan-thuc-pham.jpg",
      },
      {
        id: "3",
        title: "Người bệnh tiểu đường nên ăn gì và kiêng ăn gì?",
        image:
          "/src/assets/images/diet-regimen-images/144142-ha-huyet-ap-bang-dan-gian.jpg",
      },
      {
        id: "4",
        title: "Người bệnh tiểu đường có uống được sữa không?",
        image:
          "/src/assets/images/diet-regimen-images/143809-ha-huyet-ap-bang-dan-gian-2.jpg",
      },
      {
        id: "5",
        title: "Gợi ý bữa sáng cho người bệnh tiểu đường",
        image:
          "/src/assets/images/diet-regimen-images/145431-ha-huyet-ap-bang-dan-gian-3.jpg",
      },
      {
        id: "6",
        title: "Các loại rau tốt cho người bệnh tiểu đường",
        image:
          "/src/assets/images/diet-regimen-images/141520-rau-cho-nguoi-tieu-duong.jpg",
      },
    ]);

    setPractisingMethodBlogs([
      {
        id: "1",
        title: "Các bài tập thể dục dành cho người đái tháo đường",
        image:
          "/src/assets/images/diet-regimen-images/142510-ha-huyet-ap-bang-dan-gian-1.jpg",
      },
      {
        id: "2",
        title: "Các biện pháp giúp giảm căng thẳng ở người bệnh tiểu đường",
        image:
          "/src/assets/images/diet-regimen-images/163026-ha-huyet-ap-bang-dan-gian-4.jpg",
      },
      {
        id: "3",
        title: "Biện pháp giúp tăng cân cho người tiểu đường bị sụt cân",
        image:
          "/src/assets/images/diet-regimen-images/090106-tang-can-cho-nguoi-cao-huyet-ap-bi-sut-can.jpg",
      },
      {
        id: "4",
        title: "Đi bộ giúp ngăn ngừa, kiểm soát bệnh tiểu đường",
        image:
          "/src/assets/images/diet-regimen-images/164814-di-bo-kiem-soat-benh-tieu-duong.jpg",
      },
    ]);

    setCommunityQuestionBlogs([
      {
        id: "1",
        title:
          "Biến chứng của bệnh tiểu đường sau 6 tháng mắc bệnh như thế nào?",
        image:
          "/src/assets/images/diet-regimen-images/085007-huyet-ap-cao-ung-thu-phoi.jpg",
      },
      {
        id: "2",
        title: "Bị tiểu đường muốn mang thai thì lưu ý những gì?",
        image:
          "/src/assets/images/diet-regimen-images/114256-350--huong-dan-theo-doi-va-kiem-soat-benh-tieu-d18341.png",
      },
      {
        id: "3",
        title:
          "Bị bệnh tiểu đường, có biểu hiện tê bì chân tay, mất cảm giác ngón chân cảm giác như bị kim châm thì điều trị như thế nào?",
        image:
          "/src/assets/images/diet-regimen-images/114256-350--huong-dan-theo-doi-va-kiem-soat-benh-tieu-d18341.png",
      },
      {
        id: "4",
        title:
          "Bệnh tiểu đường tuýp 2 nên chữa bằng liệu pháp European Wellness không?",
        image: "/src/assets/images/diet-regimen-images/101901-oip.jpg",
      },
      {
        id: "5",
        title: "Người bệnh tiểu đường lâu năm nên lưu ý điều gì?",
        image:
          "/src/assets/images/diet-regimen-images/150233-thiet-ke-chua-co-ten-9.png",
      },
      {
        id: "6",
        title: "Tiểu đường và bị biến chứng sang thận nên đi khám ở viện nào?",
        image: "/src/assets/images/diet-regimen-images/113340-noi-khoa.jpg",
      },
    ]);

    setDiabetesGuideBlogs([
      {
        id: "1",
        title: "Thực đơn 7 ngày cho người bệnh tiểu đường",
        image:
          "/src/assets/images/diet-regimen-images/100438-thuc-don-7-ngay.jpg",
      },
      {
        id: "2",
        title:
          "Cách chữa Đái Tháo Đường hiệu quả theo phương pháp kiềng ba chân",
        image:
          "/src/assets/images/diet-regimen-images/090054-cach-chua-benh-tieu-duong.png",
      },
      {
        id: "3",
        title: "5 biến chứng điển hình của bệnh tiểu đường và cách phòng ngừa",
        image:
          "/src/assets/images/diet-regimen-images/095842-copy-of-anh-cover.png",
      },
      {
        id: "4",
        title:
          "Một số lưu ý điều trị tăng huyết áp ở người bệnh đái tháo đường",
        image:
          "/src/assets/images/diet-regimen-images/112133-dieu-tri-tang-huyet-ap-o-nguoi-benh-tieu-duong.jpg",
      },
      {
        id: "5",
        title: "Đọc ngay: Glucose trong máu bình thường là bao nhiêu?",
        image:
          "/src/assets/images/diet-regimen-images/144514-glucose-trong-mau-binh-thuong-la-bao-nhieu.jpg",
      },
      {
        id: "6",
        title:
          "Ý nghĩa chỉ số Glucose máu là gì? Glucose máu bình thường là bao nhiêu?",
        image:
          "/src/assets/images/diet-regimen-images/170039-y-nghia-xet-nghiem-glucose-mau.jpg",
      },
    ]);
  }, []);

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
        breakpoint: 768,
        settings: {
          slidesToScroll: 2,
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

  return (
    <>
      <section className="page-banner">
        <ImageBanner
          image={BannerImg}
          title={"Dịch vụ chăm sóc sức khỏe tại nhà"}
        />
      </section>
      <section className="doctor-section md-px-10">
        <div className="app-container">
          <div className="doctor-section-container">
            <div className="doctor-section-header">
              <SectionHeaderTitle title="Bác sĩ đồng hành" />
            </div>
            <div className="doctor-section-content">
              <div className="doctor-list">
                {doctors.map((doctor) => (
                  <div className="doctor-item" key={doctor.id}>
                    <div className="img-container">
                      <img
                        loading="lazy"
                        src={doctor.image}
                        alt={doctor.name}
                      />
                    </div>
                    <div className="doctor-name">
                      <span>{doctor.name}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="category-section md-px-10">
        <div className="app-container">
          <div className="category-list">
            <div className="category-item">
              <div className="category-title">
                <span>Đặt câu hỏi</span>
              </div>
            </div>
            <div className="category-item">
              <div className="category-title">
                <span>Gọi tư vấn</span>
              </div>
            </div>
            <div className="category-item">
              <div className="category-title">
                <span>Đặt khám</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="diet-regimen-section md-px-10">
        <div className="app-container">
          <div className="diet-regimen">
            <div className="diet-regimen-header">
              <SectionHeaderTitle title="Chế độ dinh dưỡng" />
              <SeeMoreButton />
            </div>
            <div className="diet-regimen-content">
              <div className="diet-regimen-blogs-slider">
                <Slider {...settings}>
                  {dietRegimenBlogs &&
                    dietRegimenBlogs.length > 0 &&
                    dietRegimenBlogs.map((item) => {
                      return (
                        <Link key={item.id}>
                          <div className="diabetes-blogs-item">
                            <div className="img-container">
                              <img src={item.image} alt={item.title} />
                            </div>
                            <div className="diabetes-blogs-item-title">
                              <span>{item.title}</span>
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                </Slider>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="practising-method-section md-px-10">
        <div className="app-container">
          <div className="practising-method">
            <div className="practising-method-header">
              <SectionHeaderTitle title="Luyện tập" />
              <SeeMoreButton />
            </div>
            <div className="practising-method-content">
              <div className="practising-method-blogs-slider">
                <Slider {...settings}>
                  {practisingMethodBlogs &&
                    practisingMethodBlogs.length > 0 &&
                    practisingMethodBlogs.map((item) => {
                      return (
                        <Link key={item.id}>
                          <div className="diabetes-blogs-item">
                            <div className="img-container">
                              <img src={item.image} alt={item.title} />
                            </div>
                            <div className="diabetes-blogs-item-title">
                              <span>{item.title}</span>
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                </Slider>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="community-question-section md-px-10">
        <div className="app-container">
          <div className="community-question">
            <div className="community-question-header">
              <SectionHeaderTitle title="Câu hỏi cộng đồng" />
              <SeeMoreButton />
            </div>
            <div className="community-question-content">
              <div className="community-question-blogs-slider">
                <Slider {...settings}>
                  {communityQuestionBlogs &&
                    communityQuestionBlogs.length > 0 &&
                    communityQuestionBlogs.map((item) => {
                      return (
                        <Link key={item.id}>
                          <div className="diabetes-blogs-item">
                            <div className="img-container">
                              <img src={item.image} alt={item.title} />
                            </div>
                            <div className="diabetes-blogs-item-title">
                              <span>{item.title}</span>
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                </Slider>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="diabetes-guide-section md-px-10">
        <div className="app-container">
          <div className="diabetes-guide">
            <div className="diabetes-guide-header">
              <SectionHeaderTitle title="Cẩm nang tiểu đường" />
              <SeeMoreButton />
            </div>
            <div className="diabetes-guide-content">
              <div className="diabetes-guide-blogs-slider">
                <Slider {...settings}>
                  {diabetesGuideBlogs &&
                    diabetesGuideBlogs.length > 0 &&
                    diabetesGuideBlogs.map((item) => {
                      return (
                        <Link key={item.id}>
                          <div className="diabetes-blogs-item">
                            <div className="img-container">
                              <img src={item.image} alt={item.title} />
                            </div>
                            <div className="diabetes-blogs-item-title">
                              <span>{item.title}</span>
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                </Slider>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default DiabetesPage;
