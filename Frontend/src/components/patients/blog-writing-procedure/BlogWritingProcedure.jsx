import React, { useEffect, useState } from "react";
import "./BlogWritingProcedure.scss";
import RectanglePageBanner from "../../partials/PageBanner/rectanglePageBanner/RectanglePageBanner";
import SectionHeaderTitle from "../../partials/main-page-section/section-title/SectionHeaderTitle";
import { Link } from "react-router-dom";

function BlogWritingProcedure() {
  const [blogWritingProcedures, setBlogWritingProcedures] = useState([]);

  useEffect(() => {
    setBlogWritingProcedures([
      {
        id: 1,
        name: "Quy trình xây dựng nội dung",
        image:
          "/src/assets/images/full-service-images/161206-huyen-icon-cam-nang-3.png",
      },
      {
        id: 2,
        name: "Bác sĩ hợp tác viết bài",
        image:
          "/src/assets/images/full-service-images/161206-huyen-icon-cam-nang-2.png",
      },
    ]);
  }, []);

  return (
    <div className="app-container">
      <div className="md-px-10 blog-writing-procedures">
        <div className="blog-writing-procedures-section-header">
          <SectionHeaderTitle title="" />
        </div>
        <div className="blog-writing-procedures-content">
          <div className="blog-writing-procedures-list">
            {blogWritingProcedures &&
              blogWritingProcedures.length > 0 &&
              blogWritingProcedures.map((item) => {
                return (
                  <div key={item.id}>
                    <Link>
                      <RectanglePageBanner item={item} />
                    </Link>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogWritingProcedure;
