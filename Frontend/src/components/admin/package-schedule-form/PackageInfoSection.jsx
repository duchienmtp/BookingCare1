import React, { useState } from 'react';
import { Card, Form, Row, Col, Spinner } from 'react-bootstrap';
import { Controller } from 'react-hook-form';
import Select from 'react-select';
import { BsTag } from 'react-icons/bs';
import "./PackageInfoSection.scss"

const PackageInfoSection = ({
    control,
    errors,
    loading,
    mode,
    packages,
}) => {
    const customSelectStyles = {
        control: (provided, state) => ({
            ...provided,
            borderColor: state.isFocused ? '#0d6efd' : '#dee2e6',
            boxShadow: state.isFocused ? '0 0 0 0.2rem rgba(13, 110, 253, 0.25)' : 'none',
            '&:hover': {
                borderColor: '#0d6efd'
            }
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected ? '#0d6efd' : state.isFocused ? '#f8f9fa' : 'white',
            color: state.isSelected ? 'white' : '#212529'
        })
    };

    const [chosenPackage, setChosenPackage] = useState(null);

    return (
        <Card className="package-info-card">
            <Card.Header className="package-info-header">
                <BsTag className="me-2" />
                Package Information
            </Card.Header>
            <Card.Body>
                {loading && (
                    <div className="loading-overlay">
                        <Spinner animation="border" variant="primary" />
                        <span className="ms-2">Loading package data...</span>
                    </div>
                )}

                <Row className="mb-3">
                    <Col md={12}>
                        <Form.Group >
                            <Form.Label className="form-label">
                                Health Check Package ID <span className="text-danger">*</span>
                            </Form.Label>
                            <Controller
                                name="packageId"
                                control={control}
                                rules={{ required: 'Package ID is required' }}
                                render={({ field }) => (
                                    <Select
                                        {...field}
                                        options={packages}
                                        styles={customSelectStyles}
                                        placeholder="Select a health check package..."
                                        isSearchable
                                        value={packages.find(option => option.value === field.value) || null}
                                        onChange={(option) => {
                                            field.onChange(option?.value || '');
                                            setChosenPackage(option);
                                        }}
                                        className={errors.packageId ? 'is-invalid' : ''}
                                    />
                                )}
                            />
                            {errors.packageId && (
                                <Form.Text className="text-danger">{errors.packageId.message}</Form.Text>
                            )}
                        </Form.Group>
                    </Col>
                </Row>

                <Row className="mb-3 mt-5">
                    <Col md={5}>
                        <div className="image-preview-container">
                            <img
                                src={chosenPackage?.packageImage}
                                alt="Preview"
                                className="img-preview"
                            />
                        </div>
                    </Col>
                    <Col md={7}>
                        <Row className='mb-3'>
                            <Col>
                                <Form.Group>
                                    <Form.Label className="form-label">Package Name</Form.Label>
                                    <Controller
                                        name="packageName"
                                        control={control}
                                        render={({ field }) => (
                                            <Form.Control
                                                {...field}
                                                type="text"
                                                placeholder="Package name"
                                                disabled={loading}
                                            />
                                        )}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className='mb-3'>
                            <Col>
                                <Form.Group>
                                    <Form.Label className="form-label">Package Type</Form.Label>
                                    <Controller
                                        name="packageType"
                                        control={control}
                                        render={({ field }) => (
                                            <Form.Control
                                                {...field}
                                                type="text"
                                                placeholder="Package type"
                                                disabled={loading}
                                            />
                                        )}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className='mb-3'>
                            <Col>
                                <Form.Group>
                                    <Form.Label className="form-label">Clinic</Form.Label>
                                    <Controller
                                        name="clinic"
                                        control={control}
                                        render={({ field }) => (
                                            <Form.Control
                                                {...field}
                                                type="text"
                                                placeholder="Clinic"
                                                disabled={loading}
                                            />
                                        )}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className='mb-3'>
                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Label className="form-label">
                                        Clinic Branches
                                    </Form.Label>
                                    <div className="d-flex flex-wrap gap-2">
                                        {chosenPackage?.branches?.map((branch, index) => (
                                            <div key={index} className="chip-item">
                                                <span>{branch}</span>
                                            </div>
                                        ))}
                                    </div>
                                </Form.Group>
                            </Col>
                        </Row>
                    </Col>
                </Row>




                {mode === 'update' && (
                    <div className="update-notice">
                        <div className="alert alert-info">
                            <small>
                                <strong>Note:</strong> Schedule changes will take effect starting next Monday.
                                Current week bookings will use the existing schedule.
                            </small>
                        </div>
                    </div>
                )}
            </Card.Body>
        </Card>
    );
};

export default PackageInfoSection;