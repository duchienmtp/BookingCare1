import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectSpecialties,
  selectClinics,
  selectSpecificMedicalServices,
  selectGuides,
  selectEndoscopicSurgeryPackages,
  selectMedicalImagingDiagnosticPackages,
  selectOperationPackages,
  selectMedicalExaminationPackages,
  selectDiagnosticPackages,
} from "../../../../../redux/slices/adminSlice.js";
import { getAllDataBySlug } from "../../../../../services/admin/SiteServices";
import ImageBanner from "../../../../partials/PageBanner/image-banner/ImageBanner";
import BannerImg from "../../../../../assets/images/134537-group-12314.png";
import ServiceForYou from "../../../../patients/service-for-you/ServiceForYou";
import Clinic from "../../../../patients/clinic/Clinic";
import Specialty from "../../../../patients/specialty/Specialty";
import FamousDoctor from "../../../famous-doctor/FamousDoctor";
import MentalHealth from "../../../../patients/mental-health/MentalHealth";
import Guide from "../../../../patients/guide/Guide";
import BookingCareRecommendation from "../../../../patients/bookingcare-recommendation/BookingCareRecommendation";

import DiagnosticPackage from "../../../diagnostic-package/DiagnosticPackage";
import MedicalExamination from "../../../medical-examination/MedicalExamination";
import MedicalImagingDiagnostics from "../../../medical-imaging-diagnostics/MedicalImagingDiagnostics";
import Endoscopy from "../../../endoscopy/Endoscopy";
import Operation from "../../../operation/Operation";

