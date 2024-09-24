import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./CirclePageBanner.scss";

function CirclePageBanner(props) {
  const [width, setWidth] = useState(getWidth());
  let { image, title, description = "", className, slug } = props;

  useEffect(() => {
    const handleResize = () => setWidth(getWidth());

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function getWidth() {
    if (window.innerWidth >= 1200) return "264px";
    if (window.innerWidth >= 992 && window.innerWidth < 1200) return "212px";
    if (window.innerWidth >= 768 && window.innerWidth < 992) return "216px";
    if (window.innerWidth >= 576 && window.innerWidth < 768) return "205.538px";
    return "calc(-16px + 38.4615vw)";
  }

  return (
    <div
      className={`circle-banner-item ${className}`}
      style={{ width: `${width}` }}
    >
      <Link to={slug}>
        <div className={`img-container`}>
          <img src={image} alt={title} />
        </div>
        <div className="circle-banner-item-content">
          <div className="circle-banner-item-title">
            <span>{title}</span>
          </div>
          {description && (
            <div className="circle-banner-item-desc">
              <span>{description}</span>
            </div>
          )}
        </div>
      </Link>
    </div>
  );
}

export default CirclePageBanner;
