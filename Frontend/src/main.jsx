// eslint-disable-next-line no-unused-vars
import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { store } from "./redux/store.js";
import { Provider } from "react-redux";
import App from "./App.jsx";
import { path, adminPath } from "./utils/constants.js";
import MainPage from "./components/patients/pages/services/main-page/MainPage.jsx";
import ServiceAtHomePage from "./components/patients/pages/services/at-home/ServiceAtHomePage.jsx";
import ServiceAtClinicPage from "./components/patients/pages/services/at-clinic/ServiceAtClinicPage.jsx";
import ServiceLivingHealthyPage from "./components/patients/pages/services/living-healthy/ServiceLivingHealthyPage.jsx";
import SeeMorePage from "./components/patients/pages/see-more-page/list-base/SeeMorePage.jsx";
import MedicalServiceRouter from "./components/routes/medical-service-router/MedicalServiceRouter.jsx";
import DashboardPage from "./components/admin/pages/dashboard-page/DashboardPage.jsx";
import MainContent from "./components/admin/pages/main-content/MainContent.jsx";
import HealthFacilityRoute from "./components/routes/health-facility-route/HealthFacilityRoute.jsx";

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
        path: path.MEDICAL_SERVICE.MEDICAL_SPECIALTY_HEALTH_CHECK,
        element: <MedicalServiceRouter />,
      },
      {
        path: path.HEALTH_FACILITY.BASE,
        element: <HealthFacilityRoute />,
      },
      {
        path: "/danh-sach/:mainSlug/:subSlug?",
        element: <SeeMorePage />,
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
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
  // </StrictMode>
);
