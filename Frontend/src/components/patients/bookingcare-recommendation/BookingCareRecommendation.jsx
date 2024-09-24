import React, { useState, useEffect } from "react";
import CirclePageBanner from "../../partials/PageBanner/circlePageBanner/CirclePageBanner";
import "./BookingCareRecommendation.scss";
import SectionHeaderTitle from "../../partials/main-page-section/section-title/SectionHeaderTitle";
import MostCareImg from "../../../assets/images/bookingcare-recommendation-images/duoc-quan-tam.png";
import BestHealthImg from "../../../assets/images/bookingcare-recommendation-images/y-te-noi-bat.png";
import RelativePostImg from "../../../assets/images/bookingcare-recommendation-images/144801-bai-viet-lien-quan.png";
import { Link } from "react-router-dom";
import CustomSlider from "../../partials/custom-slider/CustomSlider";

function BookingCareRecommendation(props) {
  const [itemsPerPage, setItemsPerPage] = useState(getItemsPerPage());
  const [bookingCareRecommendations, setBookingCareRecommendations] = useState(
    []
  );

  useEffect(() => {
    setBookingCareRecommendations([
      {
        id: 1,
        title: "Được quan tâm",
        image: MostCareImg,
        link: "duoc-quan-tam/tu-khoa",
      },
      {
        id: 2,
        title: "Y tế nổi bật",
        image: BestHealthImg,
        link: "y-te-noi-bat",
      },
      {
        id: 3,
        title: "Bài viết liên quan",
        image: RelativePostImg,
        link: "cam-nang/goi-y",
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
      <div className="md-pl-10 bookingcare-recommendations">
        <div className="bookingcare-recommendations-section-header">
          <SectionHeaderTitle title="Gợi ý của BookingCare" />
        </div>
        <div className="bookingcare-recommendations-content">
          <div className="bookingcare-recommendations-slider">
            <CustomSlider
              data={bookingCareRecommendations}
              itemsPerPage={itemsPerPage}
              pagination={false}
            >
              {bookingCareRecommendations &&
                bookingCareRecommendations.length > 0 &&
                bookingCareRecommendations.map((item) => {
                  return (
                    <div key={item.id}>
                      <CirclePageBanner
                        image={item.image}
                        title={item.title}
                        className="bookingcare-recommendation"
                        slug={item.link}
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

export default BookingCareRecommendation;
