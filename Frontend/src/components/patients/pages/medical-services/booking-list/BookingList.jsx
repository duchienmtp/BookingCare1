import React, { useState, useEffect, useRef, useCallback } from "react";
import "./BookingList.scss";
import Doctor from "../../../../doctors/Doctor";
import { useParams, useLocation } from "react-router-dom";
import { marked } from "marked";
import DOMPurify from "dompurify";
import { getAllHealthCheckPackagesBySpecialtySlug, getAllHealthCheckPackagesBySpecificMedicalServiceSlug, getSpecialtyBySlug, getSpecificMedicalServiceBySlug } from "../../../../../services/admin/SiteServices";

const daysOfWeekMap = {
  MON: "Thứ Hai",
  TUE: "Thứ Ba",
  WED: "Thứ Tư",
  THU: "Thứ Năm",
  FRI: "Thứ Sáu",
  SAT: "Thứ Bảy",
  SUN: "Chủ Nhật",
};

const formatCurrency = (number) => {
  if (number !== "TBD") {
    if (typeof number === "string" && number.includes(" - ")) {
      const [min, max] = number
        .split(" - ")
        .map((n) => parseFloat(n.replace(/[^0-9.-]+/g, "")));
      number = `${min.toLocaleString("vi-VN")}đ - ${max.toLocaleString(
        "vi-VN"
      )}đ`;
    } else {
      number =
        parseFloat(number.replace(/[^0-9.-]+/g, "")).toLocaleString("vi-VN") +
        "đ";
    }
  } else {
    number = "Không xác định";
  }
  return number;
};

const processSchedules = (schedulesData) => {
  console.log("schedulesData", schedulesData);
  const now = new Date();
  const threeHoursLater = new Date(now.getTime() + 3600000);

  return schedulesData.map((item) => {
    const [year, month, day] = item.scheduleDate.split("-").map(Number);
    const [startTime] = item.scheduleTime.split(" - ");
    const [hours, minutes] = startTime.split(":").map(Number);
    const scheduleTime = new Date(year, month - 1, day, hours, minutes);

    return {
      ...item,
      timeRange: item.scheduleTime,
      timestamp: scheduleTime,
      isValid:
        scheduleTime > threeHoursLater ||
        scheduleTime.getDate() !== now.getDate(),
    };
  });
};

const processScheduleDates = (dates) => {
  console.log("dates", dates);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return dates.map((dateStr) => {
    const date = new Date(dateStr);
    const dayKey = date
      .toLocaleDateString("en-US", { weekday: "short" })
      .toUpperCase();

    return {
      dateStr,
      date,
      displayText: `${date.getDate()}/${date.getMonth() + 1} - ${date.toDateString() === today.toDateString()
        ? "Hôm nay"
        : daysOfWeekMap[dayKey]
        }`,
    };
  });
};

