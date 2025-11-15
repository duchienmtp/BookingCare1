import React, { memo } from "react";
import "./ForDoctorAndClinic.scss";
import SectionHeaderTitle from "../../partials/main-page-section/section-title/SectionHeaderTitle";
import CustomSlider from "../../partials/custom-slider/CustomSlider";
import Post from "../../partials/PageBanner/post/Post";

function ForDoctorAndClinic(props) {
  let { data } = props;

  return (
    <div className="app-container">
      <div className="md-pl-10 for-doctor-and-clinic-guides">
        <div className="for-doctor-and-clinic-guides-header">
          <SectionHeaderTitle title="Dành cho bác sĩ và cơ sở y tế" />
          <div className="group-btns">
            <button className="grey-btn">
              <span>Bài viết</span>
            </button>
            <button className="grey-btn">
              <span>Hợp tác</span>
            </button>
            <button className="grey-btn">
              <span>Liên hệ</span>
            </button>
          </div>
        </div>
        <div className="for-doctor-and-clinic-guides-content">
          <div className="for-doctor-and-clinic-guides-slider">
            <CustomSlider data={data}>
              {data &&
                data.length > 0 &&
                data.map((item) => {
                  return (
                    <div key={item.id}>
                      <Post
                        item={item}
                        className="for-doctor-and-clinic-guide"
                        aspectRatio="aspect-ratio-1200-628"
                      />
                    </div>
                  );
                })}
            </CustomSlider>
          </div>
        </div>
        <div className="group-btns">
          <button className="grey-btn">
            <span>Bài viết</span>
          </button>
          <button className="grey-btn">
            <span>Hợp tác</span>
          </button>
          <button className="grey-btn">
            <span>Liên hệ</span>
          </button>
        </div>
      </div>
    </div>
  );
}

const MemoizedForDoctorAndClinic = memo(ForDoctorAndClinic);
export default MemoizedForDoctorAndClinic;