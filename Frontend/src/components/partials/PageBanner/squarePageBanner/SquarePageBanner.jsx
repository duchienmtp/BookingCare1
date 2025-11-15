import React, { useEffect, useState, memo } from "react";
import "./SquarePageBanner.scss";
import { Link } from "react-router-dom";

function SquarePageBanner(props) {
  const [width, setWidth] = useState(getWidth());
  const { item, className, aspectRatio, svg } = props;

  useEffect(() => {
    const handleResize = () => setWidth(getWidth());

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function getWidth() {
    if (window.innerWidth >= 1200) return "373.333px";
    if (window.innerWidth >= 992 && window.innerWidth < 1199)
      return "309.333px";
    if (window.innerWidth >= 768 && window.innerWidth < 992) return "322.424px";
    if (window.innerWidth >= 576 && window.innerWidth < 768)
      return "calc(-10.6667px + 45.4545vw)";
    return "calc(-10.6667px + 43.4783vw)";
  }

  return (
    <div
      className={`square-banner-item ${className}`}
      style={{ width: `${width}` }}
    >
      <Link to={item.slug}>
        {svg && (
          <div className="camera-icon-container">
            <div className="camera-icon">{svg}</div>
          </div>
        )}
        <div className={`img-container ${className} ${aspectRatio}`}>
          <img src={item.image} alt={item.name} />
        </div>
        <span>{item.name}</span>
      </Link>
    </div>
  );
}

const MemoizedSquarePageBanner = memo(SquarePageBanner);
export default MemoizedSquarePageBanner;
