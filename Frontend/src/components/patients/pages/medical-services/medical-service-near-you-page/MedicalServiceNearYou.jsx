import React, { useState, useEffect } from "react";
import "./MedicalServiceNearYou.scss";
import SectionHeaderTitle from "../../../../partials/main-page-section/section-title/SectionHeaderTitle";
import { Link } from "react-router-dom";

function MedicalServiceNearYou() {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [clinics, setClinics] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [videoAdvisors, setVideoAdvisors] = useState([]);
  const [healthCheckPackages, setHealthCheckPackages] = useState([]);
  const [endoscopies, setEndoscopies] = useState([]);
  const [tests, setTests] = useState([]);
  const [operationPackages, setOperationPackages] = useState([]);

  useEffect(() => {
    setClinics([
      {
        id: 1,
        title: "Bệnh viện Quốc Tế Hạnh Phúc - Bình Dương",
        address:
          "Địa chỉ: 18 Đại lộ Bình Dương, Thành phố Thuận An, Tỉnh Bình Dương",
        distance: "5.27",
        image: "/src/assets/images/clinic-images/085617-logo-bv-hanh-phuc1.jpg",
      },
      {
        id: 2,
        title: "Phòng khám chuyên khoa Tai mũi họng Dr. Lê Na Cơ sở 2",
        address:
          "Cơ sở 2: Số 33 Đường 40, Phường Tân Phong, Quận 7, Hồ Chí Minh",
        distance: "12.71",
        image: "/src/assets/images/clinic-images/094836-logo.jpg",
      },
      {
        id: 3,
        title: "Phòng khám Da liễu Doctor Scar",
        address: "SS1N Đường Hồng Lĩnh, Phường 15, Quận 10, TPHCM",
        distance: "6.41",
        image: "/src/assets/images/clinic-images/172912-1234vector-logo.png",
      },
      {
        id: 4,
        title: "Phòng khám Đa khoa Family Health",
        address: "125/62 Nguyễn Văn Thương, P.25, Q.Bình Thạnh, TP.HCM",
        distance: "2.68",
        image: "/src/assets/images/clinic-images/092859-logo.png",
      },
      {
        id: 5,
        title: "Phòng khám Medi An An Quận 7",
        address:
          "Phòng khám Medi An An 228 Phạm Thái Bường, P.Tân Phong, Quận 7, TP.HCM",
        distance: "10.54",
        image: "/src/assets/images/clinic-images/110343-logo.jpg",
      },
    ]);

    setDoctors([
      {
        id: 1,
        title: "Khám Tại Trung Tâm Tiêu hóa Endo Clinic ",
        image: "/src/assets/images/clinic-images/180435-kham-tieu-hoa.jpg",
        specialty: "Tiêu hoá",
        address:
          "Endo Clinic - Tiêu Hoá Khoẻ & Ngừa Ung Thư. 429 Tô Hiến Thành, Phường 14, Quận 10, Thành Phố Hồ Chí Minh",
        description: `Đến với Endo Clinic, bạn sẽ được thăm khám bởi đội bác sĩ giàu kinh nghiệm, đến từ các bệnh viện lớn tại TPHCM.
Chuyên sâu: Nội soi dạ dày không đau, đại tràng không đau, khám và điều trị bệnh lý tiêu hoá như trào ngược dạ dày, viêm loét dạ dày, đặc biệt là tầm soát ung thư tiêu hoá. Phòng khám không nhận khám nhi.`,
      },
      {
        id: 2,
        title: "Tiến sĩ, Bác sĩ Chuyên khoa I Trần Thịnh",
        image: "/src/assets/images/doctor-images/110659-bs-tran-thinh1.jpg",
        specialty: "Da liễu",
        address:
          "Phòng khám Chuyên khoa Da liễu Trần Thịnh. 980 Trần Hưng Đạo, Phường 7, Quận 5, Thành Phố Hồ Chí Minh",
        description: `Gần 40 năm khám và điều trị chuyên khoa Da liễu. Hơn 27 năm nghiên cứu và điều trị các bệnh da liễu bằng laser. Nguyên Trưởng khoa Lâm Sàng A - Bệnh viện Da liễu. Tiến sĩ có nhận khám cho nguời nước ngoài`,
      },
      {
        id: 3,
        title: "Khám Nam khoa tại Bệnh viện Chợ Rẫy",
        image: "/src/assets/images/clinic-images/benh-vien-cho-ray-moi.jpg",
        specialty: "Nam học",
        address:
          "Nam khoa, Bệnh viện Chợ Rẫy. Khu A, Cổng số 1 - 201B Nguyễn Chí Thanh, Phường 12, Quận 5, Thành Phố Hồ Chí Minh",
        description: `Đăng kí trực tuyến để lấy số khám tại Bệnh viện Chợ Rẫy. Giảm thời gian chờ đợi, ưu tiên khám nhanh`,
      },
      {
        id: 4,
        title: "Thạc sĩ, Bác sĩ Trần Thị Hồng An",
        image: "/src/assets/images/doctor-images/155212-bs-an-viictoria.png",
        specialty: "Tim mạch, Tiểu đường - Nội tiết",
        address:
          "Phòng khám Đa khoa Victoria Healthcare Quận 1. 20-20-22 Đinh Tiên Hoàng, Phường Đa Kao, Quận 1, Thành Phố Hồ Chí Minh",
        description: `30 năm kinh nghiệm lĩnh vực Nội tổng quát - Tim mạch - Nội tiết. Từng tham gia học tập và đào tạo tại nước ngoài: Hoa Kỳ`,
      },
      {
        id: 5,
        title: "Bác sĩ Trần Phước Duy Bảo ",
        image: "/src/assets/images/doctor-images/152154-tran-phuoc-duy-bao.jpg",
        specialty: "Nam học",
        address:
          "Phòng khám Đa khoa Family Health. 125/62 Nguyễn Văn Thương, P.25, Q.Bình Thạnh, Thành Phố Hồ Chí Minh",
        description: `Bác sĩ có nhiều năm kinh nghiệm trong khám và điều trị bệnh lý Nam khoa - Ngoại niệu. Bác sĩ khoa Ngoại tiết niệu - Nam Khoa, Bệnh viên Đa khoa khu vực Thủ Đức. Bác sĩ nhận khám mọi độ tuổi.`,
      },
    ]);

    setVideoAdvisors([
      {
        id: 1,
        title: "Chuyên gia Tâm lý Hoàng Thị Ngọc Duyên (Tư vấn từ xa)",
        image:
          "/src/assets/images/doctor-images/111400-mc-hoang-thi-ngoc-duyen-5.jpg",
        specialty: "Tư vấn, trị liệu Tâm lý từ xa",
        address:
          "Trung tâm Tâm lí Trị liệu NHC cơ sở Hoàng Hoa Thám - Thành Phố Hồ Chí Minh. Số 107 Hoàng Hoa Thám, Phường 6, Bình Thạnh, Thành Phố Hồ Chí Minh",
        description: `Chuyên gia tâm lý được đào tạo bài bản từ các Hiệp hội: NLP Hoa Kỳ, Thôi miên Hoa Kỳ, Time Line Therapy. Chuyên gia nhận tham vấn cho khách hàng từ 14 đến 60 tuổi`,
      },
      {
        id: 2,
        title: "Chuyên gia Tâm lý Phạm Hoàng Long (Tư vấn từ xa)",
        image: "/src/assets/images/doctor-images/100156-mc-pham-hoang-long.jpg",
        specialty: "Tư vấn, trị liệu Tâm lý từ xa",
        address:
          "Trung tâm Tâm lí Trị liệu NHC cơ sở Hoàng Hoa Thám - Thành Phố Hồ Chí Minh. Số 107 Hoàng Hoa Thám, Phường 6, Bình Thạnh, Thành Phố Hồ Chí Minh",
        description: `Chuyên gia tâm lý được đào tạo bài bản từ các Hiệp hội: NLP Hoa Kỳ, Thôi miên Hoa Kỳ, Time Line Therapy. Chuyên gia nhận tham vấn cho khách hàng từ 14 đến 60 tuổi`,
      },
      {
        id: 3,
        title: "Chuyên gia Tâm lý Nguyễn Thị Hải (Tư vấn từ xa)",
        image:
          "/src/assets/images/doctor-images/105254-hht-nguyen-thi-hai1.jpg",
        specialty: "Tư vấn, trị liệu Tâm lý từ xa",
        address:
          "Trung tâm Tâm lí Trị liệu NHC cơ sở Hoàng Hoa Thám - Thành Phố Hồ Chí Minh. Số 107 Hoàng Hoa Thám, Phường 6, Bình Thạnh, Thành Phố Hồ Chí Minh",
        description: `Chuyên gia có nhiều năm kinh nghiệm trong lĩnh vực tâm lý trị liệu. Chuyên gia nhận tư vấn từ 14 tuổi - 60 tuổi`,
      },
      {
        id: 4,
        title: "Chuyên gia Tâm lý Nguyễn Thị Sơn Ca (Tư vấn từ xa)",
        image:
          "/src/assets/images/doctor-images/095813-hht-nguyen-thi-son-ca12.jpg",
        specialty: "Tư vấn, trị liệu Tâm lý từ xa",
        address:
          "Trung tâm Tâm lí Trị liệu NHC cơ sở Hoàng Hoa Thám - Thành Phố Hồ Chí Minh. Số 107 Hoàng Hoa Thám, Phường 6, Bình Thạnh, Thành Phố Hồ Chí Minh",
        description: `Chuyên gia có nhiều năm kinh nghiệm trong lĩnh vực Tâm lý trị liệu . Chuyên gia nhận khám nhận từ 14 tuổi - 60 tuổi`,
      },
      {
        id: 5,
        title: "Tiến sĩ Tâm lý học, Nguyễn Văn Lực (Tư vấn từ xa)",
        image: "/src/assets/images/doctor-images/161751-cg-luc1.jpg",
        specialty: "Tư vấn, trị liệu Tâm lý từ xa",
        address:
          "Trung tâm phát triển Tâm lý Tương Lai. 586 Kha Vạn Cân, Phường Linh Đông, Quận Thủ Đức, Thành Phố Hồ Chí Minh",
        description: `Gần 20 năm trong lĩnh vực Tư vấn Trị liệu Tâm lý trẻ em và người lớn. Giám đốc Trung tâm phát triển tâm lý Tương Lai. Giảng viên Đại học, chuyên gia tư vấn, Tham vấn, Trị liệu tâm lý tại nhiều trường Đại học. Chuyên gia nhận tư vấn từ 2 tuổi đến 60 tuổi`,
      },
    ]);

    setHealthCheckPackages([
      {
        id: 1,
        title: "Gói khám sức khỏe tổng quát toàn diện (MDA4)",
        image: "/src/assets/images/clinic-images/110343-logo.jpg",
        specialty: "Nâng cao",
        address:
          "Phòng khám An An Quận 5. Phòng khám An An: 25 Tân Hưng, Phường 12, Quận 5, Thành Phố Hồ Chí Minh. && Phòng khám Medi An An Quận 7. Phòng khám Medi An An 228 Phạm Thái Bường, Phường Tân Phong, Quận 7, Thành Phố Hồ Chí Minh",
        description: `Là gói khám sức khoẻ gồm 47 hạng mục khám, với các xét nghiệm chuyên sâu nhằm tiếp cận được toàn bộ tình trạng sức khỏe của bạn. Tầm soát phát hiện sớm các dấu vết ung thư, giúp can thiệp, điều trị kịp thời nhằm làm giảm đến mức tối thiểu những biến chứng đe dọa cuộc sống của bạn. Gói Toàn diện cũng giúp kiểm tra và phát hiện các kí sinh trùng gây hại và ảnh huởng đến cơ thể. 
Gói khám được thực hiện tại Phòng khám Medi An An. Gói khám áp dụng cho tất cả các lứa tuổi`,
      },
      {
        id: 2,
        title: "Gói khám sức khỏe tổng quát nâng cao (MDA3)",
        image: "/src/assets/images/clinic-images/110343-logo.jpg",
        specialty: "Cơ bản, Nâng cao",
        address:
          "Phòng khám An An Quận 5. Phòng khám An An: 25 Tân Hưng, Phường 12, Quận 5, Thành Phố Hồ Chí Minh && Phòng khám Medi An An Quận 7. Phòng khám Medi An An 228 Phạm Thái Bường, Phường Tân Phong, Quận 7, Thành Phố Hồ Chí Minh",
        description: `Là gói khám sức khoẻ gồm 31 hạng mục khám, với các xét nghiệm chuyên sâu hơn nhằm đánh giá được toàn bộ tình trạng sức khỏe của bạn, đồng thời phát hiện sớm, can thiệp, điều trị kịp thời nhằm làm giảm đến mức tối thiểu những biến chứng của những bệnh hiểm nghèo đe dọa cuộc sống của bạn.
Gói khám được thực hiện tại Phòng khám Medi An An. Gói khám áp dụng cho tất cả các lứa tuổi`,
      },
      {
        id: 3,
        title: "Gói khám sức khỏe tổng quát cơ bản (MDA1)",
        image: "/src/assets/images/clinic-images/110343-logo.jpg",
        specialty: "Tổng quát, Cơ bản",
        address:
          "Phòng khám An An Quận 5. Phòng khám An An: 25 Tân Hưng, Phường 12, Quận 5, Thành Phố Hồ Chí Minh && Phòng khám Medi An An Quận 7. Phòng khám Medi An An 228 Phạm Thái Bường, Phường Tân Phong, Quận 7, Thành Phố Hồ Chí Minh",
        description: `Là gói khám sức khoẻ tổng quát áp dụng được cho tất cả mọi người trưởng thành với mục đính đánh giá chức năng của các cơ quan trọng yếu nhất trong cơ thể và phát hiện những bệnh lý thường gặp ở mọi lứa tuổi với 16 danh mục khám.
Gói khám được áp dụng tại phòng khám Medi An An. Gói khám áp dụng mọi lứa tuổi`,
      },
      {
        id: 4,
        title: "Gói khám toàn diện nâng cao (5SLT3)",
        image: "/src/assets/images/clinic-images/162717-logo.jpg",
        specialty: "Nâng cao, Nam, Nữ",
        address:
          "Phòng khám 5 Sao Lý Thái Tổ. 471 - 473 Lý Thái Tổ Phường 09, Quận 10, Thành Phố Hồ Chí Minh",
        description: `Gói khám gồm 20 hạng mục giúp khách hàng trải nghiệm dịch vụ y tế bảo vệ sức khỏe phù hợp với kinh tế, giúp người bệnh phát hiện sớm các vấn đề ung thư, bệnh lý phổ biến như : Tiểu đường, huyết áp, tim mạch, mỡ máu, gout, giáp, viêm gan....... qua các chỉ số xét nghiệm máu từ đó đưa ra phương hướng điều trị nhanh chóng, kịp thời và hiệu quả.
Gói khám từ 16 tuổi trở lên`,
      },
      {
        id: 5,
        title: "Gói khám toàn diện tiêu chuẩn (5SLT2)",
        image: "/src/assets/images/clinic-images/162717-logo.jpg",
        specialty: "Cơ bản, Nam, Nữ",
        address:
          "Phòng khám 5 Sao Lý Thái Tổ. 471 - 473 Lý Thái Tổ Phường 09, Quận 10, Thành Phố Hồ Chí Minh",
        description: `Gói khám gồm 20 hạng mục giúp khách hàng trải nghiệm dịch vụ y tế bảo vệ sức khỏe phù hợp với kinh tế, giúp người bệnh phát hiện sớm các vấn đề ung thư, bệnh lý phổ biến như : Tiểu đường, huyết áp, tim mạch. mỡ máu, gout, giáp, viêm gan....... qua các chỉ số xét nghiệm máu từ đó đưa ra phương hướng điều trị nhanh chóng, kịp thời và hiệu quả.
Gói khám từ 16 tuổi trở lên`,
      },
    ]);

    setEndoscopies([
      {
        id: 1,
        title: "Nội Soi Dạ Dày Không Đau - Endo Clinic",
        image:
          "/src/assets/images/endoscopy-images/111220-noi-soi-da-day-khong-dau-v2.jpg",
        specialty: "Nội soi Tiêu hóa",
        address:
          "Endo Clinic - Tiêu Hoá Khoẻ & Ngừa Ung Thư. 429 Tô Hiến Thành, Phường 14, Quận 10, Thành Phố Hồ Chí Minh",
        description: `Chẩn đoán chính xác bệnh lý dạ dày từ 90 - 95%.
Máy nội soi tiên tiến đến từ Fujifilm, Olympus, với độ phóng đại 100 - 135 lần.
Màn hình 4K cho hình ảnh nội soi sắc nét, Công nghệ nhuộm ảo (NBI).
Quy trình nội soi SSS chuẩn y khoa.
Đặt lịch nội soi dạ dày không đau ngay!`,
      },
      {
        id: 2,
        title: "Nội Soi Trực Tràng Thường - Endo Clinic",
        image:
          "/src/assets/images/endoscopy-images/095112-noi-soi-truc-trang-thuong.jpg",
        specialty: "Nội soi Tiêu hóa",
        address:
          "Endo Clinic - Tiêu Hoá Khoẻ & Ngừa Ung Thư. 429 Tô Hiến Thành, Phường 14, Quận 10, Thành Phố Hồ Chí Minh",
        description: `Bạn chỉ cần thực hiện phương pháp nội soi trực tràng thường, bởi vì chiều dài của trực tràng chỉ khoảng 20 – 30 cm.
Do đó, ống nội soi mềm có thể dễ dàng đi vào cơ thể mà không gây đau hay khó chịu gì cả.
Đặt lịch nội soi trực tràng ngay!`,
      },
      {
        id: 3,
        title: "Nội Soi Cặp Dạ Dày Và Đại Trực Tràng Thường - Endo Clinic",
        image:
          "/src/assets/images/endoscopy-images/132753-noi-soi-cap-thuong-v2-1.jpg",
        specialty: "Nội soi Tiêu hóa",
        address:
          "Endo Clinic - Tiêu Hoá Khoẻ & Ngừa Ung Thư. 429 Tô Hiến Thành, Phường 14, Quận 10, Thành Phố Hồ Chí Minh",
        description: `Phương pháp này có thể gây ra một số cảm giác khó chịu, buồn nôn hay chướng bụng trong quá trình thực hiện. Bác sĩ sẽ gặp khó khăn trong việc quan sát các tổn thương.
Hiệu quả chẩn đoán chính xác bệnh lý tiêu hoá với phương pháp này chỉ từ 50 - 70%.
Đặt lịch nội soi cặp ngay!`,
      },
      {
        id: 4,
        title: "Nội Soi Đại Trực Tràng Thường - Endo Clinic",
        image:
          "/src/assets/images/endoscopy-images/132422-noi-soi-dai-trang-thuong-v2.jpg",
        specialty: "Nội soi Tiêu hóa",
        address:
          "Endo Clinic - Tiêu Hoá Khoẻ & Ngừa Ung Thư. 429 Tô Hiến Thành, Phường 14, Quận 10, Thành Phố Hồ Chí Minh",
        description: `Phương pháp này có thể gây ra một số cảm giác khó chịu, chướng bụng trong quá trình thực hiện. Bác sĩ sẽ gặp khó khăn trong việc quan sát các tổn thương.
Hiệu quả chẩn đoán chính xác bệnh lý đại tràng với phương pháp này chỉ từ 50 - 70%.
Đặt lịch nội soi đại trực tràng ngay!`,
      },
      {
        id: 5,
        title: "Nội Soi Dạ Dày Thường - Endo Clinic",
        image:
          "/src/assets/images/endoscopy-images/131643-noi-soi-da-day-thuong-v2.jpg",
        specialty: "Nội soi Tiêu hóa",
        address:
          "Endo Clinic - Tiêu Hoá Khoẻ & Ngừa Ung Thư. 429 Tô Hiến Thành, Phường 14, Quận 10, Thành Phố Hồ Chí Minh",
        description: `Phương pháp này có thể gây ra một số cảm giác khó chịu, buồn nôn trong quá trình thực hiện. Bác sĩ sẽ gặp khó khăn trong việc quan sát các tổn thương.
Hiệu quả chẩn đoán chính xác bệnh lý dạ dày với phương pháp này chỉ từ 50 - 70%.
Đặt lịch nội soi dạ dày ngay!`,
      },
    ]);

    setTests([
      {
        id: 1,
        title: "Gói xét nghiệm tổng quát cho Nam - Tiêu chuẩn (LH1M)",
        image: "/src/assets/images/clinic-images/120332-labhouse-logo.png",
        specialty: "Tổng quát",
        address:
          "Trung tâm Xét nghiệm Y khoa LabHouse Hồ Chí Minh. 94 An Bình, Phường 5, Quận 5, Thành Phố Hồ Chí Minh",
        description: `Gói xét nghiệm gồm 18 chỉ số, danh mục xét nghiệm đánh giá mỡ máu, kiểm tra bệnh tiểu đường, đánh giá chức năng gan, thận, Kiểm tra hàm lượng sắt, tế bào máu. Gói xét nghiệm phù hợp với đối tượng trên 30 tuổi, giai đoạn cơ thể bắt đầu bước vào thời kỳ suy yếu, dễ gặp phải các vấn đề về sức khỏe.
Gói xét nghiệm tại Trung tâm xét nghiêm Y khoa LabHouse.`,
      },
      {
        id: 2,
        title: "Gói xét nghiệm tầm soát ung thư Nâng cao cho Nữ (LH87F)",
        image: "/src/assets/images/clinic-images/120332-labhouse-logo.png",
        specialty: "Tổng quát",
        address:
          "Trung tâm Xét nghiệm Y khoa LabHouse Hồ Chí Minh. 94 An Bình, Phường 5, Quận 5, Thành Phố Hồ Chí Minh",
        description: `Gói xét nghiệm gồm 28 chỉ số, đánh giá chức năng gan, thận, tuyến giáp, kiểm tra các yếu tố vi lượng, máu và tầm soát các chỉ số ung thư. Gói xét nghiệm phù hợp cho đối tượng nữ giới có nhu cầu kiểm tra sức khỏe, phát hiện sớm các dấu hiệu bất thường của cơ thể từ đó có thể đưa ra các phương hướng điều trị sớm.
Gói xét nghiệm tại Trung tâm xét nghiệm Y khoa LabHouse.`,
      },
      {
        id: 3,
        title:
          "Gói xét nghiệm kiểm tra sức khoẻ sinh sản của nữ giới - Tiêu chuẩn (LH91F)",
        image: "/src/assets/images/clinic-images/120332-labhouse-logo.png",
        specialty: "Tổng quát",
        address:
          "Trung tâm Xét nghiệm Y khoa LabHouse Hồ Chí Minh. 94 An Bình, Phường 5, Quận 5, Thành Phố Hồ Chí Minh",
        description: `Gói xét nghiệm gồm 21 chỉ số, đánh giá các nhóm chức năng Hormone sinh dục, tuyến giáp, gan, thận, tình trạng máu... Gói xét nghiệm phù hợp với đối tượng người chuẩn bị kết hôn hoặc trong độ tuổi sinh sản.
Gói xét nghiệm tại Trung tâm xét nghiệm Y khoa LabHouse.`,
      },
      {
        id: 4,
        title: "Gói xét nghiệm tổng quát cho Nữ - Nâng cao (LH1F)",
        image: "/src/assets/images/clinic-images/120332-labhouse-logo.png",
        specialty: "Tổng quát",
        address:
          "Trung tâm Xét nghiệm Y khoa LabHouse Hồ Chí Minh. 94 An Bình, Phường 5, Quận 5, Thành Phố Hồ Chí Minh",
        description: `Gói xét nghiệm gồm 22 chỉ số, đánh giá mỡ máu, chức năng gan, chức năng thận, kiểm tra bệnh tiểu đường, tế bào máu, kiểm tra hàm lượng sắt, tầm soát ung thư vú và ung thư buồng trứng, Kiểm tra virus gây viêm gan B & C. Gói khám phù hợp cho đối tượng trên 30 tuổi, giai đoạn cơ thể bắt đầu bước vào thời kỳ suy yếu, dễ gặp phải các vấn đề về sức khỏe.
Gói xét nghiệm tại Trung tâm xét nghiệm Y khoa LabHouse.`,
      },
      {
        id: 5,
        title: "Gói xét nghiệm tổng quát cho Nữ - Tiêu chuẩn (LH1F)",
        image: "/src/assets/images/clinic-images/120332-labhouse-logo.png",
        specialty: "Tổng quát",
        address:
          "Trung tâm Xét nghiệm Y khoa LabHouse Hồ Chí Minh. 94 An Bình, Phường 5, Quận 5, Thành Phố Hồ Chí Minh",
        description: `Gói xét nghiệm gồm 17 chỉ số, danh mục xét nghiệm đánh giá mỡ máu, kiểm tra bệnh tiểu đường, đánh giá chức năng gan, thận, Kiểm tra hàm lượng sắt, tế bào máu. Gói khám phù hợp với đối tượng trên 30 tuổi, giai đoạn cơ thể bắt đầu bước vào thời kỳ suy yếu, dễ gặp phải các vấn đề về sức khỏe.
Gói xét nghiệm tại Trung tâm xét nghiêm Y khoa LabHouse.`,
      },
    ]);

    setOperationPackages([
      {
        id: 1,
        title:
          "Gói điều trị cao cấp thẩm mỹ Tĩnh Mạch bằng phương pháp Tiêm xơ + Laser Nd-Yag 1064nm ",
        image: "/src/assets/images/clinic-images/153214-bernard-logo.jpg",
        specialty: "Thủ thuật Suy giãn tĩnh mạch",
        address:
          "Hệ thống Y khoa Chuyên sâu Quốc tế BERNARD (Quận Tân Bình). 22 Phan Đình Giót, Quận Tân Bình, Thành Phố Hồ Chí Minh",
        description: `Can thiệp ít xâm lấn không phẫu thuật, không đau không sẹo, phục hồi nhanh, hiệu quả cao.
Kỹ thuật cao, trực tiếp bởi bác sĩ mạch máu thực hiện.
Chẩn đoán chính xác - Điều trị hiệu quả an toàn`,
      },
      {
        id: 2,
        title:
          "Điều trị chuyên sâu Suy giãn tĩnh mạch bằng phương pháp Laser (BN)",
        image: "/src/assets/images/clinic-images/153214-bernard-logo.jpg",
        specialty: "Thủ thuật Suy giãn tĩnh mạch",
        address:
          "Hệ thống Y khoa Chuyên sâu Quốc tế BERNARD (Quận Tân Bình). 22 Phan Đình Giót, Quận Tân Bình, Thành Phố Hồ Chí Minh",
        description: `Được thăm khám trực tiếp với bác sĩ giàu kinh nghiệm bởi bác sĩ mạch máu.
Chẩn đoán chính xác - Điều trị hiệu quả an toàn.
Sạch búi gân, chân hết nặng mỏi`,
      },
    ]);
  }, []);

  return (
    <div className="medical-service-near-you-section">
      <section className="page-banner-section">
        <div className="img-container">
          <div className="img-overlay">
            <img src="/src/assets/images/093216-bc.jpg" alt="page banner" />
          </div>
        </div>
        <div className="search-section">
          <h1 className="page-header">Y TẾ GẦN BẠN</h1>
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
      </section>

      <section className="clinic-section">
        <div className="section-container md-px-10">
          <div className="clinic-section-header">
            <SectionHeaderTitle title="Cơ sở y tế" />
          </div>
          <div className="clinic-section-content">
            <div className="clinic-list">
              {clinics &&
                clinics.length > 0 &&
                clinics.map((item) => {
                  return (
                    <Link key={item.id}>
                      <div className="clinic-list-item">
                        <div className="img-container">
                          <img src={item.image} alt={item.title} />
                        </div>
                        <div className="clinic-item-content">
                          <div className="clinic-item-header">
                            <span>{item.title}</span>
                          </div>
                          <div className="clinic-item-address d-flex align-items-center">
                            <div className="img-container">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={13}
                                height={16}
                                fill="#45c3d2"
                                preserveAspectRatio="none"
                                viewBox="0 0 20 26"
                                style={{
                                  marginTop: 3,
                                }}
                              >
                                <path d="M8.842 15.5h2.397v-3.75h3.596v-2.5h-3.596V5.5H8.842v3.75H5.246v2.5h3.596zm1.199 10c-3.217-2.854-5.619-5.505-7.207-7.953C1.246 15.099.452 12.833.452 10.75c0-3.125.964-5.615 2.892-7.469C5.27 1.427 7.504.5 10.04.5s4.769.927 6.697 2.781c1.927 1.854 2.891 4.344 2.891 7.469 0 2.083-.794 4.349-2.382 6.797-1.588 2.448-3.99 5.099-7.206 7.953" />
                              </svg>
                            </div>
                            <span>{item.address}</span>
                          </div>
                          <div className="clinic-item-distance d-flex align-items-center">
                            <div className="img-container">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={14}
                                height={16}
                                fill="#45c3d2"
                                preserveAspectRatio="none"
                                viewBox="0 0 26 29"
                              >
                                <path d="M10.75 5V0h2.5v5zM5.219 6.781l-3.75-3.75L3.25 1.25 7 5zM2 28.75a1.21 1.21 0 0 1-.89-.36 1.21 1.21 0 0 1-.36-.89v-10L3.375 10c.125-.375.349-.677.672-.906a1.82 1.82 0 0 1 1.078-.344H8.25v-2.5h4.094c-.5.708-.89 1.484-1.172 2.328a8.392 8.392 0 0 0-.422 2.672H5.563l-1.844 5h8.625c.354.5.75.963 1.187 1.39.438.428.927.797 1.469 1.11H3.25v5h17.5v-3.844a8.751 8.751 0 0 0 2.5-.75V27.5c0 .354-.12.651-.36.89-.239.24-.536.36-.89.36h-1.25a1.21 1.21 0 0 1-.89-.36 1.21 1.21 0 0 1-.36-.89v-1.25h-15v1.25c0 .354-.12.651-.36.89-.239.24-.536.36-.89.36zm2.5-6.25h3.75c.354 0 .651-.12.89-.36.24-.239.36-.536.36-.89s-.12-.651-.36-.89a1.21 1.21 0 0 0-.89-.36H4.5zm15 0V20h-3.75c-.354 0-.651.12-.89.36-.24.239-.36.536-.36.89s.12.651.36.89c.239.24.536.36.89.36zm-.906-8.437 4.343-4.313-1.312-1.312-3.031 2.968-1.219-1.219-1.312 1.344zM19.5 5c1.73 0 3.203.61 4.422 1.828 1.219 1.219 1.828 2.693 1.828 4.422 0 1.73-.61 3.203-1.828 4.422C22.703 16.89 21.229 17.5 19.5 17.5c-1.73 0-3.203-.61-4.422-1.828-1.219-1.219-1.828-2.693-1.828-4.422 0-1.73.61-3.203 1.828-4.422C16.297 5.61 17.771 5 19.5 5" />
                              </svg>
                            </div>
                            <span>{item.distance} km</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
            </div>
          </div>
        </div>
      </section>

      <section className="doctor-section">
        <div className="section-container md-px-10">
          <div className="doctor-section-header mb-20">
            <SectionHeaderTitle title="Bác sĩ" />
          </div>
          <div className="doctor-section-content">
            <div className="doctor-list d-flex flex-column">
              {doctors &&
                doctors.length > 0 &&
                doctors.map((item) => {
                  const addressSentences = item.address
                    .split(".")
                    .filter((sentence) => sentence.trim() !== "");

                  const descriptionSentences = item.description
                    .split(".")
                    .filter((sentence) => sentence.trim() !== "");

                  return (
                    <Link key={item.id}>
                      <div className="doctor-list-item">
                        <div className="upper-content">
                          <div className="img-container">
                            <img src={item.image} alt={item.title} />
                          </div>
                          <div className="doctor-item-content">
                            <div className="doctor-item-header">
                              <span>{item.title}</span>
                            </div>
                            <div className="doctor-item-specialty d-flex">
                              <div className="img-container">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width={13}
                                  height={13}
                                  fill="#45c3d2"
                                  preserveAspectRatio="none"
                                  viewBox="0 0 18 18"
                                  style={{
                                    marginTop: 3,
                                  }}
                                >
                                  <path d="M7.603 14h2.877v-3.5h3.355v-3H10.48V4H7.604v3.5H4.247v3h3.356zm-5.274 4a1.81 1.81 0 0 1-1.354-.587A1.968 1.968 0 0 1 .412 16V2c0-.55.187-1.02.563-1.412A1.81 1.81 0 0 1 2.329 0h13.424c.528 0 .979.196 1.355.588.375.391.563.862.563 1.412v14c0 .55-.188 1.02-.563 1.413a1.81 1.81 0 0 1-1.355.587z" />
                                </svg>
                              </div>
                              <span>{item.specialty}</span>
                            </div>
                            <div className="doctor-item-address d-flex">
                              <div className="img-container">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width={13}
                                  height={16}
                                  fill="#45c3d2"
                                  preserveAspectRatio="none"
                                  viewBox="0 0 20 26"
                                  style={{
                                    marginTop: 3,
                                  }}
                                >
                                  <path d="M8.842 15.5h2.397v-3.75h3.596v-2.5h-3.596V5.5H8.842v3.75H5.246v2.5h3.596zm1.199 10c-3.217-2.854-5.619-5.505-7.207-7.953C1.246 15.099.452 12.833.452 10.75c0-3.125.964-5.615 2.892-7.469C5.27 1.427 7.504.5 10.04.5s4.769.927 6.697 2.781c1.927 1.854 2.891 4.344 2.891 7.469 0 2.083-.794 4.349-2.382 6.797-1.588 2.448-3.99 5.099-7.206 7.953" />
                                </svg>
                              </div>
                              <div>
                                {addressSentences.map((sentence, index) => (
                                  <span key={index}>
                                    {sentence.trim()}
                                    <br />
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="lower-content">
                          <div className="doctor-item-description">
                            <span>
                              {descriptionSentences.map((sentence) => (
                                <>
                                  {sentence.trim()}
                                  <br />
                                </>
                              ))}
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
            </div>
          </div>
        </div>
      </section>

      <section className="video-advisor-section">
        <div className="section-container md-px-10">
          <div className="video-advisor-section-header mb-20">
            <SectionHeaderTitle title="Tư vấn qua video" />
          </div>
          <div className="video-advisor-section-content">
            <div className="video-advisor-list d-flex flex-column">
              {videoAdvisors &&
                videoAdvisors.length > 0 &&
                videoAdvisors.map((item) => {
                  const addressSentences = item.address
                    .split(".")
                    .filter((sentence) => sentence.trim() !== "");

                  const descriptionSentences = item.description
                    .split(".")
                    .filter((sentence) => sentence.trim() !== "");

                  return (
                    <Link key={item.id}>
                      <div className="doctor-list-item">
                        <div className="upper-content">
                          <div className="img-container">
                            <img src={item.image} alt={item.title} />
                          </div>
                          <div className="doctor-item-content">
                            <div className="doctor-item-header">
                              <span>{item.title}</span>
                            </div>
                            <div className="doctor-item-specialty d-flex">
                              <div className="img-container">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width={13}
                                  height={13}
                                  fill="#45c3d2"
                                  preserveAspectRatio="none"
                                  viewBox="0 0 18 18"
                                  style={{
                                    marginTop: 3,
                                  }}
                                >
                                  <path d="M7.603 14h2.877v-3.5h3.355v-3H10.48V4H7.604v3.5H4.247v3h3.356zm-5.274 4a1.81 1.81 0 0 1-1.354-.587A1.968 1.968 0 0 1 .412 16V2c0-.55.187-1.02.563-1.412A1.81 1.81 0 0 1 2.329 0h13.424c.528 0 .979.196 1.355.588.375.391.563.862.563 1.412v14c0 .55-.188 1.02-.563 1.413a1.81 1.81 0 0 1-1.355.587z" />
                                </svg>
                              </div>
                              <span>{item.specialty}</span>
                            </div>
                            <div className="doctor-item-address d-flex">
                              <div className="img-container">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width={13}
                                  height={16}
                                  fill="#45c3d2"
                                  preserveAspectRatio="none"
                                  viewBox="0 0 20 26"
                                  style={{
                                    marginTop: 3,
                                  }}
                                >
                                  <path d="M8.842 15.5h2.397v-3.75h3.596v-2.5h-3.596V5.5H8.842v3.75H5.246v2.5h3.596zm1.199 10c-3.217-2.854-5.619-5.505-7.207-7.953C1.246 15.099.452 12.833.452 10.75c0-3.125.964-5.615 2.892-7.469C5.27 1.427 7.504.5 10.04.5s4.769.927 6.697 2.781c1.927 1.854 2.891 4.344 2.891 7.469 0 2.083-.794 4.349-2.382 6.797-1.588 2.448-3.99 5.099-7.206 7.953" />
                                </svg>
                              </div>
                              <div>
                                <span>
                                  {addressSentences.map((sentence) => (
                                    <>
                                      {sentence.trim()}
                                      <br />
                                    </>
                                  ))}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="lower-content">
                          <div className="doctor-item-description">
                            <span>
                              {descriptionSentences.map((sentence) => (
                                <>
                                  {sentence.trim()}
                                  <br />
                                </>
                              ))}
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
            </div>
          </div>
        </div>
      </section>

      <section className="health-check-package-section">
        <div className="section-container md-px-10">
          <div className="health-check-package-section-header mb-20">
            <SectionHeaderTitle title="Gói khám" />
          </div>
          <div className="health-check-package-section-content">
            <div className="health-check-package-list d-flex flex-column">
              {healthCheckPackages &&
                healthCheckPackages.length > 0 &&
                healthCheckPackages.map((item) => {
                  const addressSentences = item.address
                    .split("&")
                    .filter((sentence) => sentence.trim() !== "");

                  const descriptionSentences = item.description
                    .split(".")
                    .filter((sentence) => sentence.trim() !== "");

                  return (
                    <Link key={item.id}>
                      <div className="doctor-list-item">
                        <div className="upper-content">
                          <div className="img-container">
                            <img src={item.image} alt={item.title} />
                          </div>
                          <div className="doctor-item-content">
                            <div className="doctor-item-header">
                              <span>{item.title}</span>
                            </div>
                            <div className="doctor-item-specialty d-flex">
                              <div className="img-container">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width={13}
                                  height={13}
                                  fill="#45c3d2"
                                  preserveAspectRatio="none"
                                  viewBox="0 0 18 18"
                                  style={{
                                    marginTop: 3,
                                  }}
                                >
                                  <path d="M7.603 14h2.877v-3.5h3.355v-3H10.48V4H7.604v3.5H4.247v3h3.356zm-5.274 4a1.81 1.81 0 0 1-1.354-.587A1.968 1.968 0 0 1 .412 16V2c0-.55.187-1.02.563-1.412A1.81 1.81 0 0 1 2.329 0h13.424c.528 0 .979.196 1.355.588.375.391.563.862.563 1.412v14c0 .55-.188 1.02-.563 1.413a1.81 1.81 0 0 1-1.355.587z" />
                                </svg>
                              </div>
                              <span>{item.specialty}</span>
                            </div>
                            {addressSentences.map((sentence, index) => {
                              return (
                                <div
                                  className="doctor-item-address d-flex"
                                  key={index}
                                >
                                  <div className="img-container">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width={13}
                                      height={16}
                                      fill="#45c3d2"
                                      preserveAspectRatio="none"
                                      viewBox="0 0 20 26"
                                      style={{
                                        marginTop: 3,
                                      }}
                                    >
                                      <path d="M8.842 15.5h2.397v-3.75h3.596v-2.5h-3.596V5.5H8.842v3.75H5.246v2.5h3.596zm1.199 10c-3.217-2.854-5.619-5.505-7.207-7.953C1.246 15.099.452 12.833.452 10.75c0-3.125.964-5.615 2.892-7.469C5.27 1.427 7.504.5 10.04.5s4.769.927 6.697 2.781c1.927 1.854 2.891 4.344 2.891 7.469 0 2.083-.794 4.349-2.382 6.797-1.588 2.448-3.99 5.099-7.206 7.953" />
                                    </svg>
                                  </div>
                                  <div>
                                    {sentence
                                      .split(".")
                                      .filter(
                                        (subSentence) =>
                                          subSentence.trim() !== ""
                                      )
                                      .map((subSentence) => {
                                        return (
                                          <span key={index}>
                                            {subSentence.trim()}
                                            <br />
                                          </span>
                                        );
                                      })}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                        <div className="lower-content">
                          <div className="doctor-item-description">
                            <span>
                              {descriptionSentences.map((sentence) => (
                                <>
                                  {sentence.trim()}
                                  <br />
                                </>
                              ))}
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
            </div>
          </div>
        </div>
      </section>

      <section className="endoscopy-section">
        <div className="section-container md-px-10">
          <div className="endoscopy-section-header mb-20">
            <SectionHeaderTitle title="Nội soi" />
          </div>
          <div className="endoscopy-section-content">
            <div className="endoscopy-list d-flex flex-column">
              {endoscopies &&
                endoscopies.length > 0 &&
                endoscopies.map((item) => {
                  const addressSentences = item.address
                    .split("&")
                    .filter((sentence) => sentence.trim() !== "");

                  const descriptionSentences = item.description
                    .split(".")
                    .filter((sentence) => sentence.trim() !== "");

                  return (
                    <Link key={item.id}>
                      <div className="doctor-list-item">
                        <div className="upper-content">
                          <div className="img-container">
                            <img src={item.image} alt={item.title} />
                          </div>
                          <div className="doctor-item-content">
                            <div className="doctor-item-header">
                              <span>{item.title}</span>
                            </div>
                            <div className="doctor-item-specialty d-flex">
                              <div className="img-container">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width={13}
                                  height={13}
                                  fill="#45c3d2"
                                  preserveAspectRatio="none"
                                  viewBox="0 0 18 18"
                                  style={{
                                    marginTop: 3,
                                  }}
                                >
                                  <path d="M7.603 14h2.877v-3.5h3.355v-3H10.48V4H7.604v3.5H4.247v3h3.356zm-5.274 4a1.81 1.81 0 0 1-1.354-.587A1.968 1.968 0 0 1 .412 16V2c0-.55.187-1.02.563-1.412A1.81 1.81 0 0 1 2.329 0h13.424c.528 0 .979.196 1.355.588.375.391.563.862.563 1.412v14c0 .55-.188 1.02-.563 1.413a1.81 1.81 0 0 1-1.355.587z" />
                                </svg>
                              </div>
                              <span>{item.specialty}</span>
                            </div>
                            {addressSentences.map((sentence, index) => {
                              return (
                                <div
                                  className="doctor-item-address d-flex"
                                  key={index}
                                >
                                  <div className="img-container">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width={13}
                                      height={16}
                                      fill="#45c3d2"
                                      preserveAspectRatio="none"
                                      viewBox="0 0 20 26"
                                      style={{
                                        marginTop: 3,
                                      }}
                                    >
                                      <path d="M8.842 15.5h2.397v-3.75h3.596v-2.5h-3.596V5.5H8.842v3.75H5.246v2.5h3.596zm1.199 10c-3.217-2.854-5.619-5.505-7.207-7.953C1.246 15.099.452 12.833.452 10.75c0-3.125.964-5.615 2.892-7.469C5.27 1.427 7.504.5 10.04.5s4.769.927 6.697 2.781c1.927 1.854 2.891 4.344 2.891 7.469 0 2.083-.794 4.349-2.382 6.797-1.588 2.448-3.99 5.099-7.206 7.953" />
                                    </svg>
                                  </div>
                                  <div>
                                    {sentence
                                      .split(".")
                                      .filter(
                                        (subSentence) =>
                                          subSentence.trim() !== ""
                                      )
                                      .map((subSentence) => {
                                        return (
                                          <span key={index}>
                                            {subSentence.trim()}
                                            <br />
                                          </span>
                                        );
                                      })}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                        <div className="lower-content">
                          <div className="doctor-item-description">
                            <span>
                              {descriptionSentences.map((sentence) => (
                                <>
                                  {sentence.trim()}
                                  <br />
                                </>
                              ))}
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
            </div>
          </div>
        </div>
      </section>

      <section className="test-section">
        <div className="section-container md-px-10">
          <div className="test-section-header mb-20">
            <SectionHeaderTitle title="Xét nghiệm" />
          </div>
          <div className="test-section-content">
            <div className="test-list d-flex flex-column">
              {tests &&
                tests.length > 0 &&
                tests.map((item) => {
                  const addressSentences = item.address
                    .split("&")
                    .filter((sentence) => sentence.trim() !== "");

                  const descriptionSentences = item.description
                    .split(".")
                    .filter((sentence) => sentence.trim() !== "");

                  return (
                    <Link key={item.id}>
                      <div className="doctor-list-item">
                        <div className="upper-content">
                          <div className="img-container">
                            <img src={item.image} alt={item.title} />
                          </div>
                          <div className="doctor-item-content">
                            <div className="doctor-item-header">
                              <span>{item.title}</span>
                            </div>
                            <div className="doctor-item-specialty d-flex">
                              <div className="img-container">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width={13}
                                  height={13}
                                  fill="#45c3d2"
                                  preserveAspectRatio="none"
                                  viewBox="0 0 18 18"
                                  style={{
                                    marginTop: 3,
                                  }}
                                >
                                  <path d="M7.603 14h2.877v-3.5h3.355v-3H10.48V4H7.604v3.5H4.247v3h3.356zm-5.274 4a1.81 1.81 0 0 1-1.354-.587A1.968 1.968 0 0 1 .412 16V2c0-.55.187-1.02.563-1.412A1.81 1.81 0 0 1 2.329 0h13.424c.528 0 .979.196 1.355.588.375.391.563.862.563 1.412v14c0 .55-.188 1.02-.563 1.413a1.81 1.81 0 0 1-1.355.587z" />
                                </svg>
                              </div>
                              <span>{item.specialty}</span>
                            </div>
                            {addressSentences.map((sentence, index) => {
                              return (
                                <div
                                  className="doctor-item-address d-flex"
                                  key={index}
                                >
                                  <div className="img-container">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width={13}
                                      height={16}
                                      fill="#45c3d2"
                                      preserveAspectRatio="none"
                                      viewBox="0 0 20 26"
                                      style={{
                                        marginTop: 3,
                                      }}
                                    >
                                      <path d="M8.842 15.5h2.397v-3.75h3.596v-2.5h-3.596V5.5H8.842v3.75H5.246v2.5h3.596zm1.199 10c-3.217-2.854-5.619-5.505-7.207-7.953C1.246 15.099.452 12.833.452 10.75c0-3.125.964-5.615 2.892-7.469C5.27 1.427 7.504.5 10.04.5s4.769.927 6.697 2.781c1.927 1.854 2.891 4.344 2.891 7.469 0 2.083-.794 4.349-2.382 6.797-1.588 2.448-3.99 5.099-7.206 7.953" />
                                    </svg>
                                  </div>
                                  <div>
                                    {sentence
                                      .split(".")
                                      .filter(
                                        (subSentence) =>
                                          subSentence.trim() !== ""
                                      )
                                      .map((subSentence) => {
                                        return (
                                          <span key={index}>
                                            {subSentence.trim()}
                                            <br />
                                          </span>
                                        );
                                      })}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                        <div className="lower-content">
                          <div className="doctor-item-description">
                            <span>
                              {descriptionSentences.map((sentence) => (
                                <>
                                  {sentence.trim()}
                                  <br />
                                </>
                              ))}
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
            </div>
          </div>
        </div>
      </section>

      <section className="operation-section">
        <div className="section-container md-px-10">
          <div className="operation-section-header mb-20">
            <SectionHeaderTitle title="Phẫu thuật" />
          </div>
          <div className="operation-section-content">
            <div className="operation-list d-flex flex-column">
              {operationPackages &&
                operationPackages.length > 0 &&
                operationPackages.map((item) => {
                  const addressSentences = item.address
                    .split("&")
                    .filter((sentence) => sentence.trim() !== "");

                  const descriptionSentences = item.description
                    .split(".")
                    .filter((sentence) => sentence.trim() !== "");

                  return (
                    <Link key={item.id}>
                      <div className="doctor-list-item">
                        <div className="upper-content">
                          <div className="img-container">
                            <img src={item.image} alt={item.title} />
                          </div>
                          <div className="doctor-item-content">
                            <div className="doctor-item-header">
                              <span>{item.title}</span>
                            </div>
                            <div className="doctor-item-specialty d-flex">
                              <div className="img-container">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width={13}
                                  height={13}
                                  fill="#45c3d2"
                                  preserveAspectRatio="none"
                                  viewBox="0 0 18 18"
                                  style={{
                                    marginTop: 3,
                                  }}
                                >
                                  <path d="M7.603 14h2.877v-3.5h3.355v-3H10.48V4H7.604v3.5H4.247v3h3.356zm-5.274 4a1.81 1.81 0 0 1-1.354-.587A1.968 1.968 0 0 1 .412 16V2c0-.55.187-1.02.563-1.412A1.81 1.81 0 0 1 2.329 0h13.424c.528 0 .979.196 1.355.588.375.391.563.862.563 1.412v14c0 .55-.188 1.02-.563 1.413a1.81 1.81 0 0 1-1.355.587z" />
                                </svg>
                              </div>
                              <span>{item.specialty}</span>
                            </div>
                            {addressSentences.map((sentence, index) => {
                              return (
                                <div
                                  className="doctor-item-address d-flex"
                                  key={index}
                                >
                                  <div className="img-container">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width={13}
                                      height={16}
                                      fill="#45c3d2"
                                      preserveAspectRatio="none"
                                      viewBox="0 0 20 26"
                                      style={{
                                        marginTop: 3,
                                      }}
                                    >
                                      <path d="M8.842 15.5h2.397v-3.75h3.596v-2.5h-3.596V5.5H8.842v3.75H5.246v2.5h3.596zm1.199 10c-3.217-2.854-5.619-5.505-7.207-7.953C1.246 15.099.452 12.833.452 10.75c0-3.125.964-5.615 2.892-7.469C5.27 1.427 7.504.5 10.04.5s4.769.927 6.697 2.781c1.927 1.854 2.891 4.344 2.891 7.469 0 2.083-.794 4.349-2.382 6.797-1.588 2.448-3.99 5.099-7.206 7.953" />
                                    </svg>
                                  </div>
                                  <div>
                                    {sentence
                                      .split(".")
                                      .filter(
                                        (subSentence) =>
                                          subSentence.trim() !== ""
                                      )
                                      .map((subSentence) => {
                                        return (
                                          <span key={index}>
                                            {subSentence.trim()}
                                            <br />
                                          </span>
                                        );
                                      })}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                        <div className="lower-content">
                          <div className="doctor-item-description">
                            <span>
                              {descriptionSentences.map((sentence) => (
                                <>
                                  {sentence.trim()}
                                  <br />
                                </>
                              ))}
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default MedicalServiceNearYou;
