import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Spinner,
} from "react-bootstrap";
import { useForm } from "react-hook-form";
import { BsCheckCircleFill, BsClockHistory } from "react-icons/bs";
import PackageInfoSection from "./PackageInfoSection";
import ScheduleGrid from "../schedule-grid/ScheduleGrid";
import { toast } from "react-toastify";
import {
  generateTimeSlots,
  generateScheduleData,
} from "../../../utils/scheduleUtils";
import "./HealthCheckSchedule.scss";
import {
  createNewHealthCheckPackageSchedule,
  updateHealthCheckPackageSchedule,
} from "../../../services/admin/SiteServices";

const HealthCheckSchedule = ({ isEditMode, listDataOptions, fetchData }) => {
  const navigate = useNavigate();
  const [fetchStatus, setFetchStatus] = useState({
    isLoading: false,
    isError: false,
  });
  const [timeSlotInterval, setTimeSlotInterval] = useState(30);
  const [scheduleData, setScheduleData] = useState([]);

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      packageId: "",
      packageName: "",
      packageImage: "",
      packageType: "",
      clinic: "",
      branches: [],
      schedule: [],
    },
  });

  const watchedPackageId = watch("packageId");

  useEffect(() => {
    const defaultSchedule = generateScheduleData([], timeSlotInterval);
    setScheduleData(defaultSchedule);
  }, [timeSlotInterval]);

  useEffect(() => {
    if (watchedPackageId) {
      const selectedPackage = listDataOptions.healthCheckPackageOptions.find(
        (pkg) => pkg.value === watchedPackageId
      );
      if (selectedPackage) {
        setValue("packageName", selectedPackage.packageName);
        setValue("packageType", selectedPackage.packageType);
        setValue("clinic", selectedPackage.clinic);
        setValue("branches", selectedPackage.branches);
        setValue("packageImage", selectedPackage.packageImage);

        if (selectedPackage.schedule) {
          const existedScheduleData = generateScheduleData(
            selectedPackage.schedule,
            timeSlotInterval
          );
          setScheduleData(existedScheduleData);
        } else {
          const newSchedule = generateScheduleData([], timeSlotInterval);
          setScheduleData(newSchedule);
        }
      }
    }
  }, [watchedPackageId, isEditMode, setValue, timeSlotInterval]);

  const handleScheduleToggle = (slotId) => {
    console.log(slotId);
    setScheduleData((prev) =>
      prev.map((slot) =>
        slot.id === slotId ? { ...slot, isTicked: !slot.isTicked } : slot
      )
    );
  };

  const handleTimeIntervalChange = (interval) => {
    setTimeSlotInterval(interval);
    const newSchedule = generateScheduleData([], interval);
    setScheduleData(newSchedule);
  };

  const onFormSubmit = async (data) => {
    try {
      setFetchStatus({ isLoading: true, isError: false });
      const formData = {
        packageId: data.packageId,
        packageName: data.packageName,
        schedules: JSON.stringify(scheduleData.filter((slot) => slot.isTicked)),
      };
      const formDataSubmit = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        formDataSubmit.append(key, value);
      });

      console.log("FormData entries:");
      for (let [key, value] of formDataSubmit.entries()) {
        console.log(`${key}:`, value);
      }
      // if (!isEditMode) {
      //     const result = await createNewHealthCheckPackageSchedule(formDataSubmit);
      //     if (result.status === 200) {
      //         toast.success((
      //             <div>
      //                 <strong>Create new package schedule successfully!</strong>
      //                 <div>Changes will take effect starting next Monday.</div>
      //             </div>
      //         ));
      //         setFetchStatus({
      //             isLoading: false,
      //             isError: false,
      //         });
      //     } else {
      //         toast.error("Create new package schedule failed!");
      //         setFetchStatus({
      //             isLoading: false,
      //             isError: true,
      //         });
      //     }
      // } else {
      //     const result = await updateHealthCheckPackageSchedule(formDataSubmit);
      //     if (result.status === 200) {
      //         toast.success((
      //             <div>
      //                 <strong>Update package successfully!</strong>
      //                 <div>Changes will take effect starting next Monday.</div>
      //             </div>
      //         ));
      //         setFetchStatus({
      //             isLoading: false,
      //             isError: false,
      //         });
      //     } else {
      //         toast.error("Update package failed!");
      //         setFetchStatus({
      //             isLoading: false,
      //             isError: true,
      //         });
      //     }
      // }
      setFetchStatus({ isLoading: false, isError: false });
      fetchData();
      navigate("/admin/eCommerce/schedules/create");
    } catch (error) {
      setFetchStatus({ isLoading: false, isError: true });
      console.error("Error submitting form:", error);
    }
  };

  const timeSlots = generateTimeSlots(timeSlotInterval);
  const days = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

  if (fetchStatus.isLoading) {
    return (
      <div className="text-center my-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-2">Xin vui lòng chờ đợi trong giây lát...</p>
      </div>
    );
  }

  return (
    <div className="health-check-schedule">
      <Container
        fluid
        style={{
          padding: "2rem",
          background: "white",
          borderRadius: "1rem",
          boxShadow: "0 0.5rem 1rem rgba(0, 0, 0, 0.15)",
        }}
      >
        <h2 className="management-header">
          {!isEditMode ? "Create" : "Update"} Medical Health Check Package
          Schedule
        </h2>

        <Form onSubmit={handleSubmit(onFormSubmit)}>
          <Row>
            <Col lg={12} xl={12} className="mb-4">
              <PackageInfoSection
                control={control}
                errors={errors}
                loading={fetchStatus.isLoading}
                isEditMode={isEditMode}
                packages={listDataOptions.healthCheckPackageOptions}
              />
            </Col>

            <Col lg={12} xl={12}>
              <Card className="schedule-card">
                <Card.Header className="schedule-header">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <BsClockHistory className="me-2" />
                      <span>Weekly Schedule Management</span>
                    </div>
                    <Form.Group className="time-interval-selector">
                      <Form.Label className="small mb-1">
                        Time Interval:
                      </Form.Label>
                      <Form.Select
                        size="sm"
                        value={timeSlotInterval}
                        onChange={(e) =>
                          handleTimeIntervalChange(Number(e.target.value))
                        }
                        className="time-interval-select"
                      >
                        <option value={15}>15 minutes</option>
                        <option value={30}>30 minutes</option>
                        <option value={60}>60 minutes</option>
                      </Form.Select>
                    </Form.Group>
                  </div>
                </Card.Header>
                <Card.Body className="schedule-body">
                  <ScheduleGrid
                    timeSlots={timeSlots}
                    days={days}
                    scheduleData={scheduleData}
                    onToggleSlot={handleScheduleToggle}
                  />
                </Card.Body>
              </Card>

              <div className="submit-section mt-4">
                {/* Submit Button */}
                <div className="d-grid">
                  <Button type="submit" variant="primary" size="lg">
                    {isEditMode ? "Update" : "Create"} Schedule
                  </Button>
                </div>
              </div>
            </Col>
          </Row>
        </Form>
      </Container>
    </div>
  );
};

export default HealthCheckSchedule;
