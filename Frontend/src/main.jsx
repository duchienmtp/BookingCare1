// eslint-disable-next-line no-unused-vars
import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { store } from "./redux/store.js";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import App from "./App.jsx";
import { path, adminPath } from "./utils/constants.js";
import MainPage from "./components/patients/pages/services/main-page/MainPage.jsx";
import ServiceAtHomePage from "./components/patients/pages/services/at-home/ServiceAtHomePage.jsx";
import ServiceAtClinicPage from "./components/patients/pages/services/at-clinic/ServiceAtClinicPage.jsx";
import ServiceLivingHealthyPage from "./components/patients/pages/services/living-healthy/ServiceLivingHealthyPage.jsx";
import MedicalServiceRouter from "./components/routes/medical-service-router/MedicalServiceRouter.jsx";
import DashboardPage from "./components/admin/pages/dashboard-page/DashboardPage.jsx";
import MainContent from "./components/admin/pages/main-content/MainContent.jsx";
import HealthFacilityRoute from "./components/routes/health-facility-route/HealthFacilityRoute.jsx";
import SeeMorePageRouter from "./components/routes/see-more-page-router/SeeMorePageRouter.jsx";
import BookingCheckoutPage from "./components/patients/pages/booking-checkout-page/BookingCheckoutPage.jsx";
import UserInfoManagement from "./components/admin/pages/view-detail-page/view-detail-user/UserInfoManagement.jsx";
import ServicesInfoManagement from "./components/admin/pages/view-detail-page/view-detail-services/ServicesInfoManagement.jsx";
import AdminViewDetailECommerceRouter from "./components/routes/admin-view-detail-eCommerce-router/AdminViewDetailECommerceRouter.jsx";
import ClinicInfoManagement from "./components/admin/pages/view-detail-page/view-detail-clinic/ClinicInfoManagement.jsx";
import EditInfoPage from "./components/admin/pages/edit-info-page/EditInfoPage.jsx";

const router = createBrowserRouter([
  {
    path: path.HOME,
    element: <App />,
    children: [
      {
        path: path.HOME_SERVICE,
        element: <ServiceAtHomePage />,
      },
      {
        path: path.CLINIC_SERVICE,
        element: <ServiceAtClinicPage />,
      },
      {
        path: path.HEALTHY_SERVICE,
        element: <ServiceLivingHealthyPage />,
      },
      {
        path: path.MEDICAL_SERVICE.BASE,
        element: <MedicalServiceRouter />,
      },
      {
        path: path.MEDICAL_SERVICE.GENERAL_HEALTH_CHECK,
        element: <MedicalServiceRouter />,
      },
      {
        path: path.MEDICAL_SERVICE.MEDICAL_ONLINE_DIAGNOSTIC,
        element: <MedicalServiceRouter />,
      },
      {
        path: path.MEDICAL_SERVICE
          .MEDICAL_SPECIALTY_HEALTH_CHECK_PACKAGE_DETAIL_PAGE,
        element: <MedicalServiceRouter />,
      },
      {
        path: path.MEDICAL_SERVICE.MEDICAL_OPERATION_PACKAGE_DETAIL_PAGE,
        element: <MedicalServiceRouter />,
      },
      {
        path: path.MEDICAL_SERVICE
          .MEDICAL_GENERAL_HEALTH_CHECK_PACKAGE_DETAIL_PAGE,
        element: <MedicalServiceRouter />,
      },
      {
        path: path.MEDICAL_SERVICE.MEDICAL_EXAMINATION,
        element: <MedicalServiceRouter />,
      },
      {
        path: path.HEALTH_FACILITY.BASE,
        element: <HealthFacilityRoute />,
      },
      {
        path: path.MEDICAL_SERVICE.BOOKING_CHECKOUT_PAGE,
        element: <BookingCheckoutPage />,
      },
      {
        path: "/danh-sach/:mainSlug/:subSlug?",
        element: <SeeMorePageRouter />,
      },
      {
        path: "/",
        element: <MainPage />,
      },
    ],
  },
  {
    path: adminPath.ADMIN,
    element: <App />,
    children: [
      {
        path: adminPath.DASHBOARD,
        element: <DashboardPage />,
      },
      {
        path: "/admin/:slug1/:slug2?/:slug3",
        element: <MainContent />,
      },
      {
        path: "/admin/users/:role/view-detail/:userId",
        element: <UserInfoManagement />,
      },
      {
        path: "/admin/eCommerce/:serviceType/view-detail/:serviceId",
        element: <AdminViewDetailECommerceRouter />,
      },
      {
        path: "/admin/clinics/view-detail/:clinicId",
        element: <ClinicInfoManagement />,
      },
      {
        path: "/admin/:root/:role?/edit-info/:userId?",
        element: <EditInfoPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <Provider store={store}>
    <ToastContainer position="top-right" autoClose={3000} />
    <RouterProvider router={router} />
  </Provider>
  // </StrictMode>
);
