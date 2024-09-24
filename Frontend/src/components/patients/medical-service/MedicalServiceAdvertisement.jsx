import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./MedicalServiceAdvertisement.scss";
import CustomSlider from "../../partials/custom-slider/CustomSlider";
import SectionHeader from "../../partials/section-header/SectionHeader";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SliderNextArrow from "../../partials/slider-arrow/slider-next-arrow/SliderNextArrow";
import SliderPrevArrow from "../../partials/slider-arrow/slider-prev-arrow/SliderPrevArrow";

function MedicalServiceAdvertisement() {
  const [itemsPerPage, setItemsPerPage] = useState(getItemsPerPage());
  const [categoryList, setCategoryList] = useState([]);
  const [healthCheckPackageList, setHealthCheckPackageList] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [clinics, setClinics] = useState([]);

  let settings = {
    dots: false,
    infinite: false,
    swipe: true,
    speed: 800,
    slidesToShow: 5,
    slidesToScroll: 4,
    variableWidth: true,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
    ],
    prevArrow: <SliderPrevArrow />,
    nextArrow: <SliderNextArrow />,
  };

  useEffect(() => {
    setCategoryList([
      {
        id: 1,
        title: "Cơ bản",
        image:
          "/src/assets/images/medical-service-advertisement-images/095749-khamtongquat.png",
        slug: "co-ban",
      },
      {
        id: 2,
        title: "Gói khám VIP",
        image:
          "/src/assets/images/medical-service-advertisement-images/101925-iconkhamvip.png",
        slug: "goi-kham-vip",
      },
      {
        id: 3,
        title: "Nâng cao",
        image:
          "/src/assets/images/medical-service-advertisement-images/095803-nangcao.png",
        slug: "nang-cao",
      },
      {
        id: 4,
        title: "Nam",
        image:
          "/src/assets/images/medical-service-advertisement-images/095756-nam.png",
        slug: "nam",
      },
      {
        id: 5,
        title: "Nữ",
        image:
          "/src/assets/images/medical-service-advertisement-images/095828-nu.png",
        slug: "nu",
      },
      {
        id: 6,
        title: "Trẻ em",
        image:
          "/src/assets/images/medical-service-advertisement-images/095850-trem.png",
        slug: "tre-em",
      },
      {
        id: 7,
        title: "Người già",
        image:
          "/src/assets/images/medical-service-advertisement-images/095812-nguoigia.png",
        slug: "nguoi-gia",
      },
      {
        id: 8,
        title: "Tiền hôn nhân",
        image:
          "/src/assets/images/medical-service-advertisement-images/095844-tienhonnhan.png",
        slug: "tien-hon-nhan",
      },
      {
        id: 9,
        title: "Tầm soát ung thư",
        image:
          "/src/assets/images/medical-service-advertisement-images/095836-tamsoatungthu.png",
        slug: "tam-soat-ung-thu",
      },
      {
        id: 10,
        title: "Tầm soát ung thư vú",
        image:
          "/src/assets/images/medical-service-advertisement-images/095855-ungthuvu.png",
        slug: "tam-soat-ung-thu-vu",
      },
      {
        id: 11,
        title: "Tầm soát tiêu hóa",
        image:
          "/src/assets/images/medical-service-advertisement-images/093823-icon1-2.png",
        slug: "tam-soat-tieu-hoa",
      },
      {
        id: 12,
        title: "Bệnh lý chung",
        image:
          "/src/assets/images/medical-service-advertisement-images/093824-icon21.png",
        slug: "benh-ly-chung",
      },
    ]);

    setHealthCheckPackageList([
      {
        id: 1,
        title: "Gói khám sức khỏe tổng quát cơ bản cho nam (PKYD1M)",
        image:
          "/src/assets/images/diagnostic-package-images/093819goi-kham-suc-khoe-co-ban.jpg",
        desc: "Phòng khám Bệnh viện Đại học Y Dược 1",
        price: "2.000.000đ",
      },
      {
        id: 2,
        title: "Gói khám sức khỏe tổng quát cơ bản cho nữ (PKYD1F)",
        image:
          "/src/assets/images/diagnostic-package-images/093819goi-kham-suc-khoe-co-ban.jpg",
        desc: "Phòng khám Bệnh viện Đại học Y Dược 1",
        price: "2.000.000đ",
      },
      {
        id: 3,
        title: "Gói khám sức khỏe tiền hôn nhân cho Nam (NHHM8M)",
        image:
          "/src/assets/images/diagnostic-package-images/101828-thn-nu.jpeg",
        desc: "Bệnh viện Nam học và Hiếm muộn Hà Nội",
        price: "1.500.000đ",
      },
      {
        id: 4,
        title: "Gói khám sức khỏe tiền hôn nhân cho Nữ (NHHM8F)",
        image:
          "/src/assets/images/diagnostic-package-images/101828-thn-nu.jpeg",
        desc: "Bệnh viện Nam học và Hiếm muộn Hà Nội",
        price: "1.400.000đ",
      },
      {
        id: 5,
        title: "Gói khám tổng quát tiêu chuẩn dành cho nam (SG2M)",
        image:
          "/src/assets/images/diagnostic-package-images/235248-tam-soat-ung-thu-nam.jpg",
        desc: "Phòng khám Đa khoa Saigon Healthcare",
        price: "",
      },
      {
        id: 6,
        title: "Gói khám tổng quát tiêu chuẩn dành cho nữ (SG2F)",
        image:
          "/src/assets/images/diagnostic-package-images/213041-goi-kham-nu-chuyen-sau-1.jpg",
        desc: "Phòng khám Đa khoa Saigon Healthcare",
        price: "",
      },
      {
        id: 7,
        title: "Gói khám NINGEN DOCK BERNARD Gold dành cho Nữ",
        image: "/src/assets/images/diagnostic-package-images/095545-dock.png",
        desc: "Hệ thống Y khoa Chuyên sâu Quốc tế BERNARD",
        price: "25.000.000đ",
      },
      {
        id: 8,
        title: "Gói khám NINGEN DOCK BERNARD Gold dành cho Nam",
        image: "/src/assets/images/diagnostic-package-images/095545-dock.png",
        desc: "Hệ thống Y khoa Chuyên sâu Quốc tế BERNARD",
        price: "23.000.000đ",
      },
    ]);

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

    const handleResize = () => setItemsPerPage(getItemsPerPage());

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function getItemsPerPage() {
    if (window.innerWidth >= 1200) return 6;
    if (window.innerWidth >= 992 && window.innerWidth < 1200) return 5;
    if (window.innerWidth >= 576 && window.innerWidth < 992) return 4;
    return 5;
  }

  return (
    <div className="medical-service-advertisement">
      <div className="page-banner">
        <div className="img-container">
          <div className="img-overlay">
            <img src="/src/assets/images/093216-bc.jpg" alt="page banner" />
          </div>
        </div>
      </div>

      <div className="medical-service-advertisement-main">
        <div className="page-header">
          <h1>KHÁM TỔNG QUÁT</h1>
        </div>
        <div className="search-section">
          <div className="main-search-section">
            <div className="search-box">
              <input
                type="text"
                placeholder="Tìm kiếm"
                className="custom-placeholder"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
              />
              <div className="search-btn">
                <span>Tìm kiếm</span>
              </div>
            </div>
            <div className="refresh-btn">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={30}
                height={30}
                preserveAspectRatio="none"
                viewBox="0 0 50 50"
              >
                <path d="M25 5C13.965 5 5 13.965 5 25c-.004.36.184.695.496.879.313.18.695.18 1.008 0 .312-.184.5-.52.496-.879 0-9.953 8.047-18 18-18 6.246 0 11.727 3.18 14.957 8H33a1.006 1.006 0 0 0-.879.496 1.01 1.01 0 0 0 0 1.008c.184.312.52.5.879.496h10V7a1.003 1.003 0 0 0-1.016-1.016c-.55.012-.992.465-.984 1.016v6.012C37.348 8.148 31.54 5 25 5m18.984 18.984c-.55.012-.992.465-.984 1.016 0 9.953-8.047 18-18 18-6.246 0-11.73-3.18-14.957-8H17c.36.008.695-.184.879-.492.18-.313.18-.7 0-1.012-.184-.309-.52-.5-.879-.496H8.445a1.072 1.072 0 0 0-.386 0H7v10c-.004.36.184.695.496.879.313.18.695.18 1.008 0 .312-.184.5-.52.496-.879v-6.016C12.648 41.848 18.46 45 25 45c11.035 0 20-8.965 20-20a1.003 1.003 0 0 0-1.016-1.016" />
              </svg>
            </div>
            <div className="search-filter-section">
              <div className="search-filter-list">
                <div className="filter-item">
                  <span>Khu vực</span>
                  <div className="img-container">
                    <svg
                      width={16}
                      height={16}
                      fill="#000"
                      className="chevron-down_svg__bi chevron-down_svg__bi-chevron-down"
                      preserveAspectRatio="none"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fillRule="evenodd"
                        d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"
                      />
                    </svg>
                  </div>
                </div>
                <div className="filter-item">
                  <span>Danh mục</span>
                  <div className="img-container">
                    <svg
                      width={16}
                      height={16}
                      fill="#000"
                      className="chevron-down_svg__bi chevron-down_svg__bi-chevron-down"
                      preserveAspectRatio="none"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fillRule="evenodd"
                        d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"
                      />
                    </svg>
                  </div>
                </div>
                <div className="filter-item">
                  <span>Mức giá</span>
                  <div className="img-container">
                    <svg
                      width={16}
                      height={16}
                      fill="#000"
                      className="chevron-down_svg__bi chevron-down_svg__bi-chevron-down"
                      preserveAspectRatio="none"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fillRule="evenodd"
                        d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"
                      />
                    </svg>
                  </div>
                </div>
                <div className="filter-item">
                  <span>Cơ sở y tế</span>
                  <div className="img-container">
                    <svg
                      width={16}
                      height={16}
                      fill="#000"
                      className="chevron-down_svg__bi chevron-down_svg__bi-chevron-down"
                      preserveAspectRatio="none"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fillRule="evenodd"
                        d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"
                      />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="refresh-btn">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={30}
                  height={30}
                  preserveAspectRatio="none"
                  viewBox="0 0 50 50"
                >
                  <path d="M25 5C13.965 5 5 13.965 5 25c-.004.36.184.695.496.879.313.18.695.18 1.008 0 .312-.184.5-.52.496-.879 0-9.953 8.047-18 18-18 6.246 0 11.727 3.18 14.957 8H33a1.006 1.006 0 0 0-.879.496 1.01 1.01 0 0 0 0 1.008c.184.312.52.5.879.496h10V7a1.003 1.003 0 0 0-1.016-1.016c-.55.012-.992.465-.984 1.016v6.012C37.348 8.148 31.54 5 25 5m18.984 18.984c-.55.012-.992.465-.984 1.016 0 9.953-8.047 18-18 18-6.246 0-11.73-3.18-14.957-8H17c.36.008.695-.184.879-.492.18-.313.18-.7 0-1.012-.184-.309-.52-.5-.879-.496H8.445a1.072 1.072 0 0 0-.386 0H7v10c-.004.36.184.695.496.879.313.18.695.18 1.008 0 .312-.184.5-.52.496-.879v-6.016C12.648 41.848 18.46 45 25 45c11.035 0 20-8.965 20-20a1.003 1.003 0 0 0-1.016-1.016" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div className="app-container">
          <div className="category-main">
            <SectionHeader />
            <div className="category-slider">
              <CustomSlider data={categoryList} itemsPerPage={itemsPerPage}>
                {categoryList &&
                  categoryList.length > 0 &&
                  categoryList.map((item) => {
                    return (
                      <div key={item.id}>
                        <Link
                          to={`/dich/dich-vu-y-te/kham-tong-quat/"chuyen-khoa"/${item.slug}`}
                        >
                          <div className="category">
                            <div className="img-container">
                              <img src={item.image} alt={item.title} />
                            </div>
                            <div className="category-content">
                              <div className="category-content-title">
                                <span>{item.title}</span>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </div>
                    );
                  })}
              </CustomSlider>
            </div>
          </div>
          <div className="health-check-package">
            <SectionHeader title="Gói nổi bật" />
            <div className="health-check-package-content">
              <div className="health-check-package-slider">
                {healthCheckPackageList &&
                  healthCheckPackageList.length > 0 &&
                  healthCheckPackageList.map((item) => {
                    return (
                      <div className="health-check-package-item" key={item.id}>
                        <Link>
                          <div className="img-container">
                            <img src={item.image} alt={item.title} />
                          </div>
                          <div className="health-check-package-item-content">
                            <div className="health-check-package-item-info">
                              <div className="item-info-header">
                                <span>{item.title}</span>
                              </div>
                              <div className="item-info-desc">
                                <span>{item.desc}</span>
                              </div>
                            </div>
                            <div className="health-check-package-item-price">
                              <span className="price-label">Giá:</span>
                              <span className="price-value">{item.price}</span>
                            </div>
                          </div>
                        </Link>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
          <div className="clinic-main">
            <SectionHeader title="Cơ sở y tế" />
            <div className="clinic-container">
              <div className="clinic-slider">
                <Slider {...settings}>
                  {clinics &&
                    clinics.length > 0 &&
                    clinics.map((item) => {
                      return (
                        <div className="clinic-item" key={item.id}>
                          <Link>
                            <div className="img-container">
                              <img src={item.image} alt={item.title} />
                            </div>
                            <div className="clinic-content">
                              <div className="clinic-content-title">
                                <span>{item.title}</span>
                              </div>
                            </div>
                          </Link>
                        </div>
                      );
                    })}
                </Slider>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MedicalServiceAdvertisement;
