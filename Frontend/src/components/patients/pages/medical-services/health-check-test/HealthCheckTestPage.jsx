import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./HealthCheckTestPage.scss";
import BannerImg from "/src/assets/images/164430-coverpage--6.png";
import SectionHeaderTitle from "../../../../partials/main-page-section/section-title/SectionHeaderTitle";

function HealthCheckTestPage() {
  const [healthCheckTestList, setHealthCheckTestList] = useState([]);

  useEffect(() => {
    setHealthCheckTestList([
      {
        id: 1,
        title: "Bài Test đánh giá trầm cảm Beck ",
        image:
          "/src/assets/images/health-check-test-images/170354-test-beck.png",
      },
      {
        id: 2,
        title: "Bài test trầm cảm trẻ vị thành niên RADS (10 - 20 tuổi)",
        image:
          "/src/assets/images/health-check-test-images/143704-tram-cam-tre-vi-thanh-nien-rads.png",
      },
      {
        id: 3,
        title: "Bài Test đánh giá lo âu ZUNG",
        image:
          "/src/assets/images/health-check-test-images/172115-test-zung-1.png",
      },
      {
        id: 4,
        title: "Bài Test đánh giá Lo âu - Trầm cảm - Stress (DASS 21)",
        image: "/src/assets/images/health-check-test-images/092230-3.png",
      },
      {
        id: 5,
        title: "Bài Test đánh giá mức độ trầm cảm sau sinh EPDS",
        image:
          "/src/assets/images/health-check-test-images/171931-tram-cam-sau-sinh.png",
      },
      {
        id: 6,
        title: "Bài test: Bạn có triệu chứng của Sốt xuất huyết không?",
        image: "/src/assets/images/health-check-test-images/092149-6.png",
      },
      {
        id: 7,
        title: "Bài test: Bạn có biểu hiện của dị ứng thời tiết?",
        image: "/src/assets/images/health-check-test-images/092106-5.png",
      },
      {
        id: 8,
        title: "Bài Test: Bạn có triệu chứng sớm của bệnh tiểu đường?",
        image: "/src/assets/images/health-check-test-images/092029-4.png",
      },
      {
        id: 9,
        title: "Bài Test đánh giá sức khỏe răng miệng",
        image: "/src/assets/images/health-check-test-images/091934-2.png",
      },
      {
        id: 10,
        title: "Thang đo tăng động giảm chú ý ADHD VANDERBILT dành cho cha mẹ",
        image:
          "/src/assets/images/health-check-test-images/091126-tang-dong-giam-chu-y-adhd-vanderbilt.png",
      },
    ]);
  }, []);
  return (
    <>
      <section className="page-banner-section">
        <div className="page-banner-image">
          <div className="img-container">
            <img src={BannerImg} alt="Banner Image" />
          </div>
        </div>
      </section>
      <section className="health-check-test-section">
        <div className="app-container">
          <div className="health-check-test md-px-10">
            <div className="health-check-test-header">
              <SectionHeaderTitle title="Bài Test" />
            </div>
            <div className="health-check-test-content">
              <div className="health-check-test-list">
                {healthCheckTestList &&
                  healthCheckTestList.length > 0 &&
                  healthCheckTestList.map((item) => {
                    return (
                      <div className="health-check-test-item" key={item.id}>
                        <Link>
                          <div className="img-container">
                            <img
                              loading="lazy"
                              src={item.image}
                              alt={item.title}
                            />
                          </div>
                          <div className="item-header">
                            <span>{item.title}</span>
                          </div>
                        </Link>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default HealthCheckTestPage;
