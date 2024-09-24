import React, { useState, useEffect } from "react";
import ImageBanner from "../../../../partials/PageBanner/image-banner/ImageBanner";
import Guide from "../../../../patients/guide/Guide";
import BannerImg from "/src/assets/images/142138-song-khoe-suot-doi-1.png";
import PopularPost from "../../../popular-post/PopularPost";
import Community from "../../../community/Community";
import BlogAuthor from "../../../blog-author/BlogAuthor";
import BlogWritingProcedure from "../../../blog-writing-procedure/BlogWritingProcedure";
import LivingHealthyCategory from "../../../living-healthy-category/LivingHealthyCategory";

function ServiceLivingHealthyPage() {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    setDoctors([
      {
        id: 1,
        name: "Tiến sĩ, Bác sĩ Nguyễn Lê Hùng",
        image:
          "/src/assets/images/doctor-images/150958-bac-si-nguyen-le-hung-rang-ham-mat.png",
      },
      {
        id: 2,
        name: "Bác sĩ Bùi Đình Việt ",
        image:
          "/src/assets/images/doctor-images/164556-bac-si-bui-dinh-viet.jpg",
      },
      {
        id: 3,
        name: "Thạc sĩ, Bác sĩ nội trú Lê Phi Hoàng",
        image: "/src/assets/images/doctor-images/170031-bs-le-phi-hoang.jpg",
      },
      {
        id: 4,
        name: "Thạc sĩ, Bác sĩ Trần Chí Dũng",
        image:
          "/src/assets/images/doctor-images/113738-bac-si-tran-chi-dung-ung-buou.png",
      },
      {
        id: 5,
        name: "Thạc sĩ, Bác sĩ Nội trú Ngô Thị Trang",
        image:
          "/src/assets/images/doctor-images/133852-bac-si-ngo-thu-trang-co-xuong-khop.jpg",
      },
      {
        id: 6,
        name: "Thạc sĩ, Bác sĩ Nội trú Vũ Thị Thu Hiền",
        image:
          "/src/assets/images/doctor-images/103334-bac-si-vu-thi-thu-hien-than-kinh.jpg",
      },
      {
        id: 7,
        name: "Bác sĩ Phạm Thị Hồng Ánh",
        image:
          "/src/assets/images/doctor-images/084519-bac-si-pham-thi-hong-anh-noi-khoa.png",
      },
      {
        id: 8,
        name: "Thạc sĩ, Bác sĩ Nội trú Bùi Đức Ngọt",
        image:
          "/src/assets/images/doctor-images/113009-bac-si-bui-duc-ngot-co-xuong-khop.png",
      },
      {
        id: 9,
        name: "Thạc sĩ, Bác sĩ Hứa Thúy Vi",
        image: "/src/assets/images/doctor-images/162050-bs-hua-thuy-vi.png",
      },
      {
        id: 10,
        name: "Bác sĩ Chuyên khoa I Dương Mạnh Huy",
        image:
          "/src/assets/images/doctor-images/144742-bac-si-duong-manh-huy-san-phu-khoa.jpg",
      },
      {
        id: 11,
        name: "Thạc sĩ, Bác sĩ Phạm Hữu Tùng",
        image:
          "/src/assets/images/doctor-images/113605-bac-si-pham-huu-tung-nam-khoa.jpg",
      },
      {
        id: 12,
        name: "Thạc sĩ, Bác sĩ Phạm Đăng Bảng",
        image:
          "/src/assets/images/doctor-images/142540-bs-pham-dang-bang-da-lieu.jpg",
      },
    ]);
  }, []);

  return (
    <>
      <section className="page-banner">
        <ImageBanner
          image={BannerImg}
          title={"Dịch vụ chăm sóc sức khỏe tại nhà"}
        />
      </section>
      <section className="guide-section">
        <Guide />
      </section>
      <section className="popular-post-section">
        <PopularPost />
      </section>
      <section className="community-section">
        <Community />
      </section>
      <section className="living-healthy-category">
        <LivingHealthyCategory />
      </section>
      <section className="blog-author-section">
        <BlogAuthor data={doctors} />
      </section>
      <section className="blog-writing-procedure-section">
        <BlogWritingProcedure />
      </section>
    </>
  );
}

export default ServiceLivingHealthyPage;
