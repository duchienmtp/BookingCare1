import React from "react";
import "./SliderPrevArrow.scss";

function SliderPrevArrow(props) {
  const { className, style, onClick } = props;

  return (
    <div
      className={className}
      style={{
        ...style,
        // display: props.onClick === null ? "none !important" : "block",
        width: "40px",
        height: "40px",
        backgroundColor: "white",
        padding: "8px 12px",
        border: "1px solid rgb(181 231 237)",
        cursor: "pointer",
        boxSizing: "border-box",
        borderRadius: "10px",
      }}
      onClick={onClick}
    >
      <div className="slider-prev-arrow">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 256 512"
          preserveAspectRatio="none"
          width="12"
          height="24"
          fill="#34929E"
        >
          <path d="m166.5 424.5-143.1-152a23.94 23.94 0 0 1-6.562-16.5 23.94 23.94 0 0 1 6.562-16.5l143.1-152c9.125-9.625 24.31-10.03 33.93-.937 9.688 9.124 10.03 24.38.938 33.94l-128.4 135.5 128.4 135.5c9.094 9.562 8.75 24.75-.938 33.94-9.53 9.057-24.73 8.657-33.93-.943"></path>
        </svg>
      </div>
    </div>
  );
}

export default SliderPrevArrow;
