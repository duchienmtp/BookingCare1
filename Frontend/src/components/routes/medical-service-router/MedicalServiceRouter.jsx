import React from "react";
import { useParams, useLocation, matchPath } from "react-router-dom";
import { path } from "../../../utils/constants/constants";
import MedicalService from "../../patients/medical-service/MedicalService";
import MedicalServiceAdvertisement from "../../patients/medical-service/MedicalServiceAdvertisement";
import DiabetesPage from "../../patients/pages/medical-services/diabetes-page/DiabetesPage";
import HealthCheckTestPage from "../../patients/pages/medical-services/health-check-test/HealthCheckTestPage";
import MedicalServiceNearYou from "../../patients/pages/medical-services/medical-service-near-you-page/MedicalServiceNearYou";
import IndividualBookingPage from "../../patients/pages/medical-services/individual-booking-page/IndividualBookingPage";
import BookingList from "../../patients/pages/medical-services/booking-list/BookingList";

function MedicalServiceRouter() {
  const location = useLocation();
  const { slug, slug2 } = useParams();

  const isGeneralHealthCheck = matchPath(
    path.MEDICAL_SERVICE.GENERAL_HEALTH_CHECK,
    location.pathname
  );

  const isMedicalSpecialtyHealthCheck = matchPath(
    path.MEDICAL_SERVICE.MEDICAL_SPECIALTY_HEALTH_CHECK,
    location.pathname
  );

  const isBaseMedicalService = matchPath(
    path.MEDICAL_SERVICE.BASE,
    location.pathname
  );

  if (isBaseMedicalService) {
    const specialSlugs = [
      "xet-nghiem-y-hoc",
      "kham-tong-quat",
      "tieu-duong",
      "bai-test",
      "y-te-gan-ban",
    ];

    if (specialSlugs.includes(slug)) {
      if (slug === "tieu-duong") {
        return <DiabetesPage />;
      }

      if (slug === "bai-test") {
        return <HealthCheckTestPage />;
      }

      if (slug === "y-te-gan-ban") {
        return <MedicalServiceNearYou />;
      }

      return <MedicalServiceAdvertisement />;
    }

    return <MedicalService />;
  }

  const slugParts = slug.split("-");
  if (slugParts[slugParts.length - 1].includes("i")) {
    // i == individual
    return <IndividualBookingPage />;
  } else if (slugParts[slugParts.length - 1].includes("s")) {
    // s == service
    return <BookingList />;
  }
}

export default MedicalServiceRouter;
