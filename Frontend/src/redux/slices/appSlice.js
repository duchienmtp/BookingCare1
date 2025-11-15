import { createSlice } from "@reduxjs/toolkit";
import { storeDoctorBookingPackage } from "../../services/admin/SiteServices";

const initialState = {
  doctorBookingPackages: {},
  isLoading: false,
  isError: false,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(storeDoctorBookingPackage.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(storeDoctorBookingPackage.fulfilled, (state, action) => {
        state.doctorBookingPackages = action.payload;
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(storeDoctorBookingPackage.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const selectDoctorBookingPackages = (state) =>
  state.app.doctorBookingPackages;

export default appSlice.reducer;
