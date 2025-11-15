import React, { useEffect, useState, memo } from "react";
import "./Guide.scss";
import SeeMoreButton from "../../partials/main-page-section/see-more-button/SeeMoreButton";
import SectionHeaderTitle from "../../partials/main-page-section/section-title/SectionHeaderTitle";
import CustomSlider from "../../partials/custom-slider/CustomSlider";
import Post from "../../partials/PageBanner/post/Post";

function Guide(props) {
  let { data } = props;
  const [guides, setGuides] = useState([]);
  const guidesToDisplay = 16;

  useEffect(() => {
    const sortedGuides = [...data].sort(
      (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
    );
    const newestGuides = sortedGuides.slice(0, guidesToDisplay);
    setGuides(newestGuides);
  }, [data]);

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

const MemoizedGuide = memo(Guide);
export default MemoizedGuide;
