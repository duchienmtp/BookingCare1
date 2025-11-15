import { useEffect, useState, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { Upload, Trash } from "react-bootstrap-icons";
import { Spinner } from "react-bootstrap";
import ReactMarkdown from "react-markdown";
import { useParams } from "react-router-dom";
import "./ServiceForm.scss";
import RelationshipSection from "../relationship-section/RelationshipSection";
import {
  createNewSpecificMedicalService,
  getAllDataBySlug,
  getAllMedicalServices,
  getAllUndeployPackages,
  updateSpecificMedicalService,
} from "../../../services/admin/SiteServices";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const ServiceForm = ({ isEditMode, existingData }) => {
  const { slug } = useParams();
  const [imagePreview, setImagePreview] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [selectedMedicalServices, setSelectedMedicalServices] = useState([]);
  const [selectedUndeployPackages, setSelectedUndeployPackages] = useState([]);
  const [listDataOptions, setListDataOptions] = useState({
    medicalServicesOptions: [],
    undeployPackagesOptions: [],
  });
  const [fetchStatus, setFetchStatus] = useState({
    isLoading: false,
    isError: false,
  });

  const imageInputRef = useRef(null);

  const {
    control,
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      id: "",
      name: "",
      description: "",
    },
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setFetchStatus({ isLoading: true, isError: false });
        const [medicalServices, undeployPackages] = await Promise.all([
          getAllMedicalServices(),
          getAllUndeployPackages(),
        ]);
        if (medicalServices.data) {
          const options = medicalServices.data.map((item) => ({
            value: item.id,
            label: item.name,
          }));
          setListDataOptions((prev) => ({
            ...prev,
            medicalServicesOptions: options,
          }));
        }

        if (undeployPackages.data) {
          let options = undeployPackages.data.map((item) => ({
            value: item.packageId,
            label: item.packageName,
          }));

          if (
            existingData.deployedPackages &&
            existingData.deployedPackages.length > 0
          ) {
            options = options.concat(existingData.deployedPackages);
          }
          setListDataOptions((prev) => ({
            ...prev,
            undeployPackagesOptions: options,
          }));
        }
        setFetchStatus({ isLoading: false, isError: false });
      } catch (error) {
        console.error("Error fetching data:", error);
        setFetchStatus({ isLoading: false, isError: true });
      }

    };

    fetchData();
  }, []);

  // Generate ID - in real app, fetch latest ID from API
  const generateNewId = () => {
    console.log("existingData: ", existingData);
    const latestId = existingData?.id || "SMS001";
    const newId = `SMS${String(parseInt(latestId.slice(3)) + 1).padStart(
      3,
      "0"
    )}`;
    return newId;
  };

  // Load existing data for edit mode
  useEffect(() => {
    if (isEditMode && existingData) {
      setValue("id", existingData.id);
      setValue("name", existingData.name);
      setValue("description", existingData.description);
      setImagePreview(existingData.image);
      setSelectedMedicalServices(existingData.medicalServices);
      setSelectedUndeployPackages(existingData.deployedPackages);
    } else {
      setValue("id", generateNewId());
    }
  }, [isEditMode, existingData, setValue]);

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

  const handleAddMedicalService = (selected) => {
    if (
      selected &&
      !selectedMedicalServices.find((s) => s.value === selected.value)
    ) {
      setSelectedMedicalServices([...selectedMedicalServices, selected]);
    }
  };

  const handleAddUndeployPackage = (selected) => {
    if (
      selected &&
      !selectedUndeployPackages.find((d) => d.value === selected.value)
    ) {
      setSelectedUndeployPackages([...selectedUndeployPackages, selected]);
    }
  };

  const onSubmit = async (data) => {
    try {
      const formData = {
        ...data,
        medicalServices: JSON.stringify(selectedMedicalServices),
        deployedPackages: JSON.stringify(selectedUndeployPackages),
        image: imageFile,
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
        const result = await createNewSpecificMedicalService(formDataSubmit);
        if (result.status === 200) {
          toast.success("Create service successfully!");
          setFetchStatus({
            isLoading: false,
            isError: false,
          });
        } else {
          toast.error("Create service failed!");
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
        const result = await updateSpecificMedicalService(formDataSubmit);
        if (result.status === 200) {
          toast.success("Update service successfully!");
          setFetchStatus({
            isLoading: false,
            isError: false,
          });
        } else {
          toast.error("Update service failed!");
          setFetchStatus({
            isLoading: false,
            isError: true,
          });
        }
      }
      dispatch(getAllDataBySlug("specific-medical-services"));
      navigate("/admin/eCommerce/specific-medical-services/list", { replace: true });
    } catch (error) {
      setFetchStatus({
        isLoading: false,
        isError: true,
      });
      console.error("Error submitting form:", error);
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
    <Container fluid className="management-container">
      <div className="management-form">
        <h2 className="management-header">
          {isEditMode ? "Update" : "Create"} Specific Medical Service
        </h2>

        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label className="required">Service ID</Form.Label>
                <Form.Control
                  plaintext
                  readOnly
                  {...register("id")}
                  className="id-field"
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group>
                <Form.Label className="required">Service Name</Form.Label>
                <Form.Control
                  {...register("name", { required: true })}
                  isInvalid={!!errors.name}
                  placeholder="Enter service name"
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="g-4 my-4">
            <Col md={12}>
              <Row>
                <Col md={6}>
                  <Form.Group controlId="image">
                    <Form.Label>Service Image</Form.Label>
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
            </Col>

            <Col md={12}>
              <RelationshipSection
                title="Related Medical Services"
                options={listDataOptions.medicalServicesOptions}
                selectedItems={selectedMedicalServices}
                onAddItem={handleAddMedicalService}
                onRemoveItem={(value) =>
                  setSelectedMedicalServices(
                    selectedMedicalServices.filter((s) => s.value !== value)
                  )
                }
              />
            </Col>

            <Col md={12}>
              <RelationshipSection
                title="Deployed Packages"
                options={listDataOptions.undeployPackagesOptions}
                selectedItems={selectedUndeployPackages}
                onAddItem={handleAddUndeployPackage}
                onRemoveItem={(value) =>
                  setSelectedUndeployPackages(
                    selectedUndeployPackages.filter((d) => d.value !== value)
                  )
                }
              />
            </Col>

            <Col md={12}>
              <Form.Group>
                <Form.Label>Description</Form.Label>
                <Row>
                  <Col md={6}>
                    <Form.Control
                      as="textarea"
                      rows={6}
                      {...register("description")}
                      placeholder="Write markdown here..."
                      style={{ height: "500px" }}
                    />
                  </Col>
                  <Col md={6}>
                    <div className="markdown-preview">
                      <ReactMarkdown>{watch("description")}</ReactMarkdown>
                    </div>
                  </Col>
                </Row>
              </Form.Group>
            </Col>
          </Row>

          <div className="d-grid">
            <Button type="submit" variant="primary" size="lg">
              {isEditMode ? "Update" : "Create"}
            </Button>
          </div>
        </Form>
      </div>
    </Container>
  );
};

export default ServiceForm;
