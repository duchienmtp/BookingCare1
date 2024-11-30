import React, { useEffect, useState } from "react";
import "./LivingHealthy.scss";
import SeeMoreButton from "../../partials/main-page-section/see-more-button/SeeMoreButton";
import SectionHeaderTitle from "../../partials/main-page-section/section-title/SectionHeaderTitle";
import CustomSlider from "../../partials/custom-slider/CustomSlider";
import Post from "../../partials/PageBanner/post/Post";

function LivingHealthy(props) {
  let { data } = props;
  const [livingHealthyGuides, setLivingHealthyGuides] = useState([]);
  const guidesToDisplay = 16;

  useEffect(() => {
    const sortedLivingHealthyGuides = [...data].sort(
      (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
    );
    const newestLivingHealthyGuides = sortedLivingHealthyGuides.slice(
      0,
      guidesToDisplay
    );
    setLivingHealthyGuides(newestLivingHealthyGuides);
  }, [data]);

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
