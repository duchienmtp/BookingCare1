import React from "react";
import "./ImageBanner.scss";

function ImageBanner(props) {
  let { image, title } = props;

  return (
    <div className="main-page-image">
      <div className="app-container">
        <div className="image-banner md-px-10">
          <div className="img-container">
            <img src={image} alt={title} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ImageBanner;
