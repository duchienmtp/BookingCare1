import React, { useEffect, useState } from "react";
import "./PopularPost.scss";
import CustomSlider from "../../partials/custom-slider/CustomSlider";
import SeeMoreButton from "../../partials/main-page-section/see-more-button/SeeMoreButton";
import SectionHeaderTitle from "../../partials/main-page-section/section-title/SectionHeaderTitle";
import SquarePageBanner from "../../partials/PageBanner/squarePageBanner/SquarePageBanner";

function PopularPost() {
  const [popularPosts, setPopularPosts] = useState([]);

  useEffect(() => {
    setPopularPosts([
      {
        id: 1,
        title: "Rối loạn lipid máu: triệu chứng, nguyên nhân và cách điều trị",
        image: "/src/assets/images/popular-post-images/162624-mo-mau-cao.png",
      },
      {
        id: 2,
        title: "Thực đơn 7 ngày cho người bệnh tiểu đường",
        image:
          "/src/assets/images/popular-post-images/100438-thuc-don-7-ngay.jpg",
      },
      {
        id: 3,
        title:
          "Cách chữa Đái Tháo Đường hiệu quả theo phương pháp kiềng ba chân",
        image:
          "/src/assets/images/popular-post-images/090054-ung-dung-phuong-phap-kieng-3-chan.png",
      },
      {
        id: 4,
        title: "5 biến chứng điển hình của bệnh tiểu đường và cách phòng ngừa",
        image:
          "/src/assets/images/popular-post-images/095842-5-bien-chung-tieu-duong-pho-bien.png",
      },
    ]);
  }, []);

  return (
    <div className="app-container">
      <div className="md-px-10 popular-posts">
        <div className="popular-posts-header">
          <SectionHeaderTitle title="Bài viết nổi bật" />
          <SeeMoreButton path="danh-sach/cam-nang/noi-bat" />
        </div>
        <div className="popular-posts-content">
          <div className="popular-posts-slider">
            <CustomSlider data={popularPosts} itemsPerPage={3}>
              {popularPosts &&
                popularPosts.length > 0 &&
                popularPosts.map((item) => {
                  return (
                    <div key={item.id}>
                      <SquarePageBanner
                        item={item}
                        className="popular-post mr-40"
                        aspectRatio="aspect-ratio-337-157 aspect-ratio-20-10"
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

export default PopularPost;
