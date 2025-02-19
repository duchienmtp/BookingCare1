import React, { useEffect, useState } from "react";
import "./Post.scss";
import { Link } from "react-router-dom";

function Post(props) {
  const [width, setWidth] = useState(getWidth());
  const { item, className, aspectRatio } = props;

  useEffect(() => {
    const handleResize = () => setWidth(getWidth());

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function getWidth() {
    if (window.innerWidth >= 1200) return "270px";
    if (window.innerWidth >= 992 && window.innerWidth < 1200) return "224px";
    if (window.innerWidth >= 768 && window.innerWidth < 992) return "210px";
    if (window.innerWidth >= 576 && window.innerWidth < 768)
      return "calc(-12px + 31.25vw)";
    return "calc(-8px + 58.8235vw)";
  }

  return (
    <div
      className={`post-banner-item ${className}`}
      style={{ width: `${width}` }}
    >
      <Link to={`/cam-nang/${item.slug}`}>
        <div className={`img-container ${className} ${aspectRatio}`}>
          <img src={item.image} alt={item.name} />
        </div>
        <span>{item.name}</span>
      </Link>
    </div>
  );
}

export default Post;
