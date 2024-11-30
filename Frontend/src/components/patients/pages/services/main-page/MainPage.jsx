import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectMedicalServices,
  selectSpecialties,
  selectSpecificMedicalServices,
  selectGuides,
  selectLivingHealthyBlogPosts,
  selectForDoctorAndHealthFacilityBlogPosts,
} from "../../../../../redux/slices/adminSlice.js";
import { getAllDataBySlug } from "../../../../../services/admin/SiteServices";
import Slider from "../../../../partials/slider/AppSlider";
import ServiceForYou from "../../../../patients/service-for-you/ServiceForYou";
import FullService from "../../../../patients/full-service-section/FullService";
import Specialty from "../../../../patients/specialty/Specialty";
import Clinic from "../../../../patients/clinic/Clinic";
import FamousDoctor from "../../../famous-doctor/FamousDoctor";
import OnlineDiagnostic from "../../../../patients/online-diagnostic/OnlineDiagnostic";
import BookingCareRecommendation from "../../../../patients/bookingcare-recommendation/BookingCareRecommendation";
import MentalHealth from "../../../../patients/mental-health/MentalHealth";
import QuestionAndAnswer from "../../../../patients/question-and-answer/QuestionAndAnswer";
import MediaAboutBookingCare from "../../../../patients/media-about-bookingcare/MediaAboutBookingCare";
import Guide from "../../../../patients/guide/Guide";
import LivingHealthy from "../../../../patients/living-healthy/LivingHealthy";
import ForDoctorAndClinic from "../../../../patients/for-doctor-and-clinic/ForDoctorAndClinic";

