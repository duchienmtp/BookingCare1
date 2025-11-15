import React, { useState, useEffect, useRef } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Upload, Trash } from "react-bootstrap-icons";
import { Spinner } from "react-bootstrap";
import ReactMarkdown from "react-markdown";
import "./ClinicForm.scss";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createNewClinic, getAllDataBySlug, updateClinic } from "../../../services/admin/SiteServices";

const ClinicForm = ({ isEditMode, existingData, latestClinic }) => {
  const { register, handleSubmit, watch, setValue } = useForm({
    defaultValues: {
      id: "",
      fullName: "",
      shortName: "",
      address: "",
      detailInfo: "",
      image: "",
      branches: [],
    },
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [branchForms, setBranchForms] = useState([]);
  const [availableBranchIds, setAvailableBranchIds] = useState([]);
  const [imagePreview, setImagePreview] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [fetchStatus, setFetchStatus] = useState({
    isLoading: false,
    isError: false,
  });

  const imageInputRef = useRef(null);

  const generateNewId = () => {
    const lastNumber = latestClinic?.id
      ? parseInt(latestClinic.id.slice(3))
      : 0;
    const newId = `CLN${String(lastNumber + 1).padStart(3, "0")}`;
    return newId;
  }

  // Load existing data for edit mode
  useEffect(() => {
    if (isEditMode && existingData) {
      Object.keys(existingData).forEach((key) => {
        setValue(key, existingData[key]);
      });
      setImagePreview(existingData.image);
      setBranchForms(existingData.branches.map((branch) => ({ id: branch.id, name: branch.name, address: branch.address })));
      setValue("branches", existingData.branches || []);
    } else {
      setValue("id", generateNewId());
      addBranchForm("Cơ sở chính");
    }
  }, [isEditMode, existingData, setValue]);

  // Handle image preview
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

  // Branch form management
  const addBranchForm = (name = "", address = "") => {
    const clinicId = watch("id");
    let newBranchId;

    if (availableBranchIds.length > 0) {
      // Reuse a removed branch ID
      newBranchId = availableBranchIds.pop();
    } else {
      // Generate a new branch ID
      const branchNumber = branchForms.length + 1;
      newBranchId = `${clinicId}_BR${String(branchNumber).padStart(3, "0")}`;
    }

    const newBranch = { id: newBranchId, name: name, address: address };

    // Update both the local state and form state
    setBranchForms([...branchForms, newBranch]);
    const currentBranches = watch("branches") || [];
    setValue("branches", [...currentBranches, newBranch]);
  };

  const removeBranchForm = (index) => {
    if (branchForms.length === 1) {
      toast.error("Each clinic must have at least one branch");
      return;
    }
    const updatedForms = [...branchForms];
    const removedBranch = updatedForms.splice(index, 1)[0];
    setBranchForms(updatedForms);

    // Update the form's branches array
    const currentBranches = watch("branches") || [];
    currentBranches.splice(index, 1);
    setValue("branches", [...currentBranches]);

    // Add the removed branch ID to the available IDs
    setAvailableBranchIds([...availableBranchIds, removedBranch.id]);

  };

  // Submit handler
  const onSubmit = async (data) => {
    try {
      // Process data here
      const formData = {
        ...data,
        image: imageFile,
        branches: JSON.stringify(data.branches),
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
        const result = await createNewClinic(formDataSubmit);
        if (result.status === 200) {
          toast.success("Create clinic successfully!");
          setFetchStatus({
            isLoading: false,
            isError: false,
          });
        } else {
          toast.error("Create clinic failed!");
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
        const result = await updateClinic(formDataSubmit);
        if (result.status === 200) {
          toast.success("Update clinic successfully!");
          setFetchStatus({
            isLoading: false,
            isError: false,
          });
        } else {
          toast.error("Update clinic failed!");
          setFetchStatus({
            isLoading: false,
            isError: true,
          });
        }
      }
      dispatch(getAllDataBySlug("clinics"));
      navigate("/admin/clinics/list", { replace: true });
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
    <Form onSubmit={handleSubmit(onSubmit)} className="clinic-form">
      {/* ID Field */}
      <Form.Group className="mb-4">
        <Form.Label className="text-purple">Clinic ID</Form.Label>
        <Form.Control {...register("id")} readOnly className="id-field" />
      </Form.Group>

      {/* Main Clinic Info */}
      <Row className="g-4 mb-4">
        <Col md={6}>
          <Form.Group>
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              {...register("fullName", { required: true })}
              defaultValue={existingData?.fullName}
            />
          </Form.Group>
        </Col>

        <Col md={6}>
          <Form.Group>
            <Form.Label>Short Name</Form.Label>
            <Form.Control
              {...register("shortName", { required: true })}
              defaultValue={existingData?.shortName}
            />
          </Form.Group>
        </Col>
      </Row>

      <Row className="g-4 mb-4">
        <Col>
          <Form.Group>
            <Form.Label>Address</Form.Label>
            <Form.Control
              {...register("address", { required: true })}
              defaultValue={existingData?.address}
            />
          </Form.Group>
        </Col>
      </Row>

      {/* Image Upload */}
      <Row className="mb-4">
        <Col md={6}>
          <Form.Group controlId="image">
            <Form.Label>Clinic Image</Form.Label>
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

      {/* Markdown Editor */}
      <div className="markdown-editor mb-4">
        <Row>
          <Col md={12}>
            <Form.Group>
              <Form.Label className="required">
                Clinic Detail Information
              </Form.Label>
              <Row>
                <Col md={6}>
                  <Form.Control
                    as="textarea"
                    rows={6}
                    {...register("detailInfo", {
                      required: "Detail information is required",
                      minLength: {
                        value: 10,
                        message: "Minimum 10 characters required",
                      },
                    })}
                    placeholder="Write markdown here..."
                    style={{ height: "300px" }}
                  />
                </Col>
                <Col md={6}>
                  <div className="markdown-preview">
                    <ReactMarkdown>
                      {watch("detailInfo")}
                    </ReactMarkdown>
                  </div>
                </Col>
              </Row>
            </Form.Group>
          </Col>
        </Row>
      </div>

      {/* Branches Section */}
      <div className="branches-section mb-4">
        <h5 className="text-purple mb-3">Clinic Branches</h5>
        {branchForms.map((branch, index) => (
          <div key={index} className="branch-form mb-3 p-3 rounded">
            <Row className="g-3 align-items-center">
              <Col md={4}>
                <Form.Control
                  {...register(`branches.${index}.id`)}
                  defaultValue={branch.id}
                  value={branch.id}
                  readOnly
                  className="branch-id"
                />
              </Col>
              <Col md={3}>
                <Form.Control
                  placeholder="Branch Name"
                  {...register(`branches.${index}.name`)}
                />
              </Col>
              <Col md={4}>
                <Form.Control
                  placeholder="Branch Address"
                  {...register(`branches.${index}.address`)}
                />
              </Col>
              <Col md={1}>
                {index === branchForms.length - 1 && (
                  <Button
                    variant="danger"
                    onClick={() => removeBranchForm(index)}
                    className="remove-btn"
                  >
                    ×
                  </Button>
                )}
              </Col>
            </Row>
          </div>
        ))}
        <Button
          variant="outline-purple"
          onClick={addBranchForm}
          className="add-branch-btn"
        >
          Add New Branch
        </Button>
      </div>

      {/* Submit Button */}
      <div className="d-grid">
        <Button id="submit-button" type="submit" variant="purple" size="lg">
          {existingData ? "Update Clinic" : "Create Clinic"}
        </Button>
      </div>
    </Form>
  );
};

export default ClinicForm;
