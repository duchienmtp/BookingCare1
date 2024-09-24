import React from "react";
import "./SliderNextArrow.scss";

function SliderNextArrow(props) {
  const { className, style, onClick } = props;

  return (
    <div
      className={className}
      style={{
        ...style,
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
      <div className="slider-next-arrow">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 256 512"
          preserveAspectRatio="none"
          width="12"
          height="24"
          fill="#34929E"
        >
          <path d="m89.45 87.5 143.1 152a23.94 23.94 0 0 1 6.562 16.5 23.96 23.96 0 0 1-6.562 16.5l-143.1 152c-9.12 9.6-24.31 10-33.93.9-9.688-9.125-10.03-24.38-.937-33.94l128.4-135.5-128.4-135.5c-9.093-9.56-8.753-24.71.937-33.9 9.62-9.09 24.81-8.69 33.93.94"></path>
        </svg>
      </div>
    </div>
  );
}

export default SliderNextArrow;
