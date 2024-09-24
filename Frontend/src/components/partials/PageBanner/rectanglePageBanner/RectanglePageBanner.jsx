import React, { useCallback, useEffect, useState } from "react";
import "./RectanglePageBanner.scss";

function RectanglePageBanner(props) {
  let { item } = props;
  const [mobileTitle, setMobileTitle] = useState({
    wordInFirstLine: "",
    wordInSecondLine: "",
  });

  const mediaQuery = "(max-width: 768px)";
  const mediaQueryList = window.matchMedia(mediaQuery);

  const getWordCount = (str) => {
    return str.split(" ").length;
  };

  // Function to split the title into two lines
  const trimWord = (item) => {
    let str = item.name;
    let wordCount = getWordCount(str);
    let words = str.split(" ");
    let numberOfWordsInFirstLine = 0;
    let numberOfWordsInSecondLine = 0;

    if (wordCount % 2 !== 0) {
      numberOfWordsInFirstLine = Math.floor(wordCount / 3) + (wordCount % 3);
      numberOfWordsInSecondLine = wordCount - numberOfWordsInFirstLine;
    } else {
      numberOfWordsInFirstLine = Math.floor(wordCount / 2);
      numberOfWordsInSecondLine = wordCount - numberOfWordsInFirstLine;
    }

    if (numberOfWordsInFirstLine > numberOfWordsInSecondLine) {
      let temp = numberOfWordsInFirstLine;
      numberOfWordsInFirstLine = numberOfWordsInSecondLine;
      numberOfWordsInSecondLine = temp;
    }

    let wordInFirstLine = words.slice(0, numberOfWordsInFirstLine).join(" ");
    let wordInSecondLine = words.slice(numberOfWordsInFirstLine).join(" ");

    setMobileTitle({
      wordInFirstLine,
      wordInSecondLine,
    });
  };

  useEffect(() => {
    const handleMediaQueryChange = () => trimWord(item);

    mediaQueryList.addEventListener("change", handleMediaQueryChange);

    // Call the function once initially to set the initial state
    handleMediaQueryChange();

    return () => {
      mediaQueryList.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  return (
    <div className="rectangle-page-banner">
      <div className="icon-shadow">
        <div className="img-container">
          <img src={item.image} alt={item.name} />
        </div>
      </div>
      <div className="rectangle-page-banner-content">
        <span className="title-for-tablet-above">{item.name}</span>
        <span className="title-for-tablet-below">
          {mobileTitle.wordInFirstLine}
          <br />
          {mobileTitle.wordInSecondLine}
        </span>
      </div>
    </div>
  );
}

export default RectanglePageBanner;
