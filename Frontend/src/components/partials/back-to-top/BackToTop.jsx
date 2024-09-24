import React, { useEffect, useState } from "react";
import "./BackToTop.scss";

function BackToTop() {
  const [displayButton, setDisplayButton] = useState(false);

  const handleScroll = () => {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const scrollThreshold = windowHeight * 0.7;

    if (scrollY > scrollThreshold) {
      setDisplayButton(true);
    } else {
      setDisplayButton(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className="back-to-top"
      style={{
        display: displayButton ? "block" : "none",
      }}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      <div className="img-container">
        <svg
          xmlSpace="preserve"
          width={25}
          height={25}
          viewBox="0 0 8 8"
          preserveAspectRatio="none"
          fill="#fff"
        >
          <path d="M5.044 1.062 1.308 4.798.27 3.76 4.007.026z" />
          <path d="M3.161 1.604h1.683v6.375H3.161z" />
          <path d="m4 .02 3.737 3.736-1.035 1.036-3.737-3.735z" />
        </svg>
      </div>
    </div>
  );
}

export default BackToTop;
