import React, { useEffect, useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import "./IndividualBookingPage.scss";
import { useParams } from "react-router-dom";
import Doctor from "../../../../doctors/Doctor";
import {
  getHealthCheckPackageSchedulesByDoctorSlug,
  getHealthCheckPackageBySlug,
  getHealthCheckPackageScheduleDatesByDoctorSlug,
  getHealthCheckPackageBookingDetail,
  storeDoctorBookingPackage,
} from "../../../../../services/admin/SiteServices.js";
import { marked } from "marked";
import DOMPurify from "dompurify";

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
    const [startTime] = item.Schedule.time.split(" - ");
    const [hours, minutes] = startTime.split(":").map(Number);
    const scheduleTime = new Date(year, month - 1, day, hours, minutes);

    return {
      ...item,
      timeRange: item.Schedule.time,
      timestamp: scheduleTime,
      isValid:
        scheduleTime > threeHoursLater ||
        scheduleTime.getDate() !== now.getDate(),
    };
  });
};

const processScheduleDates = (dates) => {
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
      displayText: `${date.getDate()}/${date.getMonth() + 1} - ${
        date.toDateString() === today.toDateString()
          ? "Hôm nay"
          : daysOfWeekMap[dayKey]
      }`,
    };
  });
};

function IndividualBookingPage() {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const [state, setState] = useState({
    healthCheckPackageInfo: null,
    schedules: [],
    scheduleDates: [],
    filteredSchedules: [],
    currentDate: null,
    loading: true,
  });

  console.log("state", state.schedules);

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

  const fetchData = useCallback(async () => {
    try {
      const [
        scheduleDatesRes,
        healthCheckPackageInfoRes,
        schedulesRes,
        bookingPackagesRes,
      ] = await Promise.all([
        getHealthCheckPackageScheduleDatesByDoctorSlug(slug),
        getHealthCheckPackageBySlug(slug),
        getHealthCheckPackageSchedulesByDoctorSlug(slug),
        getHealthCheckPackageBookingDetail(slug),
      ]);

      const processedSchedules = processSchedules(schedulesRes.data);
      const processedDates = processScheduleDates(scheduleDatesRes.data);
      const firstAvailableDate = findFirstAvailableDate(
        processedDates,
        processedSchedules
      );

      const bookingPackages = processBookingPackages(bookingPackagesRes.data);

      const packageData = {
        ...healthCheckPackageInfoRes.data,
        packageId: healthCheckPackageInfoRes.data.packageId,
        doctorId: healthCheckPackageInfoRes.data.doctorId,
        packageName: healthCheckPackageInfoRes.data.packageName,
        image: healthCheckPackageInfoRes.data.image,
        packageDetailInfo: DOMPurify.sanitize(
          marked(healthCheckPackageInfoRes.data.packageDetailInfo || "")
        ),
        shortPackageInfo:
          healthCheckPackageInfoRes.data.shortPackageInfo?.includes('"/"')
            ? healthCheckPackageInfoRes.data.shortPackageInfo.split('"/"')
            : healthCheckPackageInfoRes.data.shortPackageInfo,
        clinic: healthCheckPackageInfoRes.data.workingInfo.clinics,
        shortDoctorInfo: healthCheckPackageInfoRes.data.isManagedByDoctor
          ? healthCheckPackageInfoRes.data.shortDoctorInfo?.includes('"/"')
            ? healthCheckPackageInfoRes.data.shortDoctorInfo.split('"/"')
            : healthCheckPackageInfoRes.data.shortDoctorInfo
          : healthCheckPackageInfoRes.data.shortPackageInfo?.includes('"/"')
          ? healthCheckPackageInfoRes.data.shortPackageInfo.split('"/"')
          : healthCheckPackageInfoRes.data.shortPackageInfo,
        isDeleted: healthCheckPackageInfoRes.data.isDeleted,
        place: healthCheckPackageInfoRes.data.workingInfo.clinics[0].clinicAddress.split(",")[healthCheckPackageInfoRes.data.workingInfo.clinics[0].clinicAddress.split(",").length - 1].trim(),
      };

      console.log({
        ...bookingPackages,
        packageData,
      });

      dispatch(
        storeDoctorBookingPackage({
          ...bookingPackages,
          packageData,
        })
      );

      setState((prev) => ({
        ...prev,
        healthCheckPackageInfo: packageData,
        schedules: processedSchedules,
        scheduleDates: processedDates,
        currentDate: firstAvailableDate,
        filteredSchedules: processedSchedules
          .filter((s) => s.scheduleDate === firstAvailableDate?.dateStr)
          .sort((a, b) => a.scheduleId.localeCompare(b.scheduleId)),
        loading: false,
      }));
    } catch (error) {
      console.error("Error loading data:", error);
      setState((prev) => ({ ...prev, loading: false }));
    }
  }, [slug, findFirstAvailableDate, dispatch]);

  const refreshSchedules = useCallback(() => {
    setState((prev) => ({
      ...prev,
      schedules: processSchedules(prev.schedules),
    }));
  }, []);

  useEffect(() => {
    fetchData();
    const interval = setInterval(refreshSchedules, 3600000);
    return () => clearInterval(interval);
  }, [fetchData, refreshSchedules]);

  const handleDateChange = useCallback(
    (date) => {
      const filtered = state.schedules
        .filter((s) => s.scheduleDate === date.dateStr)
        .sort((a, b) => a.scheduleId.localeCompare(b.scheduleId));

      setState((prev) => ({
        ...prev,
        currentDate: date,
        filteredSchedules: filtered,
      }));
    },
    [state.schedules]
  );

  if (state.loading) return <div>Loading...</div>;

  return (
    <>
      <div className="upper-content">
        <div className="app-container">
          <Doctor
            className="individual-type"
            packageInfo={state.healthCheckPackageInfo}
            schedules={state.filteredSchedules}
            scheduleDates={state.scheduleDates}
            currentDate={state.currentDate}
            onDateChange={handleDateChange}
            hasSchedules={state.filteredSchedules.length > 0}
          />
        </div>
      </div>
      <div className="lower-content">
        <div className="app-container">
          <div
            className="doctor-detail-info md-px-10"
            dangerouslySetInnerHTML={{
              __html: state.healthCheckPackageInfo?.packageDetailInfo || "",
            }}
          />
        </div>
        <div className="see-more-section">
          <div className="app-container">
            <span>Cần tìm hiểu thêm ? </span>
            <a href="/">
              <span>xem câu hỏi thường gặp.</span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default IndividualBookingPage;
