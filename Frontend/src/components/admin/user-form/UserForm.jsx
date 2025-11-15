import { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import "./UserForm.scss";
import { Upload, Trash } from "react-bootstrap-icons";
import { Spinner } from "react-bootstrap";
import ReactMarkdown from "react-markdown";
import { createNewDoctor, getAllDataBySlug, updateDoctor } from "../../../services/admin/SiteServices";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const UserForm = ({ isEditMode, roleConfig, existingUser }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm({
    defaultValues: {
      fullName: "",
      birthDate: "",
      gender: "",
      phoneNumber: "",
      email: "",
      address: "",
      shortDoctorInfo: "",
      doctorDetailInfo: "",
    },
  });
  const [imagePreview, setImagePreview] = useState(existingUser?.image || null);
  const [imageFile, setImageFile] = useState(null);
  const [autoIds, setAutoIds] = useState({
    userId: existingUser?.userId || "",
    doctorId: existingUser?.doctorId || "",
  });
  const [fetchStatus, setFetchStatus] = useState({
    isLoading: false,
    isError: false,
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const imageInputRef = useRef(null);

  const generateNewId = () => {
    // Generate new IDs only for create mode
    const latestUserId = existingUser?.userId || "USR001";
    const newUserId = `USR${String(
      parseInt(latestUserId.slice(3)) + 1
    ).padStart(3, "0")}`;

    if (roleConfig.roleCode === "R002") {
      const latestDoctorId = existingUser?.doctorId || "DR001";
      const newDoctorId = `DR${String(
        parseInt(latestDoctorId.slice(2)) + 1
      ).padStart(3, "0")}`;
      setAutoIds({ userId: newUserId, doctorId: newDoctorId });
    } else {
      setAutoIds({ userId: newUserId, doctorId: "" });
    }
  };

  // Handle ID generation and data population
  useEffect(() => {
    if (isEditMode && existingUser) {
      setAutoIds({
        userId: existingUser.userId,
        doctorId: existingUser.doctorId || "",
      });
      return;
    } else {
      generateNewId();
    }
  }, [roleConfig, existingUser]);

  // Reset form when switching between users
  useEffect(() => {
    if (existingUser) {
      reset(existingUser);
      setImagePreview(existingUser.image || null);
    } else {
      reset({});
      setImagePreview(null);
    }
  }, [existingUser, reset]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file)); // For preview
      setImageFile(file); // Store the actual file object
    }
  };

  const handleImageRemove = (e) => {
    URL.revokeObjectURL(imagePreview);
    setImagePreview("");
    setImageFile(null);
    // Reset the input field
    if (imageInputRef.current) {
      imageInputRef.current.value = "";
    }
  };

  const onSubmit = async (data) => {
    try {
      const formData = {
        ...data,
        // Merge existing IDs for update or generated IDs for create
        ...autoIds,
        // For image updates, handle file upload logic here
        image: imageFile,
        role: JSON.stringify(roleConfig),
      };

      console.log(formData);
      const formDataSubmit = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        formDataSubmit.append(key, value);
      });

      if (!isEditMode) {
        setFetchStatus({
          isLoading: true,
          isError: true,
        });
        const result = await createNewDoctor(formDataSubmit);
        if (result.status === 200) {
          toast.success("Create user successfully!");
          setFetchStatus({
            isLoading: false,
            isError: false,
          });
        } else {
          toast.error("Create user failed!");
          setFetchStatus({
            isLoading: false,
            isError: true,
          });
        }
      } else {
        setFetchStatus({
          isLoading: true,
          isError: true,
        });
        const result = await updateDoctor(formDataSubmit);
        if (result.status === 200) {
          toast.success("Update user successfully!");
          setFetchStatus({
            isLoading: false,
            isError: false,
          });
        } else {
          toast.error("Update user failed!");
          setFetchStatus({
            isLoading: false,
            isError: true,
          });
        }
      }
      dispatch(getAllDataBySlug("doctors"));
      navigate("/admin/users/doctors/list", { replace: true });
    } catch (error) {
      setFetchStatus({
        isLoading: false,
        isError: true,
      });
      console.log(error);
    }
  };

  if (fetchStatus.isLoading) {
    return (
      <div className="text-center my-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-2">Xin vui lòng chờ đợi trong giây lát...</p>
      </div>
    );
  }

  return (
    <Container fluid className="container">
      <div className="formCard">
        <h2 className="mb-4 text-center formLabel" style={{ color: "#6f42c1" }}>
          {isEditMode ? "Update" : "Create"} {roleConfig.roleLabel}
        </h2>

        <Row className="mb-4">
          <Col md={6}>
            <div className="d-flex align-items-center gap-2">
              <span className="form-label">User ID:</span>
              <div className="autoId">{autoIds.userId}</div>
            </div>
          </Col>
          {roleConfig.roleCode === "R003" && (
            <Col md={6}>
              <div className="d-flex align-items-center gap-2">
                <span className="form-label">Patient ID:</span>
                <div className="autoId">{autoIds.patientId}</div>
              </div>
            </Col>
          )}
          {roleConfig.roleCode === "R002" && (
            <Col md={6}>
              <div className="d-flex align-items-center gap-2">
                <span className="form-label">Doctor ID:</span>
                <div className="autoId">{autoIds.doctorId}</div>
              </div>
            </Col>
          )}
        </Row>

        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row className="g-4 mb-4">
            <Col md={6}>
              <Form.Group>
                <Form.Label className="required">Full Name</Form.Label>
                <Form.Control
                  size="lg"
                  isInvalid={!!errors.fullName}
                  {...register("fullName", { required: true })}
                  placeholder="John Doe"
                  className="py-2"
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group>
                <Form.Label className="required">Birthdate</Form.Label>
                <Form.Control
                  type="date"
                  size="lg"
                  isInvalid={!!errors.birthDate}
                  {...register("birthDate", { required: true })}
                  className="py-2"
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group>
                <Form.Label className="required">Gender</Form.Label>
                <Form.Select
                  size="lg"
                  isInvalid={!!errors.gender}
                  {...register("gender", { required: true })}
                  className="py-2"
                  placeholder="-- Chọn giới tính --"
                >
                  <option value="Nam">Nam</option>
                  <option value="Nữ">Nữ</option>
                </Form.Select>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group>
                <Form.Label className="required">Phone Number</Form.Label>
                <Form.Control
                  size="lg"
                  isInvalid={!!errors.phoneNumber}
                  {...register("phoneNumber", {
                    required: true,
                    pattern: /^0\d{9}$/,
                  })}
                  placeholder="0123456789"
                  className="py-2"
                />
                {errors.phoneNumber && (
                  <Form.Text className="text-danger">
                    Must be 10 digits starting with 0
                  </Form.Text>
                )}
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group>
                <Form.Label className="required">Email</Form.Label>
                <Form.Control
                  type="email"
                  size="lg"
                  isInvalid={!!errors.email}
                  {...register("email", {
                    required: true,
                    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  })}
                  placeholder="example@mail.com"
                  className="py-2"
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group>
                <Form.Label className="required">Address</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={2}
                  size="lg"
                  isInvalid={!!errors.address}
                  {...register("address", { required: true })}
                  className="py-2"
                />
              </Form.Group>
            </Col>
          </Row>

          {/* Image Upload Section */}
          {roleConfig.roleCode === "R002" && (
            <Row className="mb-4">
              <Col md={6}>
                <Form.Group controlId="image">
                  <Form.Label>User Image</Form.Label>
                  <div className="upload-button">
                    <Form.Control
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      hidden
                      id="image-upload"
                    />
                    <label
                      htmlFor="image-upload"
                      className="btn btn-outline-primary w-100"
                    >
                      <Upload className="me-2" />
                      Upload Image
                    </label>
                  </div>
                </Form.Group>
              </Col>
              <Col
                md={6}
                className="d-flex justify-content-center align-items-center"
              >
                {imagePreview ? (
                  <div className="image-preview-container">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="img-preview"
                    />
                    <Button
                      variant="danger"
                      size="sm"
                      className="remove-image-btn"
                      onClick={handleImageRemove}
                    >
                      <Trash />
                    </Button>
                  </div>
                ) : (
                  <div className="image-placeholder">Image Preview</div>
                )}
              </Col>
            </Row>
          )}

          {/* Doctor Information Section */}
          <Row className="mb-3">
            <Col md={12}>
              <Form.Group>
                <Form.Label className="required">
                  Short Doctor Information
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  {...register("shortDoctorInfo", {
                    required: "Short description is required",
                    minLength: {
                      value: 10,
                      message: "Minimum 10 characters required",
                    },
                  })}
                  isInvalid={!!errors.shortDoctorInfo}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.shortDoctorInfo?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          {/* Doctor Detail Information Section */}
          <Row className="mb-3">
            <Col md={12}>
              <Form.Group>
                <Form.Label className="required">
                  Doctor Detail Information
                </Form.Label>
                <Row>
                  <Col md={6}>
                    <Form.Control
                      as="textarea"
                      rows={6}
                      {...register("doctorDetailInfo", {
                        required: "Detailed description is required",
                        minLength: {
                          value: 10,
                          message: "Minimum 10 characters required",
                        },
                      })}
                      isInvalid={!!errors.doctorDetailInfo}
                      placeholder="Write markdown here..."
                      style={{ height: "300px" }}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.doctorDetailInfo?.message}
                    </Form.Control.Feedback>
                  </Col>
                  <Col md={6}>
                    <div className="markdown-preview">
                      <ReactMarkdown>
                        {watch("doctorDetailInfo")}
                      </ReactMarkdown>
                    </div>
                  </Col>
                </Row>
              </Form.Group>
            </Col>
          </Row>

          <div className="d-grid">
            <Button
              variant="primary"
              type="submit"
              size="lg"
              style={{
                backgroundColor: "#6f42c1",
                borderColor: "#6f42c1",
                fontWeight: 500,
                fontSize: "1.1rem",
              }}
            >
              {isEditMode ? "Update" : "Create"} {roleConfig.roleLabel}
            </Button>
          </div>
        </Form>
      </div>
    </Container>
  );
};

export default UserForm;