function MainPage() {
  const [doctors, setDoctors] = useState([]);
  const dispatch = useDispatch();
  const fullService = useSelector(selectMedicalServices);
  const specialties = useSelector(selectSpecialties);
  const specificMedicalServices = useSelector(selectSpecificMedicalServices);
  const guides = useSelector(selectGuides);
  const livingHealthyBlogPosts = useSelector(selectLivingHealthyBlogPosts);
  const forDoctorAndHealthFacilityBlogPosts = useSelector(
    selectForDoctorAndHealthFacilityBlogPosts
  );
  const isLoading = useSelector((state) => state.admin.isLoading);
  const isError = useSelector((state) => state.admin.isError);

  useEffect(() => {
    setDoctors([
      {
        id: 1,
        name: "Phó Giáo sư, Tiến sĩ, Bác sĩ Nguyễn Trọng Hưng",
        image: "/src/assets/images/doctor-images/pgs-nguyen-trong-hung.jpg",
        specialty: "Thần kinh",
        description:
          "Nguyên Trưởng khoa Tâm Thần kinh – Bệnh viện Lão Khoa Trung ương. Nguyên Bác sỹ Khoa Thần kinh - Bệnh viện Bạch Mai. Bác sĩ khám cho người bệnh từ 3 tuổi trở lên ",
        place: "Hà Nội",
        slug: "pho-giao-su-tien-si-bac-si-nguyen-trong-hung-i172",
      },
      {
        id: 2,
        name: "Tiến sĩ, Bác sĩ Chuyên khoa II Trà Anh Duy",
        image: "/src/assets/images/doctor-images/bs-duy-2022.jpg",
        specialty: "Nam học, Thận - Tiết niệu",
        description:
          "Hơn 15 năm kinh nghiệm khám các vấn đề sức khỏe nam giới. Hiện đang công tác tại Bệnh viện Bình Dân. Từng tu nghiệp tại nước ngoài: Singapore, Hoa Kì",
        place: "Thành phố Hồ Chí Minh",
        slug: "pho-giao-su-tien-si-bac-si-nguyen-trong-hung-i172",
      },
      {
        id: 3,
        name: "Thầy thuốc Ưu tú, Bác sĩ CKII Nguyễn Tiến Lãng",
        image: "/src/assets/images/doctor-images/bs-nguyen-tien-lang.png",
        specialty: "Tiểu đường - Nội tiết, Ung bướu, Tuyến giáp",
        description:
          "Nguyên Trưởng khoa Ngoại chung – Bệnh viện Nội tiết Trung ương. Gần 40 năm kinh nghiệm trong lĩnh vực Nội tiết, hơn 30 năm phẫu thuật tuyến giáp. Bác sĩ nhận khám trên 3 tuổi ",
        place: "Hà Nội",
        slug: "pho-giao-su-tien-si-bac-si-nguyen-trong-hung-i172",
      },
      {
        id: 4,
        name: "Phó Giáo sư, Tiến sĩ, Bác sĩ Nguyễn Văn Liệu",
        image:
          "/src/assets/images/doctor-images/pho-giao-su-nguyen-van-lieu.jpg",
        specialty: "Thần kinh",
        description:
          "Phó Trưởng khoa Thần kinh, Bệnh viện Bạch Mai. Phó Chủ nhiệm Bộ môn Thần kinh, Đại học Y khoa Hà Nội. Bác sĩ với hơn 30 năm kinh nghiệm trong nghề",
        place: "Hà Nội",
        slug: "pho-giao-su-tien-si-bac-si-nguyen-trong-hung-i172",
      },
      {
        id: 5,
        name: "Phó Giáo sư, Tiến sĩ Kiều Đình Hùng",
        image: "/src/assets/images/doctor-images/pgs-kieu-dinh-hung.png",
        specialty: "Thần kinh, Cột sống, Ngoại thần kinh",
        description:
          "Trưởng khoa Ngoại, Bệnh viện Đại học Y Hà Nội. Trên 20 năm kinh nghiệm công tác ở khoa Phẫu thuật thần kinh - Bệnh viện Việt Đức. Bác sĩ nhận khám từ 15 tuổi trở lên (dưới 15 tuổi hỏi ý kiến bác sĩ) ",
        place: "Hà Nội",
        slug: "pho-giao-su-tien-si-bac-si-nguyen-trong-hung-i172",
      },
      {
        id: 6,
        name: "Bác sĩ Chuyên khoa I Nguyễn Tường Vũ",
        image:
          "/src/assets/images/doctor-images/bac-si-noi-than-kinh-nguyen-tuong-vu.png",
        specialty: "Thần kinh, Ngoại thần kinh",
        description:
          "Nhiều năm kinh nghiệm trong khám và điều trị các bệnh lý Nội - Ngoại Thần kinh. Hiện đang công tác tại Bệnh viện Chợ Rẫy và Bệnh viện Nhân dân 115. Bác sĩ nhận khám từ 10 tuổi ",
        place: "Thành phố Hồ Chí Minh",
        slug: "pho-giao-su-tien-si-bac-si-nguyen-trong-hung-i172",
      },
      {
        id: 7,
        name: "Bác sĩ Chuyên khoa I Phan Vương Huy Đổng",
        image: "/src/assets/images/doctor-images/bs-phan-dong-huy-vuong.jpg",
        specialty: "Cơ Xương Khớp, Chấn thương chỉnh hình",
        description:
          "Hơn 30 năm kinh nghiệm khám và điều trị về Cơ xương khớp - Chấn thương chỉnh hình. Bác sĩ từng công tác tại Khoa Y học thể thao, Bệnh viện Nhân dân 115. Bác sĩ từng công tác tại Khoa Chi dưới, Bệnh viện Chấn thương chỉnh hình TP. HCM. Bác sĩ nhận khám từ 16 tuổi trở lên ",
        place: "Thành phố Hồ Chí Minh",
        slug: "pho-giao-su-tien-si-bac-si-nguyen-trong-hung-i172",
      },
      {
        id: 8,
        name: "Thạc sĩ, Bác sĩ Hứa Thúy Vi",
        image: "/src/assets/images/doctor-images/bs-hua-thuy-vi.jpg",
        specialty: "Tiêu hoá, Bệnh Viêm gan",
        description:
          "Giám đốc Phòng khám Chuyên khoa Nội An Phước. Bác sĩ chuyên khoa Tiêu hóa - Gan mật - Nội soi tiêu hóa. Hơn 15 năm công tác tại Bệnh viện Nhân dân 115. Bác sĩ nhận khám cho bệnh nhân từ 15 tuổi trở lên",
        place: "Thành phố Hồ Chí Minh",
        slug: "pho-giao-su-tien-si-bac-si-nguyen-trong-hung-i172",
      },
      {
        id: 9,
        name: "Bác sĩ Chuyên khoa II Nguyễn Văn Phi",
        image: "/src/assets/images/doctor-images/thac-si-nguyen-van-phi.jpg",
        specialty: "Sức khỏe tâm thần",
        description:
          "Nhiều năm kinh nghiệm trong lĩnh vực Tâm thần. Hiện đang là Phụ trách khoa Sức khỏe tâm thần, Bệnh viện Lão khoa. Giảng viên - Giáo vụ Đại học bộ môn Tâm thần, Đại học Y Hà Nội. Từng công tác tại Viện sức khỏe Tâm thần, Bệnh viện Bạch Mai",
        place: "Hà Nội",
        slug: "pho-giao-su-tien-si-bac-si-nguyen-trong-hung-i172",
      },
      {
        id: 10,
        name: "Tiến sĩ, Bác sĩ Vũ Thái Hà",
        image: "/src/assets/images/doctor-images/bac-si-vu-thai-ha.jpg",
        specialty: "Da liễu,Da liễu thẩm mỹ",
        description:
          "Trưởng khoa Khoa nghiên cứu và ứng dụng công nghệ tế bào gốc - Bệnh viện Da liễu Trung ương",
        place: "Hà Nội",
        slug: "pho-giao-su-tien-si-bac-si-nguyen-trong-hung-i172",
      },
      {
        id: 11,
        name: "Bác sĩ Chuyên khoa II Lê Hồng Anh",
        image: "/src/assets/images/doctor-images/bs-hong-anh.jpg",
        specialty: "Hô hấp - Phổi",
        description:
          "Hơn 20 năm kinh nghiệm trong lĩnh vực Phổi và Lao. Từng công tác nhiều năm tại Bệnh viện Phạm Ngọc Thạch. BÁC SĨ NHẬN KHÁM BỆNH NHÂN TỪ 16 TUỔI TRỞ LÊN",
        place: "Thành phố Hồ Chí Minh",
        slug: "pho-giao-su-tien-si-bac-si-nguyen-trong-hung-i172",
      },
      {
        id: 12,
        name: "Bác sĩ Chuyên khoa II Nguyễn Tiến Thành",
        image: "/src/assets/images/doctor-images/bs-nguyen-tien-thanh.png",
        specialty: "Da liễu, Da liễu thẩm mỹ",
        description:
          "Hơn 15 năm kinh nghiệm trong chuyên khoa Da liễu và thế mạnh chính về Laser sắc tố da. Phó Trưởng phòng Quản lý chất lượng, Bệnh viện Da liễu Trung ương. Bác sĩ khoa Laser và săn sóc da, Bệnh viện Da liễu Trung ương",
        place: "Hà Nội",
        slug: "pho-giao-su-tien-si-bac-si-nguyen-trong-hung-i172",
      },
      {
        id: 13,
        name: "Tiến sĩ, Bác sĩ Phạm Chí Lăng",
        image: "/src/assets/images/doctor-images/ts-bs-pham-chi-lang.jpg",
        specialty: "Cơ Xương Khớp, Chấn thương chỉnh hình",
        description:
          "Hơn 30 năm kinh nghiệm trong lĩnh vực Cơ xương khớp - Chấn thương chỉnh hình. Từng công tác tại các bệnh viện lớn như: Bệnh viện Chợ Rẫy, Bệnh viện Chấn thương chỉnh hình TP.HCM, Bệnh viện Pháp Việt (FV). Giảng viên tại nhiều trường đại học y khoa nổi tiếng như: Đại học Y Dược TP.HCM, Đại học Y Phạm Ngọc Thạch, khoa Y trường Đại học Quốc Gia TP.HCM,...",
        place: "Thành phố Hồ Chí Minh",
        slug: "pho-giao-su-tien-si-bac-si-nguyen-trong-hung-i172",
      },
      {
        id: 14,
        name: "Tiến sĩ, Bác sĩ Nguyễn Văn Doanh",
        image: "/src/assets/images/doctor-images/nguyen-van-doanh.jpg",
        specialty: "Thần kinh",
        description:
          "Trưởng khoa Khám bệnh, Bệnh viện Đa khoa Quốc tế Thu Cúc. Nguyên chủ nhiệm khoa thần kinh, Bệnh viện Hữu Nghị Việt Xô. Bác sĩ có 40 năm kinh nghiệm làm việc chuyên khoa Nội Thần kinh. Bác sĩ khám cho người bệnh từ 16 tuổi trở lên ",
        place: "Hà Nội",
        slug: "pho-giao-su-tien-si-bac-si-nguyen-trong-hung-i172",
      },
      {
        id: 15,
        name: "Bác sĩ Chuyên khoa II Đoàn Tiến Thành",
        image: "/src/assets/images/doctor-images/bs-doan-tien-thanh.jpg",
        specialty: "Tai Mũi Họng",
        description:
          "Hiện đang là Phó trưởng khoa Tai mũi họng, Bệnh viện Quân Y 354. Hơn 30 năm kinh nghiệm khám và điều trị các bệnh lý về Tai mũi họng",
        place: "Hà Nội",
        slug: "pho-giao-su-tien-si-bac-si-nguyen-trong-hung-i172",
      },
    ]);
  }, []);

  useEffect(() => {
    dispatch(getAllDataBySlug("medical-services"));
    dispatch(getAllDataBySlug("specialties"));
    dispatch(getAllDataBySlug("specific-medical-services"));
    dispatch(getAllDataBySlug("guides"));
    dispatch(getAllDataBySlug("living-healthy-blog-post"));
    dispatch(getAllDataBySlug("for-doctor-and-health-facility-blog-post"));
  }, []);

  return (
    <>
      <section className="slider-section">
        <Slider />
      </section>
      <section className="for-you-section">
        <ServiceForYou />
      </section>
      <section className="full-service-section">
        <FullService data={fullService} />
      </section>
      <section className="specialty-section">
        <Specialty data={specialties} />
      </section>
      <section className="clinic-section">
        <Clinic />
      </section>
      <section className="famous-doctor-section">
        <FamousDoctor data={doctors} />
      </section>
      <section className="online-diagnostic-section">
        <OnlineDiagnostic data={specificMedicalServices} />
      </section>
      <section className="bookingcare-recommendation-section">
        <BookingCareRecommendation />
      </section>
      <section className="mental-health-section">
        <MentalHealth data={specificMedicalServices} />
      </section>
      <section className="question-and-answer-section">
        <QuestionAndAnswer />
      </section>
      <section className="guide-section">
        <Guide data={guides} />
      </section>
      <section className="living-healthy">
        <LivingHealthy data={livingHealthyBlogPosts} />
      </section>
      <section className="media-about-bookingcare-section">
        <MediaAboutBookingCare />
      </section>
      <section className="for-doctor-and-clinic">
        <ForDoctorAndClinic data={forDoctorAndHealthFacilityBlogPosts} />
      </section>
    </>
  );
}

export default MainPage;
