import React, { useEffect, useState } from "react";
import "./LivingHealthyCategory.scss";
import SeeMoreButton from "../../partials/main-page-section/see-more-button/SeeMoreButton";
import SectionHeaderTitle from "../../partials/main-page-section/section-title/SectionHeaderTitle";
import CustomSlider from "../../partials/custom-slider/CustomSlider";

function LivingHealthyCategory() {
  const [width, setWidth] = useState(getWidth());
  const [livingHealthyCategories, setLivingHealthyCategories] = useState([]);

  useEffect(() => {
    setLivingHealthyCategories([
      {
        id: 1,
        title: "Tăng huyết áp",
        image:
          "/src/assets/images/living-healthy-images/170853-benh-huyet-ap-cao.jpg",
      },
      {
        id: 2,
        title: "Tiểu đường",
        image:
          "/src/assets/images/living-healthy-images/170853-benh-tieu-duong.jpg",
      },
      {
        id: 3,
        title: "Viêm dạ dày",
        image:
          "/src/assets/images/living-healthy-images/171201-benh-viem-da-day.jpg",
      },
      {
        id: 4,
        title: "Mỡ máu cao",
        image:
          "/src/assets/images/living-healthy-images/170853-benh-mo-mau-cao.jpg",
      },
      {
        id: 5,
        title: "Đau mắt đỏ",
        image: "/src/assets/images/living-healthy-images/172430-dau-mat-do.jpg",
      },
      {
        id: 6,
        title: "Sốt xuất huyết",
        image:
          "/src/assets/images/living-healthy-images/171950-sot-xuat-huyet.jpg",
      },
    ]);

    const handleResize = () => setWidth(getWidth());

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function getWidth() {
    if (window.innerWidth >= 1200) return "160px";
    if (window.innerWidth >= 992 && window.innerWidth < 1200)
      return "125.333px";
    if (window.innerWidth >= 768 && window.innerWidth < 992) return "121.026px";
    if (window.innerWidth >= 576 && window.innerWidth < 768) return "146.571px";
    return "calc(-18px + 28.5714vw)";
  }

  return (
    <div className="app-container">
      <div className="md-px-10 living-healthy-categories">
        <div className="living-healthy-categories-header">
          <SectionHeaderTitle title="Danh mục sống khỏe" />
          <SeeMoreButton />
        </div>
        <div className="living-healthy-categories-content">
          <div className="living-healthy-categories-slider">
            <CustomSlider
              data={livingHealthyCategories}
              itemsPerPage={6}
              pagination={false}
            >
              {livingHealthyCategories &&
                livingHealthyCategories.length > 0 &&
                livingHealthyCategories.map((item) => {
                  {
                    return (
                      <div key={item.id}>
                        <div
                          className="living-healthy-category-item"
                          style={{ width: width }}
                        >
                          <div className="img-container">
                            <img src={item.image} alt={item.title} />
                          </div>
                          <div className="item-content">
                            <span>{item.title}</span>
                          </div>
                        </div>
                      </div>
                    );
                  }
                })}
            </CustomSlider>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LivingHealthyCategory;
