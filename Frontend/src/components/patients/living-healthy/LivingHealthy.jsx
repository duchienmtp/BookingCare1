import React, { useEffect, useState } from "react";
import "./LivingHealthy.scss";
import SeeMoreButton from "../../partials/main-page-section/see-more-button/SeeMoreButton";
import SectionHeaderTitle from "../../partials/main-page-section/section-title/SectionHeaderTitle";
import CustomSlider from "../../partials/custom-slider/CustomSlider";
import Post from "../../partials/PageBanner/post/Post";

function LivingHealthy() {
  const [livingHealthyGuides, setLivingHealthyGuides] = useState([]);

  useEffect(() => {
    setLivingHealthyGuides([
      {
        id: 1,
        title: "Hướng dẫn cách chăm sóc răng miệng khi cắm Implant",
        image:
          "/src/assets/images/living-healthy-images/145406-rang--khon-dang-moc-4.png",
      },
      {
        id: 2,
        title: "Dấu hiệu nhiễm trùng sau khi nhổ răng khôn",
        image:
          "/src/assets/images/living-healthy-images/204258-dieu-can-biet-ve-rang-khon.png",
      },
      {
        id: 3,
        title: "Có nên nhổ răng khôn không? Nhổ răng khôn có nguy hiểm không? ",
        image:
          "/src/assets/images/living-healthy-images/204318-giam-dau-khi-moc-rang-khon.png",
      },
      {
        id: 4,
        title: "Giải đáp: Trồng răng Implant có đau không?",
        image:
          "/src/assets/images/living-healthy-images/145356-rang--khon-dang-moc-2.png",
      },
      {
        id: 5,
        title: "Tổng hợp các thông tin về trồng răng Implant",
        image:
          "/src/assets/images/living-healthy-images/145400-rang--khon-dang-moc-3.png",
      },
      {
        id: 6,
        title: "Béo phì độ 1: nguyên nhân, triệu chứng, cách điều trị",
        image:
          "/src/assets/images/living-healthy-images/050941-beo-phi-do-1.jpg",
      },
      {
        id: 7,
        title: "Viêm nha chu và những điều bạn cần biết",
        image:
          "/src/assets/images/living-healthy-images/171713-viem-nha-chu.png",
      },
      {
        id: 8,
        title: "Điều trị viêm nha chu an toàn và hiệu quả",
        image:
          "/src/assets/images/living-healthy-images/084307-viem-nha-chu-dieu-tri.png",
      },
      {
        id: 9,
        title: "Mách bạn nhận biết các triệu chứng viêm nha chu",
        image:
          "/src/assets/images/living-healthy-images/212639-viem-nha-chu-trieu-chung.png",
      },
      {
        id: 10,
        title: "Viêm nha chu nguy hiểm hơn bạn nghĩ ",
        image:
          "/src/assets/images/living-healthy-images/213032-viem-nha-chu-trieu-chung-1.png",
      },
      {
        id: 11,
        title:
          "Mắt bị mờ như có màng che: Dấu hiệu cảnh báo bệnh lý mắt nguy hiểm",
        image:
          "/src/assets/images/living-healthy-images/211811-mat-bi-mo-nhu-co-mang-che.png",
      },
      {
        id: 12,
        title: "Ung thư tuyến giáp thể tủy: nguyên nhân và cách điều trị",
        image:
          "/src/assets/images/living-healthy-images/205820-ung-thu-tuyen-giap-the-tuy-1.png",
      },
      {
        id: 13,
        title:
          "Ung thư tuyến giáp thể không biệt hóa: Triệu chứng, nguyên nhân và cách điều trị",
        image:
          "/src/assets/images/living-healthy-images/175145-ung-thu-tuyen-giap-the-khong-biet-hoa-1.png",
      },
      {
        id: 14,
        title:
          "Chèn ép tủy sống: Nguyên nhân, triệu chứng, phương pháp chẩn đoán và điều trị",
        image:
          "/src/assets/images/living-healthy-images/103551-chen-ep-tuy-song.jpg",
      },
      {
        id: 15,
        title: "Giải đáp: Chèn ép tủy sống có nguy hiểm không?",
        image:
          "/src/assets/images/living-healthy-images/103551-chen-ep-tuy-song-nguy-co-tiem-an-va-phong-ngua-hieu-qua.jpg",
      },
      {
        id: 16,
        title: "U cột sống: Triệu chứng, nguyên nhân và cách chẩn đoán",
        image: "/src/assets/images/living-healthy-images/104246-u-cot-song.png",
      },
    ]);
  }, []);

  return (
    <div className="app-container">
      <div className="md-pl-10 living-healthy-guides">
        <div className="living-healthy-guides-header">
          <SectionHeaderTitle title="Sống khỏe suốt đời" />
          <SeeMoreButton />
        </div>
        <div className="living-healthy-guides-content">
          <div className="living-healthy-guides-slider">
            <CustomSlider data={livingHealthyGuides}>
              {livingHealthyGuides &&
                livingHealthyGuides.length > 0 &&
                livingHealthyGuides.map((item) => {
                  return (
                    <div key={item.id}>
                      <Post
                        item={item}
                        className="living-healthy-guide"
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

export default LivingHealthy;
