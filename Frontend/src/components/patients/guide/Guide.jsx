import React, { useEffect, useState } from "react";
import "./Guide.scss";
import SeeMoreButton from "../../partials/main-page-section/see-more-button/SeeMoreButton";
import SectionHeaderTitle from "../../partials/main-page-section/section-title/SectionHeaderTitle";
import CustomSlider from "../../partials/custom-slider/CustomSlider";
import Post from "../../partials/PageBanner/post/Post";

function Guide() {
  const [guides, setGuides] = useState([]);

  useEffect(() => {
    setGuides([
      {
        id: 1,
        title:
          "Tầm soát ung thư vòm họng bao nhiêu tiền? Bảng giá tại 5 địa chỉ uy tín Hà Nội",
        image:
          "/src/assets/images/guide-images/083152-tam-soat-ung-thu-vom-hong-bao-nhieu-tien.png",
      },
      {
        id: 2,
        title: "Khám sức khỏe định kỳ ở đâu tốt TP.HCM?",
        image:
          "/src/assets/images/guide-images/173203-kham-suc-khoe-dinh-ky-o-dau-hcm.png",
      },
      {
        id: 3,
        title: "Danh sách địa chỉ khám tổng quát uy tín quận Gò Vấp",
        image:
          "/src/assets/images/guide-images/155731-kham-tong-quat-quan-go-vap.png",
      },
      {
        id: 4,
        title: "8 địa chỉ khám tổng quát uy tín tại TP.HCM",
        image:
          "/src/assets/images/guide-images/152831-kham-tong-quat-o-dau-hcm.png",
      },
      {
        id: 5,
        title:
          "Tổng hợp chi phí khám tổng quát cho trẻ tại 5 địa chỉ uy tín Hà Nội",
        image:
          "/src/assets/images/guide-images/145746-kham-tong-quat-tre-ha-noi.png",
      },
      {
        id: 6,
        title:
          "Khám sức khỏe tiền hôn nhân tại Hà Nội bao nhiêu tiền? Ở đâu uy tín?",
        image:
          "/src/assets/images/guide-images/110333-kham-tien-hon-nhan-gia-bao-nhieu.png",
      },
      {
        id: 7,
        title:
          "Tầm soát ung thư vú bao nhiêu tiền? Giá tầm soát tại 5 địa chỉ uy tín Hà Nội",
        image:
          "/src/assets/images/guide-images/084100-tam-soat-ung-thu-vu-bao-nhieu-tien.png",
      },
      {
        id: 8,
        title: "Khám tổng quát tim mạch ở đâu? Bao nhiêu tiền tại TP.HCM?",
        image:
          "/src/assets/images/guide-images/173946-kham-tong-quat-tim-mach-o-dau.png",
      },
      {
        id: 9,
        title: "Top 7 địa chỉ Tầm soát ung thư uy tín tại TPHCM",
        image: "/src/assets/images/guide-images/100849-tam-soat-ung-thu.png",
      },
      {
        id: 10,
        title: "Khám sức khỏe tiền hôn nhân ở đâu tốt Hà Nội?",
        image:
          "/src/assets/images/guide-images/113938-kiem-tien-hon-nhan-o-dau-ha-noi.png",
      },
      {
        id: 11,
        title: "5 địa chỉ khám tầm soát ung thư vú uy tín tại TP.HCM",
        image:
          "/src/assets/images/guide-images/140022-tam-soat-ung-thu-vu-tphcm.png",
      },
      {
        id: 12,
        title: "Review địa chỉ khám tổng quát uy tín tại Quận 7",
        image:
          "/src/assets/images/guide-images/165742-kham-tong-quat-quan-7.png",
      },
      {
        id: 13,
        title: "Top 5 địa chỉ khám tổng quát uy tín Quận Tân Phú",
        image:
          "/src/assets/images/guide-images/105320-dia-chi-khham-tong-quat-uy-tin-quan-tan-phu.png",
      },
      {
        id: 14,
        title: "9 địa chỉ khám sức khỏe tổng quát tốt nhất ở Hà Nội",
        image:
          "/src/assets/images/guide-images/160911-kham-suc-khoe-tong-quat-o-dau-ha-noi.jpg",
      },
      {
        id: 15,
        title: "Review top 5 địa chỉ khám tổng quát tại Quận Thủ Đức uy tín",
        image:
          "/src/assets/images/guide-images/105222-kham-tong-quat-tai-thu-duc.png",
      },
      {
        id: 16,
        title: "7 địa chỉ khám sức khỏe tổng quát cho bé tốt tại Hà Nội ",
        image:
          "/src/assets/images/guide-images/223640-kham-tong-quat-cho-tre.png",
      },
    ]);
  }, []);

  return (
    <div className="app-container">
      <div className="md-pl-10 guides">
        <div className="guides-header">
          <SectionHeaderTitle title="Cẩm nang" />
          <SeeMoreButton />
        </div>
        <div className="guides-content">
          <div className="guides-slider">
            <CustomSlider data={guides}>
              {guides &&
                guides.length > 0 &&
                guides.map((item) => {
                  return (
                    <div key={item.id}>
                      <Post
                        item={item}
                        className="guide"
                        aspectRatio="aspect-ratio-1200-628"
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

export default Guide;