function BookingList() {
  const [specialtyInfo, setSpecialtyInfo] = useState(null);
  const [healthCheckPackages, setHealthCheckPackages] = useState([]);
  const [isShowDetailInfo, setIsShow] = useState(false);
  const doctorDetailInfoRef = useRef(null);
  const [isShowFilterDropdown, setIsShowFilterDropdown] = useState(false);
  const filterDropdownRef = useRef(null);
  const { slug, slug2 } = useParams();

  const location = useLocation();

  useEffect(() => {
    // Scroll to the top when the component mounts
    window.scrollTo(0, 0);
  }, []);

  const processBookingPackages = (packagesResponse) => {
    const packages = packagesResponse.reduce(
      (acc, item) => {
        const bookingPackage = {
          bookingPackageId: item.bookingPackageId,
          bookingPackageName: item.bookingPackageName,
          bookingPackagePrice: formatCurrency(item.price),
          bookingPackageDescription: item.description,
        };
        acc.bookingPackages.push(bookingPackage);
        return acc;
      },
      { bookingPackages: [] }
    );

    console.log("packages", packages);
    if (packages.bookingPackages.length > 0) {
      const prices = packages.bookingPackages.map((p) =>
        parseInt(p.bookingPackagePrice.replace(/\./g, "").replace("đ", ""))
      );
      console.log("prices", prices);
      packages.bookingPackagesPriceSummary =
        prices.length > 1
          ? `${formatCurrency(Math.min(...prices))} - ${formatCurrency(
            Math.max(...prices)
          )}`
          : packages.bookingPackages[0].bookingPackagePrice;
    }

    return packages;
  };

  const findFirstAvailableDate = useCallback((dates, schedules) => {
    const validDates = dates.filter((d) =>
      schedules.some((s) => s.scheduleDate === d.dateStr && s.isValid)
    );
    return validDates[0] || null;
  }, []);

  const handleDateChange = useCallback(
    (date, packageId) => {
      
      const specificPackage = healthCheckPackages.find((p) => p.packageInfo.id === packageId);

      const filtered = specificPackage.schedules
        .filter((s) => s.scheduleDate === date.dateStr)
        .sort((a, b) => a.scheduleId.localeCompare(b.scheduleId));

      specificPackage.currentDate = date;
      specificPackage.filteredSchedules = filtered;

      const healthCheckPackagesCopy = [...healthCheckPackages];
      const index = healthCheckPackagesCopy.findIndex((p) => p.packageInfo.id === packageId);
      healthCheckPackagesCopy[index] = specificPackage;

      setHealthCheckPackages(healthCheckPackagesCopy);
    },
    [healthCheckPackages]
  );

  const fetchData = useCallback(async () => {
    try {
      const medicalServiceSlug = location.pathname.split("/")[2];
      let specialty, healthCheckPackages;
      const mainSlug = slug2 || slug;

      if (medicalServiceSlug === "kham-chuyen-khoa") {
        [specialty, healthCheckPackages] = await Promise.all([
          getSpecialtyBySlug(mainSlug),
          getAllHealthCheckPackagesBySpecialtySlug(mainSlug),
        ]);
      } else {
        [specialty, healthCheckPackages] = await Promise.all([
          getSpecificMedicalServiceBySlug(mainSlug),
          getAllHealthCheckPackagesBySpecificMedicalServiceSlug(mainSlug),
        ]);
      }

      console.log("specialty", specialty);
      console.log("healthCheckPackages", healthCheckPackages);

      // Configure marked options if needed
      marked.setOptions({
        breaks: true, // Enable line breaks
        gfm: true, // Enable GitHub flavored markdown
      });

      // Convert Markdown to HTML
      const rawHtmlContent = marked(specialty.data.specialtyDetailInfo || specialty.data.description || "");
      // Sanitize the HTML content
      const sanitizedHtmlContent = DOMPurify.sanitize(rawHtmlContent);
      setSpecialtyInfo({
        id: specialty.data.id,
        name: specialty.data.name,
        image: specialty.data.image,
        specialtyDetailInfo: sanitizedHtmlContent,
      });

      const formattedData = healthCheckPackages.data.map((item) => {
        const processedDates = processScheduleDates(item.scheduleDates);
        const processedSchedules = processSchedules(item.schedules);
        const firstAvailableDate = findFirstAvailableDate(
          processedDates,
          processedSchedules
        );
        const bookingPackages = processBookingPackages(item.bookingPackagesDetails);

        const path = location.pathname;
        console.log("path", path.split("/")[2]);

        const packageInfo = {
          id: item.packageId,
          fullName: item.packageName,
          packageName: item.packageName,
          image: item.image,
          shortPackageInfo: item.shortPackageInfo?.includes('"/"')
            ? item.shortPackageInfo.split('"/"')
            : item.shortPackageInfo,
          isDeleted: item.isDeleted,
          clinic: item.clinics.map((clinic) => ({
            clinicFullName: clinic.clinicFullName,
            clinicAddress: clinic.clinicAddress,
          })),
          bookingPackages: bookingPackages,
          slug: `${path.split("/")[2]}/${item.slug}`,
          place: item.clinics[0].clinicAddress.split(",")[item.clinics[0].clinicAddress.split(",").length - 1].trim(),
        }

        return {
          packageInfo,
          scheduleDates: processedDates,
          schedules: processedSchedules,
          currentDate: firstAvailableDate,
          filteredSchedules: processedSchedules
            .filter((s) => s.scheduleDate === firstAvailableDate?.dateStr)
            .sort((a, b) => a.scheduleId.localeCompare(b.scheduleId)),
        }
      })
      setHealthCheckPackages(formattedData);

    } catch (err) {
      console.error(err);
    }
  }, [slug])

  useEffect(() => {
    fetchData();
  }, [fetchData])

  const handleShowDetailInfo = () => {
    setIsShow(!isShowDetailInfo);
  };

  const handleShowFilterDropdown = () => {
    setIsShowFilterDropdown(!isShowFilterDropdown);
  };

  useEffect(() => {
    if (isShowDetailInfo) {
      doctorDetailInfoRef.current.style.overflow = "visible";
      doctorDetailInfoRef.current.style.height = "auto";
    } else {
      doctorDetailInfoRef.current.style.overflow = "hidden";
      doctorDetailInfoRef.current.style.height = "150px";
    }

    if (isShowFilterDropdown) {
      filterDropdownRef.current.classList.add("open");
    } else {
      filterDropdownRef.current.classList.remove("open");
    }
  }, [isShowDetailInfo, isShowFilterDropdown]);

  return (
    <div className="booking-list-section">
      <div className="doctor-detail-info-section">
        <div className="app-container">
          <h1>{specialtyInfo?.name}</h1>
          <div className="doctor-detail-info" ref={doctorDetailInfoRef}>
            <div
              className="markdown-content"
              dangerouslySetInnerHTML={{ __html: specialtyInfo?.specialtyDetailInfo }}
            />
          </div>
          <div className="show-hide-button">
            <span onClick={handleShowDetailInfo}>
              {isShowDetailInfo ? "Ẩn bớt" : "Xem thêm"}
            </span>
          </div>
        </div>
      </div>
      <div className="doctors-schedule-section md-px-10">
        <div className="app-container">
          <div className="filter-section">
            <div className="filter-dropdown" onClick={handleShowFilterDropdown}>
              <span>Toàn quốc</span>
              <div className="img-container">
                <svg
                  width={16}
                  height={16}
                  fill="#000"
                  className="chevron-down_svg__bi chevron-down_svg__bi-chevron-down"
                  preserveAspectRatio="none"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"
                  />
                </svg>
              </div>
              <div className="filter-dropdown-content" ref={filterDropdownRef}>
                <div className="filter-item">
                  <span>Toàn quốc</span>
                </div>
                <div className="filter-item">
                  <span>Hà Nội</span>
                </div>
                <div className="filter-item">
                  <span>Hồ Chí Minh</span>
                </div>
              </div>
            </div>
          </div>
          <div className="doctors-schedule-list">
            {healthCheckPackages.map((item) => (
              <div className="doctor-schedule-item">
                <Doctor className="list-type" 
                  packageInfo={item.packageInfo}
                  schedules={item.filteredSchedules}
                  scheduleDates={item.scheduleDates}
                  currentDate={item.currentDate}
                  onDateChange={handleDateChange}
                  hasSchedules={item.filteredSchedules.length > 0} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="see-more-section">
        <div className="app-container">
          <span>Cần tìm hiểu thêm ?</span>
          <a href="/">
            <span>xem câu hỏi thường gặp.</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default BookingList;