function ServiceAtClinicPage() {
  const [doctors, setDoctors] = useState([]);
  const dispatch = useDispatch();

  const specialties = useSelector(selectSpecialties);
  const clinics = useSelector(selectClinics);
  const specificMedicalServices = useSelector(selectSpecificMedicalServices);
  const guides = useSelector(selectGuides);
  const endoscopicSurgeryPackages = useSelector(
    selectEndoscopicSurgeryPackages
  );
  const medicalImagingDiagnosticPackages = useSelector(
    selectMedicalImagingDiagnosticPackages
  );
  const operationPackages = useSelector(selectOperationPackages);
  const medicalExaminationPackages = useSelector(
    selectMedicalExaminationPackages
  );
  const diagnosticPackages = useSelector(selectDiagnosticPackages);
  const isLoading = useSelector((state) => state.admin.isLoading);
  const isError = useSelector((state) => state.admin.isError);

  useEffect(() => {
    setDoctors([
      {
        id: 1,
        name: "Tiến sĩ, Bác sĩ Phạm Bình Nguyên ",
        image: "/src/assets/images/doctor-images/151105-bs-nguyen11.jpg",
        specialty: "Tiêu hóa",
        description:
          "Gần 20 năm kinh nghiệm trong khám và điều trị bệnh lý Tiêu hóa. Đã thực hiện hơn 100.000 ca nội soi tiêu hoá và thắt trĩ thành công. Bác sĩ đang công tác tại Bệnh viện Bạch Mai. Bác sĩ nhận khám từ 8 tuổi trở lên ",
        place: "Hà Nội",
        slug: "pho-giao-su-tien-si-bac-si-nguyen-trong-hung-i172",
      },
      {
        id: 2,
        name: "Bác sĩ Nội trú Nguyễn Duy Sơn",
        image: "/src/assets/images/doctor-images/114353-bs-duy-son.jpg",
        specialty: "Tai Mũi Họng",
        description:
          "Nguyên Phó trưởng khoa Phẫu thuật chỉnh hình, Bệnh viện Tai mũi họng Trung ương. Bác sĩ khám và điều trị bệnh lý tai mũi họng thông thường và các bệnh lý cần phẫu thuật. Bác sĩ nhận khám mọi độ tuổi ",
        place: "Hà nội",
        slug: "pho-giao-su-tien-si-bac-si-nguyen-trong-hung-i172",
      },
      {
        id: 3,
        name: "TS. BS Nguyễn Khắc Đức",
        image:
          "/src/assets/images/doctor-images/104629tien-si-bac-si-nguyen-khac-duc.jpg",
        specialty: "Tiêu hoá, Bệnh Viêm gan",
        description:
          "Gần 40 năm công tác tại trường Đại học Y Hà Nội và Bệnh viện Hữu Nghị Việt Đức. Hơn 35 năm kinh nghiệm trong lĩnh vực phẫu thuật Gan mật tuỵ, Tiêu hoá. Bác sĩ nhận khám mọi độ tuổi",
        place: "Hà Nội",
        slug: "pho-giao-su-tien-si-bac-si-nguyen-trong-hung-i172",
      },
      {
        id: 4,
        name: "Bác sĩ chuyên khoa II Lê Kim Sang",
        image: "/src/assets/images/doctor-images/172143-bsckiile-kim-sang.jpg",
        specialty: "Tiêu hóa",
        description:
          "Hơn 30 năm kinh nghiệm điều trị trong lĩnh vực nội soi và nội tiêu hóa. Giảng viên tại các trường y như Trung Học Quân Y 2, Đại học Y Dược TPHCM và Đại học Y Khoa Phạm Ngọc Thạch. Bác sĩ tại Bệnh viện Quốc tế City",
        place: "Thành phố Hồ Chí Minh",
        slug: "pho-giao-su-tien-si-bac-si-nguyen-trong-hung-i172",
      },
      {
        id: 5,
        name: "Bác sĩ Chuyên khoa I Nguyễn Hoàng Sơn",
        image:
          "/src/assets/images/doctor-images/135013-bs-nguyen-hoang-son.jpg",
        specialty: "Tim mạch",
        description:
          "Hơn 10 năm kinh nghiệm trong lĩnh vực Tĩnh mạch (Phlebologist). Từng công tác tại Bệnh viện Đa khoa Quốc tế Vinmec. Bác sĩ nhận khám độ tuổi từ 10 tuổi trở lên",
        place: "Hà Nội",
        slug: "pho-giao-su-tien-si-bac-si-nguyen-trong-hung-i172",
      },
      {
        id: 6,
        name: "Thạc sĩ, BSCKII Nguyễn Trương Khương",
        image:
          "/src/assets/images/doctor-images/171329-bs-nguyen-truong-khuong.jpg",
        specialty: "Tai Mũi Họng",
        description:
          "Hơn 20 năm kinh nghiệm trong lĩnh vực Tai Mũi Họng. Giám Đốc chuyên môn Bệnh viện Đa khoa Quốc tế Nam Sài Gòn. Bác sĩ nhận khám mọi độ tuổi",
        place: "Thành phố Hồ Chí Minh",
        slug: "pho-giao-su-tien-si-bac-si-nguyen-trong-hung-i172",
      },
      {
        id: 7,
        name: "Bác sĩ Chuyên khoa II Nguyễn Thị Lưu Phương",
        image:
          "/src/assets/images/doctor-images/174415-bs-nguyen-thi-luu-phuong.jpg",
        specialty: "Tiêu hóa",
        description:
          "Trưởng Phòng khám Đa khoa thuộc Bệnh viện Bộ Phát triển Nông nghiệp Nông thôn. Hơn 40 năm kinh nghiệm trong lĩnh vực Tiêu hóa. Bác sĩ nhận khám cho trẻ từ 2 tuổi trở lên ",
        place: "Hà Nội",
        slug: "pho-giao-su-tien-si-bac-si-nguyen-trong-hung-i172",
      },
      {
        id: 8,
        name: "BSCKI Nguyễn Thị Huệ",
        image:
          "/src/assets/images/doctor-images/143837-bs-nguyen-thi-hue-spk1.jpg",
        specialty: "Sản Phụ khoa",
        description:
          "Bác sĩ có nhiều năm kinh nghiệm trong khám và điều trị Sản phụ khoa. Bác sĩ từng công tác tại khoa Yêu cầu, Bệnh viện Phụ sản Hà Nội. Bác sĩ nhận khám từ 13 tuổi trở lên ",
        place: "Hà Nội",
        slug: "pho-giao-su-tien-si-bac-si-nguyen-trong-hung-i172",
      },
      {
        id: 9,
        name: "Bác sĩ Chuyên khoa I Nguyễn Ngọc Thành",
        image:
          "/src/assets/images/doctor-images/112911-bs-nguyen-ngoc-thanh.jpg",
        specialty: "Tim mạch",
        description:
          "Gần 20 năm kinh nghiệm khám và điều trị về Suy giãn tĩnh mạch. Từng học tập và tu nghiệp tại nhiều nước trên thế giới: Hàn Quốc, Úc, Singapore",
        place: "Hà Nội",
        slug: "pho-giao-su-tien-si-bac-si-nguyen-trong-hung-i172",
      },
      {
        id: 10,
        name: "Bác sĩ Chuyên khoa I Dương Thị Thanh Huyền",
        image:
          "/src/assets/images/doctor-images/075004bac-si-duong-thi-thanh-huyen.jpg",
        specialty: "Tai Mũi Họng",
        description:
          "Nguyên Phó Trưởng khoa Tai Mũi Họng, Bệnh viện Giao thông vận tải. Có nhiều năm kinh nghiệm công tác trong ngành Tai Mũi Họng",
        place: "Hà Nội",
        slug: "pho-giao-su-tien-si-bac-si-nguyen-trong-hung-i172",
      },
      {
        id: 11,
        name: "Thạc sĩ, Bác sĩ Chuyên khoa II Đỗ Anh Vũ",
        image: "/src/assets/images/doctor-images/213412-bs-anh-vu.png",
        specialty: "Thần kinh, Cột sống, Ngoại thần kinh",
        description:
          "Gần 20 năm kinh nghiệm chuyên khoa Ngoại Thần kinh. Phó trưởng khoa Ngoại thần kinh, Bệnh viện Đa khoa Nam Sài Gòn. Bác sĩ nhận khám mọi độ tuổi",
        place: "Thành phố Hồ Chí Minh",
        slug: "pho-giao-su-tien-si-bac-si-nguyen-trong-hung-i172",
      },
      {
        id: 12,
        name: "Bác sĩ Phạm Văn Hưởng",
        image: "/src/assets/images/doctor-images/170030bs-pham-van-huong.jpg",
        specialty: "Vô sinh - Hiếm muộn",
        description:
          "Trưởng khoa Khám bệnh, Bệnh viện Nam học và Hiếm muộn Hà Nội. Nhiều năm kinh nghiệm về Hỗ trợ sinh sản, Thụ tinh trong ống nghiệm. Bác sĩ nhận khám mọi độ tuổi ",
        place: "Hà Nội",
        slug: "pho-giao-su-tien-si-bac-si-nguyen-trong-hung-i172",
      },
      {
        id: 13,
        name: "Bác sĩ chuyên khoa I Lê Quốc Tú",
        image: "/src/assets/images/doctor-images/140830-bs-tu.jpg",
        specialty: "Tai Mũi Họng",
        description:
          "Bác sĩ chuyên khoa Tai Mũi Họng tại Bệnh viện Quốc tế City. Nhiều năm kinh nghiệm trong lĩnh vực khám và điều trị các bệnh lý Tai Mũi Họng",
        place: "Thành phố Hồ Chí Minh",
        slug: "pho-giao-su-tien-si-bac-si-nguyen-trong-hung-i172",
      },
      {
        id: 14,
        name: "Bác sĩ Chuyên khoa I Trần Thị Ngoan",
        image:
          "/src/assets/images/doctor-images/170257-bac-si-cki-tran-thi-ngoan.png",
        specialty: "Tiêu hoá, Bệnh Viêm gan",
        description:
          "Hơn 30 năm kinh nghiệm trong lĩnh vực Tiêu hóa - Gan mật. Từng công tác khoa nội Tiêu hóa, Bệnh viện Đa khoa Tỉnh Nam Định. Bác sĩ nhận khám cho bệnh nhân từ 10 tuổi trở lên",
        place: "Thành phố Hồ Chí Minh",
        slug: "pho-giao-su-tien-si-bac-si-nguyen-trong-hung-i172",
      },
      {
        id: 15,
        name: "Thầy thuốc Ưu tú, Bác sĩ Cao cấp Hoàng Đình Lân",
        image:
          "/src/assets/images/doctor-images/093658bac-si-hoang-dinh-lan.jpg",
        specialty: "Tiêu hoá",
        description:
          "Hơn 40 năm kinh nghiệm trong lĩnh vực Tiêu hóa - Hậu môn Trực Tràng. Chuyên gia đầu ngành về Hậu môn Trực tràng. Nguyên chủ nhiệm khoa Ngoại – Bệnh viện Y học Cổ truyền Trung ương",
        place: "Hà Nội",
        slug: "pho-giao-su-tien-si-bac-si-nguyen-trong-hung-i172",
      },
      {
        id: 16,
        name: "Bác sĩ Chuyên khoa II Đỗ Thị Huệ",
        image: "/src/assets/images/doctor-images/141936-bs-do-thi-hue-1.jpg",
        specialty: "Sản Phụ khoa",
        description:
          "Hơn 30 năm kinh nghiệm trong lĩnh vực Sản - Phụ khoa. Nguyên Phó Trưởng khoa Khám bệnh - Bệnh viện Phụ sản Trung ương. Bác sĩ nhận khám từ 12 tuổi trở lên (Dưới 12 tuổi hỏi ý kiến bác sĩ)  ",
        place: "Hà Nội",
        slug: "pho-giao-su-tien-si-bac-si-nguyen-trong-hung-i172",
      },
      {
        id: 17,
        name: "Tiến sĩ, Bác sĩ Lê Minh Châu",
        image: "/src/assets/images/doctor-images/175733-bs-chau-bv-an-viet.jpg",
        specialty: "Sản Phụ khoa",
        description:
          "40 năm kinh nghiệm trong lĩnh vực Sản phụ khoa, Vô sinh hiếm muộn nữ. Nguyên Phó Trưởng khoa Khám bệnh, Bệnh viện Phụ sản Trung ương. Trưởng khoa Sản phụ khoa, Bệnh viện An Việt",
        place: "Hà Nội",
        slug: "pho-giao-su-tien-si-bac-si-nguyen-trong-hung-i172",
      },
      {
        id: 18,
        name: "Thạc sĩ, Bác sĩ Phạm Thị Quỳnh",
        image: "/src/assets/images/doctor-images/165322bsquynh-1.jpg",
        specialty: "Sản Phụ khoa",
        description:
          "Nguyên Trưởng khoa Sản, Bệnh viện E. Tốt nghiệp Bác sĩ Y khoa tại Đại học Y Rostov sông Đông - Liên Xô cũ . Nhận khám từ 15 tuổi trở lên ",
        place: "Hà Nội",
        slug: "pho-giao-su-tien-si-bac-si-nguyen-trong-hung-i172",
      },
      {
        id: 19,
        name: "Bác sĩ Chuyên khoa II Lê Nhật Vinh",
        image: "/src/assets/images/doctor-images/141704-lenhatvinh400x400.jpg",
        specialty: "Tai Mũi Họng",
        description:
          "Hơn 10 năm kinh nghiệm lĩnh vực Tai mũi họng. Từng công tác tại Bệnh viện Thống Nhất. Bác sĩ nhận khám mọi độ tuổi",
        place: "Thành phố Hồ Chí Minh",
        slug: "pho-giao-su-tien-si-bac-si-nguyen-trong-hung-i172",
      },
      {
        id: 20,
        name: "Tiến sĩ, Bác sĩ Nguyễn Văn Lý",
        image: "/src/assets/images/doctor-images/121515-bs-nguyen-van-ly.jpg",
        specialty: "Tai Mũi Họng",
        description:
          "Nguyên Trưởng khoa Tai mũi họng, Bệnh viện Trung ương quân đội 108. Ủy viên Ban chấp hành Hội Tai Mũi Họng Việt Nam. Bác sĩ khám từ 14 tuổi trở lên ",
        place: "Hà Nội",
        slug: "pho-giao-su-tien-si-bac-si-nguyen-trong-hung-i172",
      },
    ]);
  }, []);

  useEffect(() => {
    dispatch(getAllDataBySlug("specialties"));
    dispatch(getAllDataBySlug("clinics"));
    dispatch(getAllDataBySlug("specific-medical-services"));
    dispatch(getAllDataBySlug("guides"));
    dispatch(getAllDataBySlug("endoscopic-surgery-packages"));
    dispatch(getAllDataBySlug("medical-imaging-diagnostic-packages"));
    dispatch(getAllDataBySlug("operation-packages"));
    dispatch(getAllDataBySlug("medical-examination-packages"));
    dispatch(getAllDataBySlug("diagnostic-packages"));
  }, []);

  return (
    <>
      <section className="page-banner">
        <ImageBanner
          image={BannerImg}
          title={"Dịch vụ chăm sóc sức khỏe tại nhà"}
        />
      </section>
      <section className="for-you-section">
        <ServiceForYou />
      </section>
      <section className="clinic-section">
        <Clinic data={clinics} />
      </section>
      <section className="specialty-section">
        <Specialty data={specialties} />
      </section>
      <section className="famous-doctor-section">
        <FamousDoctor data={doctors} />
      </section>
      <section className="diagnostic-package-section">
        <DiagnosticPackage data={diagnosticPackages} />
      </section>
      <section className="medical-examination-section">
        <MedicalExamination data={medicalExaminationPackages} />
      </section>
      <section className="medical-imaging-diagnostic-section">
        <MedicalImagingDiagnostics data={medicalImagingDiagnosticPackages} />
      </section>
      <section className="endoscopy-package-section">
        <Endoscopy data={endoscopicSurgeryPackages} />
      </section>
      <section className="operation-section">
        <Operation data={operationPackages} />
      </section>
      <section className="bookingcare-recommendation-section">
        <BookingCareRecommendation />
      </section>
      <section className="mental-health-section">
        <MentalHealth data={specificMedicalServices} />
      </section>
      <section className="guide-section">
        <Guide data={guides} />
      </section>
    </>
  );
}

export default ServiceAtClinicPage;
