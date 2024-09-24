import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { path } from "../../../utils/constants/constants";
import "./MedicalService.scss";

function MedicalService() {
  const [MedicalServices, setMedicalServices] = useState([]);
  const [width, setWidth] = useState(getWidth());
  const { slug } = useParams();

  function getWidth() {
    if (window.innerWidth >= 1200) return "260.8px";
    if (window.innerWidth >= 992 && window.innerWidth < 1200)
      return "220.875px";
    if (window.innerWidth >= 768 && window.innerWidth < 992) return "226.150px";
  }

  useEffect(() => {
    // // Use the value of slug here
    // // Example: fetch medical services based on the slug
    // fetch(`/api/medical-services/${slug}`)
    //     .then((response) => response.json())
    //     .then((data) => setMedicalServices(data));

    const handleResize = () => setWidth(getWidth());

    window.addEventListener("resize", handleResize);

    setMedicalServices([
      {
        id: 1,
        title: "Cơ xương khớp",
        image: "/src/assets/images/specialty-images/co-xuong-khop.png",
      },
      {
        id: 2,
        title: "Thần kinh",
        image: "/src/assets/images/specialty-images/than-kinh.png",
      },
      {
        id: 3,
        title: "Tiêu hóa",
        image: "/src/assets/images/specialty-images/tieu-hoa.png",
      },
      {
        id: 4,
        title: "Tim mạch",
        image: "/src/assets/images/specialty-images/tim-mach.png",
      },
      {
        id: 5,
        title: "Tai mũi họng",
        image: "/src/assets/images/specialty-images/tai-mui-hong.png",
      },
      {
        id: 6,
        title: "Cột sống",
        image: "/src/assets/images/specialty-images/cot-song.png",
      },
      {
        id: 7,
        title: "Y học cổ truyền",
        image: "/src/assets/images/specialty-images/y-hoc-co-truyen.png",
      },
      {
        id: 8,
        title: "Châm cứu",
        image: "/src/assets/images/specialty-images/cham-cuu.png",
      },
      {
        id: 9,
        title: "Sản phụ khoa",
        image: "/src/assets/images/specialty-images/san-phu-khoa.png",
      },
      {
        id: 10,
        title: "Siêu âm thai",
        image: "/src/assets/images/specialty-images/sieu-am-thai.png",
      },
      {
        id: 11,
        title: "Nhi khoa",
        image: "/src/assets/images/specialty-images/nhi-khoa.png",
      },
      {
        id: 12,
        title: "Da liễu",
        image: "/src/assets/images/specialty-images/da-lieu.png",
      },
      {
        id: 13,
        title: "Bệnh viêm gan",
        image: "/src/assets/images/specialty-images/viem-gan.png",
      },
      {
        id: 14,
        title: "Sức khỏe tâm thần",
        image: "/src/assets/images/specialty-images/suc-khoe-tam-than.png",
      },
      {
        id: 15,
        title: "Dị ứng miễn dịch",
        image: "/src/assets/images/specialty-images/di-ung-mien-dich.png",
      },
      {
        id: 16,
        title: "Hô hấp - Phổi",
        image: "/src/assets/images/specialty-images/ho-hap-phoi.png",
      },
      {
        id: 17,
        title: "Ngoại thần kinh",
        image: "/src/assets/images/specialty-images/ngoai-than-kinh.png",
      },
      {
        id: 18,
        title: "Nam học",
        image: "/src/assets/images/specialty-images/nam-hoc.png",
      },
      {
        id: 19,
        title: "Chuyên khoa mắt",
        image: "/src/assets/images/specialty-images/mat.png",
      },
      {
        id: 20,
        title: "Thận - Tiết niệu",
        image: "/src/assets/images/specialty-images/than-tiet-nieu.png",
      },
      {
        id: 21,
        title: "Nội khoa",
        image: "/src/assets/images/specialty-images/noi-khoa.png",
      },
      {
        id: 22,
        title: "Nha khoa",
        image: "/src/assets/images/specialty-images/nha-khoa.png",
      },
      {
        id: 23,
        title: "Tiểu đường nội tiết",
        image: "/src/assets/images/specialty-images/than-tiet-nieu.png",
      },
      {
        id: 24,
        title: "Phục hồi chức năng",
        image: "/src/assets/images/specialty-images/phuc-hoi-chuc-nang.png",
      },
      {
        id: 25,
        title: "Chụp Cộng hưởng từ",
        image: "/src/assets/images/specialty-images/cong-huong-tu.png",
      },
      {
        id: 26,
        title: "Chụp Cắt lớp vi tính",
        image: "/src/assets/images/specialty-images/chup-cat-lop.png",
      },
      {
        id: 27,
        title: "Nội soi tiêu hóa",
        image: "/src/assets/images/specialty-images/noi-soi-tieu-hoa.png",
      },
      {
        id: 28,
        title: "Ung bướu",
        image: "/src/assets/images/specialty-images/ung-buou.png",
      },
      {
        id: 29,
        title: "Da liễu thẩm mỹ",
        image: "/src/assets/images/specialty-images/da-lieu-tham-my.png",
      },
      {
        id: 30,
        title: "Truyền nhiễm",
        image: "/src/assets/images/specialty-images/truyen-nhiem.png",
      },
      {
        id: 31,
        title: "Bác sĩ gia đình",
        image: "/src/assets/images/specialty-images/bac-si-gia-dinh.png",
      },
      {
        id: 32,
        title: "Tạo hình hàm mặt",
        image: "/src/assets/images/specialty-images/tao-hinh-ham-mat.png",
      },
      {
        id: 33,
        title: "Tư vấn, trị liệu Tâm lý",
        image: "/src/assets/images/specialty-images/tu-van-tam-ly.png",
      },
      {
        id: 34,
        title: "Vô sinh Hiếm muộn",
        image: "/src/assets/images/specialty-images/vo-sinh-hiem-muon.png",
      },
      {
        id: 35,
        title: "Chấn thương chỉnh hình",
        image: "/src/assets/images/specialty-images/chan-thuong-chinh-hinh.png",
      },
      {
        id: 36,
        title: "Niềng răng",
        image: "/src/assets/images/specialty-images/nieng-rang.png",
      },
      {
        id: 37,
        title: "Bọc răng sứ",
        image: "/src/assets/images/specialty-images/boc-rang-su.png",
      },
      {
        id: 38,
        title: "Trồng rang implant",
        image: "/src/assets/images/specialty-images/trong-rang.png",
      },
      {
        id: 39,
        title: "Nhổ răng khôn",
        image: "/src/assets/images/specialty-images/nho-rang-khon.png",
      },
      {
        id: 40,
        title: "Nha khoa tổng quát",
        image: "/src/assets/images/specialty-images/nha-khoa-tong-quat.png",
      },
      {
        id: 41,
        title: "Nha khoa trẻ em",
        image: "/src/assets/images/specialty-images/nha-khoa-tre-em.png",
      },
      {
        id: 42,
        title: "Tuyến giáp",
        image: "/src/assets/images/specialty-images/tuyen-giap.png",
      },
    ]);

    return () => window.removeEventListener("resize", handleResize);
  }, [slug]);

  return (
    <div className="app-container">
      <div className="path-section">
        <Link to={path.HOME}>
          <div className="img-container">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={16}
              height={16}
              preserveAspectRatio="none"
              viewBox="0 0 20 20"
              fill="#45c3d2"
            >
              <path d="M8 20H3V10H0L10 0l10 10h-3v10h-5v-6H8z" />
            </svg>
          </div>

          <span> /</span>
        </Link>
        <span className="slug-name">Khám Chuyên khoa</span>
      </div>
      <div className="medical-services">
        <div className="medical-services-content">
          {MedicalServices &&
            MedicalServices.length > 0 &&
            MedicalServices.map((item) => {
              return (
                <div key={item.id}>
                  <div
                    className="medical-service"
                    style={{ width: `${width}` }}
                  >
                    <div className="img-container">
                      <img src={item.image} alt={item.title} />
                    </div>
                    <div className="medical-service-title">
                      <span>{item.title}</span>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default MedicalService;
