import React, { useEffect, useState, useRef, useCallback } from "react";
import "./IndividualBookingPage.scss";
import { Link, useParams } from "react-router-dom";
import Doctor from "../../../../doctors/Doctor";
import {
  getDoctorSchedulesByDoctorSlug,
  getDoctorBySlug,
  getDoctorScheduleDatesByDoctorSlug,
} from "../../../../../services/admin/SiteServices.js";
import _ from "lodash";
import { marked } from "marked";
import DOMPurify from "dompurify";

function IndividualBookingPage() {
  const [doctorInfo, setDoctorInfo] = useState({});
  const [schedules, setSchedules] = useState([]);
  const [filteredSchedules, setFilteredSchedules] = useState([]);
  const [schedulesDate, setSchedulesDate] = useState([]);
  const [formattedSchedulesDate, setFormattedSchedulesDate] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAPICalledSuccessfully, setIsAPICalledSuccessfully] = useState(false);
  const [schedulesLoaded, setSchedulesLoaded] = useState(false);
  const [schedulesDateLoaded, setSchedulesDateLoaded] = useState(false);
  const [isTodayScheduleRefreshed, setIsTodayScheduleRefreshed] =
    useState(false);
  const [
    isStartToSetupTodaySchedulesAndScheduleDates,
    setIsStartToSetupTodaySchedulesAndScheduleDates,
  ] = useState(false);
  const schedulesRef = useRef(schedules);
  const params = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const doctorSlug = params.slug;

    const fetchDoctorData = async () => {
      try {
        const [scheduleDatesResponse, doctorInfoResponse, schedulesResponse] =
          await Promise.all([
            getDoctorScheduleDatesByDoctorSlug(doctorSlug),
            getDoctorBySlug(doctorSlug),
            getDoctorSchedulesByDoctorSlug(doctorSlug),
          ]);

        setSchedulesDate(scheduleDatesResponse.data);

        const doctorInfo = {
          userId: doctorInfoResponse.data.userId,
          doctorId: doctorInfoResponse.data.doctorId,
          fullName: `${
            doctorInfoResponse.data.user.fullName
              ? doctorInfoResponse.data.user.fullName
              : ""
          }${
            doctorInfoResponse.data.packageName
              ? doctorInfoResponse.data.packageName
              : ""
          }`,
          image: doctorInfoResponse.data.user.image,
          doctorDetailInfo: DOMPurify.sanitize(
            marked(doctorInfoResponse.data.doctorDetailInfo)
          ),
          clinic: doctorInfoResponse.data.clinic.fullname,
          clinicAddress: doctorInfoResponse.data.clinic.address.includes('"/"')
            ? doctorInfoResponse.data.clinic.address.split('"/"')
            : doctorInfoResponse.data.clinic.address,
          shortDoctorInfo: doctorInfoResponse.data.shortDoctorInfo.includes(
            '"/"'
          )
            ? doctorInfoResponse.data.shortDoctorInfo.split('"/"')
            : doctorInfoResponse.data.shortDoctorInfo,
          isDeleted: doctorInfoResponse.data.isDeleted,
        };
        setDoctorInfo(doctorInfo);

        const timeRange = schedulesResponse.data.map((item) => ({
          scheduleId: item.scheduleId,
          scheduleDate: item.scheduleDate,
          timeRange: item.schedule.time,
        }));
        setSchedules(timeRange);
        setIsAPICalledSuccessfully(true);
      } catch (error) {
        console.error("Error fetching doctor data:", error);
      }
    };

    fetchDoctorData();
  }, [params.slug]);

  const formattingScheduleDates = useCallback(() => {
    if (!isAPICalledSuccessfully && schedulesDate.length === 0) return false;

    const daysOfWeek = {
      MON: "Thứ Hai",
      TUE: "Thứ Ba",
      WED: "Thứ Tư",
      THU: "Thứ Năm",
      FRI: "Thứ Sáu",
      SAT: "Thứ Bảy",
      SUN: "Chủ Nhật",
    };

    // Create date array
    let dateArray = [];
    dateArray = schedulesDate.map((item) => {
      const date = new Date(
        item.split("-")[0],
        item.split("-")[1] - 1,
        item.split("-")[2]
      );

      const dayOfWeek = date
        .toLocaleDateString("en-US", { weekday: "short" })
        .toUpperCase();

      return {
        dayShowing: `${daysOfWeek[dayOfWeek]} - ${date.getDate()}/${
          date.getMonth() + 1
        }`,
        date,
      };
    });

    dateArray = dateArray.map((item) => {
      return {
        ...item,
        dayShowing: `${
          item.date.toLocaleDateString("en-US", { weekday: "short" }) ===
            new Date().toLocaleDateString("en-US", { weekday: "short" }) &&
          item.date.getDate() === new Date().getDate() &&
          item.date.getMonth() === new Date().getMonth() &&
          item.date.getFullYear() === new Date().getFullYear()
            ? (item.dayShowing.split(" - ")[0] = "Hôm nay") +
              " - " +
              item.dayShowing.split(" - ")[1]
            : item.dayShowing
        }`,
      };
    });

    if (dateArray.length > 0) {
      setFormattedSchedulesDate(dateArray);
      setSchedulesDateLoaded(true);
    } else {
      setFormattedSchedulesDate([
        {
          hasSchedule: false,
        },
      ]);
    }

    return true;
  }, [isAPICalledSuccessfully, schedulesDate]);

  const filteredSchedulesByDate = useCallback(
    (date) => {
      if (!isAPICalledSuccessfully && schedules.length === 0) return false;

      console.log("date: ", date);

      const filteredSchedules = schedules
        .filter((schedule) => {
          const [year, month, day] = schedule.scheduleDate
            .split("-")
            .map(Number);
          return (
            year === date.getFullYear() &&
            month === date.getMonth() + 1 &&
            day === date.getDate()
          );
        })
        .sort((a, b) => a.scheduleId.localeCompare(b.scheduleId));

      console.log("filteredSchedules: ", filteredSchedules);

      if (filteredSchedules.length > 0) {
        setFilteredSchedules(filteredSchedules);
        setSchedulesLoaded(true);
      } else {
        setFilteredSchedules([
          {
            hasSchedule: false,
          },
        ]);
      }

      return true;
    },
    [isAPICalledSuccessfully, schedules]
  );

  useEffect(() => {
    const flag1 = formattingScheduleDates();
    const flag2 = filteredSchedulesByDate(new Date());

    if (flag1 && flag2) {
      setLoading(false);
    }
  }, [isStartToSetupTodaySchedulesAndScheduleDates]);

  const refreshAvailableSchedules = useCallback(() => {
    console.log("Refreshing available schedules after 3 hours...");
    console.log("schedules: ", schedules);

    if (_.isEmpty(schedules)) return;

    const now = new Date();
    const threeHoursLater = new Date(now.getTime() + 1 * 60 * 60 * 1000);

    const filteredSchedules = schedules.filter((schedule) => {
      const [year, month, day] = schedule.scheduleDate.split("-").map(Number);
      const [startTime] = schedule.timeRange.split(" - ");
      const [hours, minutes] = startTime.split(":").map(Number);
      const scheduleTime = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        hours,
        minutes
      );

      // Keep schedules within the valid range
      return (
        (now.getFullYear() === year &&
          now.getMonth() === month - 1 &&
          now.getDate() === day &&
          scheduleTime > threeHoursLater) ||
        !(
          now.getFullYear() === year &&
          now.getMonth() === month - 1 &&
          now.getDate() === day
        )
      );
    });

    if (filteredSchedules) {
      setSchedules(filteredSchedules);
    }

    return true;
  }, [!_.isEqual(schedulesRef.current, schedules)]);

  useEffect(() => {
    console.log("Initial filter on mount...");
    const flag = refreshAvailableSchedules(); // Initial filter on mount
    if (flag) {
      setIsTodayScheduleRefreshed(true);
    }

    const interval = setInterval(() => {
      refreshAvailableSchedules(); // Periodic filter every 3 hours
    }, 1 * 60 * 60 * 1000);

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [refreshAvailableSchedules]);

  useEffect(() => {
    if (isAPICalledSuccessfully === true && isTodayScheduleRefreshed === true) {
      setIsStartToSetupTodaySchedulesAndScheduleDates(true);
    }
  }, [isAPICalledSuccessfully, isTodayScheduleRefreshed]);

  useEffect(() => {
    console.log("Schedules After 3 hours: ", schedules);
  }, [schedules]);

  const hasSchedule = () => {
    return !filteredSchedules.some((schedule) =>
      Object.hasOwnProperty.call(schedule, "hasSchedule")
    );
  };

  const hasScheduleDates = () => {
    return !formattedSchedulesDate.some((date) =>
      Object.hasOwnProperty.call(date, "hasSchedule")
    );
  };

  console.log("Parent render...");

  return (
    <>
      {!loading ||
      (!hasSchedule() && !hasScheduleDates()) ||
      doctorInfo.isDeleted ? (
        <div className="upper-content">
          <div className="app-container">
            <Doctor
              className="individual-type"
              doctorInfoProps={doctorInfo}
              schedulesProps={hasSchedule() ? filteredSchedules : false}
              schedulesDateProps={
                hasScheduleDates() ? formattedSchedulesDate : false
              }
              filteredSchedulesByDateProps={filteredSchedulesByDate}
            />
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
      <div className="lower-content">
        <div className="app-container">
          <div
            className="doctor-detail-info md-px-10"
            dangerouslySetInnerHTML={{ __html: doctorInfo.doctorDetailInfo }}
          ></div>
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
    </>
  );
}

export default IndividualBookingPage;
