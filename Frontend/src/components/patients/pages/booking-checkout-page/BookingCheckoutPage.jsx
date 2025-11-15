import React, { useState, useEffect, useRef } from "react";
import "./BookingCheckoutPage.scss";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  getBookingScheduleByDoctorScheduleID,
  getAllProvinces,
  submitBooking,
} from "../../../../services/admin/SiteServices";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select, { components } from "react-select";
import Modal from "../../../partials/modal/Modal";
import { Spinner } from "react-bootstrap";

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

function BookingCheckoutPage() {
  const navigate = useNavigate();
  const { packageScheduleId } = useParams();
  const [clinicBranchOptions, setClinicBranchOptions] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [bookingSchedule, setBookingSchedule] = useState({});
  const defaultPackage = bookingSchedule?.schedule?.doctorBookingPackages?.[0];
  const defaultPackageValue = defaultPackage
    ? `${defaultPackage.bookingPackageId}-${defaultPackage.price}`
    : "";
  const [selectedBookingPackage, setSelectedBookingPackage] =
    useState(defaultPackageValue);
  const [bookingFor, setBookingFor] = useState("0");
  const [isGenderSelected, setIsGenderSelected] = useState("0");
  const [isBookingForInputsVisible, setIsBookingForInputsVisible] =
    useState(false);
  const [listDivisions, setListDivisions] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [provinceOptions, setProvinceOptions] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [districtOptions, setDistrictOptions] = useState([]);
  const [selectedWard, setSelectedWard] = useState(null);
  const [wardOptions, setWardOptions] = useState([]);
  const [isPurchaseMethodSelected, setIsPurchaseMethodSelected] = useState("0");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isSuccessModal, setIsSuccessModal] = useState(false);
  const [isSubmitWaiting, setIsSubmitWaiting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      price: defaultPackageValue,
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [bookingScheduleResponse, provincesResponse] = await Promise.all([
          getBookingScheduleByDoctorScheduleID(packageScheduleId),
          getAllProvinces(),
        ]);


        if (bookingScheduleResponse.data.schedule.bookingPackagesDetail.length > 0) {
          const prices = bookingScheduleResponse.data.schedule.bookingPackagesDetail.map((p) => {
            let currencyFormattedPrice = formatCurrency(p.price);
            let priceArray = bookingScheduleResponse.data.schedule.bookingPackagesDetail.map((p) => {
              return parseInt(p.price.replace(/\./g, "").replace("đ", ""));
            });
            return priceArray.length > 1 ? `${formatCurrency(Math.min(...priceArray))} - ${formatCurrency(Math.max(...priceArray))}` : currencyFormattedPrice;
          });
          bookingScheduleResponse.data.schedule.bookingPackagesPriceSummary = prices;
        }

        console.log("bookingScheduleResponse", bookingScheduleResponse);

        setBookingSchedule(bookingScheduleResponse.data);
        setListDivisions(provincesResponse);

        const provinceOptions = [
          { value: "", label: "-- Chọn Tỉnh/Thành --" },
          ...provincesResponse.map((province) => ({
            codename: province.codename,
            value: province.name,
            label: province.name,
          })),
        ];

        setProvinceOptions(provinceOptions);
        setIsLoading(false);

        console.log("Booking schedule response:", bookingScheduleResponse.data);
      } catch (error) {
        console.error("Error fetching doctor data:", error);
      }
    };

    fetchData();
  }, [packageScheduleId]);

  useEffect(() => {
    if (bookingSchedule?.schedule?.bookingPackagesDetail?.length > 0) {
      setSelectedBookingPackage(
        `${bookingSchedule.schedule.bookingPackagesDetail[0].bookingPackageId}-${bookingSchedule.schedule.bookingPackagesDetail[0].price}`
      );
    }

    const clinic = bookingSchedule?.workingInfo?.clinics[0];
    if (clinic?.clinicFullName && clinic?.clinicAddress) {
      const { clinicId, clinicFullName, clinicAddress } = clinic;
      setSelectedBranch({
        clinicBranchId: clinicId,
        clinicFullName,
        clinicAddress: clinicAddress.includes('"/"')
          ? clinicAddress.split('"/"').join()
          : clinicAddress,
      });
    }

    if (clinic?.clinicBranches) {
      const clinicBranchOptions = clinic.clinicBranches.map((item) => {
        return {
          value: item.clinicBranchId,
          label: item.clinicBranchName,
        };
      });

      setClinicBranchOptions(clinicBranchOptions);
    }
  }, [bookingSchedule]);

  const handleChangeBookingPackage = (currentTarget) => {
    const packageId = currentTarget.getAttribute("data-package-id");
    const packagePrice = currentTarget.getAttribute("data-package-price");
    const packageValue = `${packageId}-${packagePrice}`;
    setSelectedBookingPackage(packageValue);
    setValue("price", packageValue); // Update form state with combined value
  };

  useEffect(() => {
    if (defaultPackageValue) {
      setValue("price", defaultPackageValue);
    }
  }, [defaultPackageValue, setValue]);

  const handleShowHideBookingForInput = (value) => {
    if (value === "0") {
      setIsBookingForInputsVisible(false);
    } else {
      setIsBookingForInputsVisible(true);
    }
  };

  const handleBookingForChange = (e) => {
    setBookingFor(e.target.value);
  };

  const handleGenderChange = (e) => {
    setIsGenderSelected(e.target.value);
  };

  const handleChangePurchaseMethod = (e) => {
    setIsPurchaseMethodSelected(e.target.value);
  };

  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  };

  const handleFormSubmit = async (data) => {
    setIsSubmitWaiting(true); // Show loading animation

    console.log("Booking schedule:", bookingSchedule);

    const submitData = {
      ...data,
      bookingFor: data.bookingFor === "0" ? "Bản thân" : "Người thân",
      patientGender: isGenderSelected === "0" ? "Nam" : "Nữ",
      dateOfBirth: formatDate(data.dateOfBirth),
      patientAddress: `${data.patientAddress}, ${data.ward}, ${data.district}, ${data.province}`,
      purchaseMethod:
        isPurchaseMethodSelected === "0"
          ? "Thanh toán sau tại cơ sở y tế"
          : "Thanh toán online",
      packageScheduleId,
      dateBooking: new Date().toLocaleDateString("vi-VN"),
      scheduleDate: bookingSchedule.schedule.scheduleDate,
      scheduleTime: bookingSchedule.schedule.time,
      scheduleDay: bookingSchedule.schedule.dayId,
      medicalPackageName: bookingSchedule.packageName,
      clinic: selectedBranch,
    };

    console.log("Submit data:", submitData);

    // try {
    //   const bookingResult = await submitBooking(submitData);
    //   if (bookingResult.errCode === 0) {
    //     setIsSuccessModal(true);
    //   } else {
    //     setIsSuccessModal(false);
    //   }
    //   setIsModalVisible(true);
    // } catch (error) {
    //   console.error("Error submitting booking:", error);
    // } finally {
    //   setIsSubmitWaiting(false); // Hide loading animation
    // }
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);

    if (isSuccessModal) {
      navigate("/");
    }
  };

  const Control = ({ children, ...props }) => (
    <components.Control {...props}>
      <FontAwesomeIcon icon="fa-solid fa-location-dot" /> {children}
    </components.Control>
  );

  const styles = {
    control: (css, state) => ({
      ...css,
      paddingLeft: "1rem",
    }),
  };

  useEffect(() => {
    if (listDivisions.length === 0) return;

    const selectedProvinceData = listDivisions.find(
      (province) => province.codename === selectedProvince?.codename
    );

    if (selectedProvinceData) {
      const districtOptions = [
        ...selectedProvinceData.districts.map((district) => ({
          codename: district.codename,
          value: district.name,
          label: district.name,
        })),
      ];

      setDistrictOptions(districtOptions);
    } else {
      setSelectedDistrict(null);
      setDistrictOptions([]);
    }
  }, [selectedProvince]);

  useEffect(() => {
    if (listDivisions.length === 0) return;

    const selectedDistrictData = listDivisions
      .find((province) => province.codename === selectedProvince?.codename)
      ?.districts?.find(
        (district) => district?.codename === selectedDistrict?.codename
      );

    if (selectedDistrictData) {
      const wardOptions = [
        ...selectedDistrictData.wards.map((ward) => ({
          codename: ward.codename,
          value: ward.name,
          label: ward.name,
        })),
      ];

      setWardOptions(wardOptions);
    } else {
      setSelectedWard(null);
      setWardOptions([]);
    }
  }, [selectedDistrict]);

  if (isLoading) {
    return (
      <div className="text-center my-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-2">Xin vui lòng chờ đợi trong giây lát...</p>
      </div>
    );
  }

  return (
    <>
      {isSubmitWaiting && <Spinner />}
      <div className="doctor-information-section">
        <div className="doctor-information-container">
          <div className="doctor-information">
            <div className="left-content">
              <div className="img-container">
                <img
                  src={bookingSchedule.image}
                  alt={bookingSchedule.packageName}
                />
              </div>
            </div>
            <div className="right-content">
              <h1>Đặt lịch khám</h1>
              <h2 className="doctor-name">
                <Link to="/doctor">{bookingSchedule.packageName}</Link>
              </h2>
              <div className="schedule-time-section">
                <div className="img-container">
                  <FontAwesomeIcon icon="fa-regular fa-calendar" />
                </div>
                <span className="schedule-time">
                  {bookingSchedule.schedule &&
                    bookingSchedule.schedule.time +
                    " - " +
                    bookingSchedule.schedule.dayId +
                    " - " +
                    bookingSchedule.schedule.scheduleDate}
                </span>
              </div>
              <div className="clinic-address-section">
                <div className="img-container">
                  <FontAwesomeIcon icon="fa-regular fa-hospital" />
                </div>
                <div>
                  <p className="clinic-name">
                    {selectedBranch?.clinicFullName}
                  </p>
                  <p className="clinic-address">
                    {selectedBranch?.clinicAddress}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="booking-information-section">
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <div className="input-group-booking-packages">
            <div className="booking-packages-list">
              {bookingSchedule.schedule.bookingPackagesDetail.map((item) => {
                const packageValue = `${item.bookingPackageId}-${item.price}`;
                return (
                  <label
                    className={`booking-package-item ${selectedBookingPackage?.split("-")[0] ===
                      item.bookingPackageId
                      ? "active"
                      : ""
                      }`}
                    key={item.bookingPackageId}
                    data-package-id={item.bookingPackageId}
                    data-package-price={item.price}
                    onClick={(e) => handleChangeBookingPackage(e.currentTarget)}
                  >
                    <Controller
                      name="price"
                      control={control}
                      render={({ field }) => (
                        <>
                          <input
                            {...field}
                            type="radio"
                            value={packageValue} // Combined value of ID and price
                            checked={
                              selectedBookingPackage?.split("-")[0] ===
                              item.bookingPackageId
                            }
                            onClick={(e) => {
                              field.onChange(e.target.value); // Sync with form state
                            }}
                          />
                          <span>{item.bookingPackageName}</span>
                          <div>{bookingSchedule.schedule.bookingPackagesPriceSummary}</div>
                        </>
                      )}
                    />
                  </label>
                );
              })}
            </div>
          </div>
          {clinicBranchOptions && clinicBranchOptions.length > 1 && (
            <div className="input-group1 input-group-clinic-branches">
              <p className="title">Chi nhánh khám bệnh</p>
              <Controller
                name="clinic"
                control={control}
                defaultValue={selectedBranch}
                rules={{ required: "Không được để trống trường này!" }}
                render={({ field }) => (
                  <Select
                    {...field}
                    value={
                      clinicBranchOptions.find(
                        (option) => option.value === field.value
                      ) || null
                    }
                    placeholder="-- Chọn chi nhánh --"
                    onChange={(selectedOption) => {
                      field.onChange(
                        selectedOption ? selectedOption.value : null
                      );
                      let clinic = clinicBranchOptions.find(
                        (option) => option.value === selectedOption.value
                      );
                      clinic =
                        bookingSchedule.workingInfo.clinics[0].clinicBranches.find(
                          (branch) => branch.clinicBranchId === clinic.value
                        );
                      setSelectedBranch({
                        clinicBranchId: clinic.clinicBranchId,
                        clinicFullName: clinic.clinicBranchName,
                        clinicAddress: clinic.clinicBranchAddress,
                      });
                    }}
                    options={clinicBranchOptions}
                    className={`province-select ${errors.clinic?.message ? "error" : ""
                      }`}
                    isClearable={true}
                    isSearchable={true}
                    components={{ Control }}
                    styles={styles}
                  />
                )}
              />
              {errors.district?.message && (
                <div className="error-message-container">
                  <p className="error-message">{errors.district.message}</p>
                </div>
              )}
            </div>
          )}
          <div className="input-group1 radio-group">
            <div className="booking-for-list radio-list">
              <label
                className="booking-for-item radio-item"
                onClick={() => handleShowHideBookingForInput("0")}
              >
                <input
                  type="radio"
                  value={"0"}
                  checked={bookingFor === "0"}
                  onClick={handleBookingForChange}
                  {...register("bookingFor")}
                />
                <span>&nbsp;Đặt cho bản thân&nbsp;</span>
              </label>
              <label
                className="booking-for-item radio-item"
                onClick={() => handleShowHideBookingForInput("1")}
              >
                <input
                  type="radio"
                  value={"1"}
                  checked={bookingFor === "1"}
                  onClick={handleBookingForChange}
                  {...register("bookingFor")}
                />
                <span>&nbsp;Đặt cho người thân&nbsp;</span>
              </label>
            </div>
          </div>
          <div
            className="booking-for"
            style={{ display: isBookingForInputsVisible ? "block" : "none" }}
          >
            <p className="title">Thông tin người đặt lịch</p>
            <div className="input-group-relatives-name input-group1">
              <div
                className={`form-control form-control1 ${isBookingForInputsVisible && errors.relativeName?.message
                  ? "error"
                  : ""
                  }`}
              >
                <div className="img-container">
                  <FontAwesomeIcon icon="fa-solid fa-user" />
                </div>
                <input
                  type="text"
                  placeholder="Họ tên người đặt lịch (bắt buộc)"
                  disabled={!isBookingForInputsVisible}
                  className="input-field"
                  {...register("relativeName", {
                    required: isBookingForInputsVisible
                      ? "Không được để trống trường này"
                      : false,
                    minLength: {
                      value: 2,
                      message:
                        "Vui lòng điền ĐẦY ĐỦ HỌ VÀ TÊN CÓ DẤU. Lịch khám sẽ bị TỪ CHỐI nếu để sai thông tin.",
                    },
                  })}
                />
              </div>
              {isBookingForInputsVisible && errors.relativeName?.message && (
                <div className="error-message-container">
                  <p className="error-message">{errors.relativeName.message}</p>
                </div>
              )}
            </div>
            <div className="input-group-relatives-phone input-group1">
              <div
                className={`form-control form-control1 ${isBookingForInputsVisible &&
                  errors.relativePhoneNumber?.message
                  ? "error"
                  : ""
                  }`}
              >
                <div className="img-container">
                  <FontAwesomeIcon icon="fa-solid fa-phone" />
                </div>
                <input
                  type="text"
                  className="input-field"
                  placeholder="Số điện thoại liên hệ (bắt buộc)"
                  disabled={!isBookingForInputsVisible}
                  {...register("relativePhoneNumber", {
                    required: isBookingForInputsVisible
                      ? "Không được để trống trường này"
                      : false,
                    maxLength: {
                      value: 10,
                      message: "Số điện thoại không được vượt quá 10 chữ số!",
                    },
                    pattern: {
                      value: /^0[1-9]+$/,
                      message: "Số điện thoại không hợp lệ!",
                    },
                  })}
                />
              </div>
              {isBookingForInputsVisible &&
                errors.relativePhoneNumber?.message && (
                  <div className="error-message-container">
                    <p className="error-message">
                      {errors.relativePhoneNumber.message}
                    </p>
                  </div>
                )}
            </div>
            <p className="title">Thông tin bệnh nhân</p>
          </div>
          <div className="input-group-patient-name input-group1">
            <div
              className={`form-control form-control1 ${errors.patientName?.message ? "error" : ""
                }`}
            >
              <div className="img-container">
                <FontAwesomeIcon icon="fa-solid fa-user" />
              </div>
              <input
                type="text"
                placeholder="Họ tên bệnh nhân (bắt buộc)"
                className="input-field"
                {...register("patientName", {
                  required: "Không được phép để trống trường này!",
                  minLength: {
                    value: 2,
                    message:
                      "Vui lòng điền ĐẦY ĐỦ HỌ VÀ TÊN CÓ DẤU. Lịch khám sẽ bị TỪ CHỐI nếu để sai thông tin.",
                  },
                })}
              />
            </div>
            {errors.patientName?.message && (
              <div className="error-message-container">
                <p className="error-message">{errors.patientName.message}</p>
              </div>
            )}
          </div>
          <div className="input-group-patient-gender input-group1 radio-group">
            <div className="patient-gender-list radio-list">
              <label className="patient-gender-item radio-item">
                <input
                  type="radio"
                  value="0"
                  checked={isGenderSelected === "0"}
                  onClick={handleGenderChange}
                  {...register("patientGender")}
                />
                <span>&nbsp;Nam&nbsp;</span>
              </label>
              <label className="patient-gender-item radio-item">
                <input
                  type="radio"
                  value="1"
                  checked={isGenderSelected === "1"}
                  onClick={handleGenderChange}
                  {...register("patientGender")}
                />
                <span>&nbsp;Nữ&nbsp;</span>
              </label>
            </div>
          </div>
          <div className="input-group-patient-phone input-group1">
            <div
              className={`form-control form-control1 ${errors.patientPhoneNumber?.message ? "error" : ""
                }`}
            >
              <div className="img-container">
                <FontAwesomeIcon icon="fa-solid fa-phone" />
              </div>
              <input
                type="text"
                className="input-field"
                placeholder="Số điện thoại liên hệ (bắt buộc)"
                {...register("patientPhoneNumber", {
                  required: "Không được để trống trường này!",
                  maxLength: {
                    value: 10,
                    message: "Số điện thoại không được vượt quá 10 chữ số!",
                  },
                  pattern: {
                    value: /^0[1-9]+$/,
                    message: "Số điện thoại không hợp lệ!",
                  },
                })}
              />
            </div>
            {errors.patientPhoneNumber?.message && (
              <div className="error-message-container">
                <p className="error-message">
                  {errors.patientPhoneNumber.message}
                </p>
              </div>
            )}
          </div>
          <div className="patient-email-input input-group1">
            <div
              className={`form-control form-control1 ${errors.email?.message ? "error" : ""
                }`}
            >
              <div className="img-container">
                <FontAwesomeIcon icon="fa-solid fa-envelope" />
              </div>
              <input
                type="text"
                placeholder="Địa chỉ email"
                className="input-field"
                {...register("email", {
                  required:
                    "Có thể điền địa chỉ email của bệnh nhân hoặc người đặt lịch",
                  pattern: {
                    value: new RegExp("^[\\w-.]+@([\\w-]+\\.)+[\\w-]{2,4}$"),
                    message: "Địa chỉ email không hợp lệ!",
                  },
                })}
              />
            </div>
            {errors.email?.message && (
              <div className="error-message-container">
                <p className="error-message">{errors.email.message}</p>
              </div>
            )}
          </div>
          <div className="patient-birthdate-input input-group1">
            <div
              className={`form-control form-control1 ${errors.dateOfBirth?.message ? "error" : ""
                }`}
            >
              <div className="img-container">
                <FontAwesomeIcon icon="fa-solid fa-calendar" />
              </div>
              <Controller
                name="dateOfBirth"
                control={control}
                defaultValue=""
                rules={{ required: "Không được bỏ trống trường này!" }}
                render={({ field }) => (
                  <DatePicker
                    {...field}
                    selected={field.value ? new Date(field.value) : null}
                    placeholderText="Ngày/tháng/năm sinh (bắt buộc)"
                    dateFormat="dd/MM/yyyy"
                    className="input-field"
                  />
                )}
              />
            </div>
            {errors.dateOfBirth?.message && (
              <div className="error-message-container">
                <p className="error-message">{errors.dateOfBirth.message}</p>
              </div>
            )}
          </div>
          <div className="province-select input-group1">
            <Controller
              name="province"
              control={control}
              defaultValue={selectedProvince}
              rules={{ required: "Không được bỏ trống trường này!" }}
              render={({ field }) => (
                <Select
                  {...field}
                  value={
                    provinceOptions.find(
                      (option) => option.value === field.value
                    ) || null
                  }
                  onChange={(selectedOption) => {
                    field.onChange(
                      selectedOption ? selectedOption.value : null
                    );
                    setSelectedProvince(selectedOption);
                    setSelectedDistrict(null); // Clear selected district
                    setSelectedWard(null); // Clear selected ward
                    setValue("district", null); // Clear district value in form state
                    setValue("ward", null); // Clear ward value in form state
                  }}
                  options={provinceOptions}
                  placeholder="-- Chọn Tỉnh/Thành --"
                  className={`province-select ${errors.province?.message ? "error" : ""
                    }`}
                  isClearable={true}
                  isSearchable={true}
                  components={{ Control }}
                  styles={styles}
                />
              )}
            />
            {errors.province?.message && (
              <div className="error-message-container">
                <p className="error-message">{errors.province.message}</p>
              </div>
            )}
          </div>
          <div className="district-select input-group1">
            <Controller
              name="district"
              control={control}
              defaultValue={selectedDistrict}
              rules={{ required: "Không được để trống trường này!" }}
              render={({ field }) => (
                <Select
                  {...field}
                  value={
                    districtOptions.find(
                      (option) => option.value === field.value
                    ) || null
                  }
                  placeholder="-- Chọn Quận/Huyện --"
                  noOptionsMessage={() => "Vui lòng chọn Tỉnh/Thành trước"}
                  onChange={(selectedOption) => {
                    field.onChange(
                      selectedOption ? selectedOption.value : null
                    );
                    setSelectedDistrict(selectedOption);
                    setSelectedWard(null); // Clear selected ward
                    setValue("ward", null); // Clear ward value in form state
                  }}
                  options={districtOptions}
                  className={`province-select ${errors.district?.message ? "error" : ""
                    }`}
                  isClearable={true}
                  isSearchable={true}
                  components={{ Control }}
                  styles={styles}
                />
              )}
            />
            {errors.district?.message && (
              <div className="error-message-container">
                <p className="error-message">{errors.district.message}</p>
              </div>
            )}
          </div>
          <div className="ward-select input-group1">
            <Controller
              name="ward"
              control={control}
              defaultValue={selectedWard}
              rules={{ required: "Không được để trống trường này!" }}
              render={({ field }) => (
                <Select
                  {...field}
                  value={
                    wardOptions.find(
                      (option) => option.value === field.value
                    ) || null
                  }
                  placeholder="-- Chọn Xã/Phường --"
                  noOptionsMessage={() => "Vui lòng chọn Quận/Huyện trước"}
                  onChange={(selectedOption) => {
                    field.onChange(
                      selectedOption ? selectedOption.value : null
                    );
                    setSelectedWard(selectedOption);
                  }}
                  options={wardOptions}
                  className={`province-select ${errors.ward?.message ? "error" : ""
                    }`}
                  isClearable={true}
                  isSearchable={true}
                  components={{ Control }}
                  styles={styles}
                />
              )}
            />
            {errors.ward?.message && (
              <div className="error-message-container">
                <p className="error-message">{errors.ward.message}</p>
              </div>
            )}
          </div>
          <div className="address-input input-group1">
            <div
              className={`form-control form-control1 ${errors.patientAddress?.message ? "error" : ""
                }`}
            >
              <div className="img-container">
                <FontAwesomeIcon icon="fa-solid fa-location-dot" />
              </div>
              <input
                type="text"
                placeholder="Địa chỉ cụ thể (Không cần nhập Tỉnh/Thành, Quận/Huyện, Xã/Phường)"
                className="input-field"
                {...register("patientAddress", {
                  required: "Không được để trống trường này!",
                })}
              />
            </div>
            {errors.patientAddress?.message && (
              <div className="error-message-container">
                <p className="error-message">{errors.patientAddress.message}</p>
              </div>
            )}
          </div>
          <div className="booking-reason-input input-group1">
            <div className="form-control form-control1">
              <div className="img-container">
                <FontAwesomeIcon icon="fa-solid fa-circle-plus" />
              </div>
              <textarea
                type="text"
                placeholder="Lý do khám bệnh"
                className="input-field"
                {...register("bookingReason")}
              />
            </div>
          </div>
          <div className="purchase-method-input input-group1 radio-group">
            <p className="title">Hình thức thanh toán</p>
            <div className="radio-list">
              <label className="radio-item">
                <input
                  type="radio"
                  value="0"
                  checked={isPurchaseMethodSelected === "0"}
                  onClick={handleChangePurchaseMethod}
                  {...register("purchaseMethod")}
                />
                <span>&nbsp;Thanh toán sau tại cơ sở y tế&nbsp;</span>
              </label>
              <label className="radio-item">
                <input
                  type="radio"
                  value="1"
                  checked={isPurchaseMethodSelected === "1"}
                  onClick={handleChangePurchaseMethod}
                  {...register("purchaseMethod")}
                />
                <span>&nbsp;Thanh toán online&nbsp;</span>
              </label>
            </div>
          </div>
          <div className="purchase-content-section">
            <div className="purchase-content">
              <div>
                <div>Giá khám</div>
                <div className="booking-price">5.800.000đ</div>
              </div>
              <div>
                <div>Phí đặt lịch</div>
                <div className="booking-price">Miễn phí</div>
              </div>
              <hr />
              <div className="booking-total-amount">
                <div>Tổng cộng</div>
                <div className="total-purchase-amount">5.800.000đ</div>
              </div>
            </div>
          </div>
          <div className="booking-note-section">
            <p className="booking-note">
              Quý khách vui lòng điền đầy đủ thông tin để tiết kiệm thời gian
              làm thủ tục khám
            </p>
          </div>
          <div className="booking-alert-section">
            <div className="booking-alert">
              <p>
                <b>LƯU Ý</b>
              </p>
              <p>
                Thông tin anh/chị cung cấp sẽ được sử dụng làm hồ sơ khám bệnh,
                khi điền thông tin anh/chị vui lòng:
              </p>
              <ul>
                <li>
                  Ghi rõ họ và tên, viết hoa những chữ cái đầu tiên, ví dụ:
                  <b>Trần Văn Phú</b>
                </li>
                <li>
                  Điền đầy đủ, đúng và vui lòng kiểm tra lại thông tin trước khi
                  ấn &quot;Xác nhận&quot;
                </li>
              </ul>
            </div>
          </div>
          <input
            type="submit"
            className="btn submit-button"
            value={"Xác nhận đặt khám"}
          />
          <p className="term-and-policy-note">
            Bằng việc xác nhận đặt khám, bạn đã hoàn toàn đồng ý với
            <span>&nbsp;Điều khoản sử dụng&nbsp;</span>
            dịch vụ của chúng tôi.
          </p>
        </form>
      </div>
      {isModalVisible && (
        <Modal
          handleCloseModalProps={handleCloseModal}
          isSuccessModal={isSuccessModal}
        />
      )}
    </>
  );
}

export default BookingCheckoutPage;
