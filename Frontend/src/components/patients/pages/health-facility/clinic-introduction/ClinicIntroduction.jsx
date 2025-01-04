import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import _ from "lodash";
import parse from "html-react-parser";
import { marked } from "marked";
import DOMPurify from "dompurify";
import "./ClinicIntroduction.scss";
import {
  getClinicBySlug,
  getAllClinicBookingTypes,
} from "../../../../../services/admin/SiteServices";

const ClinicIntroduction = () => {
  const [clinic, setClinic] = useState({});
  const [headings, setHeadings] = useState([]);
  const [sectionsContent, setSectionsContent] = useState([]);
  const [clinicBookingTypes, setClinicBookingTypes] = useState([]);
  const headingRefs = useRef([]);
  const clinicBookingTypesRef = useRef([]);
  const param = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const [clinicResponse, clinicBookingTypesResponse] = await Promise.all([
        getClinicBySlug(param.slug),
        getAllClinicBookingTypes(),
      ]);

      if (clinicResponse && clinicBookingTypesResponse) {
        const clinicBookingTypes = clinicBookingTypesResponse.data;

        const formattedClinicData = {
          ...clinicResponse.data,
          address: clinicResponse.data.address.includes('"/"')
            ? clinicResponse.data.address.split('"/"')
            : clinicResponse.data.address,
        };

        setClinic(formattedClinicData);

        const markdownData = clinicResponse.data.clinicDetailInfo;

        const parser = new DOMParser();
        const doc = parser.parseFromString(markdownData, "text/html");

        const headings = Array.from(doc.querySelectorAll("h2")).map(
          (h2, index) => ({
            title: h2.textContent.trim(),
            id: `#scrollspyHeading${index + 1}`,
          })
        );

        let sections = markdownData.split('"/"').map((section, index) => {
          const sectionDoc = parser.parseFromString(section, "text/html");
          const sectionTitle = sectionDoc
            .querySelector("h2")
            .textContent.trim();
          const sectionContent = section.replace(
            `<h2>${sectionTitle}</h2>`,
            ""
          );

          return {
            title: sectionTitle,
            content: DOMPurify.sanitize(marked(sectionContent)),
            id: `scrollspyHeading${index + 1}`,
          };
        });

        sections = sections.map((section) => {
          if (section.title.toLowerCase() === "đặt lịch khám") {
            const bookingContent =
              section.title.toLowerCase() === "đặt lịch khám"
                ? section.content.replace(/<\/?p>|\n/g, "")
                : null;

            section.content = bookingContent;
          }

          return {
            ...section,
          };
        });

        const isHavingBookingSection = sections.find(
          (section) => section.title.toLowerCase() === "đặt lịch khám"
        );

        if (isHavingBookingSection) {
          const bookingTypes = isHavingBookingSection.content
            .split('"+"')
            .map((bookingType) => {
              const object = clinicBookingTypes.find((clinicBookingType) => {
                return clinicBookingType.slug === bookingType;
              });
              return object;
            });

          setClinicBookingTypes(
            bookingTypes.length > 1
              ? [clinicBookingTypes[0], ...bookingTypes]
              : bookingTypes
          );
        }

        setHeadings(headings);
        setSectionsContent(sections);
      }
    };

    fetchData();
  }, [param.slug]);

  useEffect(() => {
    window.history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      const { hash } = window.location;
      if (hash) {
        const newUrl = window.location.href.split("#")[0];
        window.history.replaceState(null, null, newUrl);
      }
    };

    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  const handleHeadingClick = (ref) => {
    if (!ref.classList.contains("active")) {
      headingRefs.current.forEach((heading) => {
        heading.classList.contains("active")
          ? heading.classList.remove("active")
          : null;
      });

      ref.classList.add("active");
    }
  };

  const handleBookingTypeClick = (ref) => {
    if (!ref.classList.contains("active")) {
      clinicBookingTypesRef.current.forEach((clinicBookingType) => {
        clinicBookingType.classList.remove("active");
      });

      ref.classList.add("active");
    }
  };

  return (
    <div className="clinic-introduction">
      <div className="page-header">
        <div className="page-banner">
          <img src="/src/assets/images/114348-bv-viet-duc.jpg" alt="" />
        </div>
        <div className="clinic-introduction-container">
          <div className="banner">
            <div className="upper">
              <div className="img-container">
                <img src={clinic.image} alt={clinic.fullname} />
              </div>
              <div className="clinic-basic-info">
                <div className="clinic-name">
                  <h1>{clinic.fullname}</h1>
                </div>
                <div className="clinic-address">
                  {clinic.address &&
                  _.isArray(clinic.address) &&
                  clinic.address.length > 0 ? (
                    clinic.address.map((address, index) => (
                      <>
                        <span key={index}>{address}</span>
                        <br />
                      </>
                    ))
                  ) : (
                    <span>{clinic.address}</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="menu">
        <nav id="navbar-example2" className="lower">
          {headings &&
            headings.length > 0 &&
            headings.map((heading, index) => (
              <div className="menu-item" key={heading.id}>
                <a
                  className="nav-link"
                  href={heading.id}
                  ref={(el) => (headingRefs.current[index] = el)}
                  onClick={() => handleHeadingClick(headingRefs.current[index])}
                >
                  {heading.title}
                </a>
              </div>
            ))}
        </nav>
      </div>
      <div className="clinic-introduction-container">
        <div
          className="clinic-booking-section"
          style={{
            display:
              clinicBookingTypes && clinicBookingTypes.length > 1
                ? "flex"
                : "none",
          }}
        >
          {clinicBookingTypes.map((clinicBookingType, index) => {
            return (
              <div
                className={`booking-type-item ${index === 0 ? "active" : ""}`}
                key={clinicBookingType.id}
                ref={(el) => (clinicBookingTypesRef.current[index] = el)}
                onClick={() =>
                  handleBookingTypeClick(clinicBookingTypesRef.current[index])
                }
              >
                <div className="img-container">
                  <img
                    src={clinicBookingType.image}
                    alt={clinicBookingType.name}
                  />
                </div>
                <div className="booking-type-title">
                  <span>{clinicBookingType.name}</span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="notice-section">
          <div className="first-notice">
            <p>
              BookingCare là Nền tảng Y tế chăm sóc sức khỏe toàn diện hàng đầu
              Việt Nam kết nối người dùng với trên 200 bệnh viện - phòng khám uy
              tín, hơn 1,500 bác sĩ chuyên khoa giỏi và hàng nghìn dịch vụ, sản
              phẩm y tế chất lượng cao.
            </p>
          </div>
          <div className="second-notice">
            <div>
              <p>
                Từ nay, người bệnh có thể đặt lịch tại Khu khám bệnh theo yêu
                cầu, Bệnh viện Hữu nghị Việt Đức thông qua hệ thống đặt khám
                BookingCare.
              </p>
              <ul>
                <li>
                  Được lựa chọn các giáo sư, tiến sĩ, bác sĩ chuyên khoa giàu
                  kinh nghiệm
                </li>
                <li>
                  Hỗ trợ đặt khám trực tuyến trước khi đi khám (miễn phí đặt
                  lịch)
                </li>
                <li>
                  Giảm thời gian chờ đợi khi làm thủ tục khám và ưu tiên khám
                  trước
                </li>
                <li>Nhận được hướng dẫn chi tiết sau khi đặt lịch</li>
              </ul>
            </div>
          </div>
        </div>
        <div
          className="clinic-detail-info-section"
          data-bs-spy="scroll"
          data-bs-target="#navbar-example2"
        >
          {sectionsContent &&
            sectionsContent.length > 0 &&
            sectionsContent.map((section) => (
              <div
                id={section.id}
                className="clinic-detail-info-section-item"
                key={section.id}
              >
                <div className="blank-div"></div>
                <h2>{section.title}</h2>
                <div
                  dangerouslySetInnerHTML={{ __html: section.content }}
                ></div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ClinicIntroduction;
