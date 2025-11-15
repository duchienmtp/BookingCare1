import { useEffect, useState, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import ReactMarkdown from "react-markdown";
import Select from "react-select";
import { useParams } from "react-router-dom";
import { Upload, Trash, Plus, X } from "react-bootstrap-icons";
import { Spinner } from "react-bootstrap";
import RelationshipSection from "../relationship-section/RelationshipSection";
import "./PackageForm.scss";
import { createNewHealthCheckPackage, getAllDataBySlug, getClinicBranchesByClinicId, updateHealthCheckPackage } from "../../../services/admin/SiteServices";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const PackageForm = ({ isEditMode, existingData, listDataOptions }) => {
  const { slug } = useParams();
  const [imagePreview, setImagePreview] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [hasSpecificDoctor, setHasSpecificDoctor] = useState(false);
  const [isSpecialty, setIsSpecialty] = useState(true);
  const [selectedSpecialties, setSelectedSpecialties] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [selectedPackageType, setSelectedPackageType] = useState(null);
  const [selectedClinic, setSelectedClinic] = useState(null);
  const [branchesOptions, setBranchesOptions] = useState([]);
  const [selectedBranches, setSelectedBranches] = useState([]);
  const [packagePrices, setPackagePrices] = useState([{ formId: Date.now(), realId: "", name: "", price: "", description: "" }])
  const [priceFormSelected, setPriceFormSelected] = useState([]);
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
      packageId: "",
      packageName: "",
      managingDoctorId: "",
      slug: "",
      packageDetailInfo: "",
      packageType: "",
      shortPackageInfo: "",
    },
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Generate Package ID
  const generateNewId = () => {
    console.log("existingData: ", existingData);
    const latestId = existingData?.packageId || "HCPKG001"; // Replace with API call
    const newId = `HCPKG${String(parseInt(latestId.slice(5)) + 1).padStart(
      3,
      "0"
    )}`;
    return newId;
  };

  // Package Price Management Functions
  const addNewPrice = () => {
    setPackagePrices([...packagePrices, { formId: Date.now(), realId: "", name: "", price: "", description: "" }])
  }

  const removePrice = (id) => {
    if (packagePrices.length > 1) {
      setPackagePrices(packagePrices.filter((price) => price.formId !== id))
      setPriceFormSelected(priceFormSelected.filter((price) => price.id !== id))
    }
  }

  const updatePrice = (id, field, value) => {
    setPackagePrices(packagePrices.map((price) => (price.formId === id ? { ...price, [field]: value } : price)))
  }

  const selectBookingPrice = (id, selectedPrice) => {
    if (packagePrices.findIndex((price) => price.realId === selectedPrice.id) !== -1) {
      toast.error("This price option has been selected!");
      return;
    }
    setPackagePrices(
      packagePrices.map((price) =>
        price.formId === id
          ? {
            formId: id,
            realId: selectedPrice.id || "",
            name: selectedPrice.name,
            description: selectedPrice.description,
          }
          : price,
      ),
    )
    setPriceFormSelected((prev) => [...prev, { id }])
  }

  // Load existing data for edit mode
  useEffect(() => {
    if (isEditMode && existingData) {
      Object.keys(existingData).forEach((key) => {
        setValue(key, existingData[key]);
      });

      if (
        existingData.managingDoctorId &&
        listDataOptions.doctorsOptions.length > 0
      ) {
        const doctor = listDataOptions.doctorsOptions.find(
          (doc) => doc.value === existingData.managingDoctorId
        );
        if (doctor) {
          setValue("managingDoctorName", doctor.fullName);
        }
      }

      setImagePreview(existingData.image);
      setHasSpecificDoctor(!!existingData.managingDoctorId);
      setIsSpecialty(!!existingData.specialties);
      setSelectedSpecialties(existingData.specialties || []);
      setSelectedServices(existingData.services || []);
      setSelectedClinic(existingData.clinic);
      setSelectedBranches(existingData.branches || []);
      setSelectedPackageType(existingData.packageType);

      // Load existing prices if available
      if (existingData.packagePrices && existingData.packagePrices.length > 0) {
        setPackagePrices(
          existingData.packagePrices.map((price, index) => ({
            formId: Date.now() + index,
            realId: price.id || "",
            name: price.name,
            description: price.description,
            price: price.price,
          })),
        )
        setPriceFormSelected(existingData.packagePrices.map((price) => { return { id: price.id } }))
      }
    } else {
      setValue("packageId", generateNewId());
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

  const onSubmit = async (data) => {
    try {
      const formattedPackagePrices = packagePrices.map((price) => ({
        id: price.realId,
        name: price.name,
        description: price.description,
        price: price.price,
      }));
      const formData = {
        ...data,
        isManagedByDoctor: hasSpecificDoctor,
        image: imageFile,
        isSpecialty,
        specialties: isSpecialty ? JSON.stringify(selectedSpecialties) : "",
        services: !isSpecialty ? JSON.stringify(selectedServices) : "",
        packageType: JSON.stringify(selectedPackageType),
        clinic: JSON.stringify(selectedClinic),
        branches: JSON.stringify(selectedBranches),
        packagePrices: JSON.stringify(formattedPackagePrices),
      };
      const formDataSubmit = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        formDataSubmit.append(key, value);
      });

      if (!isEditMode) {
        setFetchStatus({
          isLoading: true,
          isError: true,
        });
        const result = await createNewHealthCheckPackage(formDataSubmit);
        if (result.status === 200) {
          toast.success("Create package successfully!");
          setFetchStatus({
            isLoading: false,
            isError: false,
          });
        } else {
          toast.error("Create package failed!");
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
        const result = await updateHealthCheckPackage(formDataSubmit);
        if (result.status === 200) {
          toast.success("Update package successfully!");
          setFetchStatus({
            isLoading: false,
            isError: false,
          });
        } else {
          toast.error("Update package failed!");
          setFetchStatus({
            isLoading: false,
            isError: true,
          });
        }
      }
      dispatch(getAllDataBySlug("packages"));
      navigate("/admin/eCommerce/packages/list", { replace: true });
    } catch (error) {
      setFetchStatus({
        isLoading: false,
        isError: true,
      });
      console.error("Error submitting form:", error);
    }
  };

  const fetchClinicBranches = async (clinicId) => {
    try {
      const clinicBranches = await getClinicBranchesByClinicId(clinicId);
      if (clinicBranches.data) {
        setBranchesOptions(
          clinicBranches.data.map((item) => {
            return {
              value: item.clinicBranchId,
              label: `${item.clinics.fullname} - ${item.clinicBranchName}`,
            };
          })
        );
      }
    } catch (err) {
      console.error(err);
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
          {isEditMode ? "Update" : "Create"} Medical Health Check Package
        </h2>
        <Form onSubmit={handleSubmit(onSubmit)}>
          {/* Basic Information Section */}
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label className="required">Package ID</Form.Label>
                <Form.Control
                  plaintext
                  readOnly
                  {...register("packageId")}
                  className="id-field"
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label className="required">Package Name</Form.Label>
                <Form.Control
                  {...register("packageName", {
                    required: "Package name is required",
                  })}
                  isInvalid={!!errors.packageName}
                  placeholder="Enter package name"
                  style={{ height: "38px" }}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.packageName?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          {/* Doctor Management Section */}
          <Row className="mb-3">
            <Col md={12}>
              <Form.Check
                type="switch"
                id="doctor-switch"
                label="Package has specific managing doctor"
                checked={hasSpecificDoctor}
                onChange={(e) => setHasSpecificDoctor(e.target.checked)}
                className="mb-3"
              />
            </Col>
            {hasSpecificDoctor && (
              <>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Managing Doctor</Form.Label>
                    <Controller
                      name="managingDoctorId"
                      control={control}
                      rules={{ required: hasSpecificDoctor }}
                      render={({ field }) => (
                        <Select
                          {...field}
                          value={
                            listDataOptions.doctorsOptions.find(
                              (option) => option.value === field.value
                            ) || null
                          }
                          options={listDataOptions.doctorsOptions}
                          onChange={(selected) => {
                            console.log(selected);
                            field.onChange(selected ? selected.value : "");
                            setValue(
                              "managingDoctorName",
                              selected.fullName || ""
                            );
                          }}
                          placeholder="Select managing doctor..."
                          isDisabled={!listDataOptions.doctorsOptions.length}
                        />
                      )}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Doctor Name</Form.Label>
                    <Form.Control
                      {...register("managingDoctorName")}
                      disabled
                      placeholder="Doctor name will appear here"
                      style={{ height: "38px" }}
                    />
                  </Form.Group>
                </Col>
              </>
            )}
          </Row>

          {/* Image Upload Section */}
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="image">
                <Form.Label>Package Image</Form.Label>
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

          {/* Package Information Section */}
          <Row className="mb-3">
            <Col md={12}>
              <Form.Group>
                <Form.Label className="required">
                  Short Package Information
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  {...register("shortPackageInfo", {
                    required: "Short description is required",
                    minLength: {
                      value: 10,
                      message: "Minimum 10 characters required",
                    },
                  })}
                  isInvalid={!!errors.shortPackageInfo}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.shortPackageInfo?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          {/* Package Detail Information Section */}
          <Row className="mb-3">
            <Col md={12}>
              <Form.Group>
                <Form.Label className="required">
                  Package Detail Information
                </Form.Label>
                <Row>
                  <Col md={6}>
                    <Form.Control
                      as="textarea"
                      rows={6}
                      {...register("packageDetailInfo", {
                        required: "Detailed description is required",
                        minLength: {
                          value: 10,
                          message: "Minimum 10 characters required",
                        },
                      })}
                      isInvalid={!!errors.packageDetailInfo}
                      placeholder="Write markdown here..."
                      style={{ height: "300px" }}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.packageDetailInfo?.message}
                    </Form.Control.Feedback>
                  </Col>
                  <Col md={6}>
                    <div className="markdown-preview">
                      <ReactMarkdown>
                        {watch("packageDetailInfo")}
                      </ReactMarkdown>
                    </div>
                  </Col>
                </Row>
              </Form.Group>
            </Col>
          </Row>

          {/* Association Section */}
          <Row className="mb-3">
            <Col md={12}>
              <Form.Check
                type="switch"
                id="association-switch"
                label={`Package belongs to ${isSpecialty ? "Specialties" : "Medical Services"
                  }`}
                checked={isSpecialty}
                onChange={(e) => setIsSpecialty(e.target.checked)}
                className="mb-3"
              />
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <RelationshipSection
                title={
                  isSpecialty
                    ? "Related Specialties"
                    : "Related Medical Services"
                }
                options={
                  isSpecialty
                    ? listDataOptions.specialtyOptions
                    : listDataOptions.serviceOptions
                }
                selectedItems={
                  isSpecialty ? selectedSpecialties : selectedServices
                }
                onAddItem={
                  isSpecialty
                    ? (item) =>
                      setSelectedSpecialties([...selectedSpecialties, item])
                    : (item) => setSelectedServices([...selectedServices, item])
                }
                onRemoveItem={
                  isSpecialty
                    ? (value) =>
                      setSelectedSpecialties(
                        selectedSpecialties.filter((s) => s.value !== value)
                      )
                    : (value) =>
                      setSelectedServices(
                        selectedServices.filter((s) => s.value !== value)
                      )
                }
              />
            </Col>
            <Col md={6}>
              <RelationshipSection
                title="Package Type"
                options={listDataOptions.packageTypeOptions}
                selectedItems={selectedPackageType ? [selectedPackageType] : []}
                onAddItem={(item) =>
                  setSelectedPackageType(item)
                }
                onRemoveItem={() =>
                  setSelectedPackageType(null)
                }
              />
            </Col>
          </Row>

          {/* Clinic Section */}
          <Row className="mb-3">
            <Col md={6}>
              <RelationshipSection
                title="Clinic Information"
                options={listDataOptions.clinicOptions}
                selectedItems={selectedClinic ? [selectedClinic] : []}
                onAddItem={async (item) => {
                  setSelectedClinic(item);
                  setSelectedBranches([]);
                  await fetchClinicBranches(item.value);
                }}
                onRemoveItem={() => {
                  setSelectedClinic(null);
                  setSelectedBranches([]);
                  setBranchesOptions([]);
                }}
              />
            </Col>
            {selectedClinic && (
              <Col md={6}>
                <RelationshipSection
                  title="Clinic Branches"
                  options={branchesOptions}
                  selectedItems={selectedBranches}
                  onAddItem={(item) =>
                    setSelectedBranches([...selectedBranches, item])
                  }
                  onRemoveItem={(value) =>
                    setSelectedBranches(
                      selectedBranches.filter((b) => b.value !== value)
                    )
                  }
                />
              </Col>
            )}
          </Row>

          {/* Package Price Section */}
          <Row className="mb-4">
            <Col md={12}>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="mb-0">Package Pricing</h5>
                <Button variant="outline-primary add-price-btn" onClick={addNewPrice}>
                  <Plus className="me-1" style={{ transform: "scale(1.2)" }} />
                  Add Price Option
                </Button>
              </div>

              {packagePrices.map((priceItem, index) => (
                <Card key={priceItem.formId} className="mb-3">
                  <Card.Header className="d-flex justify-content-between align-items-center py-2">
                    <span className="fw-bold">Price Option {index + 1}</span>
                    {packagePrices.length > 1 && (
                      <Button variant="outline-danger remove-price-btn" onClick={() => removePrice(priceItem.formId)}>
                        <X style={{ transform: "scale(1.5)" }} />
                      </Button>
                    )}
                  </Card.Header>
                  <Card.Body>
                    <Row className="mb-3">
                      <Col md={12}>
                        <Form.Label>Quick Select from Available Options</Form.Label>
                        <Form.Select
                          onChange={(e) => {
                            if (e.target.value) {
                              const selectedPrice = listDataOptions.bookingPriceOptions[Number.parseInt(e.target.value)]
                              selectBookingPrice(priceItem.formId, selectedPrice)
                            }
                          }}
                          value=""
                          disabled={!isEditMode ? 
                            (priceFormSelected.find((price) => price.id === priceItem.formId) ? true : false)
                          : (priceFormSelected.find((price) => price.id === priceItem.realId) ? true : false)}
                        >
                          <option value="">Select a predefined price option...</option>
                          {listDataOptions.bookingPriceOptions.map((option, idx) => (
                            <option key={idx} value={idx}>
                              {option.name} | {option.description.substring(0, 60)}...
                            </option>
                          ))}
                        </Form.Select>
                      </Col>
                    </Row>

                    <Row>
                      <Col md={4}>
                        <Form.Group>
                          <Form.Label className="required">Price Name</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="e.g., Standard Package"
                            value={priceItem.name}
                            onChange={(e) => updatePrice(priceItem.formId, "name", e.target.value)}
                            required
                            disabled={!isEditMode ? 
                              (priceFormSelected.find((price) => price.id === priceItem.formId) ? true : false)
                            : (priceFormSelected.find((price) => price.id === priceItem.realId) ? true : false)}
                          />
                        </Form.Group>
                      </Col>
                      <Col md={3}>
                        <Form.Group>
                          <Form.Label className="required">Price ($)</Form.Label>
                          <Form.Control
                            type="number"
                            placeholder="299"
                            value={priceItem.price}
                            onChange={(e) => updatePrice(priceItem.formId, "price", e.target.value)}
                            min="0"
                            step="0.01"
                            required
                          />
                        </Form.Group>
                      </Col>
                      <Col md={5}>
                        <Form.Group>
                          <Form.Label className="required">Description</Form.Label>
                          <Form.Control
                            as="textarea"
                            rows={2}
                            placeholder="Brief description of what's included in this price option"
                            value={priceItem.description}
                            onChange={(e) => updatePrice(priceItem.formId, "description", e.target.value)}
                            required
                            disabled={!isEditMode ? 
                              (priceFormSelected.find((price) => price.id === priceItem.formId) ? true : false)
                            : (priceFormSelected.find((price) => price.id === priceItem.realId) ? true : false)}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              ))}
            </Col>
          </Row>

          {/* Submit Button */}
          <div className="d-grid">
            <Button type="submit" variant="primary" size="lg">
              {isEditMode ? "Update" : "Create"} Package
            </Button>
          </div>
        </Form>
      </div>
    </Container>
  );
};

export default PackageForm;
