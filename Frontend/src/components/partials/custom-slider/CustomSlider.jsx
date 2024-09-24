import React, { useEffect, useState, useRef } from "react";
import "./CustomSlider.scss";

function CustomSlider(props) {
  let { data, itemsPerPage = 4, pagination = true, children } = props;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const sliderRef = useRef(null);

  const nextSlide = () => {
    if (currentIndex < data.length - itemsPerPage) {
      setCurrentIndex(
        Math.min(currentIndex + itemsPerPage, data.length - itemsPerPage)
      );
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(Math.max(currentIndex - itemsPerPage, 0));
    }
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - sliderRef.current.offsetLeft);
    setScrollLeft(sliderRef.current.scrollLeft);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Adjust the multiplier for faster/slower scrolling
    sliderRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e) => {
    setIsDragging(true);
    setStartX(e.touches[0].pageX - sliderRef.current.offsetLeft);
    setScrollLeft(sliderRef.current.scrollLeft);
    e.stopPropagation();
    e.preventDefault();
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    e.stopPropagation();
    e.preventDefault();
    const x = e.touches[0].pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Adjust the multiplier for faster/slower scrolling
    sliderRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const lastIndex = children.length - 1;

  const clonedChildren = React.Children.map(children, (child, index) => {
    if (!child) return null; // Check if child is null or undefined

    // Check if the child is a div wrapping another div
    if (
      child.type === "div" &&
      React.Children.count(child.props.children) > 0
    ) {
      const innerChild = React.Children.only(child.props.children);

      let className = innerChild.props.className || "";

      if (index === currentIndex) {
        className += " current-item";
      }
      if (index === lastIndex) {
        className += " last-item";
      }

      const modifiedInnerChild = React.cloneElement(innerChild, {
        className,
      });
      return React.cloneElement(child, { children: modifiedInnerChild });
    }
  });

  return (
    <div className="custom-slider">
      <div
        className="slider-list"
        ref={sliderRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="slider-track"
          style={{
            transform: `translateX(-${(currentIndex / data.length) * 100}%)`,
            width: "max-content",
          }}
        >
          {clonedChildren}
        </div>
      </div>
      <div
        className="pagination"
        style={{ display: pagination ? "flex" : "none" }}
      >
        <div className="pagination-container">
          <div className="prev-arrow" onClick={prevSlide}>
            <div className="arrow-container">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                preserveAspectRatio="none"
                width={22}
                height={24}
                fill={currentIndex === 0 ? "#BEBEBE" : "#34929E"}
              >
                <path d="m148.7 411.3-144-144C1.563 264.2 0 260.1 0 256s1.562-8.188 4.688-11.31l144-144c6.25-6.25 16.38-6.25 22.62 0s6.25 16.38 0 22.62L54.63 240H496c8.8 0 16 7.2 16 16s-7.156 16-16 16H54.63l116.7 116.7c6.25 6.25 6.25 16.38 0 22.62s-16.43 6.28-22.63-.02" />
              </svg>
            </div>
          </div>
          <div className="next-arrow" onClick={nextSlide}>
            <div className="arrow-container">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                preserveAspectRatio="none"
                width={22}
                height={24}
                fill={
                  currentIndex < data.length - itemsPerPage
                    ? "#34929E"
                    : "#BEBEBE"
                }
              >
                <path d="m363.3 100.7 144 144c3.1 3.1 4.7 7.2 4.7 10.4s-1.562 8.188-4.688 11.31l-144 144c-6.25 6.25-16.38 6.25-22.62 0s-6.25-16.38 0-22.62l116.7-116.7H16c-8.844 0-16-7.156-16-15.1 0-8.844 7.156-16 16-16h441.4l-116.7-116.7c-6.25-6.25-6.25-16.38 0-22.62s16.4-6.23 22.6.03" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomSlider;
