/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import CirclePageBanner from "../../partials/PageBanner/circlePageBanner/CirclePageBanner";
import "./ServiceForYou.scss";
import SectionHeaderTitle from "../../partials/main-page-section/section-title/SectionHeaderTitle";
import DoctorImg from "../../../assets/images/for-you-images/bac-si.png";
import SpecialtyImg from "../../../assets/images/for-you-images/chuyen-khoa.png";
import ClinicImg from "../../../assets/images/for-you-images/141017-csyt.png";
import PostImg from "../../../assets/images/for-you-images/140319-bai-viet.png";
import CustomSlider from "../../partials/custom-slider/CustomSlider";

function ServiceForYou(props) {
  const [itemsPerPage, setItemsPerPage] = useState(getItemsPerPage());
  const [serviceForYou, setServiceForYou] = useState([]);

  useEffect(() => {
    setServiceForYou([
      {
        id: 1,
        title: "Cơ sở y tế",
        image: ClinicImg,
        link: "co-so-y-te/danh-cho-ban",
      },
      {
        id: 2,
        title: "Bác sĩ",
        image: DoctorImg,
        link: "bac-si/danh-cho-ban",
      },
      {
        id: 3,
        title: "Chuyên khoa",
        image: SpecialtyImg,
        link: "chuyen-khoa/danh-cho-ban",
      },
      {
        id: 4,
        title: "Bài viết",
        image: PostImg,
        link: "cam-nang/danh-cho-ban",
      },
    ]);

    const handleResize = () => setItemsPerPage(getItemsPerPage());

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function getItemsPerPage() {
    if (window.innerWidth >= 992) return 4;
    if (window.innerWidth >= 576 && window.innerWidth < 992) return 3;
    return 2;
  }

  return (
    <div className="app-container">
      <div className="md-pl-10 for-you">
        <div className="for-you-section-header">
          <SectionHeaderTitle title="Dành cho bạn" />
        </div>
        <div className="for-you-content">
          <div className="for-you-slider">
            <CustomSlider
              data={serviceForYou}
              itemsPerPage={itemsPerPage}
              pagination={false}
            >
              {serviceForYou &&
                serviceForYou.length > 0 &&
                serviceForYou.map((item) => {
                  return (
                    <div key={item.id}>
                      <CirclePageBanner
                        image={item.image}
                        title={item.title}
                        className={"for-you"}
                        slug={`/danh-sach/${item.link}`}
                      />
                    </div>
                  );
                })}
            </CustomSlider>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ServiceForYou;
