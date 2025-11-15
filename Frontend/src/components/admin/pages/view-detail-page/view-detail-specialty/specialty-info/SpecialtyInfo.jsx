import React from "react";
import { marked } from "marked";
import DOMPurify from "dompurify";
import "./SpecialtyInfo.scss";

const SpecialtyInfo = ({data}) => {
  // Configure marked options if needed
  marked.setOptions({
    breaks: true, // Enable line breaks
    gfm: true, // Enable GitHub flavored markdown
  });

  // Convert Markdown to HTML
  const rawHtmlContent = marked(data.specialtyDetailInfo || "");
  // Sanitize the HTML content
  const sanitizedHtmlContent = DOMPurify.sanitize(rawHtmlContent);

  return (
    <div className="specialty-detail">
      <div className="specialty-image">
        <img src={data.image} alt={data.name} />
      </div>
      <div className="specialty-info">
        <h2>{data.name}</h2>
        <p>Specialty ID: {data.id}</p>
      </div>
      <div className="specialty-detail-info">
        <div
          className="markdown-content"
          dangerouslySetInnerHTML={{ __html: sanitizedHtmlContent }}
        />
      </div>
    </div>
  );
};

export default SpecialtyInfo;
