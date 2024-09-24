import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/axios/axios";

export const getAllCategories = async () => {
  return axios.get("/api/v1/admin/get-all-categories");
};

const getAllMedicalServices = async () => {
  return axios.get("/api/v1/admin/get-all-medical-services");
};

const getAllSpecialties = async () => {
  return axios.get("/api/v1/admin/get-all-specialties");
};

const getAllClinics = async () => {
  return axios.get("/api/v1/admin/get-all-clinics");
};

export const getAllDataBySlug = createAsyncThunk(
  "admin/getAllDataBySlug",
  async (slug, { rejectWithValue }) => {
    try {
      let response = {};
      switch (slug) {
        case "medical-services":
          response = await getAllMedicalServices();
          break;
        case "specialties":
          response = await getAllSpecialties();
          break;
        case "clinics":
          response = await getAllClinics();
          break;
        default:
          throw new Error("Invalid slug");
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
